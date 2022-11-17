// React
import React, { useState, useEffect } from "react";

// StyledComponent
import styled from "styled-components";

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
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["식품", "의류", "가전제품", "전자기기", "뷰티"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [30, 20, 10, 2, 50],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [10, 20, 50, 2, 10],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Dataset 3",
      data: [10, 50, 1, 20, 0],
      backgroundColor: "rgb(53, 162, 235)",
    },
    {
      label: "Dataset 2",
      data: [5, 5, 5, 5, 5],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Dataset 3",
      data: [10, 10, 10, 52, 10],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

export default function StackChart({ stackChartData }) {
  const [stackLabel, setStackLabel] = useState("");
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const [data4, setData4] = useState("");
  const [data5, setData5] = useState("");

  useEffect(() => {
    console.log(stackChartData);
  }, [stackChartData]);
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
  padding: 1rem;
`;
