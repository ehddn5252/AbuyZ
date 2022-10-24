import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";

export default function Coupon() {
  return (
    <CouponPage>
      <Container maxWidth="xxl" sx={{ paddingTop: "1rem" }}>
        정보수정 페이지
      </Container>
    </CouponPage>
  );
}

const CouponPage = styled.div`
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
`;
