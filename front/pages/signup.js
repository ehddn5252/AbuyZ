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

export default function Signup() {
  const [address, setAddress] = useState(0);
  const [open, setOpen] = useState(false);
  const [realAddress, setRealAddress] = useState("");
  const [realDetailAddress, setRealDetailAddress] = useState("");
  const [realNumber, setRealNumber] = useState("");

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
              <span style={{ fontWeight: "bold" }}>아이디</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                margin="normal"
                fullWidth
                id="id"
                label="사용하실 아이디를 입력해주세요."
                name="id"
                autoComplete="id"
                autoFocus
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={2} style={{ marginTop: "1rem" }}>
              <button style={inputbutton}>중복확인</button>
            </Grid>
          </Grid>
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
              />
            </Grid>
            <Grid item xs={2} style={{ marginTop: "1rem" }}>
              <button style={inputbutton}>중복확인</button>
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
