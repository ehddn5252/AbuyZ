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
          bottom: "25%",
          right: "14%",
          fontSize: "3rem",
        }}
        onClick={() => deletezzim()}
      ></FavoriteRoundedIcon>

      {product.product.product_name.length > 15 ? (
        <div>
          <ProductName>{product.product.product_name.slice(0, 17)}</ProductName>
          <br></br>
          <ProductName>
            {product.product.product_name.slice(17, 30)}...
          </ProductName>
        </div>
      ) : (
        <ProductName>{product.product.product_name}</ProductName>
      )}

      <div>
        {/* <InfoText>
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
        </InfoText> */}
        <div style={{ marginTop: "1rem" }}>
          <CardPriceBD>
            {product.product.price.toLocaleString("ko-KR")}원
          </CardPriceBD>
        </div>
      </div>
      {/* {product.product.discount != null ? (
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
      )} */}
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
