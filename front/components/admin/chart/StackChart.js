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
      text: "장바구니 그래프",
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

export default function StackChart({ stackChartData }) {
  const [stackLabel, setStackLabel] = useState("");
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const [data4, setData4] = useState("");
  const [data5, setData5] = useState("");

  const labels = stackLabel;

  const data = {
    labels,
    datasets: [
      {
        label: "소분류 1",
        data: data1,
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "소분류 2",
        data: data2,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "소분류 3",
        data: data3,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "소분류 4",
        data: data4,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "소분류 5",
        data: data5,
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };
  useEffect(() => {
    if (stackChartData) {
      let tempLabel = [];
      let count = 0;
      let tempData1 = [];
      let tempData2 = [];
      let tempData3 = [];
      let tempData4 = [];
      let tempData5 = [];
      for (let [key, value] of Object.entries(stackChartData)) {
        tempLabel.push(key);
        count += 1;
        if (count === 5) {
          setStackLabel(tempLabel);
        }
      }
      count = 0;
      for (let [key, value] of Object.entries(stackChartData)) {
        let stempLabel = [];
        for (let [skey, svalue] of Object.entries(value.smallCategories)) {
          if (key === tempLabel[0]) {
            tempData1.push(svalue);
          } else if (key === tempLabel[1]) {
            tempData2.push(svalue);
          } else if (key === tempLabel[2]) {
            tempData3.push(svalue);
          } else if (key === tempLabel[3]) {
            tempData4.push(svalue);
          } else if (key === tempLabel[4]) {
            tempData5.push(svalue);
          }
        }
      }

      while (tempData1.length < 5) {
        tempData1.push(0);
      }
      while (tempData2.length < 5) {
        tempData2.push(0);
      }
      while (tempData3.length < 5) {
        tempData3.push(0);
      }
      while (tempData4.length < 5) {
        tempData4.push(0);
      }
      while (tempData5.length < 5) {
        tempData5.push(0);
      }
      let dataset1;
      let dataset2;
      let dataset3;
      let dataset4;
      let dataset5;
      for (let i = 0; i < 5; i++) {
        let tempset = [];
        tempset.push(tempData1[i]);
        tempset.push(tempData2[i]);
        tempset.push(tempData3[i]);
        tempset.push(tempData4[i]);
        tempset.push(tempData5[i]);
        if (i === 0) {
          dataset1 = tempset;
        } else if (i === 1) {
          dataset2 = tempset;
        } else if (i === 2) {
          dataset3 = tempset;
        } else if (i === 3) {
          dataset4 = tempset;
        } else if (i === 4) {
          dataset5 = tempset;
        }
      }
      setData1(dataset1);
      setData2(dataset2);
      setData3(dataset3);
      setData4(dataset4);
      setData5(dataset5);
    }
  }, [stackChartData]);
  return stackChartData ? (
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
  padding: 1rem;
`;
