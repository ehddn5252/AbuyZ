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
    console.log(res.data);
    setComplainList(res.data);
  };
  const [selected, setSelected] = useState(-1);

  const handleClick = (idx) => {
    if (selected === idx) {
      setSelected(-1);
    } else {
      setSelected(idx);
    }
  };
  useEffect(() => {
    ccomplain();
  }, []);

  return (
    <MyComplainContainer>
      <MajorTitle>문의 내역</MajorTitle>
      <Hr />

      {complainList ? (
        <ComplainListBox>
          {complainList.map((e, idx) => (
            <div onClick={() => handleClick(idx)}>
              <MyComplainItem
                key={idx}
                complain={e}
                idx={idx}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          ))}
        </ComplainListBox>
      ) : (
        <BlankBox>
          <QuizOutlinedIcon
            sx={{ fontSize: "4rem", color: "rgb(86, 169, 241,0.7)" }}
          />
          <NoComplain>문의하신 내역이 없습니다</NoComplain>
        </BlankBox>
      )}
    </MyComplainContainer>
  );
}

const MyComplainContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  min-height: 80vh;
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

const Hr = styled.hr`
  height: 0.3rem;
  background: #7895b2;
  border-radius: 1rem;
`;

const NoComplain = styled.p`
  font-size: 2rem;
  color: rgb(86, 169, 241, 0.7);
`;
