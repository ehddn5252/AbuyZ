import React, { useState } from "react";

import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import Swal from "sweetalert2";

// API
import { updateFAQ, deleteFAQ } from "../../../pages/api/faq";

// Next.js
import { useRouter } from "next/router";

export default function FaqEditModal({ faq, setOpenUid }) {
  const router = useRouter();
  const [title, setTitle] = useState(faq.question);
  const [content, setContent] = useState(faq.answer);
  const updatefaq = () => {
    if (title === "" || content === "") {
      Swal.fire({
        show: true,
        title: "값을 다시 입력해주세요.",
        position: "top-center",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const faqDto = {
        question: title,
        answer: content,
      };
      console.log(faqDto);
      updateFAQ(faq.uid, faqDto);
      Swal.fire({
        show: true,
        title: "FAQ가 수정되었습니다.",
        position: "top-center",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      router.reload();
    }
  };

  const deletefaq = () => {
    deleteFAQ(faq.uid);
    Swal.fire({
      show: true,
      title: "FAQ가 삭제되었습니다.",
      position: "top-center",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    router.reload();
  };

  return (
    <Container style={{ display: "flex" }}>
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
          쿠폰 수정
        </h2>
        <CloseIcon
          onClick={() => setOpenUid(0)}
          sx={{
            cursor: "pointer",
            marginRight: "2rem",
            marginTop: "2rem",
          }}
        />
      </div>
      <hr />
      <ContentBox sx={{ display: "flex" }}>
        <TitleBox>FAQ 명</TitleBox>
        <ContentInput
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></ContentInput>
      </ContentBox>
      <ContentBox sx={{ display: "flex" }}>
        <TitleBox>답변 내용</TitleBox>
        <ContentTextarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></ContentTextarea>
      </ContentBox>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DeleteButton onClick={deletefaq}>삭제</DeleteButton>
        <EditButton onClick={updatefaq}>수정</EditButton>
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
  padding: 2rem;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TitleBox = styled.p`
  font-weight: bold;
  width: 25%;
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const ContentInput = styled.input`
  width: 70%;
  font-size: 1rem;
  height: 3rem;
`;

const ContentTextarea = styled.textarea`
  width: 70%;
  font-size: 1rem;
  height: 8rem;
  margin-top: 2rem;
`;

const EditButton = styled.button`
  width: 8rem;
  height: 2.5rem;
  font-size: 1.3rem;
  margin-top: 2rem;
  color: white;
  background-color: #57a9fb;
  border: none;
  cursor: pointer;
  margin-bottom: 2rem;
  margin-left: 1rem;
`;

const DeleteButton = styled.button`
  width: 8rem;
  margin-right: 1rem;
  height: 2.5rem;
  font-size: 1.3rem;
  margin-top: 2rem;
  margin-left: 2rem;
  color: white;
  background-color: #cf0a0a;
  border: none;
  cursor: pointer;
  margin-bottom: 2rem;
`;
