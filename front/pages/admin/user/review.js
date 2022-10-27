// React
import React, { useState } from "react";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ReviewCategory from "../../../components/admin/user/ReviewCategory";
import ReviewList from "../../../components/admin/user/ReviewList";

export default function Review() {
  const [reviewSearch, setReviewSearch] = useState(false);

  return (
    <Container>
      <ReviewCategory setReviewSearch={setReviewSearch} />
      {reviewSearch ? <ReviewList /> : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
  height: 89vh;
`;
