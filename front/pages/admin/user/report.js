// React
import React, { useState } from "react";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ReportList from "../../../components/admin/user/ReportList";
import ReportCategory from "../../../components/admin/user/ReportCategory";

export default function Report() {
  // 유무확인
  const [Reportsearch, setReportSearch] = useState(false);

  return (
    <Container>
      <ReportCategory setReportSearch={setReportSearch} />
      {Reportsearch ? <ReportList /> : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
  min-height: 89vh;
`;
