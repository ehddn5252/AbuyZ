import React from "react";
import SaleProductCategory from "./SaleProductCategory";
import SaleProductInfo from "./SaleProductInfo";
import SaleProductOption from "./SaleProductOption";
import SaleProductImage from "./SaleProductImage";
import SaleProductDetail from "./SaleProductDetail";
import SaleProductMore from "./SaleProductMore";

export default function AddProduct() {
  return (
    <div>
      <h1>상품 추가하기</h1>
      <SaleProductCategory />
      <SaleProductInfo />
      <SaleProductOption />
      <SaleProductImage />
      <SaleProductDetail />
      <SaleProductMore />
    </div>
  );
}
