// React
import React, { useState } from "react";

// MUI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

// StyledComponents
import styled from "styled-components";

export default function AdminSideNav() {
  const [productExpand, setProductExpand] = useState(false);
  const [userExpand, setUserExpand] = useState(false);
  const [couponExpand, setCouponExpand] = useState(false);
  const [evnetExpand, setEventExpand] = useState(false);

  return (
    <SideNavContainer>
      <SoloCard>
        <HighTag>
          <TagLink href="/admin/dashboard">대시보드</TagLink>
        </HighTag>
      </SoloCard>
      <CoupleCard>
        <CardActions
          onClick={() => setProductExpand(!productExpand)}
          sx={{ cursor: "pointer" }}
        >
          <Grid container justify="center">
            <TitleGrid item xs={9}>
              <TitleTag>상품관리</TitleTag>
            </TitleGrid>
            <Grid item xs={3}>
              <IconButton sx={{ padding: 0 }}>
                {productExpand ? (
                  <KeyboardArrowUpIcon fontSize="large" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="large" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
        <Collapse in={productExpand} sx={{ backgroundColor: "#EAEAEA" }}>
          <LowerTag>
            <TagLink href="/admin/product">상품조회</TagLink>
          </LowerTag>
          <LowerTag>
            <TagLink href="/admin/product">상품등록</TagLink>
          </LowerTag>
        </Collapse>
      </CoupleCard>
      <CoupleCard>
        <CardActions
          onClick={() => setUserExpand(!userExpand)}
          sx={{ cursor: "pointer" }}
        >
          <Grid container justify="center">
            <TitleGrid item xs={9}>
              <TitleTag>고객관리</TitleTag>
            </TitleGrid>
            <Grid item xs={3}>
              <IconButton sx={{ padding: 0 }}>
                {userExpand ? (
                  <KeyboardArrowUpIcon fontSize="large" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="large" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
        <Collapse in={userExpand} sx={{ backgroundColor: "#EAEAEA" }}>
          <LowerTag>
            <TagLink href="/admin/user">문의관리</TagLink>
          </LowerTag>
          <LowerTag>
            <TagLink href="/admin/user">신고관리</TagLink>
          </LowerTag>
          <LowerTag>
            <TagLink href="/admin/user">리뷰관리</TagLink>
          </LowerTag>
        </Collapse>
      </CoupleCard>
      <CoupleCard>
        <CardActions onClick={() => setCouponExpand(!couponExpand)}>
          <Grid container justify="center">
            <TitleGrid item xs={9}>
              <TitleTag>쿠폰관리</TitleTag>
            </TitleGrid>
            <Grid item xs={3}>
              <IconButton sx={{ padding: 0 }}>
                {couponExpand ? (
                  <KeyboardArrowUpIcon fontSize="large" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="large" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
        <Collapse in={couponExpand} sx={{ backgroundColor: "#EAEAEA" }}>
          <LowerTag>
            <TagLink href="/admin/coupon">쿠폰조회</TagLink>
          </LowerTag>
          <LowerTag>
            <TagLink href="/admin/coupon">쿠폰등록</TagLink>
          </LowerTag>
        </Collapse>
      </CoupleCard>
      <CoupleCard>
        <CardActions onClick={() => setEventExpand(!evnetExpand)}>
          <Grid container justify="center">
            <TitleGrid item xs={9}>
              <TitleTag>이벤트관리</TitleTag>
            </TitleGrid>
            <Grid item xs={3}>
              <IconButton sx={{ padding: 0 }}>
                {evnetExpand ? (
                  <KeyboardArrowUpIcon fontSize="large" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="large" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
        <Collapse in={evnetExpand} sx={{ backgroundColor: "#EAEAEA" }}>
          <LowerTag>
            <TagLink href="/admin/event">이벤트조회</TagLink>
          </LowerTag>
          <LowerTag>
            <TagLink href="/admin/event">이벤트등록</TagLink>
          </LowerTag>
        </Collapse>
      </CoupleCard>
      <SoloCard>
        <HighTag>
          <TagLink href="/admin/chart">통계</TagLink>
        </HighTag>
      </SoloCard>
    </SideNavContainer>
  );
}

const SideNavContainer = styled(Container)`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  top: 20%;
  left: 3%;
  border-radius: 1rem;
  width: 20rem;
`;

const SoloCard = styled(Card)`
  display: flex;
  width: 11rem;
  height: 3rem;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
`;

const CoupleCard = styled(Card)`
  width: 12rem;
  padding: 0.5rem;
`;

const TitleGrid = styled(Grid)`
  display: flex;
  justify-content: flex-start;
`;
const TitleTag = styled(Typography)`
  font-size: 1.5rem;
  color: #8e8e8e;
  font-weight: border;
`;

const TagLink = styled(Link)`
  text-decoration: none;
  color: #8e8e8e;
`;

const HighTag = styled(Typography)`
  font-size: 1.5rem;
  font-weight: border;
`;

const LowerTag = styled(Typography)`
  padding: 0.5rem;
`;
