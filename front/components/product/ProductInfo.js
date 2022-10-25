// React
import React, { useState } from "react";

// MUI
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// StyleComponent
import styled from "styled-components";

export default function ProductInfo() {
  const [wish, setWish] = useState(false);
  const colorList = () => [
    { label: "화이트" },
    { label: "블랙" },
    { label: "레드" },
  ];
  const sizeList = () => [
    { label: "XL" },
    { label: "L" },
    { label: "M" },
    { label: "S" },
  ];
  const changeWish = () => {
    if (wish) setWish(false);
    else setWish(true);
  };
  return (
    <Container>
      <ImgBox>
        <MajorImgBox>
          <MajorImg src="/images/cloth.png" />
        </MajorImgBox>
        <SubImgBox>
          <SubImg src="/images/cloth1.png" />
          <SubImg src="/images/cloth2.png" />
        </SubImgBox>
      </ImgBox>
      <InfoBox>
        <TitleBox>
          <TitleDiv>
            <p
              style={{ margin: 0, marginBottom: "0.5rem", fontSize: "1.3rem" }}
            >
              JEEP
            </p>
            <p style={{ margin: 0, marginBottom: "0.5rem", fontSize: "2rem" }}>
              지프 키즈 맨투맨
            </p>
            <p style={{ margin: 0 }}>
              <StarPurple500Icon color="error" />
              3.8(105)
            </p>
          </TitleDiv>
          <IconBox onClick={changeWish}>
            {wish ? (
              <FavoriteIcon color="error" fontSize="large" />
            ) : (
              <FavoriteBorderIcon color="error" fontSize="large" />
            )}
          </IconBox>
        </TitleBox>
        <hr />
        <PriceBox>
          <PriceTop>
            <p style={{ margin: 0, color: "red", marginRight: "0.5rem" }}>
              61%
            </p>
            <p style={{ margin: 0 }}>23,010원</p>
          </PriceTop>
          <PriceBottom>
            <p style={{ margin: 0, marginRight: "0.5rem" }}>35,400원</p>
            <p style={{ margin: 0, textDecoration: "line-through" }}>
              59,000원
            </p>
          </PriceBottom>
        </PriceBox>
        <OptionBox>
          <Option>
            <p style={{ width: "20%" }}>수량</p>
            <MinusIcon></MinusIcon>
            <CountDiv>
              <p>1</p>
            </CountDiv>
            <PlusIcon></PlusIcon>
          </Option>
          <Option>
            <p style={{ width: "20%" }}>사이즈</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={colorList()}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue="-"
            />
          </Option>
          <Option>
            <p style={{ width: "20%" }}>컬러</p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={sizeList()}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue="-"
            />
          </Option>
          <Option>
            <p style={{ width: "20%" }}>선택옵션</p>
            <p>XL/블랙</p>
          </Option>
          <Option>
            <p style={{ width: "20%" }}>배송비</p>
            <p>3,000원</p>
          </Option>
        </OptionBox>
        <ButtonBox>
          <BuyButton>장바구니</BuyButton>
          <BuyButton>구매하기</BuyButton>
        </ButtonBox>
      </InfoBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 2rem;
`;
// Image
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const MajorImgBox = styled.div``;

const MajorImg = styled.img`
  width: 24rem;
  margin: 0.5rem;
  object-fit: cover;
`;

const SubImgBox = styled.div`
  display: flex;
  margin: 0.5rem;
`;
const SubImg = styled.img`
  width: 5rem;
  margin-right: 1rem;
  object-fit: cover;
`;

// Info
const InfoBox = styled.div`
  width: 50%;
`;

// Title
const TitleBox = styled.div`
  display: flex;
  width: 100%;
`;

const TitleDiv = styled.div`
  width: 80%;
`;
const IconBox = styled.div`
  width: 20%;
`;
const PriceBox = styled.div`
  margin-top: 1rem;
`;

const PriceTop = styled.div`
  display: flex;
  font-size: 1.8rem;
`;
const PriceBottom = styled.div`
  display: flex;
  font-size: 1rem;
  color: #aaa;
`;

// Option
const OptionBox = styled.div``;

const Option = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const MinusIcon = styled(RemoveOutlinedIcon)`
  border: 1px solid #aaaaaa;
  margin-top: 0.7rem;
  cursor: pointer;
`;

const CountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.5rem;
  margin-top: 0.7rem;
  height: 1.5rem;
  border: 1px solid #aaaaaa;
`;

const PlusIcon = styled(AddOutlinedIcon)`
  border: 1px solid #aaaaaa;
  margin-top: 0.7rem;
  cursor: pointer;
`;

// Button

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const BuyButton = styled.button`
  border: 0;
  border-radius: 0.5rem;
  width: 20%;
  height: 2rem;
  background-color: #ff9494;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;
