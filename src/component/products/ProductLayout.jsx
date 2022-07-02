import React from "react";
import Title from "../common/Title";
import ItemServices from "./ItemServices";
import Product from "./Product";

function ProductLayout() {
  const itemServices = [
    {
      title: "PHÒNG SIÊU HẠNG SANG CAO CẤP - NGÀN SAO - VIP VIP VIP VIP VIP VIP VIP VIP VIP VIP VIP VIP",
      imgSrc : "./img/milk.webp",
      imgAlt : "Hình ảnh sản phẩm",
      star : 5,
      buyCount : 1000,
      price : 120000,
    },
    {
      title: "PHÒNG CAO CẤP",
      imgSrc : "./img/milk.webp",
      imgAlt : "Hình ảnh sản phẩm",
      star : 5,
      buyCount : 1000,
      price : 120000,
    },
    {
      title: "PHÒNG BÌNH DÂN",
      imgSrc : "./img/milk.webp",
      imgAlt : "Hình ảnh sản phẩm",
      star : 5,
      buyCount : 1000,
      price : 120000,
    },
  ];
  return (
    <div>
      <div>
        <div style={{ textAlign: "center" }}>
          <Title
            title="DANH SÁCH PHÒNG CHO THUÊ"
            descript="Tất cả chúng ta đang sống trong một thời đại thuộc về tuổi trẻ trong tâm hồn 
          (to và đẹp càng tốt)..."
          />
        </div>
        <div className="row-flex" style={{ width: "90%" }}>
          {itemServices.map((item, index) => (
            <Product
              key={index}
              imgSrc={item.imgSrc}
              imgAlt={item.imgAlt}
              title={item.title}
              star={item.star}
              buyCount={item.buyCount}
              price={item.price}
            />
          ))}
        </div>
      </div>
      <div>
        <div style={{ textAlign: "center" }}>
          <Title
            title="DANH SÁCH DỊCH VỤ"
            descript="Tất cả chúng ta đang sống trong một thời đại thuộc về tuổi trẻ trong tâm hồn 
          (to và đẹp càng tốt)..."
          />
        </div>
        <div className="row-flex j-content-between a-items-center" style={{ width: "90%" }}>
          {itemServices.map((item, index) => (
            <ItemServices
              key={index}
              logo={item.logo}
              title={item.title}
              content={item.des}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductLayout;
