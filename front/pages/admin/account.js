import React, { useState } from "react";

import styled from "styled-components";

export default function Coupon() {
  const [serviceName, setserviceName] = useState("AbuyZ");
  const [CEOName, setCEOName] = useState("김광열");
  const [email, setEmail] = useState("1899-7000");
  const [number, setNumber] = useState("1899-7000");
  return (
    <Container>
      <InfoBox>
        <InputBox>
          <p style={{ width: "20%" }}>서비스명</p>
          <ContentInput
            value={serviceName}
            onChange={(e) => {
              setserviceName(e.target.value);
            }}
          ></ContentInput>
        </InputBox>
        <hr />
        <InputBox>
          <p style={{ width: "20%" }}>로고</p>
          <LogoButton style={{ color: "white", backgroundColor: "#3B7CBE" }}>
            로고 이미지
            <input hidden accept="image/*" multiple type="file" />
          </LogoButton>
        </InputBox>
        <hr />
        <InputBox>
          <p style={{ width: "20%" }}>대표이사</p>
          <ContentInput
            value={CEOName}
            onChange={(e) => {
              setCEOName(e.target.value);
            }}
          ></ContentInput>
        </InputBox>
        <hr />
        <InputBox>
          <p style={{ width: "20%" }}>이메일</p>
          <ContentInput
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></ContentInput>
        </InputBox>
        <hr />
        <InputBox>
          <p style={{ width: "20%" }}>고객센터 번호</p>
          <ContentInput
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          ></ContentInput>
        </InputBox>
        <hr />
        <InputBox>
          <p style={{ width: "20%" }}>주소</p>
          <AddressBox>
            <div style={{ display: "flex", alignItem: "center" }}>
              <AddressInput disabled style={{ width: "35%" }}></AddressInput>
              <AddressButton style={{ width: "13.5%" }}>
                우편번호 찾기
              </AddressButton>
            </div>
            <AddressInput disabled></AddressInput>
            <AddressInput disabled></AddressInput>
          </AddressBox>
        </InputBox>
        <hr />
        <ButtonBox>
          <InfoButton>취소</InfoButton>
          <InfoButton style={{ color: "white", backgroundColor: "#57A9FB" }}>
            수정
          </InfoButton>
        </ButtonBox>
      </InfoBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #edf0f5;
  height: 88vh;
  padding: 3rem;
  padding-left: 15rem;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.5rem;
  font-weight: bolder;
  padding-left: 2rem;
`;

const LogoButton = styled.label`
  border: none;
  font-size: 1.5rem;
  padding: 1rem;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoButton = styled.button`
  width: 10%;
  height: 3rem;
  border: none;
  font-size: 1.5rem;
  margin: 1rem;
  cursor: pointer;
`;

const ContentInput = styled.input`
  width: 30%;
  height: 2.8rem;
  padding: 1rem;
  font-size: 1.3rem;
`;

const AddressBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const AddressInput = styled.input`
  width: 50%;
  height: 2.8rem;
  padding: 1rem;
  font-size: 1.3rem;
  margin-top: 0.5rem;
`;

const AddressButton = styled.button`
  border: none;
  margin-top: 0.5rem;
  margin-left: 1rem;
  height: 2.8rem;
  width: "10%";
  background-color: #343d4b;
  color: #fff;
  font-size: 1.2rem;
`;
