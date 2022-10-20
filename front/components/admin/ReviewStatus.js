import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";

export default function ReviewStatus() {
  const dummyData = [
    {
      unresolved: 3,
      resolved: 0,
      total: 3,
    },
  ];

  return (
    <Container maxWidth="xxl" style={{ paddingBottom: "2rem" }}>
      <DataStatusBox>
        <h1 style={{ marginLeft: "1.5rem" }}>리뷰 현황</h1>
        <hr style={{ width: "95%" }} />
        <BoxContainer>
          <Box>
            <Title>매출 현황</Title>
            <Body>{dummyData[0].unresolved}원</Body>
          </Box>
          <Box style={{ background: "#E17E90" }}>
            <Title>주문 현황</Title>
            <Body>{dummyData[0].resolved}건</Body>
          </Box>
          <Box style={{ background: "#ABC77B" }}>
            <Title>등록 상품 현황</Title>
            <Body>{dummyData[0].total}건</Body>
          </Box>
        </BoxContainer>
      </DataStatusBox>
    </Container>
  );
}

const DataStatusBox = styled.div`
  border: 0.1rem solid #000;
  margin-top: 1rem;
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
