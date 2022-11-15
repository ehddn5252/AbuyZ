import React, { useState, useEffect } from "react";
import styled from "styled-components";

// MUI
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Unstable_Grid2";

// api
import { detailCustomerCenter } from "../../../pages/api/admin";
import { writeInquiryReply } from "../../../pages/api/admin";

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

export default function AskModal({ row }) {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 문의 상세 정보
  const [askInfo, setAskInfo] = useState([]);

  // 리뷰 데이터 불러오기 감지
  const [upload, setUpload] = useState(0);

  // 리뷰 데이터 불러오기
  const getDetail = async () => {
    const data = await detailCustomerCenter(row.uid);
    setAskInfo(data.data);
    console.log(data.data, "@@@");
  };

  useEffect(() => {
    getDetail();
  }, [upload]);

  return (
    <div>
      {row.status === "답변_미완료" ? (
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
          style={{ backgroundColor: "#FB5757" }}
        >
          완료
        </SolvedButton>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div>왜 안돼</div>
        </Box>
      </Modal>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
`;

const TitleDiv = styled.div`
  border-bottom: 1px solid #c8c8c8;
  width: 100%;
  padding: 2rem;
  font-size: 1.6rem;
  font-weight: bold;
`;

const ContentDiv = styled.div`
  padding: 2rem;
`;

const ContentBox = styled.div`
  display: flex;

  width: 100%;
  height: 2.5rem;
`;

const TitleP = styled.p`
  margin: 0;
  border: 1px solid black;
  padding: 0.5rem;
  width: 20%;
  background-color: #c8c8c8;
`;

const AnswerDiv = styled.textarea`
  width: 100%;
  height: 10rem;
`;

const SubmitButton = styled.button`
  width: 8rem;
  padding: 1rem;
  background-color: #1a6dff;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  border: none;
  margin-bottom: 2rem;
`;

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
