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

export default function AdminSideNav() {
  const [productExpand, setProductExpand] = useState(false);
  const [userExpand, setUserExpand] = useState(false);
  const [couponExpand, setCouponExpand] = useState(false);
  const [evnetExpand, setEventExpand] = useState(false);

  return (
    <Container
      sx={{
        display: "flex",
        position: "fixed",
        flexDirection: "column",
        justifyContent: "center",
        top: "15%",
        left: "3%",
        borderRadius: "1rem",
        width: "20rem",
      }}
    >
      <Card
        sx={{
          display: "flex",
          width: "11rem",
          height: "3rem",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "border" }}>
          <Link
            href="/admin/dashboard"
            sx={{ textDecoration: "none", color: "#8E8E8E" }}
          >
            대시보드
          </Link>
        </Typography>
      </Card>
      <Card sx={{ width: "12rem", padding: "0.5rem" }}>
        <CardActions
          onClick={() => setProductExpand(!productExpand)}
          sx={{ cursor: "pointer" }}
        >
          <Grid container justify="center">
            <Grid
              item
              xs={9}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "#8E8E8E",
                  fontWeight: "border",
                }}
              >
                상품관리
              </Typography>
            </Grid>
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
          <Typography sx={{ padding: "0.5rem" }}>
            <Link
              href="/admin/product"
              sx={{ textDecoration: "none", color: "black" }}
            >
              상품조회
            </Link>
          </Typography>
          <Typography sx={{ padding: "0.5rem" }}>
            <Link
              href="/admin/product"
              sx={{ textDecoration: "none", color: "black" }}
            >
              상품등록
            </Link>
          </Typography>
        </Collapse>
      </Card>
      <Card sx={{ width: "12rem", padding: "0.5rem" }}>
        <CardActions
          onClick={() => setUserExpand(!userExpand)}
          sx={{ cursor: "pointer" }}
        >
          <Grid container justify="center">
            <Grid
              item
              xs={9}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "#8E8E8E",
                  fontWeight: "border",
                }}
              >
                고객관리
              </Typography>
            </Grid>
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
          <Typography sx={{ padding: "0.5rem" }}>
            <Link
              href="/admin/user"
              sx={{ textDecoration: "none", color: "black" }}
            >
              문의관리
            </Link>
          </Typography>
          <Typography sx={{ padding: "0.5rem" }}>
            <Link
              href="/admin/user"
              sx={{ textDecoration: "none", color: "black" }}
            >
              신고관리
            </Link>
          </Typography>
          <Typography sx={{ padding: "0.5rem" }}>
            <Link
              href="/admin/user"
              sx={{ textDecoration: "none", color: "black" }}
            >
              리뷰관리
            </Link>
          </Typography>
        </Collapse>
      </Card>
      <Card sx={{ width: "12rem", padding: "0.5rem" }}>
        <CardActions onClick={() => setCouponExpand(!couponExpand)}>
          <Grid container justify="center">
            <Grid
              item
              xs={9}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "#8E8E8E",
                  fontWeight: "border",
                }}
              >
                쿠폰관리
              </Typography>
            </Grid>
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
          <Typography sx={{ padding: "0.5rem" }}>
            <Link
              href="/admin/coupon"
              sx={{ textDecoration: "none", color: "black" }}
            >
              쿠폰조회
            </Link>
          </Typography>
          <Typography sx={{ padding: "0.5rem" }}>
            <Link
              href="/admin/coupon"
              sx={{ textDecoration: "none", color: "black" }}
            >
              쿠폰등록
            </Link>
          </Typography>
        </Collapse>
      </Card>
      <Card sx={{ width: "12rem", padding: "0.5rem" }}>
        <CardActions onClick={() => setEventExpand(!evnetExpand)}>
          <Grid container justify="center">
            <Grid
              item
              xs={9}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "#8E8E8E",
                  fontWeight: "border",
                }}
              >
                이벤트관리
              </Typography>
            </Grid>
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
          <Typography sx={{ padding: "0.5rem" }}>
            <Link
              href="/admin/event"
              sx={{ textDecoration: "none", color: "black" }}
            >
              이벤트조회
            </Link>
          </Typography>
          <Typography sx={{ padding: "0.5rem" }}>
            <Link
              href="/admin/event"
              sx={{ textDecoration: "none", color: "black" }}
            >
              이벤트등록
            </Link>
          </Typography>
        </Collapse>
      </Card>
      <Card
        sx={{
          display: "flex",
          width: "11rem",
          height: "3rem",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "border",
          }}
        >
          <Link
            href="/admin/chart"
            sx={{ textDecoration: "none", color: "#8E8E8E" }}
          >
            통계
          </Link>
        </Typography>
      </Card>
    </Container>
  );
}
