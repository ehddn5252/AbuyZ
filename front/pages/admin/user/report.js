// React
import React from "react";

// MUI
import Box from "@mui/material/Box";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ReportList from "../../../components/admin/user/ReportList";

export default function User() {
  // 유무확인

  return (
    <Container>
      <Box>
        <Box>
          <ReportList />
        </Box>
      </Box>
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
