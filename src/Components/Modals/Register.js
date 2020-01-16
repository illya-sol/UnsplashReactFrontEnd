import React from 'react';
import axios from 'axios';

import M from 'materialize-css';
import {Token} from '../../App';

class Register extends React.Component{
  state = {
    username: '',
    password: '',
    email: ''
  }

  handleSubmit = (e, setToken) =>{
    e.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(!(username || email || password)){
      console.log("error")
    }

    axios({
      method: 'post',
      url: 'http://localhost:3001/users',
      data:{
        "user": username,
        "email": email,
        "password": password
      }
    })
    .then(response => {
        axios({
          method: 'post',
          url: 'http://localhost:3001/auth',
          data:{
            "user": username,
            "email": email,
            "password": password
          }
        })
        .then(auth => {
          this.setState({username:'', password:'', email: ''});
          setToken(auth.data.accessToken, auth.data.refreshToken);

          var modal = document.querySelectorAll(".modal[id='register']")[0];
          M.Modal.getInstance(modal).close();
        });
    }).catch(err =>{
      console.log(err);
    });

  }

  handleChange(e, param){
    e.preventDefault();
    this.setState({[param]:e.target.value});
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
            <input id="username" type="text" className="validate" autoComplete="on" onChange={e =>{ this.handleChange(e,'username') }} value={this.state.username}/>
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input id="email" type="email" className="validate" autoComplete="on" onChange={e =>{ this.handleChange(e,'email') }} value={this.state.email}/>
            <label htmlFor="email">Email</label>
          </div>
          <form className="input-field">
            <i className="material-icons prefix">vpn_key</i>
            <input id="password" type="password" className="validate" autoComplete="on" onChange={e =>{ this.handleChange(e,'password') }} value={this.state.password}/>
            <label htmlFor="password">Password</label>
          </form>
        </div>
        <div className="modal-footer">
          <Token.Consumer>
            {(context) => <a href="/" style={{fontSize:'1.125em', width: '25%'}}className="waves-effect waves-light black btn-flat white-text" onClick={e =>{ this.handleSubmit(e, context.setToken) }}>Register</a> }
          </Token.Consumer>
        </div>
      </div>
    );
  }
}

export default Register;
