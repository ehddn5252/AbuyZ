import React from "react";
import styled from "styled-components";
// MUI
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

export default function WithDrawalModal({ setWithdrawalOpen }) {
  const router = useRouter();
  const closeModal = () => {
    setWithdrawalOpen(false);
  };

  const userwithdrawal = async () => {
    const rres = await withdrawal();
    alert("회원 탈퇴가 완료되었습니다.");
    router.push("/");
  };

  const nowithdrawal = () => {
    router.reload();
  };
  return (
    <ModalContainer>
      <CloseIconDiv>
        <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
      </CloseIconDiv>
      <div style={{ marginTop: "5%" }}>
        <h1>AbuyZ 탈퇴하기</h1>
        <span>정말 탈퇴하시겠습니까?</span>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
        >
          <YesWith onClick={userwithdrawal}>예 탈퇴합니다</YesWith>
          <NoWith onClick={nowithdrawal}>아니요 탈퇴하지 않습니다.</NoWith>
        </div>
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70%;
  left: 40%;
  width: 30rem;
  height: 40vh;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
  border-radius: 5px;
  border-color: #56a9f1;
  padding: 2rem;
`;

const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const YesWith = styled.button`
  height: 2.5rem;
  width: 11rem;
  border-radius: 5px;
  border: 1px solid #aaaaaa;
  background-color: white;
  color: #aaaaaa;
`;

const NoWith = styled.button`
  height: 2.5rem;
  width: 11rem;
  border-radius: 5px;
  background-color: #56a9f1;
  color: white;
  border: none;
`;
