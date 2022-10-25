// React
import React from "react";

// MUI
import Box from "@mui/material/Box";

// StyledComponents
import styled from "styled-components";

export default function User() {
  return (
    <Container>
      <Box>faq페이지</Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: #edf0f5;
  height: 88vh;
  padding: 3rem;
  padding-left: 15rem;
`;
