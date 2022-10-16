import React from "react";
import ProductCategory from "../components/product/ProductCategory";
import ProductLIst from "../components/product/ProductLIst";

export default function Search() {
  return (
    <div>
      <h1> 검색 페이지</h1>
      <ProductCategory />
      <ProductLIst />
    </div>
  );
}
