// React
import React, { useEffect, useState } from "react";

// MUI
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckBox from "@mui/material/Checkbox";

// StyeldComponet
import styled from "styled-components";

// 하위 Components
import BasketItem from "./BasketItem";

// API
import { cartlist } from "../../pages/api/cart.js";

// State
import { basketProducts } from "../../states";
import { useRecoilState } from "recoil";

export default function BasketList() {
  const [basketList, setBasketList] = useState([]);
  const [reload, setReload] = useState(false);
  const [globalbasketList, setGlobalbasketList] =
    useRecoilState(basketProducts);
  // 장바구니 조회
  const cartllist = async () => {
    const res = await cartlist();
    setBasketList(res.data);
    setGlobalbasketList(res.data);
  };

  useEffect(() => {
    cartllist();
  }, [reload]);

  return (
    <Container>
      {basketList.length ? (
        <BasketBox>
          <CheckDiv>
            <CheckBox defaultChecked />
            <p style={{ fontSize: "1.4rem" }}>전체 선택 (2/2)</p>
          </CheckDiv>
          {basketList.map((e, idx) => (
            <BasketItem
              key={idx}
              basket={e}
              setReload={setReload}
              reload={reload}
            />
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
