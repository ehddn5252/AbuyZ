// React
import React, { useEffect, useState } from "react";

// MUI
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";
// StyledComponents
import styled from "styled-components";
import { getOrderList } from "../../pages/api/order";

// 하위 Components
import MyOrderItem from "./MyOrderItem";

export default function MyOrderList() {
  // const [productList, setProductList] = useState([]);
  // 서버 500에러
  // const pproductlist = async () => {
  //   const res = await getOrderList();
  //   console.log(res.data);
  // };
  // useEffect(() => {
  //   pproductlist();
  // }, []);
  const [productList, setProductList] = useState([
    {
      productName: "제주 햇 감귤 4.5kg",
      price: 12000,
      reviewCheck: false,
      dateOfPurchase: "2022.10.19",
      options: "1등급/ 2kg 소분",
    },
    {
      productName: "맛있는 샌드위치",
      price: 13000,
      reviewCheck: true,
      dateOfPurchase: "2022.10.19",
      options: "치킨마요",
    },
  ]);
  useEffect(() => {
    setProductList([
      {
        productName: "제주 햇 감귤 4.5kg",
        price: 12000,
        reviewCheck: false,
        dateOfPurchase: "2022.10.19",
        options: "1등급/ 2kg 소분",
      },
      {
        productName: "맛있는 샌드위치",
        price: 13000,
        reviewCheck: true,
        dateOfPurchase: "2022.10.19",
        options: "치킨마요",
      },
    ]);
  }, []);
  return (
    <MyOrderContainer>
      <MajorTitle>주문/리뷰</MajorTitle>
      <Hr />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <span>총 주문 상품 건수: {productList.length}건</span>
      </div>
      {productList.length === 0 ? (
        <BlankBox>
          <ShoppingCartOutlinedIcon sx={{ fontSize: "6rem" }} />
          <p>구매하신 상품이 없습니다</p>
        </BlankBox>
      ) : (
        <ProductListBox>
          <MyOrderItem product={productList[0]} />
          <MyOrderItem product={productList[1]} />
        </ProductListBox>
      )}
      {productList.length < 4 ? null : (
        <ButtonDiv>
          <Button
            variant="contained"
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
  width: 100%;
  width: 56rem;
`;

const Hr = styled.hr`
  height: 0.3rem;
  background: #7895b2;
  border-radius: 1rem;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
  margin-top: 1rem;
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
  flex-direction: column;
  margin-top: 1rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
