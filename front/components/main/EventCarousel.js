import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
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

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  />
);

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
    arrows: true,
    prevArrow: <Pre></Pre>,
    nextArrow: <NextTo></NextTo>,
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <StyledSlider {...settings}>
        {array.map((e, idx) => (
          <CardBox key={idx}>
            <CardImg alt="인기 서비스" src="/images/event.png" />
            {/* <CardText>{e}</CardText> */}
          </CardBox>
        ))}
      </StyledSlider>
    </div>
  );
}

const StyledSlider = styled(Slider)`
  .slick-list {
    //슬라이드 스크린
    width: 100%;
    height: 100%;
    &:hover + .Pre {
      display: block;
    }
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
      /* display: none; */
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
      margin-right: 4;
    }
  }
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  margin: 0 auto;
  height: 25rem;
  width: 100%;
  object-fit: cover;
`;

const Pre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 3%;
  z-index: 3;
`;

const NextTo = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 3%;
  z-index: 3;
`;
