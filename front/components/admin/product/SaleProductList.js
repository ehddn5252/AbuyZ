import React from "react";
import styled from "styled-components";

export default function SaleProductList() {
  return (
    <ListContainer>
      <Title>상품 목록</Title>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  border: 0.3rem solid #ff9494;
  padding-left: 2rem;
`;

const Title = styled.p`
  font-size: xxx-large;
  font-weight: 1000;
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin: 0;
`;
