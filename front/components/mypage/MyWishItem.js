// React
import React from "react";

// StyledComponents
import styled from "styled-components";

export default function MyWishItem(product) {
  return (
    <ItemContainer>
      <ProductImg src="/images/carrot.png" />

      <DateDiv>
        <p>{product.product.dateOfPurchase}</p>
      </DateDiv>

      <ProductIntro>{product.product.productName}</ProductIntro>
      <ProductIntro>{product.product.price}</ProductIntro>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 22rem;
  height: 22rem;
  object-fit: cover;
  border-radius: 2rem;
`;

const DateDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;
const ProductIntro = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  font-weight: bolder;
  padding-top: 1rem;
`;
