import React from "react";
import DataStatus from "../../components/admin/DataStatus";
import ReviewStatus from "../../components/admin/ReviewStatus";

export default function Dashboard() {
  return (
    <div>
      <h1> 대시보드 페이지</h1>
      <DataStatus />
      <ReviewStatus />
    </div>
  );
}
