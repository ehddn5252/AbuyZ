import React, { useState, useEffect } from "react";
import { getDashboardTodo } from "../../../pages/api/dashboard";

// MUI
import Grid from "@mui/material/Grid";

// StyledComponent
import styled from "styled-components";

export default function DataStatus() {
  const [todos, setTodos] = useState({
    noReplyNum: 0,
    newReviewNum: 0,
    watiNum: 0,
    reportReviewNum: 0,
    inventoryCount0num: 0,
    statusNum: 0,
  });

  const loadData = async () => {
    const res = await getDashboardTodo();
    // console.log("test");
    // console.log(res.data);
    setTodos(res.data);
    console.log(todos);
  };
  useEffect(() => {
    loadData();
  }, []);

  const datas = [
    {
      id: 0,
      date: "2022.10.24",
      orderCount: 3,
      dailyPrice: "13,000",
      visitor: "3",
      subscriber: "1",
    },
    {
      id: 1,
      date: "2022.10.23",
      orderCount: 1,
      dailyPrice: "133,000",
      visitor: "45",
      subscriber: "1",
    },
    {
      id: 2,
      date: "2022.10.22",
      orderCount: 4,
      dailyPrice: "23,000",
      visitor: "12",
      subscriber: "1",
    },
    {
      id: 3,
      date: "2022.10.21",
      orderCount: 7,
      dailyPrice: "15,000",
      visitor: "73",
      subscriber: "1",
    },
    {
      id: 4,
      date: "2022.10.20",
      orderCount: 6,
      dailyPrice: "18,000",
      visitor: "31",
      subscriber: "0",
    },
  ];
  const dataList = datas.map((e) => (
    <TableRow key={e.id}>
      <td style={{ textAlign: "center" }}>{e.date}</td>
      <td style={{ textAlign: "center" }}>{e.orderCount}</td>
      <td style={{ textAlign: "center" }}>{e.dailyPrice}</td>
      <td style={{ textAlign: "center" }}>{e.visitor}</td>
      <td style={{ textAlign: "center" }}>{e.subscriber}</td>
    </TableRow>
  ));
  return (
    <BoxContainer>
      <TodayBox>
        <h1 style={{ marginLeft: "1rem" }}>오늘의 할 일</h1>
        <hr />
        <TodayContentBox container>
          <TodayDiv item xs={4}>
            <TodayTitle>승인대기중인 상품</TodayTitle>
            <TodayContent>{todos.waitNum}</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>답변대기중인 문의</TodayTitle>
            <TodayContent>{todos.noReplyNum}</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>신고 리뷰</TodayTitle>
            <TodayContent>{todos.reportReviewNum}</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>교환/환불</TodayTitle>
            <TodayContent>{todos.statusNum}</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>신규 리뷰</TodayTitle>
            <TodayContent>{todos.newReviewNum}</TodayContent>
          </TodayDiv>
          <TodayDiv item xs={4}>
            <TodayTitle>품절 상품</TodayTitle>
            <TodayContent>{todos.inventoryCount0num}</TodayContent>
          </TodayDiv>
        </TodayContentBox>
      </TodayBox>
      <DailyBox>
        <h1 style={{ marginLeft: "1rem" }}>일자별 요약</h1>
        <hr />
        <DailyTable>
          <thead>
            <tr>
              <th>일자</th>
              <th>주문수(개)</th>
              <th>매출액(원)</th>
              <th>방문자(명)</th>
              <th>가입수(명)</th>
            </tr>
          </thead>
          <tbody>{dataList}</tbody>
        </DailyTable>
      </DailyBox>
    </BoxContainer>
  );
}

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const TodayBox = styled.div`
  width: 100%;
  height: 15rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  background-color: white;
`;

const DailyBox = styled.div`
  width: 100%;
  height: 29rem;
  /* padding: 0.5rem; */
  background-color: white;
`;

const TodayContentBox = styled(Grid)`
  width: 100%;
`;

const TodayDiv = styled(Grid)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4.2rem;
`;

const TodayTitle = styled.p`
  width: 60%;
  padding-left: 1.5rem;
  font-weight: bold;
`;

const TodayContent = styled.p`
  width: 40%;
  padding-left: 1.5rem;
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DailyTable = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  height: 4rem;
`;
