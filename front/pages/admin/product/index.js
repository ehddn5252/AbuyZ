import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 컴포넌트
import InquireProduct from "../../../components/admin/product/inquire/InquireProduct";

export default function Product() {
  return (
    <ProductPage>
      <InquireProduct />
    </ProductPage>
  );
}

export const ProductPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
