import React, { useEffect } from "react";
import styled from "styled-components";
export default function CanUseCoupon({ setCouponCnt, couponL, couponCnt }) {
  let cnt = 0;
  for (var i = 0; i < couponL.length; i++) {
    if (couponL[i].status === "사용가능") {
      cnt += 1;
    }
  }
  useEffect(() => {
    setCouponCnt(cnt);
  });
  return (
    <div>
      <Count>{couponCnt}</Count>
      <span>건</span>
    </div>
  );
}

const Count = styled.span`
  color: #56a9f1;
`;
