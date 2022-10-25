// React
import React from "react";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// StyledComponents
import styled from "styled-components";

export default function PasswordFind() {
  return (
    <div>
      <AllContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h3" sx={{ fontWeight: "bold" }}>
            비밀번호 찾기
          </Typography>
        </div>
      </AllContainer>
      <PwfContainer component="main">
        <PwfBox>
          <span>아이디</span>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일을 입력해주세요."
            name="email"
            autoComplete="email"
            sx={{ backgroundColor: "white" }}
          />
          <span>이메일</span>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="이름을 입력해주세요."
            id="name"
            autoComplete="name"
            sx={{ backgroundColor: "white" }}
          />

          <ChangeButton
            fullWidth
            type="submit"
            href="/login"
            variant="contained"
            sx={{ mt: 1, mb: 3 }}
          >
            비밀번호 변경
          </ChangeButton>
        </PwfBox>
      </PwfContainer>
    </div>
  );
}
const AllContainer = styled(Container)`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  width: 55%;
`;
const PwfContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 50vh;
`;

const PwfBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  width: 100%;
  height: auto;
  border-radius: 1rem;
`;

const ChangeButton = styled(Button)`
  margin-top: 2rem;
  background-color: #56a9f1;
`;
