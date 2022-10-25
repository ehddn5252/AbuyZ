import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "styled-components";
export default function ServiceItemModal({ row }) {
  return (
    <Container>
      <h1>문의 내용</h1>
      <hr />
      <Box sx={{ display: "flex" }}>
        <p style={{ paddingRight: "1rem" }}>문의 제목</p>
        <p>{row.title}</p>
      </Box>
      <Box sx={{ display: "flex" }}>
        <p style={{ paddingRight: "1rem" }}>카테고리</p>
        <p>{row.cause}</p>
      </Box>
      <Box sx={{ display: "flex" }}>
        <p style={{ paddingRight: "1rem" }}>문의 내용</p>
        <p>{row.content}</p>
      </Box>
      <h1>답변 내용</h1>
      <hr />
      <AnswerDiv></AnswerDiv>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button variant="contained" color="error" sx={{ margin: "1rem" }}>
          전송
        </Button>
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

const AnswerDiv = styled.textarea`
  width: 100%;
  height: 10rem;
`;
