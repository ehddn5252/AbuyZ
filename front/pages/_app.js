import React, { useState } from "react";
import "../styles/base.css";
import Nav from "../components/nav/Nav.js";
import AdminNav from "../components/nav/AdminNav.js";
import AdminSideNav from "../components/nav/AdminSideNav.js";
import Footer from "../components/nav/Footer.js";
import styled from "@emotion/styled";
function MyApp({ Component, pageProps }) {
  const [adminCheck, setAdminCheck] = useState(false); // eslint-disable-line no-unused-vars
  return (
    <MainContainer>
      {adminCheck ? <AdminNav /> : <Nav />}
      {adminCheck ? <AdminSideNav /> : null}
      <Component {...pageProps} />
      <Footer />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  min-height: 100vh;
`;
export default MyApp;
