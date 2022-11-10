import React, { useState, useEffect, useRef } from "react";

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

export default function ReviewList({ reviews }) {
  const modalRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenUid(0);
  };
  const [openUid, setOpenUid] = useState(0);

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
          {reviews.map((review, idx) => (
            <TableRow key={idx}>
              <BodyTableCell align="center" component="th" scope="row">
                {review.answered === false ? (
                  <SolvedButton
                    onClick={(e) => {
                      handleOpen();
                      setOpenUid(review.uid);
                    }}
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
                  value={review.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </BodyTableCell>
              <BodyTableCell>{review.productName}</BodyTableCell>
              <BodyTableCell>{review.content}</BodyTableCell>
              <BodyTableCell align="center">
                {review.createdDate.slice(0, 10)}{" "}
                {review.createdDate.slice(11, 16)}
              </BodyTableCell>
              <BodyTableCell align="center">
                {review.answerDate !== null ? (
                  <div>
                    {review.answerDate.slice(0, 10)}{" "}
                    {review.answerDate.slice(11, 16)}
                  </div>
                ) : (
                  <div> </div>
                )}
              </BodyTableCell>
              <BodyTableCell align="center">{review.writer}</BodyTableCell>

              <Modal
                ref={modalRef}
                open={openUid === review.uid}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ReviewItemModal
                  originalReview={review}
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
