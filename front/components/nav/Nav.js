// React
import React, { useEffect, useState, useMemo } from "react";

// Next.js
import { useRouter } from "next/router";

// Styled-Component
import styled from "styled-components";

// MUI
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";

// API
import { getMyInfo, logout, refresh } from "../../pages/api/user";

// State
import { searchName, filterName } from "../../states";
import { useRecoilState } from "recoil";

//  lodash
import { throttle } from "lodash";

export default function Nav() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [atoken, setAToken] = useState("");
  // 검색어
  const [keyword, setKeyword] = useState("");
  const [searchValue, setSearchValue] = useRecoilState(searchName);
  const [filterValue, setFilterValue] = useRecoilState(filterName);
  // window 위치
  const [isNavOn, setIsNavOn] = useState(true);

  // throttleScroll를 활용한 스크롤 이벤트 최적화
  const throttledScroll = useMemo(
    () =>
      throttle(() => {
        if (window.scrollY > 150 && isNavOn) {
          setIsNavOn(false);
          return;
        }
        if (window.scrollY <= 150 && !isNavOn) {
          setIsNavOn(true);
          return;
        }
      }, 300),
    [isNavOn]
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [throttledScroll]);

  const keywordSearch = () => {
    setSearchValue(keyword);
    if (router.pathname === "/search") {
      router.reload();
    }
    router.push("/search");
  };
  // 개인정보 조회
  const getName = async () => {
    const res = await getMyInfo();
    setUsername(res.data.name);
  };
  let changtoken = setInterval(() => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        refresh();
      } else {
        console.log("토큰없음");
      }
    }
  }, 1000 * 60 * 20);
  useEffect(() => {
    // 창 닫기시 블랙리스트 추가
    window.addEventListener("unload", async () => {
      await logout();
      // 토큰 재발급 함수 삭제
      clearInterval(changtoken);
    });
  }, []);

  const Logout = async () => {
    await logout();
    // 토큰 재발급 함수 삭제
    clearInterval(changtoken);
    router.reload();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        getName();
      }
    }
  }, [atoken]);

  const goEvent = () => {
    router.push("/event");
  };

  const goMypage = () => {
    if (username) {
      router.push("/mypage");
    } else {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  };

  const goHome = () => {
    router.push("/");
  };

  const goSearch = () => {
    router.push("/search");
  };
  const goSearch1 = () => {
    setFilterValue("최근 등록순");
    router.push("/search");
  };

  const goSearch2 = () => {
    setFilterValue("평점 높은 순");
    router.push("/search");
  };

  const goSearch3 = () => {
    setFilterValue("가격 낮은 순");
    router.push("/search");
  };

  const goLogin = () => {
    router.push("/login");
  };

  const goService = () => {
    router.push("/service");
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
    <div>
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
              <UserLink onClick={goLogin}>로그인</UserLink>
            )}
            <UserLink onClick={goService} sx={{ marginLeft: "1rem" }}>
              고객센터
            </UserLink>
          </UserBox>
          <SearchBox>
            <div onClick={goHome} style={{ cursor: "pointer" }}>
              <img src="/images/ABUYZ_LOGO.png" style={{ width: "8rem" }}></img>
            </div>
            <SearchPaper component="form">
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="찾으시는 상품을 검색해주세요"
                inputProps={{ "aria-label": "찾으시는 상품을 검색해주세요" }}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <IconButton
                type="button"
                sx={{ color: "#56a9f1" }}
                aria-label="search"
                onClick={keywordSearch}
              >
                <SearchIcon sx={{ fontSize: "1.8rem" }} />
              </IconButton>
            </SearchPaper>
            <div style={{ display: "flex" }}>
              <IconBox>
                <div onClick={goMypage}>
                  <FavoriteBorderOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </div>
              </IconBox>
              <IconBox>
                <div onClick={goMypage}>
                  <PersonOutlineOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </div>
              </IconBox>
              <IconBox>
                <div onClick={goBasket}>
                  <ShoppingBasketOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black", fontWeight: 100 }}
                  />
                </div>
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
              <CategoryTitle onClick={goSearch1}>신상품</CategoryTitle>
            </TagBox>
            <TagBox>
              <CategoryTitle onClick={goSearch2}>베스트</CategoryTitle>
            </TagBox>
            <TagBox>
              <CategoryTitle onClick={goSearch3}>알뜰 쇼핑</CategoryTitle>
            </TagBox>
            <TagBox>
              <CategoryTitle onClick={goEvent}>특가/혜택</CategoryTitle>
            </TagBox>
          </CategoryContainer>
        </CategoryBox>
      </Container>
      {isNavOn ? null : (
        <ScrollContainer>
          <ScrollCategoryBox>
            <ScrollCategoryContainer>
              <ScrollCategoryTagBox>
                <MenuIcon sx={{ marginRight: "0.5rem" }} />
                <ScrollCategoryTitle>카테고리</ScrollCategoryTitle>
              </ScrollCategoryTagBox>
              <ScrollTagBox>
                <ScrollCategoryTitle onClick={goSearch1}>
                  신상품
                </ScrollCategoryTitle>
              </ScrollTagBox>
              <ScrollTagBox>
                <ScrollCategoryTitle onClick={goSearch2}>
                  베스트
                </ScrollCategoryTitle>
              </ScrollTagBox>
              <ScrollTagBox>
                <ScrollCategoryTitle onClick={goSearch3}>
                  알뜰 쇼핑
                </ScrollCategoryTitle>
              </ScrollTagBox>
              <ScrollTagBox>
                <ScrollCategoryTitle onClick={goEvent}>
                  특가/혜택
                </ScrollCategoryTitle>
              </ScrollTagBox>
            </ScrollCategoryContainer>
            <ScrollSearchPaper component="form">
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "0.8rem" }}
                placeholder="찾으시는 상품을 검색해주세요"
                inputProps={{ "aria-label": "찾으시는 상품을 검색해주세요" }}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <IconButton
                onClick={keywordSearch}
                type="button"
                sx={{ color: "#56a9f1" }}
                aria-label="search"
              >
                <SearchIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </ScrollSearchPaper>
            <ScrollIconDiv>
              <ScrollIconBox>
                <Link onClick={goMypage}>
                  <FavoriteBorderOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </Link>
              </ScrollIconBox>
              <ScrollIconBox>
                <Link onClick={goMypage}>
                  <PersonOutlineOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </Link>
              </ScrollIconBox>
              <ScrollIconBox>
                <Link onClick={goBasket}>
                  <ShoppingBasketOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </Link>
              </ScrollIconBox>
            </ScrollIconDiv>
          </ScrollCategoryBox>
        </ScrollContainer>
      )}
    </div>
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

const UserLink = styled.p`
  margin: 0;
  text-decoration: none;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  color: #aaaaaa;
  cursor: pointer;
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

const CategoryTitle = styled.p`
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
const ScrollContainer = styled.div`
  width: 100%;
`;
const ScrollCategoryBox = styled.div`
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

const ScrollSearchPaper = styled(Paper)`
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

const ScrollIconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;

const ScrollCategoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
`;

const ScrollCategoryTagBox = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ScrollTagBox = styled.li`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-left: 4rem;
  cursor: pointer;
  &:hover CategoryTitle {
    color: #56a9f1;
  }
`;
const ScrollCategoryTitle = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
  list-style: none;
`;

const ScrollIconDiv = styled.div`
  display: flex;
  margin-left: 3rem;
`;
