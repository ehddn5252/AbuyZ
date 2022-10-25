import React, { useState } from "react";
import styled from "styled-components";
import { SearchContainer } from "./SearchWord";
import { SearchTitle } from "./InquireProduct";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Category() {
  // 대분류
  const [bigCategory, setBigCategory] = useState("");
  // 소분류
  const [smallCategory, setSmallCategory] = useState("");

  // 대분류 셀렉트 했을 때
  const handleChange = (event) => {
    setSmallCategory("");
    setBigCategory(event.target.value);
  };

  // 소분류 셀렉트 했을 때
  const smallHandleChange = (event) => {
    setSmallCategory(event.target.value);
  };

  // 대분류에 맞는 소분류 객체
  const smallCategoryList = {
    대분류: [],
    식품: ["과일", "채소", "고기", "과자", "생수"],
    "생활, 건강": ["의류", "언더웨어", "신발", "가방", "악세서리"],
    "가구, 인테리어": [
      "주방가구",
      "거실가구",
      "커튼/블라인드",
      "학생/사무가구",
      "침실가구",
    ],
    "반려, 도서, 취미": [
      "도서",
      "노트/다이어리",
      "사료",
      "필기류",
      "반려동물 용품",
    ],
    뷰티: ["스킨케어", "향수", "헤어/바디", "메이크업", "네일"],
  };

  return (
    <SearchContainer>
      <SearchTitle style={{ paddingLeft: "4rem", marginTop: "1rem" }}>
        카테고리
      </SearchTitle>
      <CategoryBox>
        <Title>대분류</Title>
        <FormControl sx={{ m: 1, minWidth: 100, width: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            대분류
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={bigCategory}
            onChange={handleChange}
            autoWidth
            label="대분류"
          >
            <MenuItem value="대분류">
              <em>대분류</em>
            </MenuItem>
            <MenuItem value={"식품"}>식품</MenuItem>
            <MenuItem value={"생활, 건강"}>생활/건강</MenuItem>
            <MenuItem value={"가구, 인테리어"}>가구/인테리어</MenuItem>
            <MenuItem value={"반려, 도서, 취미"}>반려/도서/취미</MenuItem>
            <MenuItem value={"뷰티"}>뷰티</MenuItem>
          </Select>
        </FormControl>
      </CategoryBox>
      <CategoryBox>
        <Title>소분류</Title>
        <FormControl sx={{ m: 1, minWidth: 100, width: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            소분류
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={smallCategory}
            onChange={smallHandleChange}
            autoWidth
            label="소분류"
          >
            <MenuItem value="소분류">
              <em>소분류</em>
            </MenuItem>
            {smallCategoryList[bigCategory]?.map((data, idx) => (
              <MenuItem key={idx} value={data.replace(/\//g, ", ")}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CategoryBox>
    </SearchContainer>
  );
}

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 1000;
  margin-right: 1rem;
`;
