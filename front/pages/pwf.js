import React from "react";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function PasswordFind() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F5F5F5",
          borderRadius: "1rem",
          padding: 4,
          paddingTop: 0,
        }}
      >
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
      </Box>
    </Container>
  );
}
