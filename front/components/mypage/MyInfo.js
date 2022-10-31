// React
import React from "react";

// StyledComponent
import styled from "styled-components";

export default function Myinfo({ setTap }) {
  const tap6Change = () => {
    setTap(6);
  };

  const tap3Change = () => {
    setTap(3);
  };

  const tap2Change = () => {
    setTap(2);
  };
  return (
    <InfoContainer>
      <MainBox>
        {/* <MyImgDiv>
          <AccountBoxIcon sx={{ fontSize: "10rem" }} />
        </MyImgDiv> */}
        <MyName>권도건님</MyName>
        <HistoryDiv>
          <HistoryTitle onClick={tap2Change}>문의 내역</HistoryTitle>
          <HistoryCount>
            <span style={{ color: "#56a9f1" }}>1</span>건
          </HistoryCount>
        </HistoryDiv>
        <HistoryDiv onClick={tap3Change}>
          <HistoryTitle>나의 쿠폰</HistoryTitle>
          <HistoryCount>
            {" "}
            <span style={{ color: "#56a9f1" }}>1</span>개
          </HistoryCount>
        </HistoryDiv>
        <HhistoryDiv onClick={tap6Change}>
          <HistoryTitle>작성 가능한 리뷰</HistoryTitle>
          <HistoryCount>
            <span style={{ color: "#56a9f1" }}>1</span>건
          </HistoryCount>
        </HhistoryDiv>
      </MainBox>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainBox = styled.div`
  display: flex;
  background-color: #f4f4f4;
  align-items: center;
  height: 8rem;
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
  margin-left: 30rem;
`;

const HistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem;
  padding-right: 3rem;
  border-right: 1px solid;
  border-color: rgba(128, 128, 128, 0.23);

  &:hover {
    cursor: pointer;
  }
`;

const HhistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem;
  padding-right: 3rem;

  &:hover {
    cursor: pointer;
  }
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
