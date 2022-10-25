// React
import React, { useState } from "react";

// MUI
import Box from "@mui/material/Box";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ReviewCategory from "../../../components/admin/user/ReviewCategory";
import ReviewList from "../../../components/admin/user/ReviewList";

export default function User() {
  const [reviewSearch, setReviewSearch] = useState(false);

  return (
    <Container>
      <Box>
        <Box>
          <ReviewCategory setReviewSearch={setReviewSearch} />
          {reviewSearch ? <ReviewList /> : null}
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
