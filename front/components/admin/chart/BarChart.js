// React
import React from "react";

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const data = {
  labels,
  datasets: [
    {
      label: "매출액",
      data: [10, 30, 40, 30, 10, 60, 70],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

// StyledComponent
import styled from "styled-components";

export default function BarChart() {
  return (
    <Container>
      <Bar options={options} data={data} />
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
