import React, { useState, useEffect } from "react";
import "../styles/base.css";
import Nav from "../components/nav/Nav.js";
import AdminNav from "../components/nav/AdminNav.js";
import AdminSideNav from "../components/nav/AdminSideNav.js";
import Footer from "../components/nav/Footer.js";
import styled from "@emotion/styled";
function MyApp({ Component, pageProps }) {
  const [adminCheck, setAdminCheck] = useState(false);
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
      {isNav && adminCheck === false ? <Nav /> : null}
      {adminCheck ? <AdminNav /> : null}
      {adminCheck ? <AdminSideNav /> : null}
      <Component {...pageProps} />
      {isNav ? <Footer /> : null}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default MyApp;
