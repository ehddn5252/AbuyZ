// React
import React, { useState } from "react";

// MUI
import Container from "@mui/material/Container";

// StyledComponents
import styled from "styled-components";

export default function MypageSideNav(setTap) {
  const [activeTap, SetActiveTap] = useState(0);

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
  const tap5Change = () => {
    setTap.setTap(5);
    SetActiveTap(5);
  };
  return (
    <NavContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarList>
            <SidebarListItem>
              <TagButton
                onClick={tap0Change}
                style={
                  activeTap === 0
                    ? { color: "#56a9f1" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                <p style={{ margin: "0", fontSize: "1rem" }}> 주문/리뷰</p>
              </TagButton>
            </SidebarListItem>
            <SidebarListItem>
              <TagButton
                onClick={tap1Change}
                style={
                  activeTap === 1
                    ? { color: "#56a9f1" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                <p style={{ margin: "0", fontSize: "1rem" }}>찜한 상품</p>
              </TagButton>
            </SidebarListItem>
            <SidebarListItem>
              <TagButton
                onClick={tap2Change}
                style={
                  activeTap === 2
                    ? { color: "#56a9f1" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                <p style={{ margin: "0", fontSize: "1rem" }}> 문의 내역</p>
              </TagButton>
            </SidebarListItem>
            <SidebarListItem>
              <TagButton
                onClick={tap3Change}
                style={
                  activeTap === 3
                    ? { color: "#56a9f1" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                <p style={{ margin: "0", fontSize: "1rem" }}>쿠폰</p>
              </TagButton>
            </SidebarListItem>
            <SidebarListItem>
              <TagButton
                onClick={tap4Change}
                style={
                  activeTap === 4
                    ? { color: "#56a9f1" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                <p style={{ margin: "0", fontSize: "1rem" }}> 내 정보 관리</p>
              </TagButton>
            </SidebarListItem>
            <SidebarListItem>
              <TagButton
                onClick={tap5Change}
                style={
                  activeTap === 5
                    ? { color: "#56a9f1" }
                    : { color: "rgb(197, 197, 197)" }
                }
              >
                <p style={{ margin: "0", fontSize: "1rem" }}> 배송지 관리</p>
              </TagButton>
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </NavContainer>
  );
}

const NavContainer = styled(Container)`
  margin-top: 3.5rem;
  margin-right: 6rem;
  padding: 0;
  width: 100%;
`;

const SidebarWrapper = styled.div`
  padding: 0rem;
  border-radius: 1rem;
  color: black;
`;

const SidebarMenu = styled.div`
  margin-bottom: 2rem;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0rem;
`;

const SidebarListItem = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const TagButton = styled.button`
  border: none;
  background-color: white;
  font-size: 1.2rem;
  font-weight: bolder;
  cursor: pointer;
  &:hover p {
    color: #56a9f1;
  }
`;
