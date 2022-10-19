// React
import React, { useRef } from "react";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
// StyledComponents
import styled from "styled-components";

export default function PasswordChangeModal({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  const modalRef = useRef(null);
  return (
    <PasswordChangeContainer ref={modalRef}>
      <IconDiv>
        <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
      </IconDiv>
      <ModalTitle>비밀번호 변경</ModalTitle>
      <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        label="기존 비밀번호를 입력해주세요."
        name="password"
        autoComplete="password"
        autoFocus
        sx={{ marginBottom: "2rem" }}
      ></TextField>
      <TextField
        margin="normal"
        required
        fullWidth
        id="newPassword"
        label="새 비밀번호를 입력해주세요."
        name="newPassword"
        autoComplete="newPassword"
        autoFocus
      ></TextField>
      <TextField
        margin="normal"
        required
        fullWidth
        id="newPasswordConfirm"
        label="기존 비밀번호를 재입력해주세요."
        name="newPasswordConfirm"
        autoComplete="newPasswordConfirm"
        sx={{ marginBottom: "2rem" }}
        autoFocus
      ></TextField>
      <ChangeButton
        fullWidth
        variant="contained"
        onClick={closeModal}
        color="error"
      >
        등록
      </ChangeButton>
    </PasswordChangeContainer>
  );
}

const PasswordChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  width: 20%;
  height: 30%;
  z-index: 999;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ff9494;
  border-radius: 8px;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ModalTitle = styled.h1``;

const ChangeButton = styled(Button)``;
