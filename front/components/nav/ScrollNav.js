// React
import React, { useState, useEffect } from "react";

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

// Next.js
import { useRouter } from "next/router";

// API
import { getMyInfo } from "../../pages/api/user";

// State
import { searchName } from "../../states";
import { useRecoilState } from "recoil";
export default function ScrollNav() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [atoken, setAToken] = useState("");
  const [searchValue, setSearchValue] = useState(searchName);
  const [value, setValue] = useRecoilState(searchName);
  // 개인정보 조회
  const getName = async () => {
    const res = await getMyInfo();
    setUsername(res.data.name);
  };

  useEffect(() => {
    setSearchValue("");
  }, []);

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) setAToken(accessToken);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        getName();
      }
    }
  }, [atoken]);
  const goSearch = () => {
    router.push("/search", "아아");
  };

  const goEvent = () => {
    router.push("/event");
  };

  const goService = () => {
    router.push("/service");
  };
  const goMypage = () => {
    if (username) {
      router.push("/mypage");
    } else {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  };
  const goBasket = () => {
    if (username) {
      router.push("/basket");
    } else {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  };

  return (
    <Container>
      <CategoryBox>
        <CategoryContainer>
          <CategoryTagBox>
            <MenuIcon sx={{ marginRight: "0.5rem" }} />
            <CategoryTitle>카테고리</CategoryTitle>
          </CategoryTagBox>
          <TagBox>
            <CategoryTitle onClick={goSearch}>신상품</CategoryTitle>
          </TagBox>
          <TagBox>
            <CategoryTitle onClick={goSearch}>베스트</CategoryTitle>
          </TagBox>
          <TagBox>
            <CategoryTitle onClick={goSearch}>알뜰 쇼핑</CategoryTitle>
          </TagBox>
          <TagBox>
            <CategoryTitle onClick={goEvent}>특가/혜택</CategoryTitle>
          </TagBox>
        </CategoryContainer>
        <SearchPaper component="form">
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "0.8rem" }}
            placeholder="찾으시는 상품을 검색해주세요"
            inputProps={{ "aria-label": "찾으시는 상품을 검색해주세요" }}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <IconButton
            onClick={goSearch}
            type="button"
            sx={{ color: "#56a9f1" }}
            aria-label="search"
          >
            <SearchIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </SearchPaper>
        <IconDiv>
          <IconBox>
            <Link onClick={goMypage}>
              <FavoriteBorderOutlinedIcon
                fontSize="medium"
                sx={{ color: "black" }}
              />
            </Link>
          </IconBox>
          <IconBox>
            <Link onClick={goMypage}>
              <PersonOutlineOutlinedIcon
                fontSize="medium"
                sx={{ color: "black" }}
              />
            </Link>
          </IconBox>
          <IconBox>
            <Link onClick={goBasket}>
              <ShoppingBasketOutlinedIcon
                fontSize="medium"
                sx={{ color: "black" }}
              />
            </Link>
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
