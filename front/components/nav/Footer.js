// React
import React, { useState, useEffect } from "react";

// MUI
import Grid from "@mui/material/Grid";

// StyledComponents
import styled from "@emotion/styled";

// recoil
import { useRecoilState } from "recoil";
import { pageNameState } from "../../states";

// Next.js
import { useRouter } from "next/router";

export default function Footer() {
  // 윈도우 주소
  const [locationUrl, setLocationUrl] = useRecoilState(pageNameState);
  // next router
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    setLocationUrl(path);
  }, [router.pathname]);

  return (
    <MainContainer>
      <FooterContent container>
        <Grid item xs={12}>
          <p style={{ margin: "0.3rem" }}>회사명 : Itda</p>
        </Grid>
        <Grid item xs={6}>
          <p style={{ margin: "0.3rem" }}>멘토 : 김강열 </p>
        </Grid>
        <Grid item xs={6}>
          <p style={{ margin: "0.3rem" }}>
            통신판매업 신고 : 부산 강서 제0158호{" "}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p style={{ margin: "0.3rem" }}>
            사업자 등록번호 : 529-85-00774 (잇다쇼핑(주) e커머스사업부)
          </p>
        </Grid>
        <Grid item xs={6}>
          <p style={{ margin: "0.3rem" }}>
            호스팅 서비스사업자 : 잇다쇼핑(주) e커머스사업부
          </p>
        </Grid>
        <Grid item xs={6}>
          <p style={{ margin: "0.3rem" }}>
            주소 : 부산 강서구 녹산산업중로 333
          </p>
        </Grid>
        <Grid item xs={6}>
          <p style={{ margin: "0.3rem" }}>
            고객 센터 : 1899-7000(유료) | 부산 강서구 녹산산업중로 333
          </p>
        </Grid>
      </FooterContent>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  bottom: 0;
  background-color: #28323c;
  height: 18vh;
  position: relative;
`;

const FooterContent = styled(Grid)`
  width: 50%;
  color: #fff;
  font-size: 1rem;
`;
