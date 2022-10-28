import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CouponInquire from "../../components/admin/coupon/CouponInquire";

export default function Coupon() {
  return (
    <CouponPage>
      <CouponInquire />
    </CouponPage>
  );
}

export const CouponPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
