import React from "react";
import styled from "styled-components";
import AddProduct from "../../../components/admin/product/addEdit/AddProduct";

export default function Add() {
  return (
    <ProductPage>
      <AddProduct></AddProduct>
    </ProductPage>
  );
}

const ProductPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
