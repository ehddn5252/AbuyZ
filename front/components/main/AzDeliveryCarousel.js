import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AzDeliveryCarousel() {
  // 나중에 array 지우면 될 듯

  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray([
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
    ]);
  }, []);

  return (
    <Container
      maxWidth="lg"
      style={{
        background: "#ffffff",
        paddingRight: "7rem",
        paddingLeft: "7rem",
        marginBottom: "3rem",
      }}
    >
      <Title>
        <span
          style={{ fontWeight: "bold", fontSize: "2rem", color: "#56a9f1" }}
        >
          AZ 배송
        </span>
        <span style={{ fontWeight: "lighter", fontSize: "1.3rem" }}>
          {" "}
          주문 시,
        </span>
        <span
          style={{ fontWeight: "bold", fontSize: "1.6rem", color: "#56a9f1" }}
        >
          {" "}
          내일 11:00 ~ 13:00
        </span>
        <span style={{ fontWeight: "lighter", fontSize: "1.3rem" }}>
          {" "}
          도착 예정
        </span>
      </Title>
      <StyledSlider {...settings}>
        {array.map((e, idx) => (
          <CardContainer key={idx}>
            <CardImg
              alt="추천상품"
              src="/images/grape.png"
              style={{ width: "14rem", height: "16rem", objectFit: "cover" }}
            />
            {/* <CardTextBox>
              <Star alt="별점" src="/images/star.png" />
              <CardGrade>{e.grade.toFixed(1)}</CardGrade>
              <CardReviews>({e.reviews})</CardReviews>
            </CardTextBox> */}
            <CardTextBox>
              <CardName>{e.name}</CardName>
            </CardTextBox>
            <CardTextBox>
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
                        {(e.price * ((100 - e.discount) / 100)).toLocaleString(
                          "ko-KR"
                        )}
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
            </CardTextBox>
          </CardContainer>
        ))}
      </StyledSlider>
    </Container>
  );
}

const settings = {
  centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
  // centerMode: true, // 1번이 가운데서 시작 하게 함
  // dots: true, // 슬라이드 밑에 점 보이게
  infinite: true, // 무한으로 반복
  speed: 500, // 넘어가는 속도
  slidesToShow: 4, // n장씩 보이게
  slidesToScroll: 1, // 1장씩 뒤로 넘어가게
  nextArrow: <img src="/images/right-arrow.png" width="10rem" />,
  prevArrow: <img src="/images/left-arrow.png" width="10rem" />,
};

const Title = styled.p`
  font-size: 2rem;
  font-weight: bolder;
  margin-right: 1rem;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    //슬라이드 스크린
    /* width: 100%;
    height: 100%;
    margin: 0 auto;
    background: blue; */
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
`;

const CardContainer = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 90%;
  height: 90%;
  margin: 0 auto;
`;

const CardTextBox = styled.p`
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  align-items: center;
`;

const CardName = styled.p`
  font-size: 1rem;
  font-weight: bolder;
  margin-left: 1rem;
  margin-top: 1rem;
`;

const CardDiscount = styled.p`
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
const CardPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-left: 0.5rem;
  margin-right: 1.5rem;
  margin-top: 0;
  margin-bottom: 0;
`;

const CardPriceBD = styled.p`
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

const CardPPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-left: 1rem;
  margin-right: 1.5rem;
  margin-top: 0;
  margin-bottom: 0;
`;
