// React
import React from "react";

// Chart

// StyledComponent
import styled from "styled-components";

export default function DataChart() {
  return (
    <Container>
      <ChartTitle>데이터 표</ChartTitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  padding: 1rem;
`;

const ChartTitle = styled.div`
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 1000;
`;
