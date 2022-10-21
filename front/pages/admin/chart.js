// React
import React from "react";

// StyledComponent
import styled from "styled-components";

// 하위 Component
// import LineChart from "../../components/admin/chart/LineChart";

export default function Chart() {
  return (
    <Container>
      <CategoryBox>
        <SmallChart></SmallChart>
        <SmallChart></SmallChart>
        <SmallChart></SmallChart>
        <SmallChart></SmallChart>
      </CategoryBox>
      <CategoryBox2>
        <LargeChart></LargeChart>
        <SmallCategoryBox>
          <SmallChart2 style={{ marginBottom: "1rem" }}></SmallChart2>
          <SmallChart2 style={{ marginTop: "1rem" }}></SmallChart2>
        </SmallCategoryBox>
      </CategoryBox2>
    </Container>
  );
}

const Container = styled.div`
  width: 85vw;
  height: 93vh;
  margin-left: 14.5rem;
  background-color: #aaaaaa;
`;

const CategoryBox = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;
const CategoryBox2 = styled.div`
  width: 100%;
  height: 66%;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;

const SmallCategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
  padding: 1rem;
`;

const LargeChart = styled.div`
  width: 74%;
  height: 94.5%;
  margin: 1rem;
  background-color: white;
`;

const SmallChart = styled.div`
  width: 25%;
  height: 100%;
  margin: 1rem;
  background-color: white;
`;

const SmallChart2 = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;
