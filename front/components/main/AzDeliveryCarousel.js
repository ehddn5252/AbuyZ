import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// API
import { getRandomProducts } from "../../pages/api/product";

// Next.js
import { useRouter } from "next/router";

export default function AzDeliveryCarousel() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

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
  }, []);

  return products ? (
    <Container>
      <BuContainer>
        <RecSpan>AZ배송</RecSpan>
        <span> 상품 구매시</span>
        <RecbuSpan>내일 오전 배송 출발 🐱‍🏍</RecbuSpan>
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
                          ((100 - product.discountRate) / 100).toFixed(0)
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
                <div
                  style={{
                    marginTop: "0.5rem",
                    marginLeft: "1.75rem",
                  }}
                >
                  <CardPPrice>
                    {product.price.toLocaleString("ko-KR")}원
                  </CardPPrice>
                </div>
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
  display: flex;
  justify-content: center;
  height: 30rem;
  width: 100%;
`;
const BuContainer = styled.div`
  height: 100%;
  width: 70rem;
`;
const DiscountContainer = styled.div`
  margin-top: 1rem;
  margin-left: 1.75rem;
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
const CardImg = styled.img`
  width: 90%;
  height: 90%;
  margin: 0 auto;
  width: 14rem;
  height: 16rem;
  object-fit: cover;
`;

const CardDiscountCont = styled.div`
  display: flex;
  align-items: end;
  text-align: start;
  flex: 1;
`;

const NameContainer = styled.div`
  margin-left: 1.75rem;
  width: 80%;
  height: 3rem;
  margin-top: 0.5rem;
`;
const CardName = styled.span`
  font-size: 1rem;
  font-weight: bolder;
`;
const CardDiscount = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-right: 0rem;
  margin-top: 0;
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
