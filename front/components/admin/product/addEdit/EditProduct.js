import React from "react";
// import SaleProductCategory from "./SaleProductCategory";
// import SaleProductInfo from "./SaleProductInfo";
// import SaleProductOption from "./SaleProductOption";
// import SaleProductImage from "./SaleProductImage";
// import SaleProductDetail from "./SaleProductDetail";
// import SaleProductMore from "./SaleProductMore";
import styled from "styled-components";
import { Container } from "@mui/material";

export default function EditProduct() {
  return (
    <Container>
      <Title>상품 수정하기</Title>
      {/* <SaleProductCategory />
      <SaleProductInfo />
      <SaleProductOption />
      <SaleProductImage />
      <SaleProductDetail />
      <SaleProductMore /> */}
    </Container>
  );
}

const Title = styled.p`
  font-size: xxx-large;
  font-weight: 1000;
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin: 0;
`;
