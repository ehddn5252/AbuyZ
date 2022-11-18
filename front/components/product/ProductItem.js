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
  return product ? (
    <Container>
      <ImgBox>
        <img
          onClick={goDetail}
          src={product.repImg}
          style={{ width: "15rem", height: "17rem", objectFit: "cover" }}
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

        {product.name?.length > 35 ? (
          <p style={{ height: "2rem" }}>{product.name.slice(0, 35)}...</p>
        ) : (
          <p style={{ height: "2rem" }}>{product.name}</p>
        )}

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}
        >
          {product.discountRate > 0 ? (
            <DiscountContainer>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <CardDiscountCont>
                  <CardDiscount>{product.discountRate}%</CardDiscount>
                </CardDiscountCont>
                <Flexfive>
                  <CardPrice>
                    {(product.price * ((100 - product.discountRate) / 100))
                      .toFixed(0)
                      .toLocaleString("ko-KR")}
                    원
                  </CardPrice>
                </Flexfive>
              </div>
              <div>
                <CardPriceBD>
                  {product.price.toLocaleString("ko-KR")}원
                </CardPriceBD>
              </div>
            </DiscountContainer>
          ) : (
            <div>
              <NoDiscount>
                {product.price?.toLocaleString("ko-KR")}원
              </NoDiscount>
            </div>
          )}
        </div>
      </ContentBox>
    </Container>
  ) : null;
}

const DiscountContainer = styled.div``;

const CardDiscount = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-right: 0.5rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #56a9f1;
  text-align: end;
  vertical-align: bottom;
`;

const NoDiscount = styled.span`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-bottom: 0;
  color: black;
`;
const Flexfive = styled.div`
  flex: 5;
  display: flex;
  align-items: flex-end;
`;
const CardDiscountCont = styled.div`
  display: flex;
  align-items: end;
  text-align: start;
  flex: 1;
`;
const CardPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-bottom: 0;
  width: 100%;
`;
const CardPriceBD = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-bottom: 0;
  text-decoration: line-through;
  text-decoration-color: #aaaaaa;
  color: #aaaaaa;
`;

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

const DiscountP = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-right: 0rem;
  margin-top: 0;
  margin-bottom: 0;
  color: #56a9f1;
  text-align: end;
  vertical-align: bottom;
`;
