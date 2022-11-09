// React
import React, { useEffect, useState } from "react";

// Chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// StyledComponent
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

export default function DoughnutChart({ doughnutChartData }) {
  const [bigData, setBigData] = useState("");
  const [smallData, setSmaillData] = useState("");
  const [bigLabel, setBigLabel] = useState("");
  const [smallLabel, setSmallLabel] = useState("");

  useEffect(() => {
    let tempBigLabel = [];
    let tempSmallLabel = [];
    let tempBigData = [];
    let tempSmallData = [];
    let bestCategory;
    let bestValue = 0;
    if (doughnutChartData) {
      for (let [key, value] of Object.entries(doughnutChartData)) {
        tempBigLabel.push(key);
        tempBigData.push(value.total_sales);
        if (value.total_sales > bestValue) {
          bestValue = value.total_sales;
          bestCategory = key;
        }
      }
      for (let [key, value] of Object.entries(doughnutChartData)) {
        if (key === bestCategory) {
          let temp = value;
          for (let [key, value] of Object.entries(temp.small_category)) {
            tempSmallLabel.push(key);
            tempSmallData.push(value.total_sales);
          }
        }
      }
    }
    setBigData(tempBigData);
    setSmaillData(tempSmallData);
    setBigLabel(tempBigLabel);
    setSmallLabel(tempBigLabel);
  }, []);

  const data1 = {
    labels: bigLabel,
    datasets: [
      {
        label: "# of Votes",
        data: bigData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: smallLabel,
    datasets: [
      {
        label: "# of Votes",
        data: smallData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data = {
    labels: ["가구, 인테리어", "생활, 건강", "Yellow", "Green", "Purple"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return doughnutChartData ? (
    <Container>
      <Doughnut data={data1} options={options} style={{ padding: "1rem" }} />
      <Doughnut data={data2} options={options} style={{ padding: "1rem" }} />
    </Container>
  ) : null;
}

const Container = styled.div`
  display: flex;
  width: 50%;
  height: 30%;
  padding: 1rem;
`;
