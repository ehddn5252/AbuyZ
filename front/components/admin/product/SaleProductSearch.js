import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";
import SaleProductList from "./SaleProductList";

export default function SaleProductSearch() {
  return (
    <Container>
      <Title>판매상품 조회</Title>
      <SearchContainer>
        <h1>전체 | 판매중 | 판매완료</h1>
      </SearchContainer>
      <SaleProductList></SaleProductList>
    </Container>
  );
}

const SearchContainer = styled.div`
  border: 0.3rem solid #ff9494;
  padding-left: 2rem;
  margin-bottom: 3rem;
`;

const Title = styled.p`
  font-size: xxx-large;
  font-weight: 1000;
  padding-bottom: 3rem;
  margin: 0;
`;
