// React
import React from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// StyledComponent
import styled from "styled-components";

export default function DataChart() {
  const rows = [
    {
      Rank: 1,
      ProductName: "에스티 로더 더블 웨어",
      BigCategory: "",
      SmallCategory: "",
      SaleCount: 54,
      SalePrice: "4,067,820",
    },
    {
      Rank: 2,
      ProductName: "에스티 로더 더블 웨어",
      BigCategory: "",
      SmallCategory: "",
      SaleCount: 54,
      SalePrice: "4,067,820",
    },
    {
      Rank: 3,
      ProductName: "에스티 로더 더블 웨어",
      BigCategory: "",
      SmallCategory: "",
      SaleCount: 54,
      SalePrice: "4,067,820",
    },
    {
      Rank: 4,
      ProductName: "에스티 로더 더블 웨어",
      BigCategory: "",
      SmallCategory: "",
      SaleCount: 54,
      SalePrice: "4,067,820",
    },
    {
      Rank: 5,
      ProductName: "에스티 로더 더블 웨어",
      BigCategory: "",
      SmallCategory: "",
      SaleCount: 54,
      SalePrice: "4,067,820",
    },
  ];
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>랭킹</TableCell>
              <TableCell align="right">상품명</TableCell>
              <TableCell align="right">대분류</TableCell>
              <TableCell align="right">소분류</TableCell>
              <TableCell align="right">판매 개수&nbsp;(g)</TableCell>
              <TableCell align="right">판매 금액&nbsp;(원)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.Rank}
                </TableCell>
                <TableCell align="right">{row.ProductName}</TableCell>
                <TableCell align="right">{row.BigCategory}</TableCell>
                <TableCell align="right">{row.SmallCategory}</TableCell>
                <TableCell align="right">{row.SaleCount}</TableCell>
                <TableCell align="right">{row.SalePrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  padding: 1rem;
`;
