// React
import React from "react";

// StyledComponents
import styled from "styled-components";

export default function MyWishItem(product) {
  return (
    <ItemContainer>
      <ProductImg src="/images/sandwich.png" />
      <ProductName>{product.product.productName}</ProductName>
      {product.product.discount != null ? (
        <div>
          <InfoText>
            <div
              style={{
                display: "flex",
                alignItems: "end",
                flex: 2,
              }}
            >
              <Discount>{product.product.discount}%</Discount>
            </div>
            <div style={{ flex: 5 }}>
              <CardPrice>
                {(
                  product.product.price *
                  ((100 - product.product.discount) / 100)
                ).toLocaleString("ko-KR")}
                원
              </CardPrice>
            </div>
          </InfoText>
          <div style={{ marginTop: "1rem" }}>
            <CardPriceBD>
              {product.product.price.toLocaleString("ko-KR")}원
            </CardPriceBD>
          </div>
        </div>
      ) : (
        <div>
          <div>{product.product.price.toLocaleString("ko-KR")}원</div>
        </div>
      )}
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.3rem;
`;

const ProductImg = styled.img`
  width: 14rem;
  height: 16rem;
  object-fit: cover;
`;

const ProductName = styled.span`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bolder;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;
const Discount = styled.p`
  font-size: 1rem;
  font-weight: bolder;
  margin-right: 0rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #56a9f1;
  text-align: end;
  vertical-align: bottom;
`;

const CardPriceBD = styled.p`
  font-size: 1rem;
  font-weight: bolder;
  margin-right: 0.5rem;
  margin-top: 0;
  margin-bottom: 0;
  text-decoration: line-through;
  text-decoration-color: #aaaaaa;
  color: #aaaaaa;
  margin-top: 0.5rem;
`;

const CardPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-right: 1.5rem;
  margin-top: 0;
  margin-bottom: 0;
`;
