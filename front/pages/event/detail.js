import React from "react";
import styled from "styled-components";
export default function Detail() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alginItems: "center",
        }}
      >
        <h1>이벤트 몰</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h3>이벤트 이름</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <br></br>
        <h5>이벤트 시작 일자: 2022.10.31 - 2022.12.25</h5>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alginItems: "center",
        }}
      >
        {/* 진짜 파일 이미지 */}
        <img src={"/images/event.png"} width="900"></img>
      </div>
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
          alginItems: "center",
        }}
      >
        <StyledButton>쿠폰 받기</StyledButton>
      </div>
      <div
        style={{
          marginBottom: "5rem",
          display: "flex",
          justifyContent: "center",
          alginItems: "center",
        }}
      >
        <h5>쿠폰 지급 일자: 2022.11.03</h5>
      </div>
    </div>
  );
}

const StyledButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  width: 8rem;
  color: white;
  background: rgba(255, 99, 71, 0.6);
`;
