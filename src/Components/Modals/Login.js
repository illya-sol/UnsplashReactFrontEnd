import React from 'react';
import axios from 'axios';

import '../../css/index.css';

import M from 'materialize-css';
import {Token} from '../../App';

class Login extends React.Component{
  state = {
    username: '',
    password: ''
  }

  handleSubmit = (e, setToken) =>{
    e.preventDefault();
    let username = document.getElementById("login_username").value;
    let password = document.getElementById("login_password").value;

    if(!(username || password)){
      console.log("error")
    }

    axios({
      method: 'post',
      url: 'http://localhost:3001/auth',
      data:{
        "user": username,
        "password": password
        }
      })
      .then(auth => {
      this.setState({username:'', password:''});
      setToken(auth.data.accessToken, auth.data.refreshToken);

      var modal = document.querySelectorAll(".modal[id='login']")[0];
      M.Modal.getInstance(modal).close();
    });

  }

  swapOutModals(){
    var login = document.querySelectorAll(".modal[id='login']")[0];
    var regis = document.querySelectorAll(".modal[id='register']")[0];
    M.Modal.getInstance(login).close();
    M.Modal.getInstance(regis).open();
  }

  handleChange(e, param){
    e.preventDefault();
    this.setState({[param] : e.target.value});
  }

  render(){
    return(
      <div className="modal" id="login">
        <div style={{marginTop: '0px', fontFamily:'Roboto', fontSize:'1.75em'}}
          className="card-panel black center white-text valign-wrapper">
          <i className="material-icons medium" >face</i>
          Log In
        </div>
        <div className="modal-content">
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input id="login_username" type="text" className="validate" autoComplete="on" onChange={e =>{ this.handleChange(e,'username') }} value={this.state.username}/>
            <label htmlFor="login_username">Username</label>
          </div>
          <form className="input-field">
            <i className="material-icons prefix">vpn_key</i>
            <input id="login_password" type="password" className="validate" autoComplete="on" onChange={e =>{ this.handleChange(e,'password') }} value={this.state.password}/>
            <label htmlFor="login_password">Password</label>
          </form>
          <div className="center-align">
            <a style={{fontSize: '1.125em'}} href="/" onClick={e => {e.preventDefault(); this.swapOutModals();}}>Register?</a>
          </div>
        </div>
        <div className="modal-footer">
          <Token.Consumer>
            {(context) => <a href="/" style={{fontSize:'1.25em', width: '25%'}} className="waves-effect waves-light black btn-flat white-text btn-medium" onClick={e =>{ this.handleSubmit(e, context.setToken) }}>Log In</a> }
          </Token.Consumer>
        </div>
      </div>
    );
  }
}

export default Login;
