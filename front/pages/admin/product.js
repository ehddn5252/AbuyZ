import React from "react";
import SaleProductSearch from "../../components/admin/product/SaleProductSearch";
import SaleProductList from "../../components/admin/product/SaleProductList";

export default function Product() {
  return (
    <div>
      <h1> 상품 관리 페이지</h1>
      <SaleProductSearch />
      <SaleProductList />
    </div>
  );
}
