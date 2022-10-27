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

import styled from "styled-components";

import ReportItemModal from "./ReportItemModal";

export default function ReportList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const rows = [
    {
      id: 0,
      nickname: "dogeon123",
      product: "Jeep 맨투맨",
      content: "흰색이라고 해서 구매했는데 검은색이 왔네요.",
      cause: "허위사실유포",
      report_date: "2022.10.23 15:30",
      solved_date: "-",
      solved: "대기",
    },
    {
      id: 1,
      nickname: "hello321",
      product: "아몬드 빼빼로",
      content: "빼빼로데이 이벤트 언제부터 진행하나요?",
      cause: "허위사실유포",
      report_date: "2022.10.23 16:30",
      solved_date: "2022.10.26 15:30",
      solved: "거절",
    },
    {
      id: 2,
      nickname: "ssafy1010",
      product: "강아지 사료",
      content: "강아지 사료에서 머리카락이 나왔어요. 사진 첨부...",
      cause: "허위사실유포",
      report_date: "2022.10.23 17:30",
      solved_date: "2022.10.25 15:30",
      solved: "승인",
    },
  ];
  return (
    <TableContainer component={Paper} sx={{ paddingTop: "2rem" }}>
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
            <HeadTableCell align="center">해결 유무</HeadTableCell>
            <HeadTableCell align="center">신고 사유</HeadTableCell>
            <HeadTableCell align="center">상품명</HeadTableCell>
            <HeadTableCell align="center">리뷰 내용</HeadTableCell>
            <HeadTableCell align="center">신고 일시</HeadTableCell>
            <HeadTableCell align="center">처리 일시</HeadTableCell>
            <HeadTableCell align="center">작성자</HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <BodyTableCell align="center" component="th" scope="row">
                {row.solved === "대기" ? (
                  <SolvedButton
                    onClick={handleOpen}
                    style={{ backgroundColor: "#7A7A7A" }}
                  >
                    대기
                  </SolvedButton>
                ) : null}
                {row.solved === "거절" ? (
                  <SolvedButton
                    onClick={handleOpen}
                    style={{ backgroundColor: "#FB5757" }}
                  >
                    거절
                  </SolvedButton>
                ) : null}
                {row.solved === "승인" ? (
                  <SolvedButton
                    onClick={handleOpen}
                    style={{ backgroundColor: "#57A9FB" }}
                  >
                    승인
                  </SolvedButton>
                ) : null}
              </BodyTableCell>
              <BodyTableCell align="center">{row.cause}</BodyTableCell>
              <BodyTableCell>{row.product}</BodyTableCell>
              <BodyTableCell>{row.content}</BodyTableCell>
              <BodyTableCell align="center">{row.report_date}</BodyTableCell>
              <BodyTableCell align="center">{row.solved_date}</BodyTableCell>
              <BodyTableCell align="center">{row.nickname}</BodyTableCell>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ReportItemModal row={row} />
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
  cursor: pointer;
`;
