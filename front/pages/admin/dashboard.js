import styled from "styled-components";
import React from "react";
import DataStatus from "../../components/admin/dashboard/DataStatus";
import ReviewStatus from "../../components/admin/dashboard/ReviewStatus";

export default function Dashboard() {
  return (
    <DashboardPage>
      <DataStatus />
      <ReviewStatus />
    </DashboardPage>
  );
}

const DashboardPage = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 88vh;
  background: #edf0f5;
  padding: 2rem;
  padding-left: 14rem;
`;
