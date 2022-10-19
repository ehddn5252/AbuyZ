import React from "react";
import styled from "styled-components";
import { ContainerBox } from "../addEdit/SaleProductCategory";

export default function SaleProductList() {
  return (
    <ContainerBox>
      <h1 style={{ paddingLeft: "2rem" }}>상품 목록</h1>
      <hr style={{ background: "#ff9494", width: "95%" }}></hr>
    </ContainerBox>
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
