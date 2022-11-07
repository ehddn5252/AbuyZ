// React
import React from "react";

// StyledComponents
import styled from "styled-components";

// api
import { delwish } from "../../pages/api/wish";

export default function MyWishItem(product) {
  const deletezzim = async () => {
    const res = await delwish(product.product.wish_uid);
    console.log(res);
    router.reload();
  };

  return (
    <ItemContainer>
      <ProductImg src={product.product.img_url} />
      <button onClick={() => deletezzim()}>찜 삭제</button>

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
  position: "relative";
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
