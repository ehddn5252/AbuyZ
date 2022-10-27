import React from "react";
import styled from "styled-components";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
// import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function InquireList() {
  const header = [
    "checkbox",
    "수정",
    "판매상태",
    "대분류",
    "소분류",
    "상품명",
    "할인율",
    "판매가",
    "재고수량",
    "브랜드",
    "키워드",
    "메타태그",
    "배송비",
  ];

  const body = [
    {
      id: 0,
      saleStatus: "판매중",
      bigCategory: "생활/건강",
      smallCategory: "의류",
      name: "나이키 청바지",
      discount: 15,
      price: 50000,
      stock: 50,
      brand: "나이키",
      keyword: "가성비, 청바지, 바지",
      metaTag: "나이키, 바지",
      delivery: 300,
    },
  ];

  return (
    <Grid2
      xs={12}
      sx={{
        margin: "0",
        marginTop: "2rem",
        background: "white",
        padding: "0",
      }}
    >
      <h2 style={{ paddingLeft: "2rem" }}>검색 목록</h2>
      <hr style={{ background: "#ff9494", width: "95%" }} />
      <div
        style={{
          width: "100%",
          paddingTop: "1rem",
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <CancelButton>선택삭제</CancelButton>
        <SaveButton>수정항목 저장</SaveButton>
      </div>
      <div
        style={{
          height: 500,
          width: "90%",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          paddingBottom: "2rem",
          border: "1px solid black",
          marginBottom: "3rem",
        }}
      >
        <TableContainer>
          <thead>
            <TableRow>
              {header.map((e, idx) => (
                <Th key={idx}>{e}</Th>
              ))}
            </TableRow>
          </thead>
          <tbody style={{ height: "50%" }}>
            {body.map((e) => (
              <TableRow key={e.id}>
                <Td>
                  <input
                    type="checkbox"
                    style={{ width: "2rem", height: "1.5rem" }}
                  />
                  {/* <Checkbox></Checkbox> */}
                </Td>
                <Td>
                  <Edit>수정하기</Edit>
                </Td>
                <Td>{e.saleStatus}</Td>
                <Td>{e.bigCategory}</Td>
                <Td>{e.smallCategory}</Td>
                <Td>{e.name}</Td>
                <Td>{e.discount}</Td>
                <Td>{e.price}</Td>
                <Td>{e.stock}</Td>
                <Td>{e.brand}</Td>
                <Td>{e.keyword}</Td>
                <Td>{e.metaTag}</Td>
                <Td>{e.delivery}</Td>
              </TableRow>
            ))}
          </tbody>
          {/* <tfoot>
            <TableRow>
              <td>테이블푸터1</td>
              <td>테이블푸터2</td>
            </TableRow>
          </tfoot> */}
        </TableContainer>
      </div>
    </Grid2>
  );
}

export const MyBox = styled(Box)`
  /* width: 15rem; */
  /* background-color: transparent; */
  .MuiDataGrid-columnHeaders {
    width: 100%;
    background: #dadada;
  }
  .MuiDataGrid-columnHeaderDraggableContainer {
    border: 1px;
    border-color: #000;
  }
  .MuiDataGrid-columnHeaderTitleContainer {
    background: #dadada;
  }
`;

const CancelButton = styled.button`
  width: 10%;
  height: 2.5rem;
  border: 1px solid border;
  /* border-radius: 1rem; */
  font-size: 1rem;
  border: 0;
`;

const SaveButton = styled.button`
  width: 10%;
  height: 2.5rem;
  /* border-radius: 1rem; */
  font-size: 1rem;
  background-color: #57a9fb;
  color: #fff;
  border: 0;
`;

const TableContainer = styled.table`
  background-color: white;
  margin: 0;
  width: 100%;
  height: 10rem;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid black;
`;

const TableRow = styled.tr`
  width: 100%;
  height: 3rem;
  margin: 0;
`;

const Th = styled.th`
  margin: 0;
  border: 1px solid black;
  text-align: center;
  background-color: #c5e2ff;
`;

const Td = styled.td`
  margin: 0;
  border: 1px solid black;
  text-align: center;
  height: 2rem;
`;

const Edit = styled.button`
  width: fit-content;
  /* height: 2rem; */
  background-color: #57a9fb;
  font-size: 1rem;
  color: white;
  border: none;
  padding: 0.6rem;
  &:hover {
    cursor: pointer;
  }
`;
