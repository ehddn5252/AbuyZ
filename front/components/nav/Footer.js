// React
import React from "react";

// MUI
import Grid from "@mui/material/Grid";

// StyledComponents
import styled from "@emotion/styled";

export default function Footer() {
  return (
    <MainContainer>
      <FooterContent container>
        <Grid item xs={12}>
          <p>회사명 : Itda</p>
        </Grid>
        <Grid item xs={6}>
          <p>멘토 : 김강열 </p>
        </Grid>
        <Grid item xs={6}>
          <p>통신판매업 신고 : 부산 강서 제0158호 </p>
        </Grid>
        <Grid item xs={6}>
          <p>사업자 등록번호 : 529-85-00774 (잇다쇼핑(주) e커머스사업부)</p>
        </Grid>
        <Grid item xs={6}>
          <p>호스팅 서비스사업자 : 잇다쇼핑(주) e커머스사업부</p>
        </Grid>
        <Grid item xs={6}>
          <p>주소 : 부산 강서구 녹산산업중로 333</p>
        </Grid>
        <Grid item xs={6}>
          <p>고객 센터 : 1899-7000(유료) | 부산 강서구 녹산산업중로 333</p>
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
  padding: 0;
  bottom: 0;
  background-color: #28323c;
  height: 25vh;
  position: relative;
`;

const FooterContent = styled(Grid)`
  width: 50%;
  color: #fff;
  font-size: 1rem;
`;
