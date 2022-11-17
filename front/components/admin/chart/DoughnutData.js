// React
import React, { useState, useEffect } from "react";

// StyledComponent
import styled from "styled-components";

export default function DoughnutData({ doughnutChartData }) {
  const [bestBigCategory, setBestBigCategory] = useState("");
  const [bestValue, setBestValue] = useState("");
  const [bestSmallCategory, setBestSmallCategory] = useState("");

  useEffect(() => {
    let bestCategory;
    let bestValue = 0;
    let bestCatergory2;
    let bestValue2 = 0;
    if (doughnutChartData) {
      for (let [key, value] of Object.entries(doughnutChartData)) {
        if (value.total_sales > bestValue) {
          bestValue = value.total_sales;
          bestCategory = key;
        }
      }
      for (let [key, value] of Object.entries(doughnutChartData)) {
        if (key === bestCategory) {
          let temp = value;
          for (let [key, value] of Object.entries(temp.small_category)) {
            if (value.total_sales > bestValue2) {
              bestValue2 = value.total_sales;
              bestCatergory2 = key;
            }
          }
        }
      }
    }
    setBestBigCategory(bestCategory);
    setBestValue(bestValue);
    setBestSmallCategory(bestCatergory2);
  }, []);
  return (
    <Container>
      <TotalDiv style={{ backgroundColor: "#fff5d6" }}>
        <TitleText>제일 인기있는 카테고리(대)</TitleText>
        <ResultText style={{ color: "#fda700" }}>{bestBigCategory}</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#ffe27f" }}>
        <TitleText>제일 인기있는 카테고리(소)</TitleText>
        <ResultText style={{ color: "#fda700" }}>
          {bestSmallCategory}
        </ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#c6f29a" }}>
        <TitleText>인기 카테고리 매출액</TitleText>
        <ResultText style={{ color: "#2daf43" }}>
          {(bestValue / 1000).toLocaleString("ko-KR")}K
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
  height: 35%;
  background-color: #fff5d6;
  padding: 1rem;
  margin: 0.5rem;
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
