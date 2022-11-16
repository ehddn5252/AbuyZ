import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// API
import { getMyInfo } from "../../pages/api/user";
import { getRandomProducts } from "../../pages/api/product";

// Next.js
import { useRouter } from "next/router";
export default function ProductCarousel() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);
  const [productid, setProductId] = useState("");
  const uuser = async () => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        const res = await getMyInfo();
        setUser(res.data.name);
      }
    }
  };
  const settings = {
    // dots: true,
    infinite: true,
    // autoplay: true,
    // autoplayspeed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const getProducts = async () => {
    const res = await getRandomProducts();
    setProducts(res.data);
  };

  const goDetail = (product) => {
    router.push(`/detail/${product.uid}`);
  };
  useEffect(() => {
    getProducts();
    uuser();
  }, []);
  return products ? (
    <Container>
      <BuContainer>
        <RecSpan>{user}</RecSpan>
        <span>님을 위한</span>
        <RecbuSpan>추천 상품</RecbuSpan>
        <StyledSlider {...settings} style={{ marginTop: "2rem" }}>
          {products.map((product, idx) => (
            <div
              style={{ cursor: "pointer" }}
              key={idx}
              onClick={(e) => goDetail(product)}
            >
              <CardImg alt="추천상품" src={product.repImg} />
              {product.name.length >= 30 ? (
                <NameContainer>
                  <CardName>{product.name.slice(0, 30)}...</CardName>
                </NameContainer>
              ) : (
                <NameContainer>
                  <CardName>{product.name}</CardName>
                </NameContainer>
              )}

              {product.discountRate > 0 ? (
                <DiscountContainer>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <CardDiscountCont>
                      <CardDiscount>{product.discountRate}%</CardDiscount>
                    </CardDiscountCont>
                    <Flexfive>
                      <CardPrice>
                        {(
                          product.price *
                          ((100 - product.discountRate) / 100)
                        ).toLocaleString("ko-KR")}
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
                <NoDiscountContainer>
                  <CardPPrice>
                    {product.price.toLocaleString("ko-KR")}원
                  </CardPPrice>
                </NoDiscountContainer>
              )}
            </div>
          ))}
        </StyledSlider>
      </BuContainer>
    </Container>
  ) : null;
}

const Flexfive = styled.div`
  flex: 5;
  display: flex;
  align-items: flex-end;
`;
const Container = styled.div`
  height: 30rem;
  width: 70rem;
  margin-left: 25rem;
`;

const Flextwo = styled.div`
  display: flex;
  align-items: end;
  text-align: start;
  flex: 1;
`;

const BuContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const RecSpan = styled.span`
  margin-left: 1.7rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #56a9f1;
`;

const RecbuSpan = styled.span`
  margin-left: 0.3rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: #56a9f1;
`;

const NameContainer = styled.div`
  margin-left: 1.75rem;
  width: 80%;
  height: 3rem;
  margin-top: 0.5rem;
`;
const CardImg = styled.img`
  width: 90%;
  height: 90%;
  margin: 0 auto;
  width: 14rem;
  height: 16rem;
  object-fit: cover;
`;

const CardName = styled.span`
  font-size: 1rem;
  font-weight: bolder;
`;

const DiscountContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  margin-left: 1.75rem;
`;

const NoDiscountContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
const CardDiscount = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-bottom: 0;
  color: #56a9f1;
  text-align: end;
  vertical-align: bottom;
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
  margin-right: 1.5rem;
  margin-bottom: 0;
`;
const CardPriceBD = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-bottom: 0;
  text-decoration: line-through;
  text-decoration-color: #aaaaaa;
  color: #aaaaaa;
`;

const CardPPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-right: 1.5rem;
  margin-bottom: 0;
  margin-left: 1.75rem;
`;

const StyledSlider = styled(Slider)`
  position: "relative";
  .slick-list {
    //슬라이드 스크린
    width: 100%;
    height: 100%;
  }

  .slick-slide div {
    //슬라이더  컨텐츠
    /* cursor: pointer;
    margin: 0 auto; */
  }

  .slick-dots {
    //현재위치 닷
    /* bottom: 20px;
    margin-top: 200px; */
  }

  .slick-track {
    //이건 잘 모르겠음
    width: 100%;
  }

  .slick-prev {
    /* left: 30px; */
    /* /*  */
    &:before {
      position: absolute;
      top: -2rem;
      left: 0rem;
      color: #aaaaaa;
      font-size: xx-large;
    }
  }

  .slick-next {
    /* right: 30px; */
    &:before {
      position: absolute;
      top: -2rem;
      right: 0rem;
      color: #aaaaaa;
      font-size: xx-large;
    }
  }
`;
