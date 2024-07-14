import React from "react";
import PropTypes from "prop-types";
import "./Header.css";
function Header(props){
  return (
    <div className="header">
      <div className="header_exp">
        <p>{props.expression}</p>
      </div>
      <div className="result">
        <p>{props.result}</p>
      </div>
    </div>
  );
}

export default Header;
