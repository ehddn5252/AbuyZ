// React
import React from "react";

// MUI
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

// StyeldComponet
import styled from "styled-components";

// 하위 Components
import BasketList from "../components/payment/BasketList";
import BasketPayment from "../components/payment/BasketPayment";

export default function Basket() {
  return (
    <Container>
      <BasketBox>
        <AddressBox>
          <HomeOutlinedIcon sx={{ fontSize: "2rem", color: "#4185ED" }} />
          <p style={{ color: "#4185ED", paddingRight: "1.2rem" }}>배송지</p>
          <p>부산 남구 우암로 196, 삼성 청년 SW 아카데미 202호</p>
        </AddressBox>
        <BasketList />
      </BasketBox>
      <PaymentBox>
        <BasketPayment />
      </PaymentBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const BasketBox = styled.div`
  width: 70%;
`;

const AddressBox = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #aaaaaa;
  border-radius: 1rem;
  margin-top: 3rem;
  margin-left: 6.5rem;
  padding: 0.5rem;
  width: 81%;
  font-size: 1.2rem;
  font-weight: bolder;
`;

const PaymentBox = styled.div`
  width: 30%;
`;
