import React from "react";
import SaleProductCategory from "./SaleProductCategory";
import SaleProductInfo from "./SaleProductInfo";
import SaleProductOption from "./SaleProductOption";
import SaleProductImage from "./SaleProductImage";
import SaleProductMore from "./SaleProductMore";
import styled from "styled-components";
import { Container } from "@mui/material";

export default function AddProduct() {
  return (
    <Container maxWidth="xxl">
      <Title>상품 등록</Title>
      <SaleProductCategory />
      <SaleProductInfo />
      <SaleProductOption />
      <SaleProductImage />
      <SaleProductMore />
      <ButtonBox>
        <CancelButton>취소</CancelButton>
        <AddButton>등록</AddButton>
      </ButtonBox>
    </Container>
  );
}

const Title = styled.p`
  font-size: xxx-large;
  font-weight: 1000;
  padding-bottom: 3rem;
  margin: 0;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  background-color: #ffffff;
  color: gray;
  border: 1px solid;
  border-radius: 0.8rem;
  height: 3rem;
  width: 5rem;
  font-size: 1.3rem;
`;

const AddButton = styled.button`
  background-color: #ff7171;
  color: white;
  border: 1px solid;
  border-radius: 0.8rem;
  margin-left: 1rem;
  height: 3rem;
  width: 7rem;
  font-size: 1.5rem;
`;
