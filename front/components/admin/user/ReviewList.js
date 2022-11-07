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
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
// Styled
import styled from "styled-components";

import ReviewItemModal from "./ReviewItemModal";

export default function ReviewList() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const rows = [
    {
      id: 0,
      nickname: "dogeon123",
      product: "Jeep 맨투맨",
      content: "옷이 너무 이쁘네요.",
      created_date: "2022.10.23 15:30",
      updated_date: "-",
      rating: "5",
      solved: false,
    },
    {
      id: 1,
      nickname: "hello321",
      product: "아몬드 빼빼로",
      content: "빼빼로데이 이벤트 언제부터 진행하나요?",
      created_date: "2022.10.23 16:30",
      updated_date: "2022.10.26 15:30",
      rating: "3",
      solved: true,
    },
    {
      id: 2,
      nickname: "ssafy1010",
      product: "강아지 사료",
      content: "강아지 사료에서 머리카락이 나왔어요. 사진 첨부...",
      created_date: "2022.10.23 17:30",
      updated_date: "2022.10.25 15:30",
      rating: "5",
      solved: true,
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
            <HeadTableCell align="center">답변 유무</HeadTableCell>
            <HeadTableCell align="center">평점</HeadTableCell>
            <HeadTableCell align="center">제품명</HeadTableCell>
            <HeadTableCell align="center">리뷰 내용</HeadTableCell>
            <HeadTableCell align="center">등록 일시</HeadTableCell>
            <HeadTableCell align="center">답변 일시</HeadTableCell>
            <HeadTableCell align="center">작성자</HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <BodyTableCell align="center" component="th" scope="row">
                {row.solved === false ? (
                  <SolvedButton
                    onClick={handleOpen}
                    style={{ backgroundColor: "#7A7A7A" }}
                  >
                    답변하기
                  </SolvedButton>
                ) : (
                  <SolvedButton
                    onClick={handleOpen}
                    style={{ backgroundColor: "#57A9FB" }}
                  >
                    답변 완료
                  </SolvedButton>
                )}
              </BodyTableCell>
              <BodyTableCell align="center">
                <Rating
                  name="text-feedback"
                  value={row.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </BodyTableCell>
              <BodyTableCell>{row.product}</BodyTableCell>
              <BodyTableCell>{row.content}</BodyTableCell>
              <BodyTableCell align="center">{row.created_date}</BodyTableCell>
              <BodyTableCell align="center">{row.updated_date}</BodyTableCell>
              <BodyTableCell align="center">{row.nickname}</BodyTableCell>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ReviewItemModal row={row} />
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
