// React
import React from "react";

// MUI
import styled from "styled-components";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import MenuIcon from "@mui/icons-material/Menu";
export default function ScrollNav() {
  return (
    <Container>
      <CategoryBox>
        <CategoryContainer>
          <CategoryTagBox>
            <MenuIcon sx={{ marginRight: "0.5rem" }} />
            <CategoryTitle>카테고리</CategoryTitle>
          </CategoryTagBox>
          <TagBox>
            <CategoryTitle href="/search">신상품</CategoryTitle>
          </TagBox>
          <TagBox>
            <CategoryTitle href="/search">베스트</CategoryTitle>
          </TagBox>
          <TagBox>
            <CategoryTitle href="/search">알뜰 쇼핑</CategoryTitle>
          </TagBox>
          <TagBox>
            <CategoryTitle href="/event">특가/혜택</CategoryTitle>
          </TagBox>
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
        <IconDiv>
          <IconBox>
            <Link href="/event">
              <FavoriteBorderOutlinedIcon
                fontSize="medium"
                sx={{ color: "black" }}
              />
            </Link>
            <Link href="/event" sx={{ textDecoration: "none" }}></Link>
          </IconBox>
          <IconBox>
            <Link href="/mypage">
              <PersonOutlineOutlinedIcon
                fontSize="medium"
                sx={{ color: "black" }}
              />
            </Link>
            <Link href="/mypage" sx={{ textDecoration: "none" }}></Link>
          </IconBox>
          <IconBox>
            <Link href="/basket">
              <ShoppingBasketOutlinedIcon
                fontSize="medium"
                sx={{ color: "black" }}
              />
            </Link>
            <Link href="/basket" sx={{ textDecoration: "none" }}></Link>
          </IconBox>
        </IconDiv>
      </CategoryBox>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
`;
const CategoryBox = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  width: 100%;
  padding: 0 22%;
  height: 4rem;
  background-color: #fff;
  z-index: 1011;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const SearchPaper = styled(Paper)`
  display: flex;
  align-items: center;
  width: 15rem;
  height: 2rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-left: 3rem;
  border: 1px solid;
  box-shadow: none;
  border-color: #56a9f1;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
`;

const CategoryTagBox = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TagBox = styled.li`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-left: 4rem;
  cursor: pointer;
  &:hover CategoryTitle {
    color: #56a9f1;
  }
`;
const CategoryTitle = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
  list-style: none;
`;

const IconDiv = styled.div`
  display: flex;
  margin-left: 3rem;
`;
