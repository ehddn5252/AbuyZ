// React
import React from "react";

// MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";

// StyledComponents
import styled from "styled-components";

export default function AdminSideNav() {
  return (
    <SideNavContainer>
      <LogoDiv>
        <img src="/images/ABUYZ_LOGO.png" style={{ width: "6rem" }} />
        <p>셀리오피스</p>
      </LogoDiv>

      <hr style={{ width: "100%" }} />
      <HighTag>
        <GridViewOutlinedIcon />
        <TagLink href="/admin/dashboard">대시보드</TagLink>
      </HighTag>
      <TitleGrid>
        <CardGiftcardOutlinedIcon />
        <TitleTag>상품관리</TitleTag>
      </TitleGrid>

      <div style={{ backgroundColor: "#EAEAEA" }}>
        <LowerTag>
          <TagLink href="/admin/product">- 상품조회</TagLink>
        </LowerTag>
        <LowerTag>
          <TagLink href="/admin/product">- 상품등록</TagLink>
        </LowerTag>
      </div>
      <TitleGrid>
        <SupportAgentOutlinedIcon />
        <TitleTag>고객관리</TitleTag>
      </TitleGrid>
      <div style={{ backgroundColor: "#EAEAEA" }}>
        <LowerTag>
          <TagLink href="/admin/user">- 문의관리</TagLink>
        </LowerTag>
        <LowerTag>
          <TagLink href="/admin/user">- 신고관리</TagLink>
        </LowerTag>
        <LowerTag>
          <TagLink href="/admin/user">- 리뷰관리</TagLink>
        </LowerTag>
      </div>
      <TitleGrid>
        <LocalActivityOutlinedIcon />
        <TitleTag>전시관리</TitleTag>
      </TitleGrid>

      <div style={{ backgroundColor: "#EAEAEA" }}>
        <LowerTag>
          <TagLink href="/admin/coupon">- 쿠폰</TagLink>
        </LowerTag>
        <LowerTag>
          <TagLink href="/admin/event">- 이벤트등록</TagLink>
        </LowerTag>
      </div>

      <HighTag>
        <ShowChartOutlinedIcon />
        <TagLink href="/admin/chart">통계</TagLink>
      </HighTag>
    </SideNavContainer>
  );
}

const SideNavContainer = styled(Container)`
  display: flex;
  position: fixed;
  padding: 0;
  margin: 0;
  flex-direction: column;
  padding-top: 2rem;
  width: 12rem;
  height: 100%;
  background-color: #000000;
  color: #eeeeee;
  z-index: 999;
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const TitleGrid = styled(Grid)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.5rem;
`;
const TitleTag = styled(Typography)`
  font-size: 1.2rem;
  color: #8e8e8e;
  padding: 0.5rem;
  font-weight: 1000;
`;

const TagLink = styled(Link)`
  text-decoration: none;
  color: #8e8e8e;
  margin-left: 0.5rem;
`;

const HighTag = styled(Typography)`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 1000;
  padding: 0.5rem;
`;

const LowerTag = styled(Typography)`
  padding: 0.5rem;
`;
