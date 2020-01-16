import React from 'react';
import '../css/logo.css';

function NavBar(){
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter'){
      event.preventDefault();
      window.location = "/search/" + document.getElementById("search").value;
    }
  });

  function check(e){
    e.preventDefault();
    let el = document.getElementById("search").value;
    if(el !== "")
      window.location = "/search/" + el
  }

  return(
    <div className="navbar-fixed">
    <nav className="white">
    <div className="nav-wrapper">
        <a className="brand-logo" style={{marginLeft:'15px'}} href="/"><i className="material-icons black-text" style={{fontSize: '1.75em'}} onClick={e => {e.preventDefault(); window.location = "/";}}>home</i></a>

        <form className="left" id="Search" >
          <div className="input-field">
            <input id="search" type="search" placeholder="Search photos" autoComplete="on" autoCapitalize="none" spellCheck="true" required></input>
            <label className="click noselect label-icon" type="submit" htmlFor="search"><i className="material-icons black-text" onClick={(e) => { check(e) }}>search</i></label>
            <i className="material-icons" onClick={ () => { document.getElementById("search").value = "" }} >close</i>
            <div id="searchResults"></div>
          </div>
        </form>

        <ul id="nav-mobile NavMobile" className="right hide-on-med-and-down">
          <li><a className="modal-trigger" href="#register"><i className="material-icons black-text" style={{fontSize: '2em'}} onClick={e => {e.preventDefault();}}>person_add</i></a></li>
          <li><a className="modal-trigger" href="#login"><i className="material-icons black-text" style={{fontSize: '2em'}} onClick={e => {e.preventDefault();}}>input</i></a></li>
          <li><a className="white btn" href="/" onClick={e => {e.preventDefault();}}><i className="material-icons black-text" style={{fontSize: '2em'}}>arrow_drop_down</i></a></li>
        </ul>
    </div>
    </nav>
    </div>
  );
}

export default NavBar;
