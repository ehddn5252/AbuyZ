// React
import React, { useState, useEffect } from "react";

// MUI
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// StyledComponents
import styled from "styled-components";

// Next.js
import { useRouter } from "next/router";

// API
import { logout } from "../../pages/api/user";

export default function AdminNav() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/admin/account") setLocation("정보수정");
    else if (pathname === "/admin/chart") setLocation("통계");
    else if (pathname === "/admin/coupon") setLocation("전시관리 - 쿠폰");
    else if (pathname === "/admin/dashboard") setLocation("대시보드");
    else if (pathname === "/admin/event") setLocation("전시관리 - 이벤트");
    else if (pathname === "/admin/product") setLocation("상품관리 - 상품조회");
    else if (pathname === "/admin/product/add")
      setLocation("상품관리 - 상품등록");
    else if (pathname === "/admin/product/edit")
      setLocation("상품관리 - 상품수정");
    else if (pathname === "/admin/user/ask") setLocation("고객관리 - 문의");
    else if (pathname === "/admin/user/faq") setLocation("고객관리 - FAQ");
    else if (pathname === "/admin/user/report") setLocation("고객관리 - 신고");
    else if (pathname === "/admin/user/review") setLocation("고객관리 - 리뷰");
  }, [window.location.pathname]);

  const Logout = async () => {
    await logout();
    router.push("/");
  };

  const goHome = () => {
    router.push("/admin/dashboard");
  };

  const goInfoChnage = () => {
    router.push("/admin/account");
  };

  const goSite = () => {
    router.push("/");
  };
  return (
    <AdminNavContainer>
      <Location>{location}</Location>
      <UserDiv>
        <AccountCircleIcon fontSize="large" />
        <NavLink onClick={goHome}>AbuyZ</NavLink>
        <NavLink onClick={goInfoChnage}>정보수정</NavLink>
        <NavLink onClick={Logout} sx={{ cursor: "pointer" }}>
          로그아웃
        </NavLink>
        <ButtonBox onClick={goSite}>사이트 바로가기</ButtonBox>
      </UserDiv>
    </AdminNavContainer>
  );
}

const AdminNavContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  padding: 0.5rem;
  z-index: 999;
`;

const Location = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  color: #000;
  text-decoration: none;
  margin-left: 15rem;
`;

const UserDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
`;

const NavLink = styled.p`
  margin: 0;
  text-decoration: none;
  margin-left: 1rem;
  color: #000;
  font-weight: bold;
  cursor: pointer;
`;

const ButtonBox = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: #acb8ca;
  width: 15rem;
  height: 4rem;
  margin-left: 2rem;
  margin-right: 3rem;
  border: none;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;
