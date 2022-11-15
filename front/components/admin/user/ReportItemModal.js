import React, { useState, useEffect } from "react";
import styled from "styled-components";

// MUI
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Unstable_Grid2";

// API
import { GetReviewDetail } from "../../../pages/api/review";
import { PutReviewStatus } from "../../../pages/api/review";

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

export default function ReportItemModal({ row }) {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 리뷰 데이터 불러오기 감지
  const [upload, setUpload] = useState(0);

  const [reviewInfo, setReviewInfo] = useState([]);

  const getDetail = async () => {
    const data = await GetReviewDetail(row.reviewsUid);
    setReviewInfo(data);
  };

  useEffect(() => {
    getDetail();
  }, [upload]);

  return (
    <div>
      {row.status === "대기" ? (
        <SolvedButton
          onClick={() => {
            handleOpen(), setUpload(upload + 1);
          }}
          style={{ backgroundColor: "#7A7A7A" }}
        >
          대기
        </SolvedButton>
      ) : row.status === "거절" ? (
        <SolvedButton
          onClick={() => {
            handleOpen(), setUpload(upload + 1);
          }}
          style={{ backgroundColor: "#FB5757" }}
        >
          거절
        </SolvedButton>
      ) : row.status === "승인" ? (
        <SolvedButton
          onClick={() => {
            handleOpen(), setUpload(upload + 1);
          }}
          style={{ backgroundColor: "#57A9FB" }}
        >
          승인
        </SolvedButton>
      ) : null}
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
                상세 문의
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
              {reviewInfo.repImg ? (
                <img
                  src={reviewInfo.repImg}
                  alt={"이미지를 준비중입니다."}
                  style={{ width: "18rem", height: "20rem" }}
                />
              ) : (
                <img
                  src="/images/ABUYZ_LOGO.png"
                  alt={"이미지를 준비중입니다."}
                  style={{ width: "18rem", height: "20rem" }}
                />
              )}
            </Grid2>
            <Grid2
              xs={7}
              sx={{
                marginLeft: "3rem",
              }}
            >
              <ContentP style={{ fontSize: "2rem" }}>{row.product}</ContentP>
              <ContentP>{row.report_date}</ContentP>

              <ContentP>작성자 : {reviewInfo.writer}</ContentP>
              <ContentP>제품명 : {reviewInfo.productName}</ContentP>
              <ContentP>
                작성일 : {reviewInfo.date ? reviewInfo.date.slice(0, 10) : null}
              </ContentP>
              <Rating
                name="text-feedback"
                value={reviewInfo.rating}
                precision={0.5}
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <ContentP>제목 : {reviewInfo.title}</ContentP>
              <ContentP>{reviewInfo.title}</ContentP>
            </Grid2>
            {row.status === "대기" ? (
              <Grid2
                xs={12}
                sx={{
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RefusalButton
                  onClick={() => {
                    PutReviewStatus(row.uid, 1),
                      alert("거절 처리 되었습니다."),
                      location.reload();
                  }}
                >
                  거절
                </RefusalButton>
                <AcceptButton
                  onClick={() => {
                    PutReviewStatus(row.uid, 2),
                      alert("승인 처리 되었습니다."),
                      location.reload();
                  }}
                >
                  승인
                </AcceptButton>
              </Grid2>
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
