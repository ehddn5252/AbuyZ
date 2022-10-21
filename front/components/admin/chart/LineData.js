// React
import React, { useEffect } from "react";

// StyledComponent
import styled from "styled-components";

export default function BarChart() {
  useEffect(() => {});

  return (
    <Container>
      <TotalDiv style={{ backgroundColor: "#fff5d6" }}>
        <TitleText>총 매출액(원)</TitleText>
        <ResultText className="countNum" style={{ color: "#fda700" }}>
          1,300<span>K</span>
        </ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#ffe27f" }}>
        <TitleText>총 판매수량(개)</TitleText>
        <ResultText className="countNum" style={{ color: "#fda700" }}>
          102
        </ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#c6f29a" }}>
        <TitleText>총 기간(일)</TitleText>
        <ResultText className="countNum" style={{ color: "#2daf43" }}>
          70
        </ResultText>
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
