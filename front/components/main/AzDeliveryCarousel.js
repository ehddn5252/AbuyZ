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
    autoplay: true,
    autoplayspeed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const array = [
    { name: "당근", price: 690, grade: 4.0, reviews: 100, discount: 20 },
    { name: "우유", price: 3500, grade: 4.4, reviews: 30 },
    { name: "감자", price: 3900, grade: 3.5, reviews: 6 },
    { name: "계란", price: 6990, grade: 5.0, reviews: 200 },
    { name: "새우", price: 1060, grade: 4.0, reviews: 1000 },
    { name: "데님 바지", price: 2390, grade: 2.5, reviews: 150 },
    { name: "피지오겔 로션", price: 1090, grade: 3.7, reviews: 32 },
    { name: "패드", price: 6090, grade: 4.5, reviews: 9 },
    { name: "신발", price: 12399, grade: 4.8, reviews: 87 },
    { name: "음료", price: 1000, grade: 4.9, reviews: 222 },
  ];

  const getProducts = async () => {
    const res = await getRandomProducts();
    setProducts(res.data);
  };

  const goDetail = (uid) => {
    router.push(`/detail/${uid}`);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return products ? (
    <Container>
      <div
        style={{
          // backgroundColor: "#ccf2f4",
          height: "100%",
          with: "100%",
        }}
      >
        <span
          style={{
            marginLeft: "1.5rem",
            fontSize: "1.5rem",
            color: "#56a9f1",
            fontWeight: "bold",
          }}
        >
          AZ배송
        </span>
        <span> 상품 구매시</span>
        <span style={{ fontSize: "1.3rem", color: "#56a9f1" }}>
          {" "}
          내일 오전 배송 출발 🐱‍🏍
        </span>
        <StyledSlider {...settings} style={{ marginTop: "2rem" }}>
          {products.map((product, idx) => (
            <div style={{ cursor: "pointer" }} key={idx} onClick={goDetail}>
              <CardImg
                alt="추천상품"
                src={product.repImg}
                style={{
                  width: "14rem",
                  height: "16rem",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  display: "flex",
                  marginTop: "0",
                  marginBottom: "0",
                  alignItems: "center",

                  marginLeft: "1.5rem",
                }}
              >
                <CardName>{product.name}</CardName>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "0",
                  marginBottom: "0",
                  alignItems: "center",
                  marginLeft: "1.5rem",
                }}
              >
                {product.discount != null ? (
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "end",
                          flex: 2,
                        }}
                      >
                        <CardDiscount>{product.discountRate}%</CardDiscount>
                      </div>
                      <div style={{ flex: 5 }}>
                        <CardPrice>
                          {(
                            product.price *
                            ((100 - product.discountRate) / 100)
                          ).toLocaleString("ko-KR")}
                          원
                        </CardPrice>
                      </div>
                    </div>
                    <div>
                      <CardPriceBD>
                        {product.price.toLocaleString("ko-KR")}원
                      </CardPriceBD>
                    </div>
                  </div>
                ) : (
                  <div>
                    <CardPPrice>
                      {product.price.toLocaleString("ko-KR")}원
                    </CardPPrice>
                  </div>
                )}
              </div>
            </div>
          ))}
        </StyledSlider>
      </div>
    </Container>
  ) : null;
}

const Container = styled.div`
  height: 30rem;
  width: 70rem;
  margin-left: 25rem;
`;

const CardImg = styled.img`
  width: 90%;
  height: 90%;
  margin: 0 auto;
`;
const CardName = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-left: 1rem;
  margin-top: 1rem;
`;
const CardDiscount = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-left: 1rem;
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
  margin-left: 0.5rem;
  margin-right: 1.5rem;
  margin-top: 0;
  margin-bottom: 0;
`;
const CardPriceBD = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  margin-left: 1rem;
  margin-right: 0.5rem;
  margin-top: 0;
  margin-bottom: 0;
  text-decoration: line-through;
  text-decoration-color: #aaaaaa;
  color: #aaaaaa;
  margin-top: 0.5rem;
`;

const CardPPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-left: 1rem;
  margin-right: 1.5rem;
  margin-top: 0;
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
