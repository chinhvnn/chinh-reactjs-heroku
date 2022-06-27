import React from "react";

function ItemServices(props) {
  return (
    <div className="col-flex-sm-6 col-flex-md-4">
      <div className="product__services">
        <h4>
          {props.logo} {props.title}
        </h4>
        <p>{props.content}</p>
      </div>
    </div>
  );
}

export default ItemServices;
