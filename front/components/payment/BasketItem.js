// React
import React, { useEffect, useState } from "react";

// MUI
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckBox from "@mui/material/Checkbox";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

// StyeldComponet
import styled from "styled-components";

// API
import { changeCart, delcart } from "../../pages/api/cart";

export default function BasketItem({ basket, setReload, reload }) {
  const [ccount, setCcount] = useState(basket.productCount);
  const [option, setOption] = useState([]);
  const [bp, setBp] = useState(basket.productDto.price);
  const minus = () => {
    if (ccount > 0) {
      setCcount(ccount - 1);
    }
  };

  const changeCart1 = async () => {
    const cartDto = {
      cartUid: basket.uid,
      productCount: ccount,
    };
    await changeCart(cartDto);
    if (reload === true) {
      setReload(false);
    } else {
      setReload(true);
    }
  };
  useEffect(() => {
    setOption(basket.inventoryDto.productOptions);
  }, []);

  const deleteCart = async () => {
    const res = await delcart(basket.uid);
    if (reload === true) {
      setReload(false);
    } else {
      setReload(true);
    }
  };
  useEffect(() => {
    changeCart1();
  }, [ccount]);

  return basket ? (
    <Container>
      <CheckDiv>
        <CheckBox defaultChecked></CheckBox>
      </CheckDiv>
      <ImageDiv>
        <img
          src={basket.productDto.descriptionImg}
          style={{ width: "6rem", height: "auto", objectFit: "cover" }}
        />
      </ImageDiv>
      <ContentDiv>
        <ContentBox>{basket.productDto.name}</ContentBox>
        {basket.option}
        <ContentOption>
          {option.map((e, idx) => (
            <p key={idx} style={{ margin: 0 }}>
              <span>{Object.keys(e)} : </span>
              <span>{Object.values(e)}</span>
            </p>
          ))}
        </ContentOption>
      </ContentDiv>
      <CountDiv>
        <CountDiv2>
          {ccount == 0 ? (
            <RemoveIcon fontSize="small" color="disabled" />
          ) : (
            <RemoveIcon fontSize="small" onClick={minus} />
          )}

          <CountBox>{ccount}</CountBox>
          <AddIcon fontSize="small" onClick={() => setCcount(ccount + 1)} />
        </CountDiv2>
      </CountDiv>
      <PriceDiv>
        {basket.productDto.discountRate !== 0 ? (
          <p
            style={{
              textDecoration: "line-through",
              color: "#AAAAAA",
              fontSize: "1rem",
              margin: "0",
              marginTop: "2.3rem",
            }}
          >
            {(ccount * bp).toLocaleString("ko-KR")}원
          </p>
        ) : null}

        <p
          style={{
            fontSize: "1.5rem",
            margin: "0",
            fontWeight: "bold",
          }}
        >
          {(
            ccount *
            bp *
            ((100 - basket.productDto.discountRate) / 100)
          ).toLocaleString("ko-KR")}
          원
        </p>
      </PriceDiv>
      <CloseDiv>
        <CloseOutlinedIcon onClick={deleteCart} sx={{ cursor: "pointer" }} />
      </CloseDiv>
    </Container>
  ) : null;
}

const Container = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #56a9f1;
  margin-bottom: 2rem;
  width: 95%;
  height: 12rem;
`;

const CheckDiv = styled.div`
  width: 8%;
  height: 100%;
`;

const ImageDiv = styled.div`
  display: flex;
  align-items: center;
  width: 15%;
  height: 100%;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  height: 100%;
`;

const ContentBox = styled.div`
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
`;

const ContentOption = styled.div`
  margin: 0;
  font-size: 1rem;
  margin-top: 1rem;
`;

const CountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 15%;
`;

const CountDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: 80%;
  border: 1px solid #aaaaaa;
`;
const CountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 1.55rem;
  text-align: center;
  padding: 1rem;
`;

const PriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 20%;
  margin-left: 3rem;
`;

const CloseDiv = styled.div`
  display: flex;
  width: 5%;
  justify-content: flex-end;
`;
