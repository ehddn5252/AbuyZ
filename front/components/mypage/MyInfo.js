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
        {/* <MyImgDiv>
          <AccountBoxIcon sx={{ fontSize: "10rem" }} />
        </MyImgDiv> */}
        <MyName>권도건님</MyName>
        <HistoryDiv>
          <HistoryTitle>주문 내역</HistoryTitle>
          <HistoryCount>
            <span style={{ color: "#56a9f1" }}>4</span>건
          </HistoryCount>
        </HistoryDiv>
        <HistoryDiv>
          <HistoryTitle>문의 내역</HistoryTitle>
          <HistoryCount>
            <span style={{ color: "#56a9f1" }}>1</span>건
          </HistoryCount>
        </HistoryDiv>
        <HhistoryDiv>
          <HistoryTitle>나의 쿠폰</HistoryTitle>
          <HistoryCount>
            {" "}
            <span style={{ color: "#56a9f1" }}>1</span>개
          </HistoryCount>
        </HhistoryDiv>
      </MainBox>
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
  background-color: #f4f4f4;
  align-items: center;
  height: 10rem;
  padding: 3rem;
  border-radius: 10px;
`;

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
  margin: 1.5rem;
  padding-right: 3rem;
  border-right: 1px solid black;
`;

const HhistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem;
  padding-right: 3rem;
`;
const HistoryTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bolder;
  padding-bottom: 1rem;
`;

const HistoryCount = styled.div`
  font-size: 1.2rem;
  font-weight: bolder;
`;
