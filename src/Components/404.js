import React from 'react';
import '../css/404.css'

function NotFound(){
  return(
      <div className="box">
        <p className="quote">404</p>
        <p className="bottom">The page you were looking for doesn't seem to exist.</p>
        <a href="/" className="Button">Home</a>
      </div>
  )
}

export default NotFound;
