// React
import React, { useState, useEffect } from "react";

// StyledComponent
import styled from "styled-components";

export default function StackData({ stackChartData }) {
  const [bestBigCategory, setBestBigCategory] = useState("");
  const [bestValue, setBestValue] = useState("");
  const [bestSmallCategory, setBestSmallCategory] = useState("");
  const [bestSmallValue, setBestSmallValue] = useState("");

  useEffect(() => {
    let bestCategory;
    let bestValue = 0;
    let bestCatergory2;
    let bestValue2 = 0;
    if (stackChartData) {
      let count = 0;
      for (let [key, value] of Object.entries(stackChartData)) {
        // 초기값 설정
        if (count === 0) {
          bestValue = value.totalCount;
          bestCategory = key;
        } else {
          if (value.totalCount > bestValue) {
            bestValue = value.totalCount;
            bestCategory = key;
          }
        }
        count += 1;
      }
    }

    if (stackChartData) {
      for (let [key, value] of Object.entries(stackChartData)) {
        let count3 = 0;
        if (key === bestCategory) {
          let temp = value;
          for (let [key, value] of Object.entries(temp.smallCategories)) {
            if (count3 === 0) {
              bestValue2 = value;
              bestCatergory2 = key;
            } else {
              if (value > bestValue2) {
                bestValue2 = value;
                bestCatergory2 = key;
              }
            }
            count3 += 1;
          }
        }
      }
    }

    setBestBigCategory(bestCategory);
    setBestValue(bestValue);
    setBestSmallCategory(bestCatergory2);
    setBestSmallValue(bestValue2);
  }, []);
  return (
    <Container>
      <TotalDiv style={{ backgroundColor: "#fff5d6" }}>
        <TitleText>장바구니에 가장 많은 카테고리(대)</TitleText>
        <ResultText style={{ color: "#fda700" }}>{bestBigCategory}</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#ffe27f" }}>
        <TitleText>수량(개)</TitleText>
        <ResultText style={{ color: "#fda700" }}>{bestValue}</ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#c6f29a" }}>
        <TitleText>장바구니에 가장 많은 카테고리(소)</TitleText>
        <ResultText style={{ color: "#2daf43" }}>
          {bestSmallCategory}
        </ResultText>
      </TotalDiv>
      <TotalDiv style={{ backgroundColor: "#9ce6a9" }}>
        <TitleText>수량(개)</TitleText>
        <ResultText style={{ color: "#2daf43" }}>{bestSmallValue}</ResultText>
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
  height: 30%;
  background-color: #fff5d6;
  padding: 1rem;
  margin: 0.2rem;
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
  font-size: 2rem;
`;
