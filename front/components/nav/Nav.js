// React
import React, { useEffect, useState, useMemo } from "react";

// Next.js
import { useRouter } from "next/router";

// Styled-Component
import styled from "styled-components";

// Alert
import Swal from "sweetalert2";

// MUI
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
import { BigCategory } from "../../pages/api/category";

// State
import {
  searchName,
  filterName,
  bigCategoryValue,
  smallCategoryValue,
  mypageValues,
} from "../../states";
import { useRecoilState } from "recoil";

//  lodash
import { throttle } from "lodash";

export default function Nav() {
  const router = useRouter();

  // User data
  const [username, setUsername] = useState("");

  // 검색어
  const [keyword, setKeyword] = useState("");
  const [searchValue, setSearchValue] = useRecoilState(searchName);
  const [filterValue, setFilterValue] = useRecoilState(filterName);
  const [categoryValue, setCategoryValue] = useRecoilState(bigCategoryValue);
  const [smallCategoryId, setSmallCategoryId] =
    useRecoilState(smallCategoryValue);
  // 마이페이지
  const [mypageValue, setMypageValue] = useRecoilState(mypageValues);
  // 카테고리
  const [bigCategory, setBigCategory] = useState([]);
  const [userType, setUserType] = useState(0);
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

  // 검색시 동작
  const keywordSearch = () => {
    setSmallCategoryId("");
    setCategoryValue("");
    setFilterValue("최근 등록 순");
    setSearchValue(keyword);
    if (router.pathname === "/search") {
      router.reload();
    }
    router.push("/search");
  };

  // 개인정보 조회
  const getName = async () => {
    const res = await getMyInfo();
    setUserType(res.data.role);
    setUsername(res.data.name);
  };

  let changtoken = setInterval(() => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        refresh();
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
    setUsername("");
    // 토큰 재발급 함수 삭제
    clearInterval(changtoken);
    if (router.pathname === "/") {
      router.reload();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        getName();
      }
    }
  }, [router.pathname]);

  // 카테고리 값 가져오기
  const getCategory = async () => {
    const res = await BigCategory();
    setBigCategory(res.data);
  };

  useEffect(() => {
    getCategory();
  }, []);
  const searchCategory = (uid) => {
    setSmallCategoryId("");
    setCategoryValue(uid);
    setFilterValue("최근 등록 순");
    setSearchValue("");
    if (router.pathname === "/search") {
      router.reload();
    }
    router.push("/search");
  };
  // 이벤트이동
  const goEvent = () => {
    router.push("/event");
  };
  // 마이페이지이동
  const goMypage = () => {
    if (username) {
      router.push("/mypage");
    } else {
      Swal.fire({
        title: "로그인이 필요한 기능입니다.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then((e) => {
        router.push("/login");
      });
    }
  };
  // 메인으로 이동
  const goHome = () => {
    router.push("/");
  };
  //

  const goSearch1 = () => {
    setFilterValue("최근 등록 순");
    setCategoryValue("");
    setSearchValue("");
    setSmallCategoryId("");
    if (router.pathname === "/search") {
      router.reload();
    }
    router.push("/search");
  };

  const goSearch2 = () => {
    setFilterValue("평점 높은 순");
    setSearchValue("");
    setSmallCategoryId("");
    setCategoryValue("");
    if (router.pathname === "/search") {
      router.reload();
    }
    router.push("/search");
  };

  const goSearch3 = () => {
    setFilterValue("가격 낮은 순");
    setSearchValue("");
    setSmallCategoryId("");
    setCategoryValue("");
    if (router.pathname === "/search") {
      router.reload();
    }
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
      Swal.fire({
        title: "로그인이 필요한 기능입니다.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then((e) => {
        router.push("/login");
      });
    }
  };

  const goWish = () => {
    if (username) {
      setMypageValue(1);
      router.push("/mypage");
    } else {
      Swal.fire({
        title: "로그인이 필요한 기능입니다.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then((e) => {
        router.push("/login");
      });
    }
  };

  const goDashboard = () => {
    router.push("/admin/dashboard");
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
            {userType === "ADMIN" ? (
              <AdminLink onClick={goDashboard}> 관리자 페이지로 이동</AdminLink>
            ) : null}
          </UserBox>
          <SearchBox>
            <div onClick={goHome} style={{ cursor: "pointer" }}>
              <img src="/images/ABUYZ_LOGO.png" style={{ width: "8rem" }}></img>
            </div>
            <SearchPaper>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="찾으시는 상품을 검색해주세요"
                inputProps={{ "aria-label": "찾으시는 상품을 검색해주세요" }}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    keywordSearch();
                  }
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
                <div onClick={goWish} style={{ cursor: "pointer" }}>
                  <FavoriteBorderOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </div>
              </IconBox>
              <IconBox>
                <div onClick={goMypage} style={{ cursor: "pointer" }}>
                  <PersonOutlineOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </div>
              </IconBox>
              <IconBox>
                <div onClick={goBasket} style={{ cursor: "pointer" }}>
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
                {bigCategory.map((e, idx) => (
                  <MajorMenu key={e.uid}>
                    <MenuTitle onClick={() => searchCategory(e.uid)}>
                      {e.categoryName}
                    </MenuTitle>
                    {/* <MenuList>
                  <MenuItem>과일</MenuItem>
                  <MenuItem>채소</MenuItem>
                  <MenuItem>고기</MenuItem>
                  <MenuItem>과자/디저트/아이스크림</MenuItem>
                  <MenuItem>생수/음료/주류</MenuItem>
                </MenuList> */}
                  </MajorMenu>
                ))}
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
                <ScrollMenu id="menu1">
                  {bigCategory.map((e) => (
                    <ScrollMajorMenu key={e.uid}>
                      <ScrollMenuTitle onClick={() => searchCategory(e.uid)}>
                        {e.categoryName}
                      </ScrollMenuTitle>
                    </ScrollMajorMenu>
                  ))}
                </ScrollMenu>
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
            <ScrollSearchPaper>
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "0.8rem" }}
                placeholder="찾으시는 상품을 검색해주세요"
                inputProps={{ "aria-label": "찾으시는 상품을 검색해주세요" }}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    keywordSearch();
                  }
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
                <div onClick={goWish} style={{ cursor: "pointer" }}>
                  <FavoriteBorderOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </div>
              </ScrollIconBox>
              <ScrollIconBox>
                <div onClick={goMypage} style={{ cursor: "pointer" }}>
                  <PersonOutlineOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </div>
              </ScrollIconBox>
              <ScrollIconBox>
                <div onClick={goBasket} style={{ cursor: "pointer" }}>
                  <ShoppingBasketOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "black" }}
                  />
                </div>
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

const AdminLink = styled.p`
  margin: 0;
  text-decoration: none;
  background-color: #aaaaaa;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  padding: 0.2rem;

  color: white;
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
// const MenuList = styled.li`
//   font-size: 0.8rem;
//   list-style: none;
//   position: absolute;
//   width: 100%;
//   margin: 0;
//   padding: 0.5rem;
//   padding-left: 2rem;
//   padding-right: 3rem;
//   opacity: 0;
//   visibility: hidden;
//   transition: all 0.15s ease-in;
//   &:hover {
//     background-color: #eee;
//   }
// `;

const MenuTitle = styled.div``;

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

const ScrollMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  top: 15%;
  position: absolute;
  margin-top: 2.5rem;
  list-style: none;
  background: #fff;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease-in;
  z-index: 1000;
`;

const ScrollMajorMenu = styled.li`
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

const ScrollMenuTitle = styled.div``;

const ScrollCategoryTagBox = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover #menu1 {
    opacity: 1;
    visibility: visible;
  }
`;
