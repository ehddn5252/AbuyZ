// React
import React from "react";

// MUI
import StarIcon from "@mui/icons-material/Star";

// StyledComponent
import styled from "styled-components";

// Next.js
import { useRouter } from "next/router";

export default function ProductItem({ product }) {
  const router = useRouter();
  const goDetail = () => {
    router.push(`/detail/${product.uid}`);
  };
  return (
    <Container>
      <ImgBox>
        <img
          onClick={goDetail}
          src={product.repImg}
          style={{ width: "250px", height: "300px", objectFit: "cover" }}
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
            {(
              product.price -
              product.discountRate * 0.01 * product.price
            ).toLocaleString("ko-KR")}{" "}
            원
          </PriceP>
        </div>

        {product.discountRate ? (
          <CancelP>{product.price.toLocaleString("ko-KR")} 원</CancelP>
        ) : null}
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
