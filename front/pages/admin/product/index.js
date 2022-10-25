import React from "react";
import styled from "styled-components";
import InquireProduct from "../../../components/admin/product/inquire/InquireProduct";
import AddProduct from "../../../components/admin/product/addEdit/AddProduct";

export default function Product() {
  return (
    <ProductPage>
      <AddProduct />
      <InquireProduct />
    </ProductPage>
  );
}

export const ProductPage = styled.div`
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
`;
