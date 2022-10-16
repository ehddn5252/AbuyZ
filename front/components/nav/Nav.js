import React from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <div style={{ display: "grid" }}>
      <h1>Nav</h1>
      <Link href="/">메인</Link>
      <Link href="/login">로그인</Link>
      <Link href="/mypage">마이페이지</Link>
      <Link href="/basket">장바구니</Link>
      <Link href="/payment">결제</Link>
      <Link href="/search">상품 검색</Link>
      <Link href="/detail">상품 상세</Link>
      <Link href="/event">이벤트</Link>
      <Link href="/service">고객센터</Link>
    </div>
  );
}
