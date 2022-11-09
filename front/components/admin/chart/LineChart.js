// React
import React, { useState, useEffect } from "react";

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// StyledComponent
import styled from "styled-components";
import { set } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
    },
  },
};

export default function LineChart({ lineChartData }) {
  const [lineLabel, setLineLabel] = useState("");
  const [lineData, setLineData] = useState("");
  const labels = lineLabel;
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: lineData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    if (lineChartData) {
      let templabel = [];
      let tempdata = [];
      for (let [key, value] of Object.entries(lineChartData)) {
        templabel.push(key.slice(5, 10));
        tempdata.push(value);
      }
      setLineLabel(templabel);
      setLineData(tempdata);
    }
  }, []);
  return lineChartData ? (
    <Container>
      <Line options={options} data={data} />
    </Container>
  ) : null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  padding: 1rem;
`;
