import React, { useState, useEffect } from "react";
import {
  getDashboardTodo,
  getDashboardDaily,
} from "../../../pages/api/dashboard";

// MUI
import Grid from "@mui/material/Grid";

// StyledComponent
import styled from "styled-components";

export default function DataStatus() {
  // 오늘의 할일
  const [todos, setTodos] = useState({
    noReplyNum: 0,
    newReviewNum: 0,
    watiNum: 0,
    reportReviewNum: 0,
    inventoryCount0num: 0,
    statusNum: 0,
  });
  // 일자별 요약
  const [daily, setDaily] = useState([
    {
      date: "",
      visitMainNum: 0,
      clickLikeNum: 0,
      totalPrice: 0,
      orderNum: 0,
      loginNum: 0,
      putCartNum: 0,
      registerNum: 0,
    },
  ]);

  const loadData = async () => {
    const res = await getDashboardTodo();
    setTodos(res.data);
    const res2 = await getDashboardDaily();
    setDaily(res2.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const dataList = daily.map((e) => (
    <TableRow key={e.id}>
      <td style={{ textAlign: "center" }}>{e.date.slice(0, 10)}</td>
      <td style={{ textAlign: "center" }}>{e.orderNum}</td>
      <td style={{ textAlign: "center" }}>{e.totalPrice}</td>
      <td style={{ textAlign: "center" }}>{e.visitMainNum}</td>
      <td style={{ textAlign: "center" }}>{e.registerNum}</td>
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
