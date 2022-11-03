// React
import React, { useEffect, useState } from "react";

// Next.js
import { useRouter } from "next/router";

// MUI
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import MenuIcon from "@mui/icons-material/Menu";

// API
import { getMyInfo, logout, refresh } from "../../pages/api/user";

export default function Nav() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  // 개인정보 조회
  const getName = async () => {
    const res = await getMyInfo();
    setUsername(res.data.name);
  };
  let refreshtoken = setInterval(() => {
    const accessToken = sessionStorage.getItem("access-token");
    if (accessToken) {
      refresh();
    } else {
      console.log("토큰없음");
    }
  }, 1000 * 60 * 10);
  useEffect(() => {
    // 창 닫기시 블랙리스트 추가
    window.addEventListener("unload", async () => {
      await logout();

      // 토큰 재발급 함수 삭제
      clearInterval(refreshtoken);
    });
  }, [username]);

  const Logout = async () => {
    const res = await logout();
    // 토큰 재발급 함수 삭제
    clearInterval(refreshtoken);
    router.reload();
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      getName();
    }
  }, [router.pathname]);

  return (
    <Container>
      <NavContainer>
        <UserBox>
          {username ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <TopBox>{username}님</TopBox>
              <TopBox>환영합니다</TopBox>
              <TopBox onClick={Logout} style={{ cursor: "pointer" }}>
                로그아웃
              </TopBox>
            </div>
          ) : (
            <UserLink href="/login">로그인</UserLink>
          )}
          <UserLink href="/service" sx={{ marginLeft: "1rem" }}>
            고객센터
          </UserLink>
        </UserBox>
        <SearchBox>
          <Link href="/">
            <img src="/images/ABUYZ_LOGO.png" style={{ width: "8rem" }}></img>
          </Link>
          <SearchPaper component="form">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="찾으시는 상품을 검색해주세요"
              inputProps={{ "aria-label": "찾으시는 상품을 검색해주세요" }}
            />
            <IconButton
              href="/search"
              type="button"
              sx={{ color: "#56a9f1" }}
              aria-label="search"
            >
              <SearchIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
          </SearchPaper>
          <div style={{ display: "flex" }}>
            <IconBox>
              <Link href="/mypage">
                <FavoriteBorderOutlinedIcon
                  fontSize="medium"
                  sx={{ color: "black" }}
                />
              </Link>
            </IconBox>
            <IconBox>
              <Link href="/mypage">
                <PersonOutlineOutlinedIcon
                  fontSize="medium"
                  sx={{ color: "black" }}
                />
              </Link>
            </IconBox>
            <IconBox>
              <Link href="/basket">
                <ShoppingBasketOutlinedIcon
                  fontSize="medium"
                  sx={{ color: "black", fontWeight: 100 }}
                />
              </Link>
            </IconBox>
          </div>
        </SearchBox>
      </NavContainer>
      <CategoryBox>
        <CategoryContainer>
          <CategoryTagBox>
            <MenuIcon sx={{ marginRight: "1rem" }} />
            <CategoryTitle>카테고리</CategoryTitle>
            <Menu id="menu">
              <MajorMenu>
                <MenuTitle>식품</MenuTitle>
                {/* <MenuList>
                  <MenuItem>과일</MenuItem>
                  <MenuItem>채소</MenuItem>
                  <MenuItem>고기</MenuItem>
                  <MenuItem>과자/디저트/아이스크림</MenuItem>
                  <MenuItem>생수/음료/주류</MenuItem>
                </MenuList> */}
              </MajorMenu>
              <MajorMenu>
                <MenuTitle>생활건강</MenuTitle>
                {/* <MenuList>
                  <MenuItem>의류</MenuItem>
                  <MenuItem>언더웨어</MenuItem>
                  <MenuItem>신발</MenuItem>
                  <MenuItem>가방</MenuItem>
                  <MenuItem>악세서리</MenuItem>
                </MenuList> */}
              </MajorMenu>
              <MajorMenu>
                <MenuTitle>가구/인테리어</MenuTitle>
                {/* <MenuList>
                  <MenuItem>주방가구</MenuItem>
                  <MenuItem>거실가구</MenuItem>
                  <MenuItem>커튼/블라인드</MenuItem>
                  <MenuItem>학생/사무가구</MenuItem>
                  <MenuItem>침실가구</MenuItem>
                </MenuList> */}
              </MajorMenu>
              <MajorMenu>
                <MenuTitle>반려/도서/취미</MenuTitle>
                {/* <MenuList>
                  <MenuItem>도서</MenuItem>
                  <MenuItem>노트/다이어리</MenuItem>
                  <MenuItem>사료</MenuItem>
                  <MenuItem>필기류</MenuItem>
                  <MenuItem>반려 동물 용품</MenuItem>
                </MenuList> */}
              </MajorMenu>
              <MajorMenu>
                <MenuTitle>뷰티</MenuTitle>
                {/* <MenuList>
                  <MenuItem>스킨케어</MenuItem>
                  <MenuItem>향수</MenuItem>
                  <MenuItem>헤어/바디</MenuItem>
                  <MenuItem>메이크업</MenuItem>
                  <MenuItem>네일</MenuItem>
                </MenuList> */}
              </MajorMenu>
            </Menu>
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
      </CategoryBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 1000;
`;

const NavContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55%;
  margin: 0 22%;
  padding: 0;
`;

const UserBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const UserLink = styled(Link)`
  text-decoration: none;
  font-size: 0.8rem;
  color: #aaaaaa;
`;

const TopBox = styled.p`
  font-size: 0.8rem;
  color: #aaaaaa;
  margin: 0;
  margin-left: 0.5rem;
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  width: 100%;
  /* border-width: 0 0 0.1rem 0;
  border-style: solid;
  border-color: #eaeaea; */
`;

const SearchPaper = styled(Paper)`
  display: flex;
  align-items: center;
  width: 25rem;
  height: 3rem;
  border-radius: 0.5rem;
  margin-left: 3rem;
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
  margin-left: 1rem;
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  justify-content: center;
  /* background-color: #56a9f1; */
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 55%;
  margin: 0 22%;
  padding: 0;
`;
const CategoryTagBox = styled.li`
  display: flex;
  align-items: center;
  padding-right: 11.5rem;
  cursor: pointer;
  &:hover #menu {
    opacity: 1;
    visibility: visible;
  }
`;

const TagBox = styled.li`
  display: flex;
  align-items: center;
  margin-right: 6.5rem;
  font-size: 2rem;
  cursor: pointer;
  &:hover CategoryTitle {
    color: #56a9f1;
  }
`;

const CategoryTitle = styled(Link)`
  text-decoration: none;
  padding: 0;
  margin: 0;
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
  top: 14.1%;
  position: absolute;
  margin-top: 2.5rem;
  list-style: none;
  background: #fff;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease-in;
  z-index: 1000;
`;

const MajorMenu = styled.li`
  font-size: 0.8rem;
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
const MenuList = styled.li`
  font-size: 0.8rem;
  list-style: none;
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 3rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease-in;
  &:hover {
    background-color: #eee;
  }
`;

const MenuTitle = styled.div``;

const MenuItem = styled.li``;
