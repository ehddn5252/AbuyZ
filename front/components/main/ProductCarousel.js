import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMyInfo } from "../../pages/api/user";

export default function ProductCarousel() {
  const [user, setUser] = useState("");
  const uuser = async () => {
    const res = await getMyInfo();
    setUser(res.data.name);
  };
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
  useEffect(() => {
    uuser();
  }, []);
  return (
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
          {array.map((e, idx) => (
            <div style={{ cursor: "pointer" }} key={idx}>
              <CardImg
                alt="추천상품"
                src="/images/grape.png"
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
                <CardName>{e.name}</CardName>
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
                {e.discount != null ? (
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "end",
                          flex: 2,
                        }}
                      >
                        <CardDiscount>{e.discount}%</CardDiscount>
                      </div>
                      <div style={{ flex: 5 }}>
                        <CardPrice>
                          {(
                            e.price *
                            ((100 - e.discount) / 100)
                          ).toLocaleString("ko-KR")}
                          원
                        </CardPrice>
                      </div>
                    </div>
                    <div>
                      <CardPriceBD>
                        {e.price.toLocaleString("ko-KR")}원
                      </CardPriceBD>
                    </div>
                  </div>
                ) : (
                  <div>
                    <CardPPrice>{e.price.toLocaleString("ko-KR")}원</CardPPrice>
                  </div>
                )}
              </div>
            </div>
          ))}
        </StyledSlider>
      </div>
    </div>
  );
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
