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
  const [label1, setlabel1] = useState("");
  const [label2, setlabel2] = useState("");
  const [label3, setlabel3] = useState("");
  const [label4, setlabel4] = useState("");
  const [label5, setlabel5] = useState("");

  const labels = ["식품", "의류", "가전제품", "전자기기", "뷰티"];

  const data = {
    labels,
    datasets: [
      {
        label: stackLabel[0],
        data: data1,
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: stackLabel[1],
        data: data2,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: stackLabel[2],
        data: data3,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: stackLabel[3],
        data: data4,
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: stackLabel[4],
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
        let stempLabel = [];
        tempLabel.push(key);
        let count2 = 0;
        for (let [skey, svalue] of Object.entries(value.smallCategories)) {
          stempLabel.push(skey);
          if (count2 === 0) {
            tempData1.push(svalue);
          } else if (count2 === 1) {
            tempData2.push(svalue);
          } else if (count2 === 2) {
            tempData3.push(svalue);
          } else if (count2 === 3) {
            tempData4.push(svalue);
          } else if (count2 === 4) {
            tempData5.push(svalue);
          }
          count2 += 1;
        }

        if (count === 0) {
          setlabel1(stempLabel);
        } else if (count === 1) {
          setlabel2(stempLabel);
        } else if (count === 2) {
          setlabel3(stempLabel);
        } else if (count === 3) {
          setlabel4(stempLabel);
        } else if (count === 4) {
          setlabel5(stempLabel);
        }
        count += 1;
        if (count === 5) {
          setStackLabel(tempLabel);
        }
      }
      console.log(tempData1, tempData2, tempData3, tempData4, tempData5);
      setData1(tempData1);
      setData2(tempData2);
      setData3(tempData3);
      setData4(tempData4);
      setData5(tempData5);
    }
  }, [stackChartData]);
  console.log(stackLabel);
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
