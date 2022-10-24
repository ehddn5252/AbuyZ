import React from "react";

// MUI
import Grid from "@mui/material/Grid";

// StyledComponent
import styled from "styled-components";

export default function DataStatus() {
  return (
    <BoxContainer>
      <TodayBox>
        <h1 style={{ marginLeft: "1rem" }}>오늘의 할 일</h1>
        <hr />
        <TodayContentBox container>
          <TodayDiv item xs={4}>
            <TodayTitle>승인대기중인 상품</TodayTitle>
            <TodayContent>2</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>답변대기중인 문의</TodayTitle>
            <TodayContent>0</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>신고</TodayTitle>
            <TodayContent>1</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>교환/환불</TodayTitle>
            <TodayContent>1</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>신고 리뷰</TodayTitle>
            <TodayContent>0</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>품절 상품</TodayTitle>
            <TodayContent>0</TodayContent>
          </TodayDiv>
        </TodayContentBox>
      </TodayBox>
      <DailyBox>
        <h1 style={{ marginLeft: "1rem" }}>일자별 요약</h1>
        <hr />
      </DailyBox>
    </BoxContainer>
  );
}

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const TodayBox = styled.div`
  width: 100%;
  height: 15rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  background-color: white;
`;

const DailyBox = styled.div`
  width: 100%;
  height: 31rem;
  padding: 0.5rem;
  background-color: white;
`;

const TodayContentBox = styled(Grid)`
  width: 100%;
`;

const TodayDiv = styled(Grid)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4.2rem;
`;

const TodayTitle = styled.p`
  width: 60%;
  padding-left: 1.5rem;
  font-weight: bold;
`;

const TodayContent = styled.p`
  width: 40%;
  padding-left: 1.5rem;
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
`;
