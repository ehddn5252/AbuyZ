import React from "react";
import styled from "styled-components";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckBox from "@mui/material/Checkbox";
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function InquireList() {
  // const rows = [
  //   {
  //     id: 0,
  //     saleState: "판매중",
  //     bigCategory: "생활,건강",
  //     smallCategory: "의류",
  //     product: "나이키 청바지",
  //     saleratio: "15%",
  //     price: "50000",
  //     fee: "2000",
  //     brand: "나이키",
  //     keyword: "가성비,청바지,바지",
  //     metaTag: "나이키,바지",
  //   },
  // ];
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
      <h1 style={{ paddingLeft: "2rem" }}>검색 목록</h1>
      <hr style={{ background: "#ff9494", width: "95%" }} />
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
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      {/* <TableContainer component={Paper} sx={{ margin: "2rem", width: "95%" }}>
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
      </TableContainer> */}
    </Grid2>
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
