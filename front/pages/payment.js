import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyShippingInfo from "../components/payment/MyShippingInfo";
import PaymentProcess from "../components/payment/PaymentProcess";
import ProductSaleInfo from "../components/payment/ProductSaleInfo";
import ProductSimpleInfo from "../components/payment/ProductSimpleInfo";
import { Container } from "@mui/system";
// State
import { paymentProduct, kakaoUid } from "../states/index";
import { useRecoilState } from "recoil";
import axios from "axios";
// Next.js
import { useRouter } from "next/router";
import { cartlist } from "./api/cart";
export default function Payment() {
  const router = useRouter();
  const [paymentValue, setPaymentValue] = useRecoilState(paymentProduct);
  const [paymentList, setPaymentList] = useState([]);

  // kakao 상품 결제 id
  const [kakaoId, setKakaoId] = useRecoilState(kakaoUid);
  // 결제 준비
  const PaymentKakao = async () => {
    const headers = {
      Authorization: "KakaoAK 5d9841cfb2c42933f5314a40436472ff",
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    await axios
      .post(
        "https://kapi.kakao.com/v1/payment/ready",
        {
          cid: "TC0ONETIME",
          partner_order_id: "partner_order_id",
          partner_user_id: "partner_user_id",
          item_name: "초코파이",
          quantity: 1,
          total_amount: 2200,
          vat_amount: 200,
          tax_free_amount: 0,
          approval_url: "http://localhost:3000/payment",
          fail_url: "http://localhost:3000/payment",
          cancel_url: "http://localhost:3000/payment",
        },
        {
          headers,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setKakaoId(res.data.tid);
          router.push(res.data.next_redirect_pc_url);
        }
      });
  };

  // 결제 승인
  const ApprovalKakao = async (pg_token) => {
    const headers = {
      Authorization: "KakaoAK 5d9841cfb2c42933f5314a40436472ff",
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    await axios
      .post(
        "https://kapi.kakao.com/v1/payment/approve",
        {
          cid: "TC0ONETIME",
          partner_order_id: "partner_order_id",
          partner_user_id: "partner_user_id",
          tid: kakaoId,
          pg_token: pg_token,
        },
        {
          headers,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          // 여기에 우리 결제 송신보내면 됨
        }
      });
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlParams = url.searchParams;

    const pg_token = urlParams.get("pg_token");
    if (pg_token) {
      ApprovalKakao(pg_token);
    }
  }, []);
  const basketpay = async () => {
    const res = await cartlist();
    setPaymentList(res.data);
  };
  // console.log("이게된거야", paymentList);
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
        <Button onClick={PaymentKakao}>결제하기</Button>
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
