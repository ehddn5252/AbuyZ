// React
import React, { useEffect, useState } from "react";

// MUI
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Button from "@mui/material/Button";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import MyReviewItem from "./MyReviewItem";

export default function CanReview() {
  const [productList, setProductList] = useState([
    {
      productName: "제주 햇 감귤 4.5kg",
      price: 12000,
      dateOfPurchase: "2022.10.19",
      discount: 30,
      options: "1등급 감귤 / 2kg",
    },
  ]); // eslint-disable-line no-unused-vars
  // const [productList, setProductList] = useState([]);const [productList, setProductList] = useState([]);
  useEffect(() => {
    setProductList([
      {
        productName: "제주 햇 감귤 4.5kg",
        price: 12000,
        dateOfPurchase: "2022.10.19",
        discount: 30,
        options: "1등급 감귤 / 2kg",
      },
    ]);
  }, []);
  return (
    <MyOrderContainer>
      <MajorTitle>작성 가능한 리뷰</MajorTitle>
      <hr
        style={{
          height: "0.3rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />
      {productList.length ? (
        <ProductListBox>
          <MyReviewItem product={productList[0]} />
          <MyReviewItem product={productList[0]} />
          <MyReviewItem product={productList[0]} />
          <MyReviewItem product={productList[0]} />
        </ProductListBox>
      ) : (
        <BlankBox>
          <FavoriteBorderOutlinedIcon sx={{ fontSize: "6rem" }} />
          <p>찜한 상품이 없습니다</p>
        </BlankBox>
      )}
    </MyOrderContainer>
  );
}

const MyOrderContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 100%;
`;

const MajorTitle = styled.h1`
  font-size: 2rem;
`;

const ProductListBox = styled.div`
  display: flex;
  flex-direction: column;
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

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
