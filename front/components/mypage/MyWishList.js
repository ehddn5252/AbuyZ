// React
import React, { useEffect, useState } from "react";

// MUI
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Button from "@mui/material/Button";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import MyWishItem from "./MyWishItem";

export default function MyWishList() {
  const [productList, setProductList] = useState([
    {
      productName: "제주 햇 감귤 4.5kg",
      price: "12,340 원",
      reviewCheck: false,
      dateOfPurchase: "2022.10.19",
    },
  ]); // eslint-disable-line no-unused-vars
  // const [productList, setProductList] = useState([]);const [productList, setProductList] = useState([]);
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
      <MajorTitle>찜한 상품 내역</MajorTitle>
      <hr
        style={{
          height: "0.5rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />
      {productList.length ? (
        <ProductListBox>
          <MyWishItem product={productList[0]} />
          <MyWishItem product={productList[0]} />
          <MyWishItem product={productList[0]} />
          <MyWishItem product={productList[0]} />
        </ProductListBox>
      ) : (
        <BlankBox>
          <FavoriteBorderOutlinedIcon sx={{ fontSize: "6rem" }} />
          <p>찜한 상품이 없습니다</p>
        </BlankBox>
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
  margin-top: 10rem;
  width: 100%;
`;

const MajorTitle = styled.h1`
  font-size: 2rem;
`;

const ProductListBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 3rem;
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
