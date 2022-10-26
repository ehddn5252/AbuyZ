// React
import React from "react";

// StyledComponents
import styled from "styled-components";

export default function MyCouponItem({ coupon }) {
  return (
    <CouponContainer>
      <span>권도건 바보</span>
      {/* <CouponLeftBox>
        <CouponTitle>{coupon.couponName}</CouponTitle>
        <CouponContent>{coupon.saleprice}</CouponContent>
        <CouponDate>~{coupon.expirationPeriod} 까지</CouponDate>
      </CouponLeftBox>
      <CouponRightBox>
        <h1>ITDA</h1>
      </CouponRightBox>
      <CircleOne></CircleOne>
      <CircleTwo></CircleTwo>
      <RectangleOne></RectangleOne>
      <RectangleTwo></RectangleTwo> */}
    </CouponContainer>
  );
}

const CouponContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CouponLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  height: 100%;
  border-radius: 1rem;
  border: 2px solid #7895b2;
`;

const CouponTitle = styled.p`
  padding: 2rem;
  margin: 0;
  font-size: 1rem;
  font-weight: bolder;
`;

const CouponContent = styled.p`
  padding: 0rem;
  margin: 0;
  padding-left: 2rem;
  font-size: 2rem;

  font-weight: bolder;
`;

const CouponDate = styled.p`
  padding-left: 2rem;
  padding-bottom: 3rem;
`;

const CouponRightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  border-radius: 1rem;
  border: 2px solid #7895b2;
`;

const CircleOne = styled.div`
  position: relative;
  top: -47%;
  left: -22%;
  background-color: white;
  width: 32px;
  height: 16px;
  border-radius: 0 0 16px 16px;
  border: 2px solid #7895b2;
`;
const CircleTwo = styled.div`
  position: relative;
  top: 47%;
  left: -29%;
  background-color: white;
  width: 32px;
  height: 16px;
  border-radius: 16px 16px 0 0;
  border: 2px solid #7895b2;
`;

const RectangleOne = styled.div`
  position: relative;
  top: -53.5%;
  left: -35.6%;
  background-color: white;
  width: 33px;
  height: 16px;
`;
const RectangleTwo = styled.div`
  position: relative;
  top: 53%;
  left: -42%;
  background-color: white;
  width: 33px;
  height: 16px;
`;
