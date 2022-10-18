import React from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function EventCarousel() {
  // 나중에 array 지우면 될 듯
  const array = [1, 2, 3, 4, 5];

  return (
    <Container sx={{ mb: 10 }}>
      <TitleBox>
        <Title>진행중인</Title>
        <Title2>이벤트!</Title2>
      </TitleBox>
      <StyledSlider {...settings}>
        {array.map((e, idx) => (
          <CardBox key={idx}>
            <CardImg alt="인기 서비스" src="/images/event.png" />
            <CardText>{e}</CardText>
          </CardBox>
        ))}
      </StyledSlider>
    </Container>
  );
}
const settings = {
  centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
  centerMode: true, // 1번이 가운데서 시작 하게 함
  dots: true, // 슬라이드 밑에 점 보이게
  infinite: true, // 무한으로 반복
  speed: 500, // 넘어가는 속도
  slidesToShow: 3, // n장씩 보이게
  slidesToScroll: 1, // 1장씩 뒤로 넘어가게
  nextArrow: <img src="/images/right-arrow.png" width="10rem" />,
  prevArrow: <img src="/images/left-arrow.png" width="10rem" />,
};

const TitleBox = styled.div`
  display: flex;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: bolder;
  margin-right: 1rem;
`;

const Title2 = styled.p`
  font-size: 2rem;
  font-weight: bolder;
  margin-right: 1rem;
  color: red;
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

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 90%;
  height: 90%;
  margin: 0 auto;
`;

const CardText = styled.p`
  /* padding: 1rem; */
  font-size: 1rem;
  font-weight: bolder;
  text-align: center;
`;
