import React from "react";

function Button(props) {
  return (
    <button
      className={"btn-default " + props.classProps}
      onClick={props.handleClick}
    >
      {props.title}
    </button>
  );
}
export default Button;
