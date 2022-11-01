// React
import React, { useEffect, useState } from "react";
import axios from "axios";
// MUI
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckBox from "@mui/material/Checkbox";
// StyeldComponet
import styled from "styled-components";

// 하위 Components
import BasketItem from "./BasketItem";

export default function BasketList() {
  const [basketList, setBasketList] = useState([]);

  const [data, setData] = useState("");

  async function getData() {
    try {
      const response = await axios.get(
        "https://k7e201.p.ssafy.io:8081/api/cart"
      );
      const res = response.data;
      setData(res);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  useEffect(() => {
    setBasketList([
      {
        name: "제주 햇 감귤 4.5kg",
        option: "0.5kg 추가",
        count: 1,
        price: 12340,
        salePrice: 340,
      },
    ]);
  }, []);
  return (
    <Container>
      {basketList.length ? (
        <BasketBox>
          <CheckDiv>
            <CheckBox defaultChecked />
            <p style={{ fontSize: "1.4rem" }}>전체 선택 (2/2)</p>
          </CheckDiv>
          <BasketItem basket={basketList[0]} />
          <BasketItem basket={basketList[0]} />
        </BasketBox>
      ) : (
        <BlankBox>
          <ShoppingCartOutlinedIcon sx={{ fontSize: "6rem" }} />
          <p>장바구니에 담긴 상품이 없습니다</p>
        </BlankBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 70%;
`;

const BasketBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const CheckDiv = styled.div`
  display: flex;
`;

const BlankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30rem;
  font-size: 3rem;
  font-weight: bolder;
  color: #aaaaaa;
`;
