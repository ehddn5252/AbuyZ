// React
import React from "react";

// MUI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// StyledComponent
import styled from "styled-components";

export default function Login() {
  return (
    <LoginContainer component="main">
      <LoginBox>
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
        <LoginButton fullWidth href="/" color="error" variant="contained">
          로그인
        </LoginButton>
        <Grid
          container
          justifyContent="flex-end"
          sx={{ margin: "1rem", marginLeft: 0 }}
        >
          <LoginLink href="/pwf">PW 찾기</LoginLink>
          <LoginLink href="/signup">회원가입</LoginLink>
        </Grid>
        <KakaoButton>카카오로 시작하기</KakaoButton>
      </LoginBox>
    </LoginContainer>
  );
}

const LoginContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 100vh;
`;

const LoginBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 3rem;
  width: 100%;
  height: auto;
  border-radius: 1rem;
  background-color: #f5f5f5;
`;

const LoginLink = styled(Link)`
  color: #aaaaaa;
  text-decoration-line: none;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const LoginButton = styled(Button)`
  height: 3rem;
  margin-top: 1rem;
  font-size: 1rem;
`;

const KakaoButton = styled.button`
  height: 3rem;
  width: 100%;
  background-color: #fee500;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 3rem;
`;
