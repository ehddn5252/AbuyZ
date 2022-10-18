import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Nav() {
  return (
    <NavContainer>
      <UserBox>
        <Link href="/login">로그인</Link>
        <Link href="/service">고객센터</Link>
      </UserBox>
      <SearchBox>
        <Link href="/">ITDA</Link>
        <Link href="/search">상품 검색</Link>
        <Link href="/event">이벤트</Link>
        <Link href="/mypage">마이페이지</Link>
        <Link href="/basket">장바구니</Link>
      </SearchBox>
      <CategoryBox>
        <PopupState variant="popover" popupId="popup-menu">
          {(popupState) => (
            <React.Fragment>
              <CategoryTagBox {...bindTrigger(popupState)}>
                <CategoryTitle>식품</CategoryTitle>
                <ExpandMoreIcon fontSize="large" />
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
                <ExpandMoreIcon fontSize="large" />
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
                <ExpandMoreIcon fontSize="large" />
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
                <ExpandMoreIcon fontSize="large" />
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
                <ExpandMoreIcon fontSize="large" />
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
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const UserBox = styled.div`
  height: 10%;
`;
const SearchBox = styled.div``;

const CategoryBox = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  justify-content: center;
  border-width: 0 0 0.5rem 0;
  border-style: solid;
  border-color: #ff0000;
`;

const CategoryTagBox = styled.div`
  display: flex;
  font-size: 2rem;
  margin-left: 2rem;
`;
const CategoryTitle = styled.p`
  padding: 0;
  margin: 0;
`;

const CategoryMenuItem = styled(MenuItem)`
  width: 15rem;
  font-size: 1.2rem;
`;
