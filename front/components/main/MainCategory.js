import React from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/system";

export default function MainCategory() {
  // 나중에 array 지우면 될 듯
  const array = [
    { img: "fruit", name: "과일" },
    { img: "meat", name: "고기" },
    { img: "water", name: "생수" },
    { img: "hair", name: "헤어" },
    { img: "sofa", name: "가구" },
    { img: "shoes", name: "신발" },
    {
      img: "base",
      name: "기초",
    },
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
  padding-left: 22rem;
  padding-right: 10rem;
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 7rem;
  height: 6.5rem;
  padding: 0.5rem;
  border-radius: 15px;
`;

const CardText = styled.p`
  /* padding: 1rem; */
  font-size: 1rem;
  font-weight: bolder;
  text-align: center;
`;
