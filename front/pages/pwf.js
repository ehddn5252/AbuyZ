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
    <PwfContainer component="main">
      <PwfBox>
        <Typography component="h1" variant="h3" sx={{ color: "red" }}>
          비밀번호 찾기
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            mt: 1,
          }}
        >
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

          <Button
            fullWidth
            type="submit"
            href="/login"
            variant="contained"
            color="error"
            sx={{ mt: 1, mb: 3 }}
          >
            비밀번호 변경
          </Button>
        </Box>
      </PwfBox>
    </PwfContainer>
  );
}

const PwfContainer = styled(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const PwfBox = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 1rem;
  padding: 3rem;
`;
