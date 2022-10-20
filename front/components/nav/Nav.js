// React
import React from "react";

// MUI
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export default function Nav() {
  return (
    <NavContainer>
      <UserBox>
        <UserLink href="/login">로그인</UserLink>
        <UserLink href="/service">고객센터</UserLink>
      </UserBox>
      <SearchBox>
        <LogoLink href="/">ITDA</LogoLink>
        <SearchPaper component="form">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="찾으시는 상품을 검색해주세요"
            inputProps={{ "aria-label": "찾으시는 상품을 검색해주세요" }}
          />
          <IconButton
            href="/search"
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </SearchPaper>
        <IconBox>
          <Link href="/event">
            <EventIcon fontSize="large" sx={{ color: "black" }} />
          </Link>
          <Link href="/event" sx={{ textDecoration: "none" }}>
            <IconTitle>이벤트</IconTitle>
          </Link>
        </IconBox>
        <IconBox>
          <Link href="/mypage">
            <PersonIcon fontSize="large" sx={{ color: "black" }} />
          </Link>
          <Link href="/mypage" sx={{ textDecoration: "none" }}>
            <IconTitle>마이페이지</IconTitle>
          </Link>
        </IconBox>
        <IconBox>
          <Link href="/basket">
            <ShoppingBasketIcon fontSize="large" sx={{ color: "black" }} />
          </Link>
          <Link href="/basket" sx={{ textDecoration: "none" }}>
            <IconTitle>장바구니</IconTitle>
          </Link>
        </IconBox>
      </SearchBox>
      <CategoryBox>
        <PopupState variant="popover" popupId="popup-menu">
          {(popupState) => (
            <React.Fragment>
              <CategoryTagBox {...bindTrigger(popupState)}>
                <CategoryTitle>식품</CategoryTitle>
                <ExpandMoreIcon />
              </CategoryTagBox>
              <Menu {...bindMenu(popupState)}>
                <CategoryMenuItem onClick={popupState.close}>
                  과일
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  채소
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  고기
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  과자/디저트/아이스크림
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  생수/음료/주류
                </CategoryMenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <PopupState variant="popover" popupId="popup-menu">
          {(popupState) => (
            <React.Fragment>
              <CategoryTagBox {...bindTrigger(popupState)}>
                <CategoryTitle>생활건강</CategoryTitle>
                <ExpandMoreIcon />
              </CategoryTagBox>
              <Menu {...bindMenu(popupState)}>
                <CategoryMenuItem onClick={popupState.close}>
                  의류
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  언더웨어
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  신발
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  가방
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  악세서리
                </CategoryMenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <PopupState variant="popover" popupId="popup-menu">
          {(popupState) => (
            <React.Fragment>
              <CategoryTagBox {...bindTrigger(popupState)}>
                <CategoryTitle>가구/인테리어</CategoryTitle>
                <ExpandMoreIcon />
              </CategoryTagBox>
              <Menu {...bindMenu(popupState)}>
                <CategoryMenuItem onClick={popupState.close}>
                  주방가구
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  거실가구
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  커튼/블라인드
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  학생/사무가구
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  침실가구
                </CategoryMenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <PopupState variant="popover" popupId="popup-menu">
          {(popupState) => (
            <React.Fragment>
              <CategoryTagBox {...bindTrigger(popupState)}>
                <CategoryTitle>반려/도서/취미</CategoryTitle>
                <ExpandMoreIcon />
              </CategoryTagBox>
              <Menu {...bindMenu(popupState)}>
                <CategoryMenuItem onClick={popupState.close}>
                  도서
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  노트/다이어리
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  사료
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  필기류
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  반려 동물 용품
                </CategoryMenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <PopupState variant="popover" popupId="popup-menu">
          {(popupState) => (
            <React.Fragment>
              <CategoryTagBox {...bindTrigger(popupState)}>
                <CategoryTitle>뷰티</CategoryTitle>
                <ExpandMoreIcon />
              </CategoryTagBox>
              <Menu {...bindMenu(popupState)}>
                <CategoryMenuItem onClick={popupState.close}>
                  스킨케어
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  향수
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  헤어/바디
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  메이크업
                </CategoryMenuItem>
                <CategoryMenuItem onClick={popupState.close}>
                  네일
                </CategoryMenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </CategoryBox>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const UserBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
  padding-right: 4rem;
`;

const UserLink = styled(Link)`
  text-decoration: none;
  margin-left: 2rem;
  color: #aaaaaa;
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  border-width: 0 0 0.1rem 0;
  border-style: solid;
  border-color: #eaeaea;
`;

const SearchPaper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 600px;
  height: 50;
  margin: 0.5rem;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  color: red;
  padding-right: 2rem;
`;
const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

const IconTitle = styled.p`
  padding: 0;
  margin: 0;
  color: black;
`;
const CategoryBox = styled.div`
  display: flex;
  width: auto;
  padding: 1.5rem;
  justify-content: center;
  border-width: 0 0 0.5rem 0;
  border-style: solid;
  border-color: #7895b2;
`;

const CategoryTagBox = styled.div`
  display: flex;
  font-size: 2rem;
  margin-left: 3rem;
  margin-right: 3rem;
  cursor: pointer;
`;
const CategoryTitle = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.3rem;
`;

const CategoryMenuItem = styled(MenuItem)`
  width: 15rem;
  font-size: 1rem;
`;
