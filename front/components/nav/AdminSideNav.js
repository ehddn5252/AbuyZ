// React
import React from "react";

// MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

// StyledComponents
import styled from "styled-components";

export default function AdminSideNav() {
  return (
    <SideNavContainer>
      <HighTag>
        <TagLink href="/admin/dashboard">대시보드</TagLink>
      </HighTag>
      <TitleGrid>
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
        <TitleTag>쿠폰관리</TitleTag>
      </TitleGrid>

      <div style={{ backgroundColor: "#EAEAEA" }}>
        <LowerTag>
          <TagLink href="/admin/coupon">- 쿠폰조회</TagLink>
        </LowerTag>
        <LowerTag>
          <TagLink href="/admin/coupon">- 쿠폰등록</TagLink>
        </LowerTag>
      </div>
      <TitleGrid>
        <TitleTag>이벤트관리</TitleTag>
      </TitleGrid>

      <div style={{ backgroundColor: "#EAEAEA" }}>
        <LowerTag>
          <TagLink href="/admin/event">- 이벤트조회</TagLink>
        </LowerTag>
        <LowerTag>
          <TagLink href="/admin/event">- 이벤트등록</TagLink>
        </LowerTag>
      </div>
      <HighTag>
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
  padding-top: 5rem;
  width: 12rem;
  height: 100%;
  background-color: white;
  z-index: 999;
`;

const TitleGrid = styled(Grid)`
  display: flex;
  justify-content: flex-start;
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
`;

const HighTag = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 1000;
  padding: 0.5rem;
`;

const LowerTag = styled(Typography)`
  padding: 0.5rem;
`;
