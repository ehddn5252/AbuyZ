// React
import React, { useState, useEffect } from "react";

// MUI
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

// StyledComponents
import styled from "styled-components";
import { mycenter } from "../../pages/api/customercenter";
// 하위 Components
import MyComplainItem from "./MyComplainItem";

export default function MyComplainList() {
  const [complainList, setComplainList] = useState([]);
  const ccomplain = async () => {
    const res = await mycenter();
    res.data.sort((a, b) => b.uid - a.uid);
    // console.log(res.data);
    setComplainList(res.data);
  };
  useEffect(() => {
    ccomplain();
  }, []);

  return (
    <MyComplainContainer>
      <MajorTitle>문의 내역</MajorTitle>
      <hr
        style={{
          height: "0.3rem",
          background: "#7895b2",
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
          <QuizOutlinedIcon
            sx={{ fontSize: "4rem", color: "rgb(86, 169, 241,0.7)" }}
          />
          <p style={{ fontSize: "2rem", color: "rgb(86, 169, 241,0.7)" }}>
            문의하신 내역이 없습니다
          </p>
        </BlankBox>
      )}
    </MyComplainContainer>
  );
}

const MyComplainContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  height: 50rem;
  width: 56rem;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;

const ComplainListBox = styled.div`
  margin-top: 1rem;
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
