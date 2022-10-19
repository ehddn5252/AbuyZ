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
      <TopBox>
        <CheckBox defaultChecked color="error" size="large" />
        <ProductImg src="/images/carrot.png" />
        <IntroBox>
          <h2 style={{ margin: 0, width: "20rem" }}>{basket.name}</h2>
          <h2>옵션 : {basket.option}</h2>
        </IntroBox>
        <CountBox>
          <CountTitle>수량</CountTitle>
          <MinusIcon fontSize="large"></MinusIcon>
          <CountDiv>
            <p style={{ margin: 0 }}>{basket.count}</p>
          </CountDiv>
          <PlusIcon fontSize="large"></PlusIcon>
        </CountBox>
        <PriceBox>
          <IconBox>
            <CloseOutlinedIcon sx={{ fontSize: "3rem", cursor: "pointer" }} />
          </IconBox>
          <PriceContent>{basket.price} 원</PriceContent>
          <h1 style={{ margin: 0 }}>{basket.price - basket.salePrice} 원</h1>
        </PriceBox>
      </TopBox>
      <BottomBox>
        <ProductPrice>{basket.price} 원 -</ProductPrice>
        <SaleProductPrice>할인 {basket.salePrice} 원</SaleProductPrice>
        <ProductPrice>= {basket.price - basket.salePrice} 원</ProductPrice>
      </BottomBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  border: 1px solid #aaaaaa;
  margin-bottom: 6rem;
  width: 90%;
  height: 24rem;
`;

const TopBox = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 2rem;
  height: 80%;
`;

const ProductImg = styled.img`
  width: 16rem;
  height: 15rem;
  border-radius: 1rem;
  object-fit: cover;
`;
const IntroBox = styled.div`
  width: 20%;
  padding: 2rem;
`;
const CountBox = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  padding: 2rem;
  margin-left: 2rem;
  font-size: 1rem;
  font-weight: bolder;
`;

const CountTitle = styled.p`
  padding: 0;
  margin: 0;
  width: 2rem;
`;

const MinusIcon = styled(RemoveOutlinedIcon)`
  border: 1px solid #aaaaaa;
  margin-left: 1rem;
  cursor: pointer;
`;

const CountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2.2rem;
  border: 1px solid #aaaaaa;
`;

const PlusIcon = styled(AddOutlinedIcon)`
  border: 1px solid #aaaaaa;
  cursor: pointer;
`;

const PriceBox = styled.div`
  width: 20%;
`;

const PriceContent = styled.h1`
  margin: 0;
  margin-top: 3rem;
  font-size: 1.5rem;
  text-decoration: line-through;
  color: #aaaaaa;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BottomBox = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  background-color: #fef5fa;
  height: 15%;
  border-radius: 0 0 2rem 2rem;
  border: 1px solid #aaaaaa;
`;

const ProductPrice = styled.p`
  padding: 0;
  margin: 0;
  font-size: 2rem;
  font-weight: bolder;
`;

const SaleProductPrice = styled.p`
  padding: 0;
  margin: 0;
  color: #cf0a0a;
  font-size: 2rem;
  font-weight: bolder;
  margin-left: 1rem;
  margin-right: 1rem;
`;
