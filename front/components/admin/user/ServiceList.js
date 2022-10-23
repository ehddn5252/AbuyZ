import React from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
export default function ServiceList() {
  const rows = [
    {
      id: 0,
      nickname: "권도건",
      title: "제주 햇 감귤을 샀는데 경기도 하우스 귤이 왔어요",
      content: "원산지 표시가 잘못됬다 이거사지마라 이거 사기다. 이개...",
      cause: "환불 / 교환",
      solved: "해결",
    },
    {
      id: 1,
      nickname: "권도건",
      title: "제주 햇 감귤을 샀는데 경기도 하우스 귤이 왔어요",
      content: "원산지 표시가 잘못됬다 이거사지마라 이거 사기다. 이개...",
      cause: "환불 / 교환",
      solved: "미해결",
    },
  ];
  return (
    <TableContainer component={Paper} sx={{ margin: "2rem" }}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>닉네임</TableCell>
            <TableCell align="center">문의 제목</TableCell>
            <TableCell align="center">문의 내용</TableCell>
            <TableCell align="center">문의 사유</TableCell>
            <TableCell align="center">해결 유무</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nickname}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.content}</TableCell>
              <TableCell align="center">{row.cause}</TableCell>
              <TableCell align="center">
                {row.solved === "해결" ? (
                  <Button variant="contained" color="success">
                    {row.solved}
                  </Button>
                ) : (
                  <Button variant="contained" color="error">
                    {row.solved}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
