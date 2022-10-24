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
    <div>
      <AllContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Typography component="h1" variant="h3" sx={{ fontWeight: "bold" }}>
            로그인
          </Typography>
        </div>
      </AllContainer>
      <LoginContainer component="main">
        <LoginBox>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="아이디를 입력해주세요."
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
          <Grid
            container
            justifyContent="flex-end"
            sx={{ margin: "1rem", marginLeft: 0 }}
          >
            <LoginLink href="/pwf">PW 찾기</LoginLink>
          </Grid>
          <LoginButton fullWidth href="/" variant="contained">
            로그인
          </LoginButton>
          <SignupButton fullWidth href="/signup" variant="contained">
            회원가입
          </SignupButton>
        </LoginBox>
      </LoginContainer>

      <hr
        style={{
          border: "0px",
          borderTop: "3px dotted black",
          width: "26%",
        }}
      ></hr>
      <KakaoContainer>
        <KakaoButton>카카오로 시작하기</KakaoButton>
      </KakaoContainer>
    </div>
  );
}

const AllContainer = styled(Container)`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  width: 55%;
`;
const LoginContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 50vh;
`;

const LoginBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 3rem;
  width: 100%;
  height: auto;
  border-radius: 1rem;
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
  background-color: #56a9f1;
`;

const SignupButton = styled(Button)`
  height: 3rem;
  margin-top: 1rem;
  font-size: 1rem;
  background-color: white;
  color: #56a9f1;
  border: 1px solid #56a9f1;
`;
const KakaoButton = styled.button`
  height: 3rem;
  width: 100%;
  background-color: #fee500;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
`;

const KakaoContainer = styled(Container)`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 29%;
`;
