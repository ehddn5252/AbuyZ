import React from "react";
import styled from "styled-components";
// import { PageContainer } from "../dashboard";
import InquireProduct from "../../../components/admin/product/inquire/InquireProduct";
import AddProduct from "../../../components/admin/product/addEdit/AddProduct";

export default function Product() {
  return (
    <ProductPage>
      {/* <AddProduct /> */}
      <InquireProduct />
    </ProductPage>
  );
}

export const ProductPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
