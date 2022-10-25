// React
import React from "react";

// MUI
import Button from "@mui/material/Button";
// StyeldComponet
import styled from "styled-components";

export default function BasketPayment() {
  return (
    <Container>
      <h3>결제예정금액</h3>
      <PriceBox>
        <PriceDiv>
          <p style={{ color: "#aaaaaa" }}>상품금액</p>
          <p>67,400원</p>
        </PriceDiv>
        <SaleDiv>
          <p style={{ color: "#aaaaaa" }}>상품할인금액</p>
          <p>-8,350원</p>
        </SaleDiv>
      </PriceBox>
      <hr />
      <TotalPriceBox>
        <p>
          총 <span style={{ color: "red" }}>2</span> 건
        </p>
        <p style={{ color: "red" }}>59,050원</p>
      </TotalPriceBox>
      <OrderButton fullWidth variant="contained" color="error">
        주문하기
      </OrderButton>
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  padding: 3rem;
  margin-top: 8rem;
  border: 1px solid #aaaaaa;
  border-radius: 2rem;
`;

const PriceBox = styled.div``;

const PriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bolder;
`;
const SaleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bolder;
`;

const TotalPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bolder;
`;

const OrderButton = styled(Button)`
  height: 2rem;
  font-weight: bolder;
  margin-top: 3rem;
`;
