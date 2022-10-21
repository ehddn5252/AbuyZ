import React from "react";
import styled from "styled-components";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function SaleEventItem(props) {
  return (
    <EventBox>
      <Title>{props.event.title}</Title>
      <Grid2 container spacing={3}>
        <Grid2 xs={6} md={6}>
          <EventImg alt="인기 서비스" src="/images/event.png" />
        </Grid2>
        <Grid2
          xs={6}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Content>내용 : {props.event.content}</Content>
            <Content>쿠폰 시작 일시 : {props.event.startDate}</Content>
            <Content>쿠폰 끝 일시 : {props.event.endDate}</Content>
            <Content>사용 카테고리 : {props.event.category}</Content>
          </div>
          <ButtonBox>
            <DeleteButton>삭제</DeleteButton>
            <EditButton>수정</EditButton>
          </ButtonBox>
        </Grid2>
      </Grid2>
    </EventBox>
  );
}

const EventBox = styled.div`
  border: 0.3rem solid #ff9494;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  margin-left: 0;
`;

const EventImg = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  color: gray;
  border: 1px solid;
  border-radius: 0.8rem;
  height: 2rem;
  width: 3rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const EditButton = styled.button`
  background-color: #ff7171;
  color: white;
  border: 1px solid;
  border-radius: 0.8rem;
  margin-left: 1rem;
  height: 2rem;
  width: 5rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
