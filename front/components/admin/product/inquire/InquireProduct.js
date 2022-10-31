import { Container } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

// 컴포넌트
import InquireList from "./InquireList";
import { ContainerBox } from "../addEdit/AddEditCategory";
import SearchWord from "./SearchWord";
import SaleStatus from "./SaleStatus";
import Category from "./Category";
import Period from "./Period";

// mui
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HourglassBottomOutlined from "@mui/icons-material/HourglassBottomOutlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function SaleProductSearch() {
  const status = [
    [WidgetsOutlinedIcon, "전체", 3],
    [ShoppingCartOutlinedIcon, "판매중", 2],
    [HourglassBottomOutlined, "승인 대기", 4],
    [ProductionQuantityLimitsOutlined, "교환/환불", 3],
    [TaskAltOutlinedIcon, "판매완료", 1],
  ];

  return (
    <Grid2 container spacing={2} sx={{ padding: "0", margin: "0" }}>
      <Grid2 xs={12} sx={{ padding: "0", margin: "0" }}>
        {/* 현재 상태 */}
        <StatusContainer>
          <StatusBox>
            <WidgetsOutlinedIcon
              sx={{
                // margin: "2rem",
                marginRight: "1rem",
                fontSize: "3.5rem",
                color: "#3B7CBE",
                // background: "#3B7CBE",
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
                // margin: "2rem",
                marginRight: "1rem",
                fontSize: "3.5rem",
                color: "#3B7CBE",
                // background: "#3B7CBE",
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
            <HourglassBottomOutlined
              sx={{
                // margin: "2rem",
                marginRight: "1rem",
                fontSize: "3.5rem",
                color: "#3B7CBE",
                // background: "#3B7CBE",
                borderRadius: "50%",
                padding: "0.5rem",
              }}
            />
            <Status>
              <SearchTitle>{status[2][1]}</SearchTitle>
              <StatusCount>{status[2][2]}건</StatusCount>
            </Status>
          </StatusBox>
          <StatusBox>
            <ProductionQuantityLimitsOutlined
              sx={{
                // margin: "2rem",
                marginRight: "1rem",
                fontSize: "3.5rem",
                color: "#ffffff",
                background: "#3B7CBE",
                borderRadius: "50%",
                padding: "0.5rem",
              }}
            />
            <Status>
              <SearchTitle>{status[3][1]}</SearchTitle>
              <StatusCount>{status[3][2]}건</StatusCount>
            </Status>
          </StatusBox>
          <StatusBox>
            <TaskAltOutlinedIcon
              sx={{
                // margin: "2rem",
                marginRight: "1rem",
                fontSize: "3.5rem",
                color: "#ffffff",
                background: "#3B7CBE",
                borderRadius: "50%",
                padding: "0.5rem",
              }}
            />
            <Status>
              <SearchTitle>{status[4][1]}</SearchTitle>
              <StatusCount>{status[4][2]}건</StatusCount>
            </Status>
          </StatusBox>
        </StatusContainer>
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          marginTop: "2rem",
          background: "white",
          padding: "0",
        }}
      >
        {/* 카테고리 */}
        <Category />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 검색어 */}
        <SearchWord />
        <hr style={{ background: "#ff9494", width: "100%", margin: "0" }} />
        {/* 판매상태 */}
        <SaleStatus />
        <hr style={{ background: "#ff9494", width: "100%", margin: "0" }} />
        {/* 기간 */}
        <Period />
        <hr style={{ background: "#ff9494", width: "100%", margin: "0" }} />
        <ButtonBox>
          <ResetButton>초기화</ResetButton>
          <SearchButton>검색</SearchButton>
        </ButtonBox>
      </Grid2>
      {/* 상품 목록 */}
      <InquireList />
    </Grid2>
  );
}

// const Title = styled.p`
//   font-size: xx-large;
//   font-weight: 800;
//   padding-bottom: 3rem;
//   margin: 3rem;
//   margin-bottom: 0;
// `;

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: white;
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
  font-size: 1.5rem;
  font-weight: 800;
  /* margin-bottom: 1rem; */
  margin-bottom: 0;
`;

const StatusCount = styled.p`
  font-size: 1.3rem;
  font-weight: 1000;
  margin-top: 0;
  margin-bottom: 1rem;
  /* padding-left: 1.5rem; */
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

const ResetButton = styled.button`
  background-color: #ffffff;
  color: black;
  border: 1px solid;
  /* border-radius: 0.8rem; */
  height: 3rem;
  width: 6rem;
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const SearchButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  /* border-radius: 0.8rem; */
  margin-left: 1rem;
  height: 3rem;
  width: 7rem;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;
