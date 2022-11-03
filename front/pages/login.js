// React
import React, { useState } from "react";

// Next.js
import { useRouter } from "next/router";

// MUI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// API
import { login, refresh } from "./api/user.js";
import https from "./api/https.js";

// StyledComponent
import styled from "styled-components";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setCookie = (key, value, expiredDays) => {
    // 자동 삭제 날짜를 지정하는 코드
    let today = new Date();
    today.setDate(today.getDate() + expiredDays);
    // 쿠키에 값을 저장
    document.cookie =
      key +
      "=" +
      JSON.stringify(value) +
      "; path=/; expires=" +
      today.toGMTString() +
      ";";
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const LoginDto = {
      email: email,
      password: password,
    };
    console.log(LoginDto);
    const res = await login(LoginDto);
    console.log(res);
    if (res.status === 200) {
      // 일정시간마다 토큰 재발급
      if (res.data.data.type == "[ADMIN]") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }
    console.log(res);
  };

  const socialLogin = (event) => {
    event.preventDefault();
    Kakao.Auth.loginForm({
      success: (authObj) => {
        https
          .post("/user/kakao-login", {
            access_token: authObj.access_token,
          })
          .then((res) => {
            console.log(res.data.data.access_token);
            if (res.status == 200) {
              sessionStorage.setItem(
                "access-token",
                res.data.data.access_token
              );
              setCookie("refresh_token", res.data.data.refresh_token, 30);
              router.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };

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
        <LoginBox component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="아이디를 입력해주세요."
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            sx={{ backgroundColor: "white" }}
          />
          <Grid
            container
            justifyContent="flex-end"
            sx={{ margin: "1rem", marginLeft: 0 }}
          >
            <LoginLink href="/pwf">PW 찾기</LoginLink>
          </Grid>
          <LoginButton
            fullWidth
            type="submit"
            onClick={handleSubmit}
            variant="contained"
          >
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
        <KakaoButton onClick={socialLogin}>카카오로 시작하기</KakaoButton>
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
