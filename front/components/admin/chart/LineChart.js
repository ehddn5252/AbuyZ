// React
import React from "react";

// Chart
import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";

// StyledComponent
import styled from "styled-components";
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "매출액",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "black",
    },
  ],
};

export default function LineChart() {
  return (
    <Container>
      <h1>총 매출액</h1>
      <Line data={data} width="1000" height="11000" />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
