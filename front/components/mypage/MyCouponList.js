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
      id: 0,
      couponName: "잇다 출시기념 감사 쿠폰",
      saleprice: "3000 원",
      startPeriod: "2022.10.18",
      expirationPeriod: "2022.10.19",
      used: false,
    },
    {
      id: 1,
      couponName: "잇다 출시기념 감사 쿠폰123",
      saleprice: "3000 원",
      startPeriod: "2022.10.18",
      expirationPeriod: "2022.10.19",
      used: true,
    },
  ]); // eslint-disable-line no-unused-vars
  // const [couponList, setCouponList] = useState([]);
  useEffect(() => {
    setCouponList([
      {
        id: 0,
        couponName: "잇다 출시기념 감사 쿠폰",
        saleprice: "3000 원",
        startPeriod: "2022.10.18",
        expirationPeriod: "2022.10.19",
        used: false,
      },
      {
        id: 1,
        couponName: "잇다 출시기념 감사 쿠폰123",
        saleprice: "3000 원",
        startPeriod: "2022.10.18",
        expirationPeriod: "2022.10.19",
        used: true,
      },
    ]);
  }, []);
  return (
    <MyComplainContainer>
      <MajorTitle>쿠폰</MajorTitle>
      <hr
        style={{
          height: "0.3rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />
      {couponList.length ? (
        <MyCouponItem couponList={couponList}></MyCouponItem>
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
  margin-top: 4.5rem;
  width: 56rem;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;

const CouponListBox = styled.div`
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

const DailyTable = styled.table`
  width: 100%;
`;
