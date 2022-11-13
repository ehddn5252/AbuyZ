// React
import React from "react";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ReportList from "../../../components/admin/user/ReportList";
import ReportCategory from "../../../components/admin/user/ReportCategory";

export default function Report() {
  // 유무확인
  // const [Reportsearch, setReportSearch] = useState(true);

  return (
    <ReportPage>
      <ReportCategory />
      {/* <ReportList /> */}
    </ReportPage>
  );
}

const ReportPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
