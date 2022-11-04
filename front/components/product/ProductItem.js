import React from "react";
import Image from "next/image";
import MilkImage from "../../public/images/milk.png";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";
export default function ProductItem({ product }) {
  return (
    <Container>
      <ImgBox>
        <img
          src={product.repImg}
          style={{ width: "250px", height: "auto", objectFit: "cover" }}
        />
      </ImgBox>
      <ContentBox>
        <div style={{ display: "flex", alignItems: "center" }}>
          <StarIcon sx={{ color: "#ffc107" }} />
          <p>{product.reviewRate}</p>
          {product.reviewNum ? <p>({product.reviewNum})</p> : <p>(0)</p>}
        </div>

        <p style={{ height: "2rem" }}>{product.name}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          {product.discountRate ? <p>{product.discountRate}%</p> : <p></p>}
          <p>
            {product.price - product.discountRate * 0.01 * product.price} 원
          </p>
        </div>

        {product.discountRate ? <p>{product.price} 원</p> : null}
      </ContentBox>
      <PriceBox></PriceBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ImgBox = styled.div`
  width: 90%;
`;

const ContentBox = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
`;

const PriceBox = styled.div``;
