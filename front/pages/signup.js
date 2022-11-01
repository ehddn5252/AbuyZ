// React
import React, { useState } from "react";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

// StyledComponent
import styled from "styled-components";

import DaumPostcode from "react-daum-postcode";
// API
import { signup, checkEmail } from "./api/user";

export default function Signup() {
  const [numberopen, setnumberOpen] = useState(false);
  // 회원가입 정보
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  // 주소
  const [realAddress, setRealAddress] = useState("");
  // 상세주소
  const [realDetailAddress, setRealDetailAddress] = useState("");
  // 우편주소
  const [realNumber, setRealNumber] = useState("");

  // 유효성 검사
  const [emailValid, setEmailValid] = useState(true);
  const [nicknameValid, setNicknameValid] = useState(true);
  const [passwordValid, setPassowrdValid] = useState(true);

  // 중복 검사
  // t: 사용가능, f: 사용불가능
  const [isDuplicateNickname, setisDuplicateNickname] = useState(false);
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
  const [buttonCheck, setButtonCheck] = useState(false);
  // 비밀번호 재확인
  const [checkPassword, setCheckPassword] = useState(true);

  // 디플트 에러 메세지 방지
  const [defaultEmail, setDefaultEmail] = useState(false);
  const [defaultPwd, setDefaultPwd] = useState(false);
  const [defaultPwd2, setDefaultPwd2] = useState(false);
  const [defaultNickname, setDefaultNickname] = useState(false);

  /** 닉네임 유효성 검사 1~10자 */
  const validateNickName = (e) => {
    if (e.target.value) {
      setDefaultNickname(true);
    } else {
      setDefaultNickname(false);
    }

    let regexp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (
      regexp.test(e.target.value) &&
      e.target.value.length <= 10 &&
      e.target.value.length >= 2
    ) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };

  /** 이메일 유효성 1 ~30자
  ^ 시작일치, $ 끝 일치
   {2, 3} 2개 ~ 3개
   * 0회 이상, + 1회 이상
   [-_.] - 또는 _ 또는 .
   ? 없거나 1회 
   */
  const validateEmail = (e) => {
    if (e.target.value) {
      setDefaultEmail(true);
    } else {
      setDefaultEmail(false);
    }

    let regexp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regexp.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    isDuplicateEmailCheck();
  };

  /** 비밀번호 유효성 */
  const validatePwd = (ex) => {
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
      setPwdValid(true);
    } else {
      setPwdValid(false);
    }
  };
  // 이메일 중복체크
  const isDuplicateEmailCheck = async () => {
    console.log(email);
    const res = await checkEmail(email);
    console.log(res);
    if (res.data.result === true) {
      setIsDuplicateEmail(true);
    }
  };

  // 이메일인증
  const checkEmail2 = async () => {
    setnumberOpen(true);
  };
  const [open, setOpen] = useState(false);

  const handleComplete = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    setRealAddress(fullAddr);
    setRealNumber(data.zonecode);
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
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
            회원가입
          </Typography>
        </div>
      </AllContainer>
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "27rem" }}
      >
        <span>*은 필수 입력사항입니다.</span>
      </div>
      <SignupContainer component="main">
        <SignupBox>
          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>이메일</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일을 입력해주세요"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ backgroundColor: "white" }}
                onBlur={validateEmail}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </Grid>
            <Grid item xs={2} style={{ marginTop: "1rem" }}>
              {isDuplicateEmail === true && emailValid === true ? (
                <button style={inputbutton} onClick={checkEmail2}>
                  인증
                </button>
              ) : null}
            </Grid>
            {defaultEmail && !emailValid ? (
              <ErrorText>유효하지 않은 이메일입니다.</ErrorText>
            ) : null}
            {defaultEmail && !isDuplicateEmail && emailValid && buttonCheck ? (
              <ErrorText>이미 존재하는 이메일입니다</ErrorText>
            ) : null}
            {defaultEmail && !isDuplicateEmail && emailValid && !buttonCheck ? (
              <ErrorText>중복체크를 클릭해주세요.</ErrorText>
            ) : null}
            {emailValid && isDuplicateEmail ? (
              <SuccessText>사용가능한 이메일입니다</SuccessText>
            ) : null}
          </Grid>

          {/* 이메일 인증번호 입력창 보여주기 */}
          {numberopen === true ? (
            <Grid container spacing={1}>
              <Grid item xs={2} style={{ marginTop: "2rem" }}>
                <span style={{ fontWeight: "bold" }}>이메일 인증</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="이메일로 발송된 인증번호를 입력해주세요"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
            </Grid>
          ) : null}

          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>비밀번호</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="비밀번호를 입력해주세요"
                name="password"
                autoComplete="password"
                autoFocus
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>비밀번호확인</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="passwordConfirm"
                label="비밀번호를 재입력해주세요"
                name="passwordConfirm"
                autoComplete="passwordConfirm"
                autoFocus
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>이름</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="이름을 입력해주세요"
                name="name"
                autoComplete="name"
                autoFocus
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>휴대폰</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                fullWidth
                id="phone"
                label="휴대폰 번호를 입력해주세요"
                name="phone"
                autoComplete="phone"
                autoFocus
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>주소</span>
            </Grid>
            {/* 첫번째 조건 */}
            {open === false && realNumber !== "" && realAddress !== "" ? (
              <Grid container item xs={10}>
                <Grid item xs={9} style={{ marginTop: "2rem" }}>
                  <span>
                    [{realNumber}] {realAddress}
                  </span>
                </Grid>
                <Grid item xs={3} style={{ marginTop: "2rem" }}>
                  <button style={inputadbutton} onClick={handleClick}>
                    주소 변경
                  </button>
                </Grid>
              </Grid>
            ) : null}
            {/* 두번째 조건 */}
            {open === false && realNumber == "" && realAddress == "" ? (
              <Grid item xs={8} style={{ marginTop: "1rem" }}>
                <button style={inputbutton} onClick={handleClick}>
                  주소 검색
                </button>
              </Grid>
            ) : null}
            {/* 세번째 조건 */}
            {open === true ? (
              <Grid item xs={8} style={{ marginTop: "1rem" }}>
                <DaumPostcode
                  // style={postCodeStyle}
                  onComplete={handleComplete} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                />
              </Grid>
            ) : null}

            {/* {open && (
              <input
                style={{ width: "60%", padding: "0.7rem" }}
                placeholder="상세 주소를 입력하세요"
              ></input>
            )} */}
          </Grid>
          {open === false && realNumber !== "" && realAddress !== "" ? (
            <Grid container spacing={1}>
              <Grid item xs={2} style={{ marginTop: "2rem" }}>
                <span style={{ fontWeight: "bold" }}>상세주소</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  id="detailAddress"
                  label="상세주소를 입력해주세요"
                  name="detailAddress"
                  autoComplete="detailAddress"
                  autoFocus
                  sx={{ backgroundColor: "white" }}
                ></TextField>
              </Grid>
            </Grid>
          ) : null}

          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>닉네임</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nickname"
                label="닉네임을 입력해주세요"
                name="nickname"
                autoComplete="nickname"
                autoFocus
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={2} style={{ marginTop: "1rem" }}>
              <button style={inputbutton}>중복확인</button>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "1rem" }}>
              <span style={{ fontWeight: "bold" }}>성별</span>
            </Grid>
            <Grid item xs={8}>
              <FormControl sx={{ mt: 1, mb: 1, pl: 1 }}>
                <RadioGroup aria-required row name="gender">
                  <FormControlLabel
                    value="MALE"
                    control={<Radio />}
                    label="남성"
                  />
                  <FormControlLabel
                    value="FEMALE"
                    control={<Radio />}
                    label="여성"
                  />
                  <FormControlLabel
                    value="NONE"
                    control={<Radio />}
                    label="선택하지 않음"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>생년월일</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                type="date"
                required
                fullWidth
                name="birthday"
                id="birthday"
                autoComplete="userBirthday"
                defaultValue={"2000-01-01"}
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}></Grid>
            <Grid item xs={8} style={{ marginTop: "1rem" }}>
              <button style={signupbutton}>회원가입</button>
            </Grid>
          </Grid>
        </SignupBox>
      </SignupContainer>
    </div>
  );
}

const AllContainer = styled(Container)`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  width: 55%;
`;
const SignupContainer = styled(Container)`
  width: 56rem;
  height: 100vh;
`;

const SignupBox = styled(Box)`
  border-radius: 1rem;
  width: 100%;
  padding: 3rem;
`;

const inputadbutton = {
  width: "78%",
  height: "3rem",
  backgroundColor: "white",
  border: "1px #56a9f1 solid",
  color: "#56a9f1",
  borderRadius: "10px",
  marginLeft: "3rem",
};
const inputbutton = {
  width: "100%",
  height: "3rem",
  backgroundColor: "white",
  border: "1px #56a9f1 solid",
  color: "#56a9f1",
  borderRadius: "10px",
};

const signupbutton = {
  width: "100%",
  height: "3rem",
  backgroundColor: "#56a9f1",
  border: "1px #56a9f1 solid",
  color: "white",
  borderRadius: "10px",
  marginTop: "3rem",
};
// 에러 텍스트
const ErrorText = styled.span`
  width: 100%;
  color: #ff0000;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

// 성공 텍스트
const SuccessText = styled.span`
  width: 100%;
  color: #009c87;
  font-size: 1rem;
  margin-bottom: 1rem;
`;
