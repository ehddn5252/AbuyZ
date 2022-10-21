import React from "react";
import styled from "styled-components";
import CouponItem from "./CouponItem";
import Grid2 from "@mui/material/Unstable_Grid2";

const snack = [
  {
    title: "빼빼로 데이 1000원 쿠폰",
    startDate: "2022.10.18 16:00",
    endDate: "2022.11.11 12:00",
    category: "식품",
    discount: "1000",
  },
];

export default function CouponList() {
  return (
    <div>
      <CouponHeaderBox>
        <HeaderText>쿠폰 관리</HeaderText>
        <AddCouponButton>쿠폰 등록</AddCouponButton>
      </CouponHeaderBox>
      <Grid2 container spacing={3}>
        {snack.map((data, idx) => (
          <Grid2 xs={4} md={4} key={idx}>
            <CouponItem snack={data} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

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
  background-color: #ff7171;
  color: white;
  border: 1px solid;
  border-radius: 0.8rem;
  margin-left: 1rem;
  height: 3rem;
  width: 8rem;
  font-size: 1.3rem;
  font-weight: 800;
`;
