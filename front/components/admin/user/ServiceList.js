import React, { useState } from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

import ServiceItemModal from "./ServiceItemModal";
import { Checkbox } from "@mui/material";

import styled from "styled-components";

export default function ServiceList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const rows = [
    {
      id: 0,
      nickname: "dogeon123",
      title: "나이키 바지를 샀는데...",
      content: "흰색이라고 해서 구매했는데 검은색이 왔어요. 교환해주...",
      cause: "교환/환불",
      solved: "해결",
      request_date: "2022.10.23 13:00",
      solved_date: "2022.10.25 15:00",
    },
    {
      id: 1,
      nickname: "hello321",
      title: "빼빼로 데이 이벤트 문의입..",
      content: "빼빼로데이 이벤트 언제부터 진행하나요?",
      cause: "이벤트 프로모션",
      solved: "미해결",
      request_date: "2022.10.23 16:00",
      solved_date: "-",
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 100,
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <TableHead
          sx={{
            backgroundColor: "#C5E2FF",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
        >
          <TableRow>
            <HeadTableCell>
              <Checkbox />
            </HeadTableCell>
            <HeadTableCell align="center">답변 유무</HeadTableCell>
            <HeadTableCell align="center">문의 사유</HeadTableCell>
            <HeadTableCell align="center">문의명</HeadTableCell>
            <HeadTableCell align="center">문의 내용</HeadTableCell>
            <HeadTableCell align="center">문의 일시</HeadTableCell>
            <HeadTableCell align="center">처리 일시</HeadTableCell>
            <HeadTableCell align="center">작성자</HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <BodyTableCell component="th" scope="row">
                <Checkbox />
              </BodyTableCell>
              <BodyTableCell align="center">
                {row.solved === "해결" ? (
                  <SolvedButton onClick={handleOpen}>답변완료</SolvedButton>
                ) : (
                  <NoButton onClick={handleOpen}>답변하기</NoButton>
                )}
              </BodyTableCell>
              <BodyTableCell align="center">{row.cause}</BodyTableCell>
              <BodyTableCell>{row.title}</BodyTableCell>
              <BodyTableCell>{row.content}</BodyTableCell>
              <BodyTableCell align="center">{row.request_date}</BodyTableCell>
              <BodyTableCell align="center">{row.solved_date}</BodyTableCell>
              <BodyTableCell align="center">{row.nickname}</BodyTableCell>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ServiceItemModal row={row} />
              </Modal>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const HeadTableCell = styled(TableCell)`
  border: 1px solid black;
  border-collapse: collapse;
`;

const BodyTableCell = styled(TableCell)`
  border: 1px solid black;
  border-collapse: collapse;
`;

const SolvedButton = styled.button`
  color: white;
  background-color: #57a9fb;
  font-weight: bold;
  border: none;
  width: 5rem;
  padding: 0.5rem;
  border-radius: 3px;
`;

const NoButton = styled.button`
  color: white;
  background-color: #7a7a7a;
  font-weight: bold;
  width: 5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
`;
