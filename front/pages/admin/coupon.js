import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CouponList from "../../components/admin/coupon/CouponList";

export default function Coupon() {
  return (
    <CouponPage>
      <Container maxWidth="xxl" sx={{ paddingTop: "1rem" }}>
        <CouponHeaderBox>
          <HeaderText>쿠폰 관리</HeaderText>
          <AddCouponButton>쿠폰 등록</AddCouponButton>
        </CouponHeaderBox>
        <CouponList />
      </Container>
    </CouponPage>
  );
}

const CouponPage = styled.div`
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
  /* width: 100vw;
  height: 100vh; */
`;

const CouponHeaderBox = styled.div`
  border: 0.3rem solid #ff9494;
  border-radius: 1rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5rem;
`;

const HeaderText = styled.p`
  font-size: 1.5rem;
  font-weight: 800;
`;

const AddCouponButton = styled.button`
  background-color: white;
`;
