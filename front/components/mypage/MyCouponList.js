// React
import React, { useState, useEffect } from "react";

// MUI
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import MyCouponItem from "./MyCouponItem";

export default function MyCouponList() {
  const [couponList, setCouponList] = useState([
    {
      couponName: "잇다 출시기념 감사 쿠폰",
      saleprice: "3000 원",
      expirationPeriod: "2022.10.19",
    },
  ]); // eslint-disable-line no-unused-vars
  // const [couponList, setCouponList] = useState([]);
  useEffect(() => {
    setCouponList([
      {
        couponName: "잇다 출시기념 감사 쿠폰",
        saleprice: "3000 원",
        expirationPeriod: "2022.10.19",
      },
    ]);
  }, []);
  return (
    <MyComplainContainer>
      <MajorTitle>쿠폰함</MajorTitle>
      <hr
        style={{
          height: "0.5rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />
      {couponList.length ? (
        <CouponListBox>
          <MyCouponItem coupon={couponList[0]} />
          <MyCouponItem coupon={couponList[0]} />
          <MyCouponItem coupon={couponList[0]} />
        </CouponListBox>
      ) : (
        <BlankBox>
          <LocalOfferOutlinedIcon sx={{ fontSize: "6rem" }} />
          <p>보유하신 쿠폰이 없습니다</p>
        </BlankBox>
      )}
    </MyComplainContainer>
  );
}

const MyComplainContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 100%;
`;

const MajorTitle = styled.h1`
  font-size: 2rem;
`;

const CouponListBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 3rem;
`;

const BlankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  font-size: 3rem;
  font-weight: bolder;
  color: #aaaaaa;
`;
