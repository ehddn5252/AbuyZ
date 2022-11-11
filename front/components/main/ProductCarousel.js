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
    autoplay: true,
    autoplayspeed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const getProducts = async () => {
    const res = await getRandomProducts();
    setProducts(res.data);
  };

  const goDetail = (uid) => {
    router.push(`/detail/${uid}`);
  };
  useEffect(() => {
    getProducts();
    uuser();
  }, []);
  return products ? (
    <div
      style={{
        height: "30rem",
        width: "70rem",
        marginLeft: "25rem",
      }}
    >
      <div
        style={{
          // backgroundColor: "#ccf2f4",
          height: "100%",
          with: "100%",
        }}
      >
        <span
          style={{
            marginLeft: "1.7rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#56a9f1",
          }}
        >
          {user}
        </span>
        <span>님을 위한</span>{" "}
        <span
          style={{
            fontSize: "1.3rem",
            color: "#56a9f1",
          }}
        >
          추천 상품
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
    </div>
  ) : null;
}

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
