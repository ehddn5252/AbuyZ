// React
import React from "react";

// StyledComponents
import styled from "styled-components";

// 컴포넌트
import ReportCategory from "../../../components/admin/user/ReportCategory";

export default function Report() {
  return (
    <ReportPage>
      <ReportCategory />
    </ReportPage>
  );
}

const ReportPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
