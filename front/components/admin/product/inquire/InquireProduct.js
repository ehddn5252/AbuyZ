import { Container } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import InquireList from "./InquireList";
import { ContainerBox } from "../addEdit/SaleProductCategory";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import SearchWord from "./SearchWord";
import SaleStatus from "./SaleStatus";
import Category from "./Category";
import Period from "./Period";

export default function SaleProductSearch() {
  const status = [
    [WidgetsOutlinedIcon, "전체", 3],
    [ShoppingCartOutlinedIcon, "판매중", 2],
    [TaskAltOutlinedIcon, "판매완료", 1],
  ];

  return (
    <Container>
      <Title>상품 조회</Title>
      <ContainerBox>
        {/* 현재 상태 */}
        <StatusContainer>
          <StatusBox>
            <WidgetsOutlinedIcon
              sx={{
                margin: "2rem",
                marginRight: "1rem",
                fontSize: "3.5rem",
                color: "#ffffff",
                background: "#ff9494",
                borderRadius: "50%",
                padding: "0.5rem",
              }}
            />
            <Status>
              <SearchTitle>{status[0][1]}</SearchTitle>
              <StatusCount>{status[0][2]}건</StatusCount>
            </Status>
          </StatusBox>
          <StatusBox>
            <ShoppingCartOutlinedIcon
              sx={{
                margin: "2rem",
                marginRight: "1rem",
                fontSize: "3.5rem",
                color: "#ffffff",
                background: "#ff9494",
                borderRadius: "50%",
                padding: "0.5rem",
              }}
            />
            <Status>
              <SearchTitle>{status[1][1]}</SearchTitle>
              <StatusCount>{status[1][2]}건</StatusCount>
            </Status>
          </StatusBox>
          <StatusBox>
            <TaskAltOutlinedIcon
              sx={{
                margin: "2rem",
                marginRight: "1rem",
                fontSize: "3.5rem",
                color: "#ffffff",
                background: "#ff9494",
                borderRadius: "50%",
                padding: "0.5rem",
              }}
            />
            <Status>
              <SearchTitle>{status[2][1]}</SearchTitle>
              <StatusCount>{status[2][2]}건</StatusCount>
            </Status>
          </StatusBox>
        </StatusContainer>
        <hr style={{ background: "#ff9494", width: "95%" }}></hr>
        {/* 검색어 */}
        <SearchWord />
        <hr style={{ background: "#ff9494", width: "95%" }}></hr>
        {/* 판매상태 */}
        <SaleStatus />
        <hr style={{ background: "#ff9494", width: "95%" }}></hr>
        {/* 카테고리 */}
        <Category />
        <hr style={{ background: "#ff9494", width: "95%" }}></hr>
        {/* 기간 */}
        <Period />
        <hr style={{ background: "#ff9494", width: "95%" }}></hr>
        <ButtonBox>
          <ResetButton>초기화</ResetButton>
          <SearchButton>검색</SearchButton>
        </ButtonBox>
      </ContainerBox>
      {/* 상품 목록 */}
      <InquireList />
    </Container>
  );
}

const Title = styled.p`
  font-size: xxx-large;
  font-weight: 1000;
  padding-bottom: 3rem;
  margin: 0;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StatusBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SearchTitle = styled.p`
  font-size: 2.5rem;
  font-weight: 1000;
  margin-bottom: 1rem;
`;

const StatusCount = styled.p`
  font-size: 2rem;
  font-weight: 1000;
  margin-top: 0;
  /* padding-left: 1.5rem; */
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ResetButton = styled.button`
  background-color: #ffffff;
  color: gray;
  border: 1px solid;
  border-radius: 0.8rem;
  height: 3rem;
  width: 5rem;
  font-size: 1.3rem;
`;

const SearchButton = styled.button`
  background-color: #ff7171;
  color: white;
  border: 1px solid;
  border-radius: 0.8rem;
  margin-left: 1rem;
  height: 3rem;
  width: 7rem;
  font-size: 1.5rem;
`;
