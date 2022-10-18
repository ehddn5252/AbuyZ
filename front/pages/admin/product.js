import React from "react";
import styled from "styled-components";
import SaleProductSearch from "../../components/admin/product/SaleProductSearch";
import AddProduct from "../../components/admin/product/AddProduct";

export default function Product() {
  return (
    <ProductPage>
      <AddProduct></AddProduct>
      {/* <SaleProductSearch /> */}
    </ProductPage>
  );
}

const ProductPage = styled.div`
  background: #edf0f5;
  padding: 2rem;
  /* width: 100vw;
  height: 100vh; */
`;
