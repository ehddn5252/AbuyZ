import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import "../styles/base.css";

// 하위 컴포넌트
import Nav from "../components/nav/Nav.js";
import AdminNav from "../components/nav/AdminNav.js";
import AdminSideNav from "../components/nav/AdminSideNav.js";
import Footer from "../components/nav/Footer.js";
import styled from "@emotion/styled";

// api 요청
import axios from "axios";
import https from "./api/https";
// recoil
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // 관리자 체크
  const [adminCheck, setAdminCheck] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;

    if (path.substring(6, 0) === "/admin") {
      setAdminCheck(true);
    } else {
      setAdminCheck(false);
    }
  }, [router.pathname]);
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init("204f7abed9a6558eb3411fabf8202302");
    }
    // IP 가져오기
    getIp();
  }, []);

  // IP 가져오기
  const getIp = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      const ip = response.data.ip;
      https.post(
        "/dashboard/visit-IP",
        {
          userIp: ip,
        },
        {
          validateStatus: function (status) {
            // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
            return status < 500;
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <RecoilRoot>
      <MainContainer>
        {adminCheck ? <AdminSideNav /> : null}
        {adminCheck ? <AdminNav /> : <Nav />}
        <Component {...pageProps} />
        {adminCheck ? null : <Footer />}
      </MainContainer>
    </RecoilRoot>
  );
}

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default MyApp;
