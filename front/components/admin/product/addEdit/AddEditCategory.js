import React, { useState } from "react";
import styled from "styled-components";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function AddEditCategory() {
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
    <Grid2 sx={{ padding: "0", display: "flex" }}>
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        카테고리
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          zIndex: "0",
        }}
      >
        <CategoryBox>
          <Title>대분류</Title>
          <FormControl sx={{ minWidth: 200, width: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              대분류
            </InputLabel>
            <Select
              value={bigCategory}
              onChange={handleChange}
              label="대분류"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
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
          <FormControl sx={{ minWidth: 100, width: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              소분류
            </InputLabel>
            <Select
              value={smallCategory}
              onChange={smallHandleChange}
              label="소분류"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
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
      </Grid2>
    </Grid2>
  );
}

export const ContainerBox = styled.div`
  border: 0.3rem solid #ff9494;
  border-radius: 1rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
`;

export const ContentBox = styled.div`
  display: flex;
  padding-left: 4rem;
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: 800;
  margin-right: 3rem;
  padding: 0;
`;
