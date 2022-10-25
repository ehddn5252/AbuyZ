// React
import React, { useState } from "react";

// MUI
import Box from "@mui/material/Box";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ServiceCategory from "../../components/admin/user/ServiceCategory";
import ServiceList from "../../components/admin/user/ServiceList";
import ReviewCategory from "../../components/admin/user/ReviewCategory";
import ReviewList from "../../components/admin/user/ReviewList";
import ReportList from "../../components/admin/user/ReportList";

export default function User() {
  // 유무확인
  const [search, setSearch] = useState(false);
  const [reviewSearch, setReviewSearch] = useState(false);
  const [checkPage, setCheckPage] = useState(0);
  return (
    <Container>
      <Box>
        {checkPage === 0 ? (
          <Box>
            <ServiceCategory setSearch={setSearch} />
            {search ? <ServiceList /> : null}
          </Box>
        ) : null}

        {checkPage === 1 ? (
          <Box>
            <ReportList />
          </Box>
        ) : null}
        {checkPage === 2 ? (
          <Box>
            <ReviewCategory setReviewSearch={setReviewSearch} />
            {reviewSearch ? <ReviewList /> : null}
          </Box>
        ) : null}
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
