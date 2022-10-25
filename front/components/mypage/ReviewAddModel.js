import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import styled from "styled-components";

export default function ReviewAddModel({ productName, productOptions }) {
  return (
    <Container>
      <span style={{ fontWeight: "bold", fontSize: "2rem" }}>리뷰 작성</span>
      <Box sx={{ display: "flex", marginTop: "3rem" }}>
        <ProductImg src={"images/sandwich.png"}></ProductImg>
        <ProductInfo>
          <span style={{ fontWeight: "bold" }}>{productName}</span>
          <span>{productOptions}</span>
        </ProductInfo>
        {/* <p>{product.productName}</p> */}
      </Box>
      <div style={{ marginTop: "4rem" }}>
        <span>별점등록</span>
        <RateContainer>
          <img
            src={"images/star.png"}
            style={{ width: "3rem", height: "3rem" }}
          ></img>
          <img
            src={"images/star.png"}
            style={{ width: "3rem", height: "3rem" }}
          ></img>
          <img
            src={"images/star.png"}
            style={{ width: "3rem", height: "3rem" }}
          ></img>
          <img
            src={"images/star.png"}
            style={{ width: "3rem", height: "3rem" }}
          ></img>
          <img
            src={"images/star.png"}
            style={{ width: "3rem", height: "3rem" }}
          ></img>
        </RateContainer>
      </div>
      <div style={{ marginTop: "4rem" }}>
        <span>리뷰 내용</span>
      </div>
      <AnswerDiv></AnswerDiv>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button variant="contained" sx={{ margin: "1rem" }}>
          등록
        </Button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 50rem;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
  padding: 2rem;
`;

const ProductImg = styled.img`
  width: 4rem;
  height: 5rem;
`;
const AnswerDiv = styled.textarea`
  width: 100%;
  height: 10rem;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-top: 1rem;
`;

const RateContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2rem;
`;
