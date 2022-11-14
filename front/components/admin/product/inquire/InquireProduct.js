import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

// API
import {
  inquireProduct,
  inquireProductStatusCount,
} from "../../../../pages/api/product";

// 컴포넌트
import InquireList from "./InquireList";
import SearchWord from "./SearchWord";
import SaleStatus from "./SaleStatus";
import Category from "./Category";
import Period from "./Period";

// mui
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HourglassBottomOutlined from "@mui/icons-material/HourglassBottomOutlined";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function SaleProductSearch() {
  // 상태값
  // 전체
  const [total, setTotal] = useState(0);

  // 판매 중
  const [selling, setSelling] = useState(0);

  // 판매완료
  const [soldOut, setSoldOut] = useState(0);

  // 상품 상태 값 들고오기
  useEffect(() => {
    getProductStatusCount();
  }, []);

  // 들고오는 함수
  const getProductStatusCount = async () => {
    const psc1 = await inquireProductStatusCount("selling");
    const psc2 = await inquireProductStatusCount("sold_out");

    setTotal(psc1 + psc2);
    setSelling(psc1);
    setSoldOut(psc2);
  };

  // 상품 검색 키워드
  // 상품 전체 목록
  const [productInfo, setProductInfo] = useState([]);

  // 카테고리
  // 대분류
  const [bigCategory, setBigCategory] = useState("");

  // 소분류
  const [smallCategory, setSmallCategory] = useState("");

  // 검색어
  // 상품명
  const [name, setName] = useState("");

  // 브랜드명
  const [brandName, setBrandName] = useState("");

  // 키워드
  const [keyword, setKeyword] = useState("");

  // 판매상태
  // 전체 : 0, 판매중 : 1, 승인대기 : 2, 판매완료 : 3
  const [checkStatus, setCheckStatus] = useState(0);

  // 기간
  // 시작일
  const [startDate, setStartDate] = useState(new Date());

  // 마감일
  const [endDate, setEndDate] = useState(new Date());

  // 리셋
  const [reset, setReset] = useState(0);

  const getProduct = async () => {
    const p = await inquireProduct();
    const tmp = [];
    for (let i = 0; i < p.length; i++) {
      // 대분류 카테고리
      if (p[i].bigCategoryName === bigCategory || bigCategory === "") {
        // 소분류 카테고리
        if (p[i].smallCategoryName === smallCategory || smallCategory === "") {
          // 상품명
          if (p[i].name.includes(name) === true || name === "") {
            // 브랜드명
            if (
              p[i].brandName.includes(brandName) === true ||
              brandName === ""
            ) {
              // 키워드
              if (
                p[i].productKeywords.includes(keyword) === true ||
                keyword === ""
              ) {
                // 날짜
                if (
                  moment(startDate).format().slice(0, 10) ==
                    moment(endDate).format().slice(0, 10) ||
                  (moment(startDate).format().slice(0, 10) <=
                    p[i].date.slice(0, 10) &&
                    p[i].date.slice(0, 10) <=
                      moment(endDate).format().slice(0, 10))
                ) {
                  // 판매상태
                  // 전체
                  if (checkStatus === 0) {
                    // p[i].count = getInventory(p[i].uid);
                    tmp.push(p[i]);
                  }
                  // 판매중
                  else if (
                    checkStatus === 1 &&
                    p[i].status.toLowerCase() === "selling"
                  ) {
                    tmp.push(p[i]);
                  }
                  // 승인대기
                  else if (
                    checkStatus === 2 &&
                    p[i].status.toLowerCase() === "getting_ready"
                  ) {
                    tmp.push(p[i]);
                  }
                  // 판매완료
                  else if (
                    checkStatus === 3 &&
                    p[i].status.toLowerCase() === "sold_out"
                  ) {
                    tmp.push(p[i]);
                  }
                }
              }
            }
          }
        }
      }
    }
    setProductInfo(tmp);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Grid2 container spacing={2} sx={{ padding: "0", margin: "0" }}>
      <Grid2 xs={12} sx={{ padding: "0", margin: "0" }}>
        {/* 현재 상태 */}
        <StatusContainer>
          {/* 전체 */}
          <StatusBox>
            <WidgetsOutlinedIcon
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
              <SearchTitle>전체</SearchTitle>
              <StatusCount>{total}건</StatusCount>
            </Status>
          </StatusBox>
          {/* 판매중 */}
          <StatusBox>
            <ShoppingCartOutlinedIcon
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
              <SearchTitle>판매중</SearchTitle>
              <StatusCount>{selling}건</StatusCount>
            </Status>
          </StatusBox>
          {/* 판매완료 */}
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
              <SearchTitle>판매완료</SearchTitle>
              <StatusCount>{soldOut}건</StatusCount>
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
        <Category
          setBigCategory={setBigCategory}
          setSmallCategory={setSmallCategory}
          reset={reset}
        />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 검색어 */}
        <SearchWord
          setName={setName}
          setBrandName={setBrandName}
          setKeyword={setKeyword}
          reset={reset}
        />
        <hr style={{ background: "#ff9494", width: "100%", margin: "0" }} />
        {/* 판매상태 */}
        <SaleStatus
          checkStatus={checkStatus}
          setCheckStatus={setCheckStatus}
          reset={reset}
        />
        <hr style={{ background: "#ff9494", width: "100%", margin: "0" }} />
        {/* 기간 */}
        <Period
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          reset={reset}
        />
        <hr style={{ background: "#ff9494", width: "100%", margin: "0" }} />
        <ButtonBox>
          <ResetButton onClick={() => setReset(reset + 1)}>초기화</ResetButton>
          <SearchButton onClick={() => getProduct()}>검색</SearchButton>
        </ButtonBox>
      </Grid2>
      {/* 상품 목록 */}
      <InquireList productInfo={productInfo} />
    </Grid2>
  );
}

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
  margin-bottom: 0;
`;

const StatusCount = styled.p`
  font-size: 1.3rem;
  font-weight: 1000;
  margin-top: 0;
  margin-bottom: 1rem;
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
  margin-left: 1rem;
  height: 3rem;
  width: 7rem;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;
