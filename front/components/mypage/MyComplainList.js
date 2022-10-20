// React
import React, { useState, useEffect } from "react";

// MUI
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import MyComplainItem from "./MyComplainItem";

export default function MyComplainList() {
  const [complainList, setComplainList] = useState([
    {
      title: "제주 햇 감귤을 샀는데 경기도 하우스 귤이 왔어요",
      content: "내용",
      state: true,
    },
    {
      title: "제주 햇 감귤을 샀는데 경기도 하우스 귤이 왔어다니깐요",
      content: "내용",
      state: false,
    },
  ]); // eslint-disable-line no-unused-vars
  // const [complainList, setComplainList] = useState([]);
  useEffect(() => {
    setComplainList([
      {
        title: "제주 햇 감귤을 샀는데 경기도 하우스 귤이 왔어요",
        content: "내용",
        state: true,
      },
      {
        title: "제주 햇 감귤을 샀는데 경기도 하우스 귤이 왔어다니깐요",
        content: "내용",
        state: false,
      },
    ]);
  }, []);

  return (
    <MyComplainContainer>
      <MajorTitle>문의 내역</MajorTitle>
      <hr
        style={{
          height: "0.5rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />
      {complainList.length ? (
        <ComplainListBox>
          <MyComplainItem complain={complainList[0]} />
          <MyComplainItem complain={complainList[1]} />
        </ComplainListBox>
      ) : (
        <BlankBox>
          <QuizOutlinedIcon sx={{ fontSize: "6rem" }} />
          <p>문의하신 내역이 없습니다</p>
        </BlankBox>
      )}
    </MyComplainContainer>
  );
}

const MyComplainContainer = styled.div`
  margin-top: 10rem;
  width: 100%;
`;

const MajorTitle = styled.h1`
  font-size: 2rem;
`;

const ComplainListBox = styled.div`
  margin-top: 3rem;
`;

const BlankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  font-size: 3rem;
  font-weight: bolder;
  color: #aaaaaa;
`;
