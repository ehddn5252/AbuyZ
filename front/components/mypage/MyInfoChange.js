// React
import React, { useState } from "react";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import PasswordChangeModal from "./PasswordChangeModal";

export default function MyinfoChange() {
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
    <InfoContainer>
      <MajorTitle>내 정보 관리</MajorTitle>
      <hr style={{ height: "0.5rem", background: "#000" }} />
      <ContentDiv>
        <SubTitle>프로필 사진 수정</SubTitle>
        <Button variant="outlined" component="label">
          수정
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </ContentDiv>
      <hr />
      <ContentDiv>
        <SubTitle>전화번호 변경</SubTitle>
        {checkPhoneNumber ? (
          <TextField
            variant="filled"
            size="small"
            sx={{ marginRight: "1rem" }}
          />
        ) : (
          <SubContent>010-0592-3142</SubContent>
        )}
        {checkPhoneNumber ? (
          <SubButton
            variant="outlined"
            color="success"
            onClick={changePhoneNumber}
          >
            수정
          </SubButton>
        ) : (
          <SubButton variant="outlined" onClick={changePhoneNumber}>
            수정
          </SubButton>
        )}
        {checkPhoneNumber ? (
          <SubButton
            variant="outlined"
            color="error"
            onClick={cancelPhoneNumber}
          >
            취소
          </SubButton>
        ) : null}
      </ContentDiv>
      <hr />
      <ContentDiv>
        <SubTitle>배송지 관리</SubTitle>
        <SubContent>[489523] 부산 남구 우암로 193 SSAFY 201호실</SubContent>
        <SubButton variant="outlined">수정</SubButton>
      </ContentDiv>
      <hr />
      <ContentDiv>
        <SubTitle>비밀번호 변경</SubTitle>
        <SubButton variant="outlined" onClick={showModal}>
          수정
        </SubButton>
        {modalOpen && (
          <PasswordChangeModal
            setModalOpen={setModalOpen}
          ></PasswordChangeModal>
        )}
      </ContentDiv>
      <hr />
      <ContentDiv>
        <SubTitle>회원 탈퇴</SubTitle>
        <SubButton variant="outlined" color="error">
          탈퇴
        </SubButton>
      </ContentDiv>
      <hr />
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 100%;
`;

const MajorTitle = styled.h1`
  font-size: 2rem;
`;

const ContentDiv = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  width: 90%;
  height: 3rem;
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
