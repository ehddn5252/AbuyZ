import React, { useState, useEffect } from "react";

// Styled Compoennt
import styled from "styled-components";
import { Container } from "@mui/material";

// Next.js
import { useRouter } from "next/router";

// Recoil
import { smallCategoryValue } from "../../states/index";
import { useRecoilState } from "recoil";
export default function MainCategory() {
  const router = useRouter();

  const [categoryId, setCategoryId] = useRecoilState(smallCategoryValue);
  // 나중에 array 지우면 될 듯
  const array = [
    { img: "/images/fruit.png", name: "과일", uid: 1 },
    { img: "/images/meat.png", name: "고기", uid: 3 },
    { img: "/images/water.png", name: "생수", uid: 5 },
    { img: "/images/hair.png", name: "헤어", uid: 9 },
    { img: "/images/sofa.png", name: "가구", uid: 11 },
    { img: "/images/shoes.png", name: "신발", uid: 27 },
    {
      img: "/images/base.png",
      name: "향수",
      uid: 22,
    },
  ];

  // const goSearch = (uid) => {
  //   setCategoryId(uid);
  //   router.push("/search");
  // };
  return array ? (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <CardContainer>
        {array.map((data, idx) => (
          <CardBox key={idx}>
            <CardImg
              // onClick={goSearch(data.uid)}
              alt="카테고리 목록"
              src={data.img}
            />
            <CardText>{data.name}</CardText>
          </CardBox>
        ))}
      </CardContainer>
    </Container>
  ) : null;
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
