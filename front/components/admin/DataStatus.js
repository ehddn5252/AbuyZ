import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

export default function DataStatus() {
  const dummyData = [
    {
      sales: 123456,
      order: 6,
      product: 250,
      unresolved: 1,
      resolved: 0,
      total: 1,
    },
  ];

  const yesterday = 10000;
  const today = 200000;

  return (
    <Container maxWidth="xxl">
      <DataStatusBox>
        <h1 style={{ marginLeft: "1.5rem" }}>진행 현황</h1>
        <hr style={{ width: "95%" }} />
        <BoxContainer>
          <Box>
            <Title>매출 현황</Title>
            <Body>{dummyData[0].sales.toLocaleString("ko-KR")}원</Body>
            {yesterday <= today ? (
              <UpSales>
                +{(today - yesterday).toLocaleString("ko-KR")}원
              </UpSales>
            ) : (
              <DownSales>
                -{(yesterday - today).toLocaleString("ko-KR")}원
              </DownSales>
            )}
          </Box>
          <Box style={{ background: "#E17E90" }}>
            <Title>주문 현황</Title>
            <Body>{dummyData[0].order}건</Body>
          </Box>
          <Box style={{ background: "#ABC77B" }}>
            <Title>등록 상품 현황</Title>
            <Body>{dummyData[0].product}건</Body>
          </Box>
        </BoxContainer>
        <BoxContainer>
          <Box style={{ background: "#C8ABD9" }}>
            <Title>미해결 문의</Title>
            <Body>{dummyData[0].unresolved}건</Body>
          </Box>
          <Box style={{ background: "#F7B32A" }}>
            <Title>해결 문의</Title>
            <Body>{dummyData[0].resolved}건</Body>
          </Box>
          <Box style={{ background: "#93C4E4" }}>
            <Title>총 문의</Title>
            <Body>{dummyData[0].total}건</Body>
          </Box>
        </BoxContainer>
      </DataStatusBox>
    </Container>
  );
}

const DataStatusBox = styled.div`
  border: 0.1rem solid #000;
  margin-bottom: 2rem;
`;

const BoxContainer = styled.div`
  display: flex;
`;

const Box = styled.div`
  width: 100%;
  height: 12rem;
  border-radius: 0.3rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #4cc5cd;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 1000;
  color: white;
  margin-bottom: 0;
`;

const Body = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`;

const UpSales = styled.p`
  margin-top: 0;
  color: red;
`;

const DownSales = styled.p`
  margin-top: 0;
  color: blue;
`;
