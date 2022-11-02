import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
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
