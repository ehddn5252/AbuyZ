// React
import React, { useEffect, useState } from "react";

// MUI
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";
// StyledComponents
import styled from "styled-components";

// 하위 Components
import MyOrderItem from "./MyOrderItem";

export default function DeliveryList() {
  const [productList, setProductList] = useState([
    {
      productName: "제주 햇 감귤 4.5kg",
      price: "12,340 원",
      reviewCheck: false,
      dateOfPurchase: "2022.10.19",
    },
  ]); // eslint-disable-line no-unused-vars
  // const [productList, setProductList] = useState([]);
  useEffect(() => {
    setProductList([
      {
        productName: "제주 햇 감귤 4.5kg",
        price: "12,340 원",
        reviewCheck: false,
        dateOfPurchase: "2022.10.19",
      },
    ]);
  }, []);
  return (
    <MyOrderContainer>
      <MajorTitle>배송지관리</MajorTitle>
      <Hr />
      {productList.length === 0 ? (
        <BlankBox>
          <ShoppingCartOutlinedIcon sx={{ fontSize: "6rem" }} />
          <p>구매하신 상품이 없습니다</p>
        </BlankBox>
      ) : (
        <ProductListBox>
          <MyOrderItem product={productList[0]} />
          <MyOrderItem product={productList[0]} />
          <MyOrderItem product={productList[0]} />
          <MyOrderItem product={productList[0]} />
        </ProductListBox>
      )}
      {productList.length < 4 ? null : (
        <ButtonDiv>
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{ borderRadius: "3rem" }}
          >
            더보기
          </Button>
        </ButtonDiv>
      )}
    </MyOrderContainer>
  );
}

const MyOrderContainer = styled.div`
  margin-top: 4.5rem;
  margin-bottom: 4rem;
  height: 50rem;
  width: 56rem;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;
const Hr = styled.hr`
  height: 0.3rem;
  background: #7895b2;
  border-radius: 1rem;
`;
const BlankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  font-size: 3rem;
  font-weight: bolder;
  color: #aaaaaa;
`;

const ProductListBox = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
