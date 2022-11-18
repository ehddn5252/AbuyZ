// React
import React, { useState, useEffect } from "react";

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

// StyledComponent
import styled from "styled-components";

export default function BarChart({ barChartData }) {
  const [barData, setBarData] = useState(null);
  const labels = ["월", "화", "수", "목", "금", "토", "일"];
  const data = {
    labels,
    datasets: [
      {
        label: "매출액",
        data: barData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    let tempdata = [0, 0, 0, 0, 0, 0, 0];
    if (barChartData) {
      for (let [key, value] of Object.entries(barChartData)) {
        if (key === "MONDAY") {
          tempdata[0] = value;
        } else if (key === "TUESDAY") {
          tempdata[1] = value;
        } else if (key === "WEDNESDAY") {
          tempdata[2] = value;
        } else if (key === "TUESDAY") {
          tempdata[3] = value;
        } else if (key === "FRIDAY") {
          tempdata[4] = value;
        } else if (key === "SATURDAY") {
          tempdata[5] = value;
        } else if (key === "SUNDAY") {
          tempdata[6] = value;
        }
      }
      setBarData(tempdata);
    }
  }, [barChartData]);
  return barChartData ? (
    <Container>
      <Bar options={options} data={data} />
    </Container>
  ) : null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 80%;
  padding: 0.5rem;
`;
