// React
import React, { useState, useEffect } from "react";

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

export default function DataChart({ dataChartData }) {
  const [rows, setrows] = useState([]);

  useEffect(() => {
    let tempList = [];
    let count = 0;
    if (dataChartData) {
      for (let [key, value] of Object.entries(dataChartData)) {
        let temp = {
          Rank: value.rank,
          ProductName: value.product_name,
          BigCategory: value.big_category_name,
          SmallCategory: value.small_category_name,
          SaleCount: value.count,
          SalePrice: value.sales_amount,
        };
        count += 1;
        if (count < 6) {
          tempList.push(temp);
        }
      }
    }
    setrows(tempList);
  }, [dataChartData]);
  return dataChartData ? (
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
            {rows.map((row, idx) => (
              <TableRow key={idx}>
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
  ) : null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  padding: 1rem;
  overflow: hidden;
`;
