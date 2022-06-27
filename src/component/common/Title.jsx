import React from "react";

function Title(props) {
  return (
    <div style={{ margin: "1.5rem" }}>
      <h2>{props.title}</h2>
      <small>{props.descript}</small>
    </div>
  );
}

export default Title;
