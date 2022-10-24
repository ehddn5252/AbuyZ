import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import "../styles/base.css";
import Nav from "../components/nav/Nav.js";
import AdminNav from "../components/nav/AdminNav.js";
import AdminSideNav from "../components/nav/AdminSideNav.js";
import Footer from "../components/nav/Footer.js";
import styled from "@emotion/styled";
function MyApp({ Component, pageProps }) {
  // 관리자 체크
  const [adminCheck, setAdminCheck] = useState(false);
  // 네브바 유무
  const [isNav, setIsNav] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/login" || path === "/pwf" || path === "/signup") {
      setIsNav(false);
    } else {
      setIsNav(true);
    }
    if (path.substring(6, 0) === "/admin") {
      setAdminCheck(true);
    } else {
      setAdminCheck(false);
    }
  }, []);
  return (
    <MainContainer>
      {adminCheck === false ? <Nav /> : null}
      {adminCheck ? <AdminSideNav /> : null}
      {adminCheck ? <AdminNav /> : null}
      <Component {...pageProps} />
      {isNav && adminCheck === false ? <Footer /> : null}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default MyApp;
