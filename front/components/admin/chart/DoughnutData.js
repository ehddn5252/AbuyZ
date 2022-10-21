// React
import React from "react";

// StyledComponent
import styled from "styled-components";

export default function DoughnutData() {
  return (
    <Container>
      <TotalDiv style={{ backgroundColor: "#fff5d6" }}>
        <TitleText>제일 인기있는 카테고리(대)</TitleText>
        <ResultText style={{ color: "#fda700" }}>식품</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#ffe27f" }}>
        <TitleText>제일 인기있는 카테고리(소)</TitleText>
        <ResultText style={{ color: "#fda700" }}>디저트</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#c6f29a" }}>
        <TitleText>인기 카테고리 매출액</TitleText>
        <ResultText style={{ color: "#2daf43" }}>9,300K</ResultText>
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
  height: 33%;
  background-color: #fff5d6;
  padding: 1rem;
  margin: 0.3rem;
  border-radius: 1rem;
`;

const TitleText = styled.p`
  margin: 0;
  padding: 0;
  padding-bottom: 1.2rem;
`;

const ResultText = styled.p`
  margin: 0;
  padding: 0;
  text-align: end;
  font-weight: 1000;
  font-size: 2.5rem;
`;
