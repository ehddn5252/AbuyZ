import React from "react";
import styled from "styled-components";
export default function Detail() {
  return (
    <div>
      <AllDiv>
        <h1>이벤트 몰</h1>
      </AllDiv>
      <TitleDiv>
        <h3>이벤트 이름</h3>
      </TitleDiv>
      <DateDiv>
        <br></br>
        <h5>이벤트 시작 일자: 2022.10.31 - 2022.12.25</h5>
      </DateDiv>
      <ImgDiv>
        {/* 진짜 파일 이미지 */}
        <img src={"/images/event.png"} style={{ width: "900" }}></img>
      </ImgDiv>
      <ButtonDiv>
        <StyledButton>쿠폰 받기</StyledButton>
      </ButtonDiv>
      <ButtonDateDiv>
        <h5>쿠폰 지급 일자: 2022.11.03</h5>
      </ButtonDateDiv>
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

const AllDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonDiv = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonDateDiv = styled.div`
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
