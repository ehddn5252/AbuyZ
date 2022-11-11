import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import styled from "styled-components";

// api
import { detailCustomerCenter } from "../../../pages/api/admin";
import { writeInquiryReply } from "../../../pages/api/admin";

export default function ServiceItemModal({ originalInquiry, handleClose }) {
  const [inquiry, setInquiry] = useState({
    uid: 0,
    title: "",
    content: "",
    status: "",
    start_date: "",
    end_date: "",
    imgUrl: "",
    customerCenterCategory: "",
    userName: "",
    reply: "",
  });

  const [reply, setReply] = useState({
    content: `안녕하세요 A-Buy-Z 입니다.\n문의주셔서 감사합니다.\n\n감사합니다.`,
    uid: originalInquiry.uid,
  });

  const loadData = async () => {
    if (originalInquiry.uid !== 0) {
      // console.log("모달", originalInquiry.uid);
      const res = await detailCustomerCenter(originalInquiry.uid);
      setInquiry(res.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   *
   * reply
   */

  const handleChange = (e) => {
    // console.log("content", e.target.value);
    setReply((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const writeClick = async () => {
    const res = await writeInquiryReply(reply);
    handleClose();
  };

  return (
    <Container>
      <TitleDiv>상세 문의</TitleDiv>
      <ContentDiv>
        <ContentBox>
          <TitleP>문의 사유</TitleP>
          <ContentP>{inquiry.customerCenterCategory}</ContentP>
        </ContentBox>
        <ContentBox>
          <TitleP style={{ paddingRight: "1rem" }}>문의 제목</TitleP>
          <ContentP>{inquiry.title}</ContentP>
        </ContentBox>
        <ContentBox>
          <TitleP style={{ paddingRight: "1rem" }}>문의 일시</TitleP>
          <ContentP>
            {inquiry.start_date.slice(0, 10)} {inquiry.start_date.slice(11, 16)}
          </ContentP>
        </ContentBox>
        <ContentBox>
          <TitleP style={{ paddingRight: "1rem", height: "5rem" }}>
            문의 내용
          </TitleP>
          <ContentP style={{ height: "5rem" }}>{inquiry.content}</ContentP>
        </ContentBox>
      </ContentDiv>
      <TitleDiv>답변 내용</TitleDiv>
      <ContentDiv>
        <AnswerDiv
          name="content"
          onChange={handleChange}
          value={reply.content}
        ></AnswerDiv>
      </ContentDiv>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {/* <SubmitButton
          variant="contained"
          color="error"
          sx={{ margin: "1rem" }}
          onClick={writeClick}
        >
          작성
        </SubmitButton> */}
        <AcceptButton onClick={writeClick}>작성</AcceptButton>
        <RefusalButton onClick={handleClose}>취소</RefusalButton>
      </Box>
    </Container>
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

const ContentP = styled.p`
  margin: 0;
  border: 1px solid black;
  border-left: none;
  padding: 0.5rem;
  width: 80%;
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
`;
