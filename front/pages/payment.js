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

// API
import { payProduct } from "./api/order";
import { cartlist } from "./api/cart";

export default function Payment() {
  const router = useRouter();
  const [paymentValue, setPaymentValue] = useRecoilState(paymentProduct);
  const [paymentList, setPaymentList] = useState([]);
  // kakao 상품 결제 id
  const [kakaoId, setKakaoId] = useRecoilState(kakaoUid);

  // 단일 상품 결제 준비
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
          partner_order_id: "AbuyZ",
          partner_user_id: "Abuyz 고객",
          item_name: paymentList[0].productDto.name,
          quantity: 1,
          total_amount: paymentList[0].productDto.price,
          vat_amount: 200,
          tax_free_amount: paymentList[0].productDto.deliveryFee,
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

  // 단일 상품 결제 승인
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
          partner_order_id: "AbuyZ",
          partner_user_id: "Abuyz 고객",
          tid: kakaoId,
          pg_token: pg_token,
        },
        {
          headers,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          PayOne();
        }
      });
  };

  // 단일 상품 결제하기
  const PayOne = async () => {
    const optionValues = {};
    const options = paymentValue[0].inventoryDto.productOptions;
    console.log(Object.values(options[0])[0]);
    for (let i = 0; i < options.length; i++) {
      optionValues[Object.keys(options[i])[0]] = Object.values(options[i])[0];
    }
    const productDto = {
      products_uid: paymentValue[0].uid,
      product_count: paymentValue[0].productCount,
      option_values: optionValues,
      coupons_uid: 0,
    };
    const res = await payProduct(productDto);
    if (res.statusCode) {
      alert("결제 성공");
      router.push("/");
    } else {
      alert("결제가 실패하였습니다. 다시 시도해주세요.");
    }
  };
  // 결제 승인 동작
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlParams = url.searchParams;
    const pg_token = urlParams.get("pg_token");
    if (pg_token) {
      if (paymentValue) {
        ApprovalKakao(pg_token);
      }
    }
  }, []);

  const basketpay = async () => {
    const res = await cartlist();
    setPaymentList(res.data);
  };

  // 결제정보 들고오기
  useEffect(() => {
    console.log(paymentValue, "paymentValue");
    if (paymentValue === "") {
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
