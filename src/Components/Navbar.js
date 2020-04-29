import React from 'react';
import M from 'materialize-css';
import '../css/logo.css';

function NavBar(props){

  function check(e){
    e.preventDefault();
    let el = document.getElementById("search").value;
    if(el !== "" && (props.tokens.refreshToken && props.tokens.accessToken))
      window.location = "/search/" + el
    else{
      var modal = document.querySelector(".modal[id='login']");
      M.Modal.getInstance(modal).open();
    }

  }

  return(
    <div className="navbar-fixed">
    <nav className="white">
    <div className="nav-wrapper">
        <a className="brand-logo" style={{left:'10%'}} href="/"><i className="material-icons black-text" style={{fontSize: '1.75em'}} onClick={e => {e.preventDefault(); window.location = "/";}}>home</i></a>
        <form className="left" id="Search" onSubmit={(e)=>{ check(e) }}>
          <div className="input-field">
            <input id="search" type="search" placeholder="Search photos"></input>
            <label className="click noselect label-icon" type="submit" htmlFor="search"><i className="material-icons black-text" onClick={(e) => { check(e) }}>search</i></label>
            <i className="material-icons" onClick={ () => { document.getElementById("search").value = "" }} >close</i>
            <div id="searchResults"></div>
          </div>
        </form>
        <ul id="nav" className="right">
          <li><a className="modal-trigger" href="#login"><i className="material-icons black-text" style={{fontSize: '2em'}} onClick={e => {e.preventDefault();}}>input</i></a></li>
        </ul>
    </div>
    </nav>
    </div>
  );
}

export default NavBar;
