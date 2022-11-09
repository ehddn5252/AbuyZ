// React
import React from "react";

// StyeldComponet
import styled from "styled-components";

// 하위 Components
import BasketList from "../components/payment/BasketList";
import BasketPayment from "../components/payment/BasketPayment";

export default function Basket() {
  return (
    <Container>
      <h1>장바구니</h1>
      <BasketBox>
        <BasketList />
        <BasketPayment />
      </BasketBox>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55%;
  margin: 0 22%;
  padding-top: 3rem;
  height: auto;
`;
const BasketBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
