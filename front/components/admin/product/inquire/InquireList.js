import React from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Button";
import CheckBox from "@mui/material/Checkbox";

import styled from "styled-components";

import { ContainerBox } from "../addEdit/SaleProductCategory";

export default function InquireList() {
  const rows = [
    {
      id: 0,
      saleState: "판매중",
      bigCategory: "생활,건강",
      smallCategory: "의류",
      product: "나이키 청바지",
      saleratio: "15%",
      price: "50000",
      fee: "2000",
      brand: "나이키",
      keyword: "가성비,청바지,바지",
      metaTag: "나이키,바지",
    },
  ];
  return (
    <ContainerBox>
      <h1 style={{ paddingLeft: "2rem" }}>상품 목록</h1>
      <hr style={{ background: "#ff9494", width: "95%" }}></hr>
      <div
        style={{
          width: "100%",
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CancelButton>선택삭제</CancelButton>
        <SaveButton>수정저장</SaveButton>
      </div>
      <TableContainer component={Paper} sx={{ margin: "2rem", width: "95%" }}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <CheckBox></CheckBox>
              </TableCell>
              <TableCell>수정</TableCell>
              <TableCell align="center">판매상태</TableCell>
              <TableCell align="center">대분류</TableCell>
              <TableCell align="center">소분류</TableCell>
              <TableCell align="center">상품명</TableCell>
              <TableCell align="center">할인율</TableCell>
              <TableCell align="center">판매가</TableCell>
              <TableCell align="center">배송비</TableCell>
              <TableCell align="center">브랜드</TableCell>
              <TableCell align="center">키워드</TableCell>
              <TableCell align="center">메타태그</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <CheckBox></CheckBox>
                </TableCell>
                <TableCell component="th" scope="row">
                  수정
                </TableCell>
                <TableCell align="center">{row.saleState}</TableCell>
                <TableCell align="center">{row.bigCategory}</TableCell>
                <TableCell align="center">{row.smallCategory}</TableCell>
                <TableCell align="center">{row.product}</TableCell>
                <TableCell align="center">{row.saleratio}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.fee}</TableCell>
                <TableCell align="center">{row.brand}</TableCell>
                <TableCell align="center">{row.keyword}</TableCell>
                <TableCell align="center">{row.metaTag}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ContainerBox>
  );
}

const CancelButton = styled.button`
  width: 10%;
  height: 2.5rem;
  background-color: #fff;
  border-radius: 1rem;
  font-size: 1rem;
  border: 0;
`;

const SaveButton = styled.button`
  width: 10%;
  height: 2.5rem;
  border-radius: 1rem;
  font-size: 1rem;
  background-color: #ff9494;
  color: #fff;
  border: 0;
`;
