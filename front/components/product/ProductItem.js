import React from "react";
import Image from "next/image";
import MilkImage from "../../public/images/milk.png";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";
export default function ProductItem({ product }) {
  return (
    <Container>
      <ImgBox>
        <Image src={MilkImage} width={350} height={350} />
      </ImgBox>
      <ContentBox>
        <div style={{ display: "flex", alignItems: "center" }}>
          <StarIcon sx={{ color: "#ffc107" }} />
          <p>{product.review_score}</p>
          <p>({product.review_count})</p>
        </div>

        <p style={{ height: "2rem" }}>{product.product_name}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          {product.sale_radio ? <p>{product.sale_radio}</p> : <p></p>}
          <p>{product.price - product.sale_radio * 0.01 * product.price}</p>
        </div>

        {product.sale_radio ? <p>{product.price}</p> : null}
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
  width: 100%;
  flex-direction: column;
`;

const PriceBox = styled.div``;
