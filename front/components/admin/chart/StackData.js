// React
import React from "react";

// StyledComponent
import styled from "styled-components";

export default function StackData() {
  return (
    <Container>
      <TotalDiv style={{ backgroundColor: "#fff5d6" }}>
        <TitleText>장바구니에 가장 많은 카테고리(대)</TitleText>
        <ResultText style={{ color: "#fda700" }}>식품</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#ffe27f" }}>
        <TitleText>수량(개)</TitleText>
        <ResultText style={{ color: "#fda700" }}>231</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#c6f29a" }}>
        <TitleText>장바구니에 가장 많은 카테고리(소)</TitleText>
        <ResultText style={{ color: "#2daf43" }}>과자</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#9ce6a9" }}>
        <TitleText>수량(개)</TitleText>
        <ResultText style={{ color: "#2daf43" }}>31</ResultText>
      </TotalDiv>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 80%;
  padding: 0.5rem;
`;

const TotalDiv = styled.div`
  width: 90%;
  height: 24%;
  background-color: #fff5d6;
  padding: 1rem;
  margin: 0.3rem;
  border-radius: 1rem;
`;

const TitleText = styled.p`
  margin: 0;
  padding: 0;
  padding-bottom: 0.5rem;
`;

const ResultText = styled.p`
  margin: 0;
  padding: 0;
  text-align: end;
  font-weight: 1000;
  font-size: 2.2rem;
`;
