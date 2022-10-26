// React
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import PasswordChangeModal from "./PasswordChangeModal";

export default function MyinfoChange() {
  const [userInfo, setUserInfo] = useState({
    userId: "kjmk1007",
    userName: "권도건",
    userEmail: "kjmk1007@naver.com",
    userPhone: "01012345678",
    userSex: "male",
    userBirthDay: "1996-10-07",
  });
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const changePhoneNumber = () => {
    if (checkPhoneNumber === false) {
      setCheckPhoneNumber(true);
    } else {
      setCheckPhoneNumber(false);
    }
  };

  const cancelPhoneNumber = () => {
    setCheckPhoneNumber(false);
  };

  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <div>
      <InfoContainer>
        <MajorTitle>내 정보 관리</MajorTitle>

        <hr
          style={{
            height: "0.3rem",
            background: "#7895b2",
            borderRadius: "1rem",
          }}
        />
      </InfoContainer>
      <InfoChangeContainer component="main">
        <ContentDiv>
          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>아이디</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                placeholder={userInfo.userId}
                margin="normal"
                fullWidth
                id="id"
                name="id"
                autoComplete="id"
                autoFocus
                sx={{ backgroundColor: "white" }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>비밀번호 변경</span>
            </Grid>
            <Grid item xs={8}>
              <SubButton variant="outlined" onClick={showModal}>
                수정
              </SubButton>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>이름</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                placeholder={userInfo.userName}
                margin="normal"
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                sx={{ backgroundColor: "white" }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>이메일</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                placeholder={userInfo.userEmail}
                margin="normal"
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ backgroundColor: "white" }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>휴대폰</span>
            </Grid>

            <Grid item xs={8}>
              {checkPhoneNumber ? (
                <TextField></TextField>
              ) : (
                <TextField
                  placeholder={userInfo.userPhone}
                  margin="normal"
                  fullWidth
                  id="number"
                  name="number"
                  autoComplete="number"
                  autoFocus
                  sx={{ backgroundColor: "white" }}
                ></TextField>
              )}
            </Grid>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              {checkPhoneNumber ? (
                <button onClick={changePhoneNumber}>수정 취소</button>
              ) : (
                <button onClick={changePhoneNumber}>번호 수정</button>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>성별</span>
            </Grid>
            <Grid item xs={8}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={userInfo.userSex}
                  name="radio-buttons-group"
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="여성"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="남성"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="선택안함"
                    />
                  </div>
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
                id="date"
                type="date"
                defaultValue={userInfo.userBirthDay}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <button>탈퇴하기</button>
          <button>수정하기</button>
          {modalOpen && (
            <PasswordChangeModal
              setModalOpen={setModalOpen}
            ></PasswordChangeModal>
          )}
        </ContentDiv>
      </InfoChangeContainer>
    </div>
  );
}

const InfoContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 56rem;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;

const ContentDiv = styled.div`
  border-radius: 1rem;
  width: 100%;
  padding: 3rem;
`;

const InfoChangeContainer = styled.div`
  width: 56rem;
  height: 100vh;
`;

const SubTitle = styled.p`
  padding: 0.5rem;
  margin: 0;
  font-size: 1.2rem;
  width: 20rem;
`;

const SubContent = styled.p`
  padding: 0;
  margin: 0;
  padding-right: 1rem;
`;

const SubButton = styled(Button)`
  margin-right: 1rem;
`;
