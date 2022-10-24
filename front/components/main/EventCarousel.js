import React from "react";
import styled from "styled-components";
import { Container } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
//   <button
//     {...props}
//     className={
//       "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
//     }
//     aria-hidden="true"
//     aria-disabled={currentSlide === 0 ? true : false}
//     type="button"
//   />
// );

// const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
//   <button
//     {...props}
//     className={
//       "slick-next slick-arrow" +
//       (currentSlide === slideCount - 1 ? " slick-disabled" : "")
//     }
//     aria-hidden="true"
//     aria-disabled={currentSlide === slideCount - 1 ? true : false}
//     type="button"
//   />
// );

export default function EventCarousel() {
  // 나중에 array 지우면 될 듯
  const array = [1, 2, 3, 4, 5];

  const settings = {
    centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    centerMode: true, // 1번이 가운데서 시작 하게 함
    // dots: true, // 슬라이드 밑에 점 보이게
    infinite: true, // 무한으로 반복
    speed: 400, // 넘어가는 속도
    slidesToShow: 1, // n장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    // prevArrow: <SlickArrowLeft />,
    prevArrow: <img src="/images/left-arrow.png" width="10rem" />,
    // nextArrow: <SlickArrowRight />,
    nextArrow: <img src="/images/right-arrow.png" width="10rem" />,
  };

  return (
    <Container maxWidth="xl">
      <StyledSlider {...settings}>
        {array.map((e, idx) => (
          <CardBox key={idx}>
            <CardImg alt="인기 서비스" src="/images/event.png" />
            {/* <CardText>{e}</CardText> */}
          </CardBox>
        ))}
      </StyledSlider>
    </Container>
  );
}

const StyledSlider = styled(Slider)`
  .slick-list {
    //슬라이드 스크린
    width: 100%;
    height: 100%;
    margin-left: 0.5rem;
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

    &:before {
      /* font-family: "FontAwesome";
      font-weight: 900;
      content: "\f054"; */
      color: black;
      font-size: xx-large;
      margin-right: 4;
    }
  }

  .slick-next {
    /* right: 30px; */

    &:before {
      /* content: "\f054"; */
      color: black;
      font-size: xx-large;
    }
  }
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  margin: 0 auto;
  height: 40rem;
  width: 95%;
  object-fit: cover;
  border-radius: 15px;
`;

// const CardText = styled.p`
//   /* padding: 1rem; */
//   font-size: 1rem;
//   font-weight: bolder;
//   text-align: center;
// `;
