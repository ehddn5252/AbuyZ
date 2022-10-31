import React from "react";
import styled from "styled-components";
import { ContainerBox } from "./AddEditCategory";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function SaleProductImage() {
  return (
    <ContainerBox>
      <h1 style={{ paddingLeft: "2rem" }}>상품 이미지</h1>
      <hr style={{ background: "#ff9494", width: "95%" }}></hr>
      <ImageBox>
        <Title>대표이미지</Title>
        <Box component="span" sx={{ p: "5rem", border: "1px dashed grey" }}>
          <Button sx={{ fontSize: "1.5rem" }}>Save</Button>
        </Box>
      </ImageBox>
      <ImageBox>
        <Title>추가이미지</Title>
        <Box component="span" sx={{ p: "5rem", border: "1px dashed grey" }}>
          <Button sx={{ fontSize: "1.5rem" }}>Save</Button>
        </Box>
      </ImageBox>
      <ImageBox>
        <Title>상세설명</Title>
        <Box component="span" sx={{ p: "5rem", border: "1px dashed grey" }}>
          <Button sx={{ fontSize: "1.5rem" }}>Save</Button>
        </Box>
      </ImageBox>
    </ContainerBox>
  );
}

const ImageBox = styled.div`
  display: flex;
  padding-left: 3rem;
  margin-top: 2rem;
  align-items: flex-start;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 800;
  margin-right: 3rem;
  margin-top: 0;
  width: 10rem;
`;
