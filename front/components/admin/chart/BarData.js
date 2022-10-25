// React
import React from "react";

// StyledComponent
import styled from "styled-components";

export default function BarData() {
  return (
    <Container>
      <TotalDiv style={{ backgroundColor: "#fff5d6" }}>
        <TitleText>제일 잘 팔리는 요일</TitleText>
        <ResultText style={{ color: "#fda700" }}>일요일</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#ffe27f" }}>
        <TitleText>최고 금액(원)</TitleText>
        <ResultText style={{ color: "#fda700" }}>12,110K</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#c6f29a" }}>
        <TitleText>제일 안 팔리는 요일</TitleText>
        <ResultText style={{ color: "#2daf43" }}>화요일</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#9ce6a9" }}>
        <TitleText>최저 금액(원)</TitleText>
        <ResultText style={{ color: "#2daf43" }}>3,400K</ResultText>
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
  padding-bottom: 1.2rem;
`;

const ResultText = styled.p`
  margin: 0;
  padding: 0;
  text-align: end;
  font-weight: 1000;
  font-size: 2.2rem;
`;
