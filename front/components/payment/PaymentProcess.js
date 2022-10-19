import React, { useState } from "react";
import styled from "styled-components";
export default function PaymentProcess() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <h1>결제수단</h1>
      <hr></hr>
      <AllDiv>
        <div
          style={{
            ...cardStyle,
            ...(selected === 1 && cardSelect),
            position: "relative",
          }}
          onClick={() => setSelected(1)}
        >
          <KakaopayImage src={"/images/kakaopay.png"}></KakaopayImage>
          <br></br>
          <KakaoPayImageDiv>
            <span>카카오페이</span>
          </KakaoPayImageDiv>
        </div>
        <div
          style={{
            ...cardStyle,
            ...(selected === 0 && cardSelect),
            position: "relative",
          }}
          onClick={() => setSelected(0)}
        >
          <CardImage src={"/images/card.png"}></CardImage>
          <CardImageDiv>
            <span>일반결제</span>
          </CardImageDiv>
        </div>
      </AllDiv>
    </div>
  );
}

const cardStyle = {
  width: "10%",
  height: "8rem",
  background: "white",
  margin: "1rem",
  borderRadius: "10%",
};
const cardSelect = {
  boxShadow: "2px 4px 30px 0px rgba(0, 0, 0, 0.75)",
};

const AllDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const KakaoPayImageDiv = styled.div`
  position: absolute;
  bottom: 5%;
  left: 19%;
`;

const CardImageDiv = styled.div`
  position: absolute;
  bottom: 5%;
  left: 25%;
`;

const KakaopayImage = styled.img`
  width: 6rem;
  height: 2rem;
  margin-top: 2rem;
  margin-left: 0.7rem;
`;

const CardImage = styled.img`
  width: 6rem;
  height: 6rem;
  margin-top: 0.5rem;
  margin-left: 12%;
`;
