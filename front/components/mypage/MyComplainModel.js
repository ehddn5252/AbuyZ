import React from "react";

import Box from "@mui/material/Box";
import styled from "styled-components";
export default function ReportItemModal({ complain }) {
  return (
    <Container>
      <hr />
      <Box sx={{ display: "flex" }}>
        <p style={{ paddingRight: "1rem" }}>제목</p>
        <p>{complain.title}</p>
      </Box>
      <Box sx={{ display: "flex" }}>
        <p style={{ paddingRight: "1rem" }}>내용</p>
        <p>{complain.content}</p>
      </Box>
      <hr />
      <Box sx={{ display: "flex" }}>
        {complain.state ? (
          <div>
            <p style={{ paddingRight: "1rem" }}>답변 내용</p>
            <p>{complain.content}</p>
          </div>
        ) : (
          <span>아직 답변 안됨</span>
        )}
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
  width: 30%;
  height: 50rem;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
  padding: 2rem;
`;
