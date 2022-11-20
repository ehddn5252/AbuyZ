import React, { useEffect, useState } from "react";

// Style
import styled from "styled-components";
import { Container } from "@mui/system";

// 하위 컴포넌트
import MyShippingInfo from "../components/payment/MyShippingInfo";
import PaymentProcess from "../components/payment/PaymentProcess";
import ProductSaleInfo from "../components/payment/ProductSaleInfo";
import ProductSimpleInfo from "../components/payment/ProductSimpleInfo";

// Alert
import Swal from "sweetalert2";

// State
import {
  paymentProduct,
  kakaoUid,
  baksetPayments,
  couponitems,
} from "../states/index";
import { useRecoilState } from "recoil";

// axios
import axios from "axios";

// Next.js
import { useRouter } from "next/router";

// API
import { payProduct, payBasket } from "./api/order";
import { cartlist } from "./api/cart";

export default function Payment() {
  const router = useRouter();
  // 단일 상품
  const [paymentValue, setPaymentValue] = useRecoilState(paymentProduct);

  // 장바구니 상품
  const [basketValue, setBasketValue] = useRecoilState(baksetPayments);

  // 결제 쿠폰 리스트
  const [couponList, setCouponList] = useRecoilState(couponitems);
  // 구매상품리스트
  const [paymentList, setPaymentList] = useState([]);

  // kakao 상품 결제 id
  const [kakaoId, setKakaoId] = useRecoilState(kakaoUid);

  const KakaoPay = () => {
    if (paymentValue === "") {
      BasketKakao();
    } else {
      PaymentKakao();
    }
  };

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
          approval_url: "https://k7e201.p.ssafy.io/payment",
          fail_url: "https://k7e201.p.ssafy.io/payment",
          cancel_url: "https://k7e201.p.ssafy.io/payment",
          // approval_url: "http://localhost:3000/payment",
          // fail_url: "http://localhost:3000/payment",
          // cancel_url: "http://localhost:3000/payment",
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
    for (let i = 0; i < options.length; i++) {
      optionValues[Object.keys(options[i])[0]] = Object.values(options[i])[0];
    }
    const productDto = {
      products_uid: paymentValue[0].uid,
      product_count: paymentValue[0].productCount,
      option_values: optionValues,
      coupons_uid: couponList[0],
    };
    const res = await payProduct(productDto);
    if (res.statusCode) {
      Swal.fire({
        title: "결제 성공!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then((e) => {
        router.push("/");
      });
    } else {
      Swal.fire({
        title: "결제가 실패하였습니다.",
        text: "잠시 후 다시 시도해주세요",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    }
  };

  // 장바구니 상품 결제 준비
  const BasketKakao = async () => {
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
          item_name: basketValue.productName,
          quantity: basketValue.count,
          total_amount: basketValue.totalPrice,
          vat_amount: 200,
          tax_free_amount: basketValue.feePrice,
          approval_url: "https://k7e201.p.ssafy.io/payment",
          fail_url: "https://k7e201.p.ssafy.io/payment",
          cancel_url: "https://k7e201.p.ssafy.io/payment",
          // approval_url: "http://localhost:3000/payment",
          // fail_url: "http://localhost:3000/payment",
          // cancel_url: "http://localhost:3000/payment",
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
  // 장바구니 상품 결제 승인
  const ApprovalBasket = async (pg_token) => {
    const headers = {
      Authorization: "KakaoAK 8f5016aaaee43d4b35b159c439e8d99c",
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
          PayOther();
        }
      });
  };
  // 장바구니 상품 결제하기
  const PayOther = async () => {
    const cartDto = {
      coupons: couponList,
    };
    const res = await payBasket(cartDto);
    Swal.fire({
      title: "결제 성공!",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "확인",
    }).then((e) => {
      router.push("/");
    });
  };
  // 결제 승인 동작
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlParams = url.searchParams;
    const pg_token = urlParams.get("pg_token");
    if (pg_token) {
      if (paymentValue) {
        ApprovalKakao(pg_token);
      } else {
        ApprovalBasket(pg_token);
      }
    }
  }, []);

  const basketpay = async () => {
    const res = await cartlist();
    setPaymentList(res.data);
  };

  // 결제정보 들고오기
  useEffect(() => {
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
        <Button onClick={KakaoPay}>결제하기</Button>
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
  cursor: pointer;
`;
