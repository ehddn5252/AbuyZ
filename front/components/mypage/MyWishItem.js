// React
import React from "react";

// StyledComponents
import styled from "styled-components";

// next.js router
import { useRouter } from "next/router";

//mui
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

// api
import { delwish } from "../../pages/api/wish";

export default function MyWishItem(product) {
  const router = useRouter();

  const deletezzim = async () => {
    const res = await delwish(product.product.wish_uid);
    router.reload();
  };

  const goDetail = () => {
    router.push(`/detail/${product.product.product_uid}`);
  };

  return (
    <ItemContainer>
      <ProductImg src={product.product.img_url} onClick={goDetail} />

      <FavoriteRoundedIcon
        style={{
          color: "red",
          position: "absolute",
          bottom: "38%",
          right: "14%",
          fontSize: "3rem",
        }}
        onClick={() => deletezzim()}
      ></FavoriteRoundedIcon>

      {product.product.product_name.length >= 35 ? (
        <div>
          <ProductName>
            {product.product.product_name.slice(0, 35)}...
          </ProductName>
        </div>
      ) : (
        <ProductName>{product.product.product_name}</ProductName>
      )}

      {product.product.discountRate > 0 ? (
        <DiscountContainer>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Flextwo>
              <Discount>{product.product.discountRate}%</Discount>
            </Flextwo>
            <Flexfive>
              <CardPrice>
                {(
                  product.product.price *
                  ((100 - product.product.discountRate) / 100)
                ).toLocaleString("ko-KR")}
                원
              </CardPrice>
            </Flexfive>
          </div>
          <CardPriceBD>
            {product.product.price.toLocaleString("ko-KR")}원
          </CardPriceBD>
        </DiscountContainer>
      ) : (
        <DiscountContainer>
          <CardPrice>
            {product.product.price.toLocaleString("ko-KR")}원
          </CardPrice>
        </DiscountContainer>
      )}
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.3rem;
  position: relative;
`;

const ProductImg = styled.img`
  width: 12rem;
  height: 14rem;
  object-fit: cover;
`;

const ProductName = styled.span`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bolder;
`;

const CardPriceBD = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-bottom: 0;
  text-decoration: line-through;
  text-decoration-color: #aaaaaa;
  color: #aaaaaa;
`;

const Discount = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-bottom: 0;
  color: #56a9f1;
  text-align: end;
  vertical-align: bottom;
`;

const CardPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-right: 1.5rem;
  margin-bottom: 0;
`;

const DiscountContainer = styled.div`
  margin-top: 1rem;
`;

const FirstPriceContainer = styled.div`
  margin-top: 0.3rem;
`;

const Flextwo = styled.div`
  display: flex;
  align-items: end;
  text-align: start;
  flex: 1;
`;

const Flexfive = styled.div`
  flex: 5;
  display: flex;
  align-items: flex-end;
`;
