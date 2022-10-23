// React
import React from "react";

// MUI
import AccountBoxIcon from "@mui/icons-material/AccountBox";

// StyledComponent
import styled from "styled-components";

export default function Myinfo() {
  return (
    <InfoContainer>
      <MainBox>
        <MyImgDiv>
          <AccountBoxIcon sx={{ fontSize: "10rem" }} />
        </MyImgDiv>
        <MyName>권도건님</MyName>
        <HistoryDiv>
          <HistoryTitle>주문 내역</HistoryTitle>
          <HistoryCount>4건</HistoryCount>
        </HistoryDiv>
        <HistoryDiv>
          <HistoryTitle>문의 내역</HistoryTitle>
          <HistoryCount>1건</HistoryCount>
        </HistoryDiv>
        <HistoryDiv>
          <HistoryTitle>나의 쿠폰</HistoryTitle>
          <HistoryCount>1개</HistoryCount>
        </HistoryDiv>
      </MainBox>
      <SupportBox></SupportBox>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  width: 100%;
  height: 16rem;
  margin-top: 3rem;
`;

const MainBox = styled.div`
  display: flex;
  background-color: #f5efe6;
  align-items: center;
  height: 10rem;
  padding: 3rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
`;

const SupportBox = styled.div`
  background-color: #aebdca;
  height: 6rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
`;

const MyImgDiv = styled.div``;

const MyName = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: bolder;
  padding-left: 3rem;
  padding-right: 9rem;
`;

const HistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2.5rem;
`;

const HistoryTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bolder;
  padding-bottom: 1rem;
`;

const HistoryCount = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
`;
