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
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <StarIcon sx={{ color: "#ffc107" }} />
          <p style={{ margin: 0 }}>{product.reviewRate}</p>
          {product.reviewNum ? (
            <p style={{ margin: 0 }}>({product.reviewNum})</p>
          ) : (
            <p style={{ margin: 0 }}>(0)</p>
          )}
        </div>

        <p style={{ height: "2rem" }}>{product.name}</p>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}
        >
          {product.discountRate ? (
            <DiscountP>{product.discountRate}%</DiscountP>
          ) : (
            <DiscountP></DiscountP>
          )}
          <PriceP>
            {product.price - product.discountRate * 0.01 * product.price} 원
          </PriceP>
        </div>

        {product.discountRate ? <CancelP>{product.price} 원</CancelP> : null}
      </ContentBox>
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

const CancelP = styled.p`
  text-decoration: line-through;
  color: #746d5d;
  margin: 0;
`;

const PriceP = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const DiscountP = styled.p`
  margin: 0;
  color: #56a9f1;
`;
