// React
import React, { useEffect, useState } from "react";
import { cartlist } from "../../pages/api/cart.js";
// MUI
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckBox from "@mui/material/Checkbox";
// StyeldComponet
import styled from "styled-components";

// 하위 Components
import BasketItem from "./BasketItem";
export default function BasketList() {
  // const cartllist = async () => {
  //   const res = await cartlist();
  //   console.log(res);
  // };

  // useEffect(() => {
  //   cartllist();
  // });
  const [basketList, setBasketList] = useState([
    {
      name: "제주 햇 감귤 4.5kg",
      option: "0.5kg 추가",
      count: 3,
      price: 12340,
      salePrice: 5340,
      img: "/images/cloth.png",
    },
    {
      name: "냠냠 맛있는 샌드위치",
      option: "치킨마요",
      count: 5,
      price: 12340,
      salePrice: 6340,
      img: "/images/sandwich.png",
    },
  ]);

  useEffect(() => {
    setBasketList([
      {
        name: "제주 햇 감귤 4.5kg",
        option: "0.5kg 추가",
        count: 3,
        price: 12340,
        salePrice: 5340,
        img: "/images/cloth.png",
      },
      {
        name: "냠냠 맛있는 샌드위치",
        option: "치킨마요",
        count: 5,
        price: 12340,
        salePrice: 6340,
        img: "/images/sandwich.png",
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
          {basketList.map((e) => (
            <BasketItem basket={e} />
          ))}
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
  width: 75%;
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
