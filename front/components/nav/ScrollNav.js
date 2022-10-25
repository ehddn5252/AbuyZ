// React
import React from "react";

// MUI
import styled from "styled-components";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

export default function ScrollNav() {
  return (
    <div>
      <CategoryBox>
        <CategoryContainer>
          <CategoryTagBox>
            <CategoryTitle>식품</CategoryTitle>
            <Menu id="menu">
              <MenuItem>과일</MenuItem>
              <MenuItem>채소</MenuItem>
              <MenuItem>고기</MenuItem>
              <MenuItem>과자/디저트/아이스크림</MenuItem>
              <MenuItem>생수/음료/주류</MenuItem>
            </Menu>
          </CategoryTagBox>

          <CategoryTagBox>
            <CategoryTitle>생활건강</CategoryTitle>
            <Menu id="menu">
              <MenuItem>의류</MenuItem>
              <MenuItem>언더웨어</MenuItem>
              <MenuItem>신발</MenuItem>
              <MenuItem>가방</MenuItem>
              <MenuItem>악세서리</MenuItem>
            </Menu>
          </CategoryTagBox>

          <CategoryTagBox>
            <CategoryTitle>가구/인테리어</CategoryTitle>
            <Menu id="menu">
              <MenuItem>주방가구</MenuItem>
              <MenuItem>거실가구</MenuItem>
              <MenuItem>커튼/블라인드</MenuItem>
              <MenuItem>학생/사무가구</MenuItem>
              <MenuItem>침실가구</MenuItem>
            </Menu>
          </CategoryTagBox>

          <CategoryTagBox>
            <CategoryTitle>반려/도서/취미</CategoryTitle>
            <Menu id="menu">
              <MenuItem>도서</MenuItem>
              <MenuItem>노트/다이어리</MenuItem>
              <MenuItem>사료</MenuItem>
              <MenuItem>필기류</MenuItem>
              <MenuItem>반려 동물 용품</MenuItem>
            </Menu>
          </CategoryTagBox>

          <CategoryTagBox>
            <CategoryTitle>뷰티</CategoryTitle>
            <Menu id="menu">
              <MenuItem>스킨케어</MenuItem>
              <MenuItem>향수</MenuItem>
              <MenuItem>헤어/바디</MenuItem>
              <MenuItem>메이크업</MenuItem>
              <MenuItem>네일</MenuItem>
            </Menu>
          </CategoryTagBox>
        </CategoryContainer>
        <SearchPaper component="form">
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "0.8rem" }}
            placeholder="찾으시는 상품을 검색해주세요"
            inputProps={{ "aria-label": "찾으시는 상품을 검색해주세요" }}
          />
          <IconButton
            href="/search"
            type="button"
            sx={{ color: "#56a9f1" }}
            aria-label="search"
          >
            <SearchIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </SearchPaper>
        <div style={{ display: "flex" }}>
          <IconBox>
            <Link href="/event">
              <EventAvailableOutlinedIcon
                fontSize="large"
                sx={{ color: "black" }}
              />
            </Link>
            <Link href="/event" sx={{ textDecoration: "none" }}></Link>
          </IconBox>
          <IconBox>
            <Link href="/mypage">
              <PersonOutlineOutlinedIcon
                fontSize="large"
                sx={{ color: "black" }}
              />
            </Link>
            <Link href="/mypage" sx={{ textDecoration: "none" }}></Link>
          </IconBox>
          <IconBox>
            <Link href="/basket">
              <ShoppingBasketOutlinedIcon
                fontSize="large"
                sx={{ color: "black" }}
              />
            </Link>
            <Link href="/basket" sx={{ textDecoration: "none" }}></Link>
          </IconBox>
        </div>
      </CategoryBox>
    </div>
  );
}

const CategoryBox = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  width: 100%;
  padding: 0 22%;
  height: 4rem;
  justify-content: center;
  background-color: #fff;
  z-index: 1011;
`;

const SearchPaper = styled(Paper)`
  display: flex;
  align-items: center;
  width: 17rem;
  height: 2rem;
  border-radius: 0.5rem;
  margin-left: 2rem;
  padding: 0.5rem;
  border: 1px solid;
  box-shadow: none;
  border-color: #56a9f1;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  padding: 0;
`;
const CategoryTagBox = styled.li`
  display: flex;
  font-size: 2rem;
  cursor: pointer;
  &:hover #menu {
    opacity: 1;
    visibility: visible;
  }
`;
const CategoryTitle = styled.p`
  padding: 0;
  margin: 0;
  margin-left: 2rem;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
  list-style: none;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  position: absolute;
  margin-top: 2.5rem;
  list-style: none;
  background: #fff;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease-in;
`;

const MenuItem = styled.li`
  font-size: 1rem;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 3rem;
  &:hover {
    background-color: #eee;
  }
`;
