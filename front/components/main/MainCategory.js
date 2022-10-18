import React from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/system";

export default function MainCategory() {
  // 나중에 array 지우면 될 듯
  const array = [
    { img: "carrot", name: "당근" },
    { img: "milk", name: "우유" },
    { img: "potato", name: "감자" },
    { img: "carrot", name: "계란" },
    { img: "milk", name: "새우" },
    { img: "potato", name: "데님 바지" },
    {
      img: "carrot",
      name: "피지오겔 로션",
      price: 1090,
      grade: 3.7,
      reviews: 32,
    },
  ];
  return (
    <Container sx={{ my: 10 }}>
      <Title>자주찾는 카테고리</Title>
      <CardContainer>
        {array.map((data, idx) => {
          const imgURL = "/images/" + data.img + ".png";
          return (
            <CardBox key={idx}>
              <CardImg alt="카테고리 목록" src={imgURL} />
              <CardText>{data.name}</CardText>
            </CardBox>
          );
        })}
      </CardContainer>
    </Container>
  );
}

const Title = styled.p`
  font-size: 2rem;
  font-weight: bolder;
  margin-right: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
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
