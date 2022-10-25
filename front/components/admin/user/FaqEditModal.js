import React from "react";

import Box from "@mui/material/Box";
import styled from "styled-components";
export default function FaqEditModal({ faq }) {
  return (
    <Container>
      <h1 style={{ margin: 0 }}>상세 FAQ</h1>
      {console.log(faq)}
      <hr />
      <ContentBox sx={{ display: "flex" }}>
        <TitleBox>FAQ 명</TitleBox>
        <ContentInput value={faq.title}></ContentInput>
      </ContentBox>
      <ContentBox sx={{ display: "flex" }}>
        <TitleBox>답변 내용</TitleBox>
        <ContentTextarea value={faq.content}></ContentTextarea>
      </ContentBox>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <EditButton>수정하기</EditButton>
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
  width: 30%;
  font-size: 2rem;
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
`;
