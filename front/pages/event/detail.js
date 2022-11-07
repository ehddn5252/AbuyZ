import React from "react";
import styled from "styled-components";
export default function Detail() {
  return (
    <div style={{ height: "80vh" }}>
      <ImgDiv>
        <img
          src={"/images/halloween.png"}
          style={{ width: "100%", objectFit: "cover" }}
        ></img>
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
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.5;
  width: 8rem;
  color: white;
  border: none;
  background: #56a9f1;
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
