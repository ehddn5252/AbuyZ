import React from "react";
import styled from "styled-components";

export default function ReviewStatus() {
  return (
    <BoxContainer>
      <TodayBox>
        <h1 style={{ marginLeft: "1rem" }}>최근 문의</h1>
        <hr />
      </TodayBox>
      <DailyBox>
        <h1 style={{ marginLeft: "1rem" }}>최근 리뷰</h1>
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
  height: 23rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  background-color: white;
`;

const DailyBox = styled.div`
  width: 100%;
  height: 23rem;
  padding: 0.5rem;
  background-color: white;
`;
