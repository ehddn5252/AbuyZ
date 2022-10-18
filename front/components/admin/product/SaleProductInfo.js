import React from "react";
import styled from "styled-components";

export default function SaleProductInfo() {
  return (
    <InfoContainer>
      <h1 style={{ paddingLeft: "2rem" }}>판매 정보</h1>
      <hr style={{ background: "#ff9494", width: "95%" }}></hr>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  border: 0.3rem solid #ff9494;
  border-radius: 1rem;
  margin-bottom: 3rem;
`;
