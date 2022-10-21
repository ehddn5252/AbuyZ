import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CouponList from "../../components/admin/coupon/CouponList";
import AddCoupon from "../../components/admin/coupon/AddCoupon";

export default function Coupon() {
  return (
    <CouponPage>
      <Container maxWidth="xxl" sx={{ paddingTop: "1rem" }}>
        <CouponList />
        <AddCoupon />
      </Container>
    </CouponPage>
  );
}

const CouponPage = styled.div`
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
`;
