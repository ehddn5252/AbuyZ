import React, { useState } from "react";
import styled from "styled-components";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function AddEditCategory(props) {
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
    props.setSmallCategoriesUid(event.target.value);
  };

  // 대분류에 맞는 소분류 객체
  const smallCategoryList = {
    식품: ["과일", "채소", "고기", "과자/디저트/아이스크림", "생수/음료/주류"],
    "생활, 건강": [
      "세제/방향/살충",
      "세탁용품",
      "청소용품",
      "욕실용품",
      "주방용품",
    ],
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
    유아동: [
      "유아동 의류",
      "유아동 신발",
      "기저귀/물티슈",
      "장난감/완구",
      "유아동가구",
    ],
    가전: ["TV/영상가전", "생활가전", "주방가전", "계절가전"],
    "스포츠, 레저, 자동차": [
      "헬스/요가/수영",
      "자전거/스키/레저",
      "자동차/오토바이",
      "등산/아웃도어",
      "캠핑/낚시",
    ],
  };

  const small_categories_uid = {
    과일: 1,
    채소: 2,
    고기: 3,
    "과자/디저트/아이스크림": 4,
    "생수/음료/주류": 5,
    "세제/방향/살충": 6,
    세탁용품: 7,
    청소용품: 8,
    욕실용품: 9,
    주방용품: 10,
    주방가구: 11,
    거실가구: 12,
    "커튼/블라인드": 13,
    "학생/사무가구": 14,
    침실가구: 15,
    도서: 16,
    "노트/다이어리": 17,
    사료: 18,
    필기류: 19,
    "반려동물 용품": 20,
    스킨케어: 21,
    향수: 22,
    "헤어/바디": 23,
    메이크업: 24,
    네일: 25,
    "유아동 의류": 26,
    "유아동 신발": 27,
    "기저귀/물티슈": 28,
    "장난감/완구": 29,
    유아동가구: 30,
    "TV/영상가전": 31,
    생활가전: 32,
    주방가전: 33,
    계절가전: 34,
    "헬스/요가/수영": 35,
    "자전거/스키/레저": 36,
    "자동차/오토바이": 37,
    "등산/아웃도어": 38,
    "캠핑/낚시": 39,
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
        <div>
          카테고리
          <p
            style={{
              margin: 0,
              color: "red",
              fontSize: "0.9rem",
              marginTop: "0.5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            (모두 기입)
          </p>
        </div>
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
                // getContentAnchorEl: null,
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
            >
              <MenuItem value={"식품"}>식품</MenuItem>
              <MenuItem value={"생활, 건강"}>생활/건강</MenuItem>
              <MenuItem value={"가구, 인테리어"}>가구/인테리어</MenuItem>
              <MenuItem value={"반려, 도서, 취미"}>반려/도서/취미</MenuItem>
              <MenuItem value={"뷰티"}>뷰티</MenuItem>
              <MenuItem value={"유아동"}>유아동</MenuItem>
              <MenuItem value={"가전"}>가전</MenuItem>
              <MenuItem value={"스포츠, 레저, 자동차"}>
                스포츠/레저/자동차
              </MenuItem>
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
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
            >
              {smallCategoryList[bigCategory]?.map((data, idx) => (
                <MenuItem key={idx} value={small_categories_uid[data]}>
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
