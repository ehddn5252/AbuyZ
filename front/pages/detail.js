import React from "react";
import ProductDetailInfo from "../components/product/ProductDetailInfo";
import ProductReview from "../components/product/ProductReview";
import ProductInfo from "../components/product/ProductInfo";

export default function Detail() {
  return (
    <div>
      <h1> 상세 제품 페이지</h1>
      <ProductInfo />
      <ProductDetailInfo />
      <ProductReview />
    </div>
  );
}
