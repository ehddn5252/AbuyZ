import React from "react";
import styled from "styled-components";
import MyShippingInfo from "../components/payment/MyShippingInfo";
import PaymentProcess from "../components/payment/PaymentProcess";
import ProductSaleInfo from "../components/payment/ProductSaleInfo";
import ProductSimpleInfo from "../components/payment/ProductSimpleInfo";

export default function Payment() {
  return (
    <div>
      <Center>
        <h1> 주문 / 결제</h1>
      </Center>
      <Card>
        <MyShippingInfo />
      </Card>
      <Card>
        <ProductSimpleInfo />
      </Card>
      <Card>
        <ProductSaleInfo />
      </Card>
      <Card>
        <PaymentProcess />
      </Card>
      <ButtonDiv>
        <Button>결제하기</Button>
      </ButtonDiv>
    </div>
  );
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const Card = styled.div`
  padding: 5rem 20rem 5rem 20rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #ff7171;
  padding: 1rem 2rem 1rem 2rem;
  border: none;
  border-radius: 10px;
  margin-left: 3rem;
`;
