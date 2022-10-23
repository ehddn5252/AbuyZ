// React
import React, { useState } from "react";

// MUI
import Container from "@mui/material/Container";

// StyledComponents
import styled from "styled-components";

export default function MypageSideNav(setTap) {
  const [activeTap, SetActiveTap] = useState(4);

  const tap0Change = () => {
    setTap.setTap(0);
    SetActiveTap(0);
  };
  const tap1Change = () => {
    setTap.setTap(1);
    SetActiveTap(1);
  };
  const tap2Change = () => {
    setTap.setTap(2);
    SetActiveTap(2);
  };
  const tap3Change = () => {
    setTap.setTap(3);
    SetActiveTap(3);
  };
  const tap4Change = () => {
    setTap.setTap(4);
    SetActiveTap(4);
  };
  return (
    <NavContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>내 정보 관리</SidebarTitle>
          <SidebarList>
            <SidebarListItem>
              <TagButton
                onClick={tap4Change}
                style={
                  activeTap === 4
                    ? { color: "black" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                회원정보관리
              </TagButton>
            </SidebarListItem>
            <SidebarListItem>
              <TagButton
                onClick={tap0Change}
                style={
                  activeTap === 0
                    ? { color: "black" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                주문/리뷰 내역
              </TagButton>
            </SidebarListItem>
            <SidebarListItem>
              <TagButton
                onClick={tap1Change}
                style={
                  activeTap === 1
                    ? { color: "black" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                찜한 상품내역
              </TagButton>
            </SidebarListItem>
            <SidebarListItem>
              <TagButton
                onClick={tap2Change}
                style={
                  activeTap === 2
                    ? { color: "black" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                문의 내역
              </TagButton>
            </SidebarListItem>
            <SidebarListItem>
              <TagButton
                onClick={tap3Change}
                style={
                  activeTap === 3
                    ? { color: "black" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                쿠폰함
              </TagButton>
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </NavContainer>
  );
}

const NavContainer = styled(Container)`
  margin: 0;
  margin-top: 3rem;
  margin-right: 6rem;
  margin-left: 3rem;
  padding: 0;
  width: 15%;
`;

const SidebarWrapper = styled.div`
  padding: 1rem;
  border: 0.2rem solid black;
  border-radius: 1rem;
  color: black;
`;

const SidebarMenu = styled.div`
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h3`
  font-size: 2rem;
  font-weight: 1000;
  margin-left: 1.5rem;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0.5rem;
`;

const SidebarListItem = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;

const TagButton = styled.button`
  border: none;
  background-color: white;
  font-size: 1.2rem;
  font-weight: bolder;
  cursor: pointer;
`;
