import React, { useState, useEffect } from "react";

// Styled Compoennt
import styled from "styled-components";
import { Container } from "@mui/material";

// Next.js
import { useRouter } from "next/router";

// Recoil
import {
  smallCategoryValue,
  searchName,
  filterName,
  bigCategoryValue,
} from "../../states/index";
import { useRecoilState } from "recoil";
export default function MainCategory() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useRecoilState(searchName);
  const [filterValue, setFilterValue] = useRecoilState(filterName);
  const [categoryValue, setCategoryValue] = useRecoilState(bigCategoryValue);
  const [categoryId, setCategoryId] = useRecoilState(smallCategoryValue);

  // 나중에 array 지우면 될 듯
  const array = [
    { img: "/images/fruit.png", name: "과일", uid: 1 },
    { img: "/images/shoes.png", name: "생활", uid: 10 },
    { img: "/images/sofa.png", name: "가구", uid: 12 },
    { img: "/images/puppy.png", name: "반려", uid: 18 },
    { img: "/images/base.png", name: "뷰티", uid: 24 },
    { img: "/images/gajeon.png", name: "가전", uid: 33 },
    {
      img: "/images/sports.png",
      name: "스포츠",
      uid: 8,
    },
  ];

  const goSearch = (uid) => {
    setCategoryValue("");
    setFilterValue("최근 등록 순");
    setSearchValue("");
    setCategoryId(uid);
    router.push("/search");
  };
  return array ? (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <CardContainer>
        {array.map((data, idx) => (
          <CardBox key={idx}>
            <CardImg
              onClick={(e) => goSearch(data.uid)}
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
