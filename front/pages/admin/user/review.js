// React
import React from "react";

// StyledComponents
import styled from "styled-components";

// 컴포넌트
import ReviewCategory from "../../../components/admin/user/ReviewCategory";

export default function Review() {
  return (
    <ReviewPage>
      <ReviewCategory />
    </ReviewPage>
  );
}

const ReviewPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
