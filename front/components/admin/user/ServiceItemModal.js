import React from "react";

import Box from "@mui/material/Box";
import styled from "styled-components";
export default function ServiceItemModal({ row }) {
  return (
    <Container>
      <TitleDiv>상세 문의</TitleDiv>
      <ContentDiv>
        <ContentBox>
          <TitleP>문의 사유</TitleP>
          <ContentP>{row.cause}</ContentP>
        </ContentBox>
        <ContentBox>
          <TitleP style={{ paddingRight: "1rem" }}>문의 제목</TitleP>
          <ContentP>{row.title}</ContentP>
        </ContentBox>
        <ContentBox>
          <TitleP style={{ paddingRight: "1rem" }}>문의 일시</TitleP>
          <ContentP>{row.request_date}</ContentP>
        </ContentBox>
        <ContentBox>
          <TitleP style={{ paddingRight: "1rem", height: "5rem" }}>
            문의 내용
          </TitleP>
          <ContentP style={{ height: "5rem" }}>{row.content}</ContentP>
        </ContentBox>
      </ContentDiv>
      <TitleDiv>답변 내용</TitleDiv>
      <ContentDiv>
        <AnswerDiv></AnswerDiv>
      </ContentDiv>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <SubmitButton variant="contained" color="error" sx={{ margin: "1rem" }}>
          전송
        </SubmitButton>
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
