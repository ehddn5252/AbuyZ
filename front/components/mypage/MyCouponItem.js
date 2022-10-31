import React, { useEffect } from "react";
import { Grid } from "@mui/material";
// StyledComponents
import styled from "styled-components";

export default function MyCouponItem({ coupon }) {
  useEffect(() => {
    console.log(coupon);
  }, []);
  return (
    <CouponContainer>
      <span> aads</span>
    </CouponContainer>
  );
}

const CouponContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
