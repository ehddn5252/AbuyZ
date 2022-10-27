// React
import React from "react";

// MUI
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import CheckBox from "@mui/material/Checkbox";

// StyeldComponet
import styled from "styled-components";

export default function BasketItem({ basket }) {
  return (
    <Container>
      <CheckDiv>
        <CheckBox defaultChecked></CheckBox>
      </CheckDiv>
      <ImageDiv>
        <img src="/images/cloth.png" style={{ width: "9rem" }} />
      </ImageDiv>
      <ContentDiv>
        <ContentBox>{basket.name}</ContentBox>
        <ContentBox>{basket.option}</ContentBox>
      </ContentDiv>
      <CountDiv>
        <AddOutlinedIcon sx={{ border: "1px solid black" }} />
        <CountBox>{basket.count}</CountBox>
        <RemoveOutlinedIcon sx={{ border: "1px solid black" }} />
      </CountDiv>
      <PriceDiv>
        <CloseDiv>
          <CloseOutlinedIcon />
        </CloseDiv>
        <p
          style={{
            textDecoration: "line-through",
            color: "#AAAAAA",
            fontSize: "0.7rem",
            margin: "0",
            marginTop: "2.3rem",
          }}
        >
          {basket.price}
        </p>
        <p
          style={{
            fontSize: "1rem",
            margin: "0",
            fontWeight: "bold",
          }}
        >
          {basket.price - basket.salePrice}
        </p>
      </PriceDiv>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #aaaaaa;
  margin-bottom: 2rem;
  width: 90%;
  height: 12rem;
`;

const CheckDiv = styled.div`
  width: 8%;
  height: 100%;
`;

const ImageDiv = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
  height: 100%;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 32%;
  height: 100%;
`;

const ContentBox = styled.p`
  margin: 0;
`;

const CountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
`;

const CountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 1.55rem;
  text-align: center;
  border: 1px solid black;
`;

const PriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 15%;
  padding-left: 1rem;
`;

const CloseDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
