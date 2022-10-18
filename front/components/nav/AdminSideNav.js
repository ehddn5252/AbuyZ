import React from "react";
import Link from "next/link";

export default function AdminSideNav() {
  return (
    <div style={{ display: "grid" }}>
      <h1>Nav</h1>
      <Link href="/admin/dashboard">대시보드</Link>
      <Link href="/admin/product">상품관리</Link>
      <Link href="/admin/user">고객관리</Link>
      <Link href="/admin/event">이벤트 관리</Link>
      <Link href="/admin/coupon">쿠폰관리</Link>
      <Link href="/admin/chart">통계</Link>
    </div>
  );
}
