// React
import React from "react";

// StyledComponents
import styled from "styled-components";

// 컴포넌트
import AskCategory from "../../../components/admin/user/AskCategory";

export default function Ask() {
  return (
    <AskPage>
      <AskCategory />
    </AskPage>
  );
}

const AskPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
