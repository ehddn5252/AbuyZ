import styled from "styled-components";
import React from "react";
import DataStatus from "../../components/admin/dashboard/DataStatus";
import ReviewStatus from "../../components/admin/dashboard/ReviewStatus";

export default function Dashboard() {
  return (
    <PageContainer>
      <DataStatus />
      <ReviewStatus />
    </PageContainer>
  );
}

export const PageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: auto;
  background: #edf0f5;
  padding: 2.8rem;
  padding-left: 14rem;
`;
