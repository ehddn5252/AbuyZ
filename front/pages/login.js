import React from "react";

// MUI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Login() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
          padding: "1rem",
          width: "100%",
          height: "auto",
          borderRadius: "1rem",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Typography component="h1" variant="h3" sx={{ color: "#EF2A23" }}>
          로그인
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="이메일을 입력해주세요."
          name="email"
          autoComplete="email"
          autoFocus
          sx={{ backgroundColor: "white" }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="비밀번호를 입력해주세요."
          type="password"
          id="password"
          autoComplete="current-password"
          sx={{ backgroundColor: "white" }}
        />
        <Button
          fullWidth
          href="/"
          color="error"
          variant="contained"
          sx={{ height: "3rem", marginTop: "1rem", fontSize: "1rem" }}
        >
          로그인
        </Button>
        <Grid
          container
          justifyContent="flex-end"
          sx={{ margin: "1rem", marginLeft: 0 }}
        >
          <Link
            href="/pwf"
            sx={{
              color: "#AAAAAA",
              marginRight: "0.5rem",
              textDecorationLine: "none",
              fontSize: "1rem",
            }}
          >
            PW 찾기
          </Link>
          <Link
            href="/signup"
            sx={{
              color: "#AAAAAA",
              textDecorationLine: "none",
              fontSize: "1rem",
            }}
          >
            회원가입
          </Link>
        </Grid>
        <button
          style={{
            height: "3rem",
            width: "100%",
            backgroundColor: "#FEE500",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: "3rem",
          }}
        >
          카카오로 시작하기
        </button>
      </Box>
    </Container>
  );
}
