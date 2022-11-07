// React
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
// StyledComponents
import styled from "styled-components";

// api
import { chnagePw } from "../../pages/api/user";
import { Router } from "next/router";

export default function PasswordChangeModal({ setModalOpen, Pw }) {
  const router = useRouter();
  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(Pw);
  const [defaultPwd, setDefaultPwd] = useState(false);
  const [passwordValid, setPassowrdValid] = useState(true);
  const validatePwd = (e) => {
    let patternEngAtListOne = new RegExp(/[a-zA-Z]+/); // + for at least one
    let patternSpeAtListOne = new RegExp(/[~!@#$%^]+/); // + for at least one
    let patternNumAtListOne = new RegExp(/[0-9]+/); // + for at least one

    if (e.target.value) {
      setDefaultPwd(true);
    } else {
      setDefaultPwd(false);
    }

    if (
      patternEngAtListOne.test(e.target.value) &&
      patternSpeAtListOne.test(e.target.value) &&
      patternNumAtListOne.test(e.target.value) &&
      e.target.value.length >= 8 &&
      e.target.value.length <= 15
    ) {
      setPassowrdValid(true);
    } else {
      setPassowrdValid(false);
    }
  };

  const [defaultPwd2, setDefaultPwd2] = useState(false);
  const [checkPassword, setCheckPassword] = useState(true);
  const [mycurerntPw, setMycurerntPw] = useState("");
  const [myChangePw, setMyChangePw] = useState("");
  const [myChangeConfirmPw, setMyChangeConfirmPw] = useState("");

  /** 비밀번호 재확인 */
  const samePassword = (e) => {
    if (e.target.value) {
      setDefaultPwd2(true);
    } else {
      setDefaultPwd2(false);
    }
    if (myChangePw === myChangeConfirmPw) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  const changebutton = async (event) => {
    //초기화
    event.preventDefault();
    // 유효하면 실행
    if (passwordValid === true && checkPassword === true) {
      const pwDto = {
        password: mycurerntPw,
        new_password: myChangePw,
      };
      const res = await chnagePw(pwDto);

      alert("비밀번호 변경 완료!");
      closeModal();
      router.push("/mypage");
    } else {
      alert("비밀번호를 다시 확인해주세요");
    }
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
        type="password"
        autoComplete="password"
        autoFocus
        sx={{ marginBottom: "2rem" }}
        onChange={(event) => {
          setMycurerntPw(event.currentTarget.value);
        }}
      ></TextField>

      <TextField
        margin="normal"
        required
        fullWidth
        id="newPassword"
        label="새 비밀번호를 입력해주세요."
        type="password"
        onBlur={validatePwd}
        name="newPassword"
        autoComplete="newPassword"
        onChange={(event) => {
          setMyChangePw(event.currentTarget.value);
        }}
      ></TextField>
      {defaultPwd && !passwordValid ? (
        <ErrorText>유효하지 않은 비밀번호입니다</ErrorText>
      ) : null}
      {defaultPwd && passwordValid ? (
        <SuccessText>사용가능한 비밀번호입니다</SuccessText>
      ) : null}
      <TextField
        margin="normal"
        required
        fullWidth
        id="newPasswordConfirm"
        label="새 비밀번호를 재입력해주세요."
        onBlur={samePassword}
        type="password"
        name="newPasswordConfirm"
        autoComplete="newPasswordConfirm"
        sx={{ marginBottom: "2rem" }}
        onChange={(event) => {
          setMyChangeConfirmPw(event.currentTarget.value);
        }}
      ></TextField>
      {defaultPwd2 && !checkPassword ? (
        <ErrorText>비밀번호가 일치하지 않습니다</ErrorText>
      ) : null}
      {defaultPwd2 && checkPassword ? (
        <SuccessText>비밀번호가 일치합니다</SuccessText>
      ) : null}
      <ChangeButton
        fullWidth
        variant="contained"
        onClick={changebutton}
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 30rem;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
  border-radius: 5px;
  border-color: #56a9f1;
  padding: 2rem;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ModalTitle = styled.h1``;

const ChangeButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #56a9f1;
  border: none;
  color: white;
  border-radius: 5px;
`;

// 에러 텍스트
const ErrorText = styled.span`
  margin: 0;
  width: 100%;
  color: #ff0000;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

// 성공 텍스트
const SuccessText = styled.span`
  width: 100%;
  color: #009c87;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;
