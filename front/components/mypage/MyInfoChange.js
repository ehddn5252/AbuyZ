// React
import React, { useEffect, useState } from "react";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// router
import { useRouter } from "next/router";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import PasswordChangeModal from "./PasswordChangeModal";

// api
import { withdrawal } from "../../pages/api/user";
import { changeInfo } from "../../pages/api/user";
import { getMyInfo } from "../../pages/api/user";
import WithDrawalModal from "./WithDrawalModal";

export default function MyinfoChange() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userBirthDay, setUserBirthDay] = useState("");
  const [userPw, setUserPw] = useState("");
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);

  // 내 정보 가져오기
  const uuser = async () => {
    const res = await getMyInfo();
    setUserId(res.data.nickname);
    setUserName(res.data.name);
    setUserEmail(res.data.email);
    setUserPhone(res.data.phoneNumber);
    setUserSex(res.data.gender);
    const bbirth = res.data.birth;
    setUserBirthDay(bbirth);
  };

  // 회원 정보 수정
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDto = {
      birth: userBirthDay,
      gender: userSex,
      name: userName,
      nickname: userId,
      phoneNumber: userPhone,
    };
    const res = await changeInfo(userDto);
    alert("회원님의 정보가 수정되었습니다.");
    router.push("/mypage");
  };

  useEffect(() => {
    uuser();
  }, []);

  // 비밀번호 수정 모달 띄우기
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
          {/* 닉네임 */}
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>닉네임</span>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder={userId}
                margin="normal"
                fullWidth
                id="id"
                name="id"
                autoComplete="id"
                sx={{ backgroundColor: "white" }}
                disabled
              ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
              <span style={{ color: "#56a9f1" }}>
                * 닉네임은 변경 불가능합니다.
              </span>
            </Grid>
          </Grid>
          {/* 이름 */}
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>이름</span>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder={userName}
                margin="normal"
                fullWidth
                id="name"
                name="name"
                autoComplete="name"
                sx={{ backgroundColor: "white" }}
                onChange={(event) => setUserName(event.currentTarget.value)}
              ></TextField>
            </Grid>
          </Grid>
          {/* 이메일 */}
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>이메일</span>
            </Grid>
            <Grid item xs={6}>
              <TextField
                placeholder={userEmail}
                margin="normal"
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ backgroundColor: "white" }}
                onChange={(event) => setUserEmail(event.currentTarget.value)}
              ></TextField>
            </Grid>
          </Grid>
          {/* 비밀번호 */}
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>비밀번호 변경</span>
            </Grid>
            <Grid item xs={6}>
              <SubButton variant="outlined" onClick={showModal}>
                수정
              </SubButton>
            </Grid>
          </Grid>
          {/* 휴대폰 */}
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>휴대폰</span>
            </Grid>

            <Grid item xs={6}>
              <TextField
                placeholder={userPhone}
                margin="normal"
                fullWidth
                id="number"
                name="number"
                autoComplete="number"
                sx={{ backgroundColor: "white" }}
                onChange={(event) => setUserPhone(event.currentTarget.value)}
              ></TextField>
              {/* {checkPhoneNumber ? (
                <TextField
                  placeholder="수정할 번호를 입력하세요."
                  margin="normal"
                  fullWidth
                  id="number"
                  name="number"
                  autoComplete="number"
                  autoFocus
                  sx={{ backgroundColor: "white" }}
                ></TextField>
              ) : (
                <TextField
                  placeholder={userPhone}
                  margin="normal"
                  fullWidth
                  id="number"
                  name="number"
                  autoComplete="number"
                  autoFocus
                  sx={{ backgroundColor: "white" }}
                  onChange={(event) => setUserPhone(event.currentTarget.value)}
                ></TextField>
              )} */}
            </Grid>
            {/* <Grid item xs={2} style={{ marginTop: "1rem" }}>
              {checkPhoneNumber ? (
                <PhoneButton variant="outlined" onClick={changePhoneNumber}>
                  수정 취소
                </PhoneButton>
              ) : (
                <PhoneButton variant="outlined" onClick={changePhoneNumber}>
                  번호 수정
                </PhoneButton>
              )}
            </Grid> */}
          </Grid>
          {/* 성별 */}
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} style={{ marginTop: "2rem" }}>
              <span style={{ fontWeight: "bold" }}>성별</span>
            </Grid>
            <Grid item xs={6} style={{ marginTop: "1rem" }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={userSex}
                  name="radio-buttons-group"
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel
                      value="FEMALE"
                      control={<Radio />}
                      label="여자"
                      checked={userSex == "FEMALE"}
                      onClick={() => setUserSex("FEMALE")}
                    />
                    <FormControlLabel
                      value="MALE"
                      control={<Radio />}
                      label="남자"
                      checked={userSex == "MALE"}
                      onClick={() => setUserSex("MALE")}
                    />
                    <FormControlLabel
                      value="OTHER"
                      control={<Radio />}
                      label="선택안함"
                      checked={userSex == "OTHER"}
                      onClick={() => setUserSex("OTHER")}
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          {/* 생년월일 */}
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2} style={{ marginTop: "2.5rem" }}>
              <span style={{ fontWeight: "bold" }}>생년월일</span>
            </Grid>
            <Grid item xs={6} style={{ marginTop: "1.5rem" }}>
              <TextField
                id="date"
                type="date"
                value={userBirthDay}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setUserBirthDay(event.currentTarget.value)}
              />
            </Grid>
          </Grid>
          {/* 버튼 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "5rem",
            }}
          >
            <QuitButton onClick={() => setWithdrawalOpen(true)}>
              탈퇴하기
            </QuitButton>
            <ModifyButton type="submit" onClick={handleSubmit}>
              수정하기
            </ModifyButton>
          </div>

          {modalOpen && (
            <PasswordChangeModal
              setModalOpen={setModalOpen}
              Pw={userPw}
            ></PasswordChangeModal>
          )}
          {withdrawalOpen && (
            <WithDrawalModal
              setWithdrawalOpen={setWithdrawalOpen}
            ></WithDrawalModal>
          )}
        </ContentDiv>
      </InfoChangeContainer>
    </div>
  );
}

const InfoContainer = styled.div`
  margin-top: 4rem;
  width: 56rem;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;

const ContentDiv = styled.div`
  border-radius: 1rem;
  width: 100%;
  padding: 1rem;
`;

const InfoChangeContainer = styled.div`
  width: 56rem;
  height: 100vh;
`;

const SubButton = styled(Button)`
  margin-right: 1rem;
  margin-top: 1rem;
  background-color: white;
  border-color: #56a9f1;
  height: 3.3rem;
  width: 100%;
  color: #56a9f1;
`;

const QuitButton = styled.button`
  background-color: white;
  border: 1px solid;
  border-color: rgba(128, 128, 128, 0.5);
  height: 3rem;
  width: 7rem;
  color: rgba(128, 128, 128, 0.5);
  border-radius: 5px;
  cursor: pointer;
  /* &:hover {
    cursor: pointer;
  } */
`;

const ModifyButton = styled.button`
  background-color: #56a9f1;
  border: none;
  height: 3rem;
  width: 7rem;
  color: white;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;
