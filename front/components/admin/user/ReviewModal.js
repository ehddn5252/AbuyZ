import React, { useState } from "react";
import styled from "styled-components";

// MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Unstable_Grid2";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

// api
import { writeInquiryReply } from "../../../pages/api/admin";
import { replyReview } from "../../../pages/api/review";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ReviewModal({ row }) {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 문의 상세 정보
  const [askInfo, setAskInfo] = useState([]);

  // 리뷰 데이터 불러오기 감지
  const [upload, setUpload] = useState(0);

  // 답변 내용
  const [answerContent, setAnswerContent] = useState("");

  //   작성한 답변 내용
  const [fixContent, setFixContent] = useState(row.reply ? row.reply : null);

  // 리뷰 답변 작성
  const handleAnswer = () => {
    const answer = {
      review_uid: row.uid,
      content: answerContent,
    };

    replyReview(answer);
    alert("답변이 등록되었습니다.");
    location.reload();
  };

  return (
    <div>
      {row.answered === false ? (
        <SolvedButton
          onClick={() => {
            handleOpen(), setUpload(upload + 1);
          }}
          style={{ backgroundColor: "#7A7A7A" }}
        >
          미완료
        </SolvedButton>
      ) : (
        <SolvedButton
          onClick={() => {
            handleOpen(), setUpload(upload + 1);
          }}
          style={{ backgroundColor: "#57A9FB" }}
        >
          완료
        </SolvedButton>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid2
            container
            spacing={2}
            sx={{ padding: "0", margin: "0", background: "#fff" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  paddingLeft: "2rem",
                  margin: "0",
                  paddingTop: "2rem",
                  paddingBottom: "1rem",
                }}
              >
                상세 리뷰
              </h2>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  cursor: "pointer",
                  marginRight: "2rem",
                  marginTop: "2rem",
                }}
              />
            </div>
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            >
              <hr style={{ background: "#000", margin: "0", padding: "0" }} />
            </Grid2>
            <Grid2
              xs={4}
              sx={{
                marginTop: "1rem",
              }}
            >
              {askInfo.imgUrl ? (
                <img
                  src={askInfo.imgUrl}
                  alt={"문의 관련 이미지입니다."}
                  style={{ width: "18rem", height: "17rem" }}
                />
              ) : (
                <img
                  src="/images/ABUYZ_LOGO.png"
                  alt={"이미지를 준비중입니다."}
                  style={{ width: "18rem", height: "17rem" }}
                />
              )}
            </Grid2>
            <Grid2
              xs={7}
              sx={{
                marginLeft: "3rem",
                marginTop: "1rem",
              }}
            >
              <ContentP style={{ fontSize: "2rem" }}>{row.product}</ContentP>
              <ContentP>{row.report_date}</ContentP>

              <ContentP>작성자 : {row.writer}</ContentP>
              <ContentP>
                작성일 :{" "}
                {row.createdDate
                  ? row.createdDate.slice(0, 4) +
                    "년" +
                    " " +
                    row.createdDate.slice(5, 7) +
                    "월" +
                    " " +
                    row.createdDate.slice(8, 10) +
                    "일" +
                    " " +
                    row.createdDate.slice(11, 19)
                  : null}
              </ContentP>
              <Rating
                name="text-feedback"
                value={row.rating}
                precision={0.5}
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  marginLeft: "0.5rem",
                }}
                readOnly
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <ContentP>제품명 : {row.productName}</ContentP>
              <ContentP>리뷰 내용 : {row.content}</ContentP>
            </Grid2>
          </Grid2>
          <Grid2
            xs={12}
            sx={{
              margin: "0",
              padding: "0",
              width: "100%",
              display: "flex",
              marginTop: "1rem",
            }}
          >
            <TitleP>답변</TitleP>
            {row.answered === false ? (
              <AnswerDiv
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
              />
            ) : (
              <FixAnswerDiv>{fixContent}</FixAnswerDiv>
            )}
          </Grid2>

          <Grid2
            xs={12}
            sx={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RefusalButton onClick={handleClose}>취소</RefusalButton>
            {row.answered === false ? (
              <AcceptButton onClick={() => handleAnswer()}>
                답변 등록
              </AcceptButton>
            ) : null}
          </Grid2>
        </Box>
      </Modal>
    </div>
  );
}

const ContentP = styled.p`
  margin: 0;
  padding: 0.5rem;
  font-weight: bold;
`;

const TitleP = styled.p`
  margin: 0;
  margin-left: 1rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  font-weight: 800;
`;

const AnswerDiv = styled.textarea`
  width: 90%;
  height: 10rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 0.3rem;
`;

const FixAnswerDiv = styled.div`
  width: 90%;
  height: 10rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 0.3rem;
`;

const AcceptButton = styled.button`
  width: 8rem;
  padding: 0.5rem;
  background-color: #1a6dff;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  border: none;
  margin-left: 2rem;
  margin-bottom: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const RefusalButton = styled.button`
  width: 8rem;
  padding: 0.5rem;
  background-color: #fb5757;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  border: none;
  margin-right: 2rem;
  margin-bottom: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const SolvedButton = styled.button`
  color: white;
  background-color: #57a9fb;
  font-weight: bold;
  border: none;
  width: 5rem;
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const TableContainer = styled.table`
  background-color: white;
  margin-left: 1rem;
  width: 100%;
  height: 7rem;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid black;
`;

const TableRow = styled.tr`
  width: 100%;
  height: 3rem;
  margin: 0;
`;

const Td = styled.td`
  margin: 0;
  border: 1px solid black;
  text-align: center;
  height: fit-content;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;
