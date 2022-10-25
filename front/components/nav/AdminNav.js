// React
import React, { useState, useEffect } from "react";

// MUI
import Link from "@mui/material/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// StyledComponents
import styled from "styled-components";

export default function AdminNav() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/admin/account") setLocation("정보수정");
    else if (pathname === "/admin/chart") setLocation("통계");
    else if (pathname === "/admin/coupon") setLocation("전시관리 - 쿠폰");
    else if (pathname === "/admin/dashboard") setLocation("대시보드");
    else if (pathname === "/admin/event") setLocation("전시관리 - 이벤트");
    else if (pathname === "/admin/product") setLocation("상품관리");
    else setLocation("고객관리");
  }, [window.location.pathname]);
  const logout = () => {
    console.log("로그아웃");
  };
  return (
    <AdminNavContainer>
      <Location>{location}</Location>
      <UserDiv>
        <AccountCircleIcon fontSize="large" />
        <NavLink>권도건님</NavLink>
        <NavLink href="/admin/account">정보수정</NavLink>
        <NavLink onClick={logout} sx={{ cursor: "pointer" }}>
          로그아웃
        </NavLink>
        <ButtonBox href="/">사이트 바로가기</ButtonBox>
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
  padding: 1rem;
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

const NavLink = styled(Link)`
  text-decoration: none;
  margin-left: 1rem;
  color: #000;
  font-weight: bold;
`;

const ButtonBox = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: #acb8ca;
  width: 15rem;
  height: 4rem;
  margin-left: 2rem;
  border: none;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
`;
