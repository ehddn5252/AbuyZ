import React, { useState } from "react";
import styled from "styled-components";
import Container from "@mui/material/Container";
export default function ServiceSideNav(setServiceTap) {
  const [activeTap, SetActiveTap] = useState(0);
  const tap0Change = () => {
    setServiceTap.setServiceTap(0);
    SetActiveTap(0);
  };
  const tap1Change = () => {
    setServiceTap.setServiceTap(1);
    SetActiveTap(1);
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
                <p style={{ margin: "0", fontSize: "1rem" }}>FAQ</p>
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
                <p style={{ margin: "0", fontSize: "1rem" }}>1:1문의하기</p>
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
  padding: 20px;
  color: black;
`;

const SidebarMenu = styled.div`
  margin-bottom: 2rem;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0.5rem;
`;

const SidebarListItem = styled.li`
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10%;
  font-size: 2rem;
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
