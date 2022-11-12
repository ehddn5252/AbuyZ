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

export default function ServiceList({ inquirys }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenUid(-1);
  };
  const [openUid, setOpenUid] = useState(-1);

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
          {inquirys.map((inquiry) => (
            <TableRow key={inquiry.uid}>
              <BodyTableCell component="th" scope="row">
                <Checkbox />
              </BodyTableCell>
              <BodyTableCell align="center">
                {inquiry.status === "답변_완료" ? (
                  <SolvedButton onClick={handleOpen}>답변완료</SolvedButton>
                ) : (
                  <NoButton
                    onClick={(e) => {
                      handleOpen();
                      setOpenUid(inquiry.uid);
                    }}
                  >
                    답변하기
                  </NoButton>
                )}
              </BodyTableCell>
              <BodyTableCell align="center">
                {inquiry.category_name}
              </BodyTableCell>
              <BodyTableCell>{inquiry.title}</BodyTableCell>
              <BodyTableCell>{inquiry.content}</BodyTableCell>
              <BodyTableCell align="center">
                {inquiry.start_date.slice(0, 10)}{" "}
                {inquiry.start_date.slice(11, 16)}
              </BodyTableCell>
              <BodyTableCell align="center">
                {inquiry.end_date !== null ? (
                  <div>
                    {inquiry.end_date.slice(0, 10)}{" "}
                    {inquiry.end_date.slice(11, 16)}
                  </div>
                ) : null}
              </BodyTableCell>
              <BodyTableCell align="center">{inquiry.writer}</BodyTableCell>

              <Modal
                open={openUid !== -1 && openUid === inquiry.uid}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ServiceItemModal
                  originalInquiry={inquiry}
                  handleClose={handleClose}
                />
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

const NoButton = styled.button`
  color: white;
  background-color: #7a7a7a;
  font-weight: bold;
  width: 5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
