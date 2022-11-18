import React from "react";
import styled from "styled-components";
import AddProduct from "../../../components/admin/product/add/AddProduct";

export default function Add() {
  return (
    <ProductPage>
      <AddProduct />
    </ProductPage>
  );
}

const ProductPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
