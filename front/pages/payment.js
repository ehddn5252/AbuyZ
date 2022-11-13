import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyShippingInfo from "../components/payment/MyShippingInfo";
import PaymentProcess from "../components/payment/PaymentProcess";
import ProductSaleInfo from "../components/payment/ProductSaleInfo";
import ProductSimpleInfo from "../components/payment/ProductSimpleInfo";
import { Container } from "@mui/system";
// State
import { paymentProduct } from "../states/index";
import { useRecoilState } from "recoil";

// Next.js
import { useRouter } from "next/router";
import { cartlist } from "./api/cart";
export default function Payment() {
  const router = useRouter();
  const [paymentValue, setPaymentValue] = useRecoilState(paymentProduct);
  const [paymentList, setPaymentList] = useState([]);

  const basketpay = async () => {
    const res = await cartlist();
    setPaymentList(res.data);
  };
  console.log("이게된거야", paymentList);
  useEffect(() => {
    setPaymentValue("");
  }, [router.pathname]);

  useEffect(() => {
    if (!paymentValue) {
      // null 이면 장바구니에서 결제 한거임
      basketpay();
    } else {
      // 아니면 그냥 구매하기 누른거임
      setPaymentList(paymentValue);
    }
  }, []);
  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Center>
        <h1> 주문 / 결제</h1>
      </Center>
      <Card>
        <ProductSimpleInfo paymentList={paymentList} />
      </Card>
      <Card>
        <MyShippingInfo />
      </Card>

      <Card>
        <ProductSaleInfo paymentList={paymentList} />
      </Card>
      <Card>
        <PaymentProcess />
      </Card>
      <ButtonDiv>
        <Button>결제하기</Button>
      </ButtonDiv>
    </Container>
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
  background-color: #56a9f1;
  color: white;
  height: 3rem;
  width: 7rem;
  border: none;
  border-radius: 5px;
`;
