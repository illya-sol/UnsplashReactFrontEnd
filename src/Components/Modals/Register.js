import React from 'react';
import axios from 'axios';
import M from 'materialize-css';

class Register extends React.Component{
  state = {
    username: '',
    u_valid: true,
    password: '',
    email: '',
    e_valid: true
  }

  handleSubmit = (e, setToken) =>{
    e.preventDefault();
    if(!(this.state.e_valid && this.state.u_valid))
      return;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    axios({
      method: 'post',
      url: 'https://unsplash0backend.herokuapp.com/users',
      data:{
        "user": username,
        "email": email,
        "password": password
      },
      headers: {'Access-Control-Allow-Origin': '*'}
    })
    .then(response => {
        axios({
          method: 'post',
          url: 'https://unsplash0backend.herokuapp.com/auth',
          data:{
            "user": username,
            "email": email,
            "password": password
          },
          headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(auth => {
          this.setState({username:'', password:'', email: ''});
          setToken(auth.data.accessToken, auth.data.refreshToken);

          var modal = document.querySelector(".modal[id='register']");
          M.Modal.getInstance(modal).close();
        });
    }).catch(err =>{ console.log(err); });
  }

  handleChange(e, param){
    e.preventDefault();
    this.setState({[param]:e.target.value});
    if(param === 'username'){
        axios.get('https://unsplash0backend.herokuapp.com/users/search/' + e.target.value, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then((response) =>{
          if(response.status === 302)
            this.setState({u_valid: false});
          else
            this.setState({u_valid: true});
        })
        .catch((err) =>{
          if(err.response.status === 302)
            this.setState({u_valid: false});
          else
            this.setState({u_valid: true});
        });
    }
    else if(param === 'email')
      if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
        this.setState({e_valid: true});
      else
        this.setState({e_valid: false});
  }

  render(){
    return(
      <div className="modal" id="register">
        <div style={{marginTop: '0px', fontFamily:'Roboto', fontSize:'1.75em'}}
          className="card-panel black center white-text valign-wrapper">
          <i className="material-icons medium">face</i>
          Sign Up
        </div>
        <div className="modal-content">
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input id="username" type="text" className={this.state.u_valid ? "" : " invalid"} autoComplete="on" onChange={e =>{ this.handleChange(e,'username') }} value={this.state.username}/>
            <label htmlFor="username">{"Username" + (this.state.u_valid ? "" : " is Taken")}</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input id="email" type="email" className={this.state.e_valid ? "" : " invalid"} autoComplete="on" onChange={e =>{ this.handleChange(e,'email') }} value={this.state.email}/>
            <label htmlFor="email">{"Email" + (this.state.e_valid ? "" : " is Incorrect")}</label>
          </div>
          <form className="input-field" onSubmit={(e) =>{ this.handleSubmit(e,  this.props.setToken) }}>
            <i className="material-icons prefix">vpn_key</i>
            <input id="password" type="password" className="validate" autoComplete="on" onChange={e =>{ this.handleChange(e,'password') }} value={this.state.password}/>
            <label htmlFor="password">Password</label>
          </form>
        </div>
        <div className="modal-footer">
          <a href="/" style={{fontSize:'1.125em', width: '25%'}}className="waves-effect waves-light black btn-flat white-text" onClick={e =>{ this.handleSubmit(e, this.props.setToken) }}>Register</a>
        </div>
      </div>
    );
  }
}

export default Register;
