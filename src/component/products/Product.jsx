import React from "react";

const Product = (props) => {
  return (
    <div className="col-flex-sm-6 col-flex-md-4 mb-4">
      <div className="product__item">
        <div className="product__item__image">
          <img src={props.imgSrc} alt={props.imgAlt} />
        </div>
        <div className="product__item__body">
          <p className="product__item__title">{props.title}</p>
          <div className="product__item__body__group">
            <span>{props.star} STAR</span>
            <span> | </span>
            <span>Lượt mua {props.buyCount}</span>
          </div>
          <div className="product__item__body__group">
            <span>{props.price} đ</span>
            <span>GIẢM 15%</span>
          </div>
        </div>
        <div className="product__item__bot margin-auto-center pb-3">
          <button>ADD CART</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
