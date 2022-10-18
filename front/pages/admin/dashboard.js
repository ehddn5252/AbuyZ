import styled from "styled-components";
import React from "react";
import DataStatus from "../../components/admin/DataStatus";
import ReviewStatus from "../../components/admin/ReviewStatus";

export default function Dashboard() {
  return (
    <DashboardPage>
      <DataStatus />
      <ReviewStatus />
    </DashboardPage>
  );
}

const DashboardPage = styled.div`
  background: #edf0f5;
  /* width: 100vw;
  height: 100vh; */
`;
