import React from "react";
import styled from "styled-components";
import SaleEventItem from "./SaleEventItem";
import Grid2 from "@mui/material/Unstable_Grid2";

const event = [
  {
    title: "빼빼로 데이 이벤트",
    image: "빼빼로 사진",
    content: "11월 빼빼로데이를 맞아 작은 이벤트를 준비했습니다!",
    startDate: "2022.10.18 16:00",
    endDate: "2022.11.11 12:00",
    category: "식품",
    discount: "1000",
  },
  {
    title: "빼빼로 데이 이벤트",
    image: "빼빼로 사진",
    content: "11월 빼빼로데이를 맞아 작은 이벤트를 준비했습니다!",
    startDate: "2022.10.18 16:00",
    endDate: "2022.11.11 12:00",
    category: "식품",
    discount: "1000",
  },
];

export default function SaleEventList() {
  return (
    <div>
      <EventHeaderBox>
        <HeaderText>이벤트 관리</HeaderText>
        <AddEventButton>이벤트 등록</AddEventButton>
      </EventHeaderBox>
      <Grid2 container spacing={3}>
        {event.map((data, idx) => (
          <Grid2 xs={6} md={6} key={idx}>
            <SaleEventItem event={data} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

const EventHeaderBox = styled.div`
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

const AddEventButton = styled.button`
  background-color: #ff7171;
  color: white;
  border: 1px solid;
  border-radius: 0.8rem;
  margin-left: 1rem;
  height: 3rem;
  width: 8rem;
  font-size: 1.3rem;
  font-weight: 800;
  &:hover {
    cursor: pointer;
  }
`;
