import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "styled-components";
export default function ReportItemModal({ row }) {
  return (
    <Container>
      <h1>문의 내용</h1>
      <hr />
      <Box sx={{ display: "flex" }}>
        <p style={{ paddingRight: "1rem" }}>닉네임</p>
        <p>{row.nickname}</p>
      </Box>
      <Box sx={{ display: "flex" }}>
        <p style={{ paddingRight: "1rem" }}>날짜</p>
        <p>{row.date}</p>
      </Box>
      <Box sx={{ display: "flex" }}>
        <p style={{ paddingRight: "1rem" }}>상품명</p>
        <p>{row.product}</p>
      </Box>
      <Box sx={{ display: "flex" }}>
        <img src="/images/carrot.png" />
      </Box>
      <Box sx={{ display: "flex" }}>
        <p style={{ paddingRight: "1rem" }}>문의 내용</p>
        <p>{row.content}</p>
      </Box>
      <hr />

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button variant="contained" color="success" sx={{ margin: "1rem" }}>
          승인
        </Button>
        <Button variant="contained" color="error" sx={{ margin: "1rem" }}>
          거절
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
