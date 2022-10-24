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
    { img: "potato", name: "데님 바지" },
  ];
  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
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

const CardContainer = styled.div`
  display: flex;
  padding-left: 10rem;
  padding-right: 10rem;
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 9rem;
  height: 10rem;
  padding: 2rem;
`;

const CardText = styled.p`
  /* padding: 1rem; */
  font-size: 1rem;
  font-weight: bolder;
  text-align: center;
`;
