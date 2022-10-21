import styled from "styled-components";
import React from "react";
import DataStatus from "../../components/admin/DataStatus";
import ReviewStatus from "../../components/admin/ReviewStatus";
import { Container } from "@mui/material";

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
  padding: 3rem;
  padding-left: 15rem;
`;
