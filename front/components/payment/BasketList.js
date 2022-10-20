// React
import React, { useEffect, useState } from "react";

// MUI
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// StyeldComponet
import styled from "styled-components";

// 하위 Components
import BasketItem from "./BasketItem";

export default function BasketList() {
  const [basketList, setBasketList] = useState([]);

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
  width: 100%;
`;

const BasketBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  margin-left: 3rem;
  width: 90%;
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
