import React, { useState } from "react";
import "../styles/base.css";
import Nav from "../components/nav/Nav.js";
import AdminNav from "../components/nav/AdminNav.js";
import AdminSideNav from "../components/nav/AdminSideNav.js";
import Footer from "../components/nav/Footer.js";

function MyApp({ Component, pageProps }) {
  const [adminCheck, setAdminCheck] = useState(true); // eslint-disable-line no-unused-vars
  return (
    <div>
      {adminCheck ? <AdminNav /> : <Nav />}
      {adminCheck ? <AdminSideNav /> : null}
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
