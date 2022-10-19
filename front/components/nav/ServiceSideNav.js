import React from "react";
import styled from "styled-components";
export default function ServiceSideNav(props) {
  const tap0Change = () => {
    props.setServiceTap(0);
  };
  const tap1Change = () => {
    props.setServiceTap(1);
  };

  return (
    <div>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>고객센터</SidebarTitle>
          <SidebarList>
            <SidebarListItem>
              <ButtonDiv onClick={tap0Change}>쇼핑 FAQ</ButtonDiv>
            </SidebarListItem>
            <SidebarListItem>
              <ButtonDiv onClick={tap1Change}>1:1문의</ButtonDiv>
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </div>
  );
}

const SidebarWrapper = styled.div`
  padding: 20px;
  color: black;
`;

const SidebarMenu = styled.div`
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: black;
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

const ButtonDiv = styled.button`
  border: 1px red solid;
  background-color: white;
  border-radius: 10px;
  width: 8rem;
  height: 4rem;

  &:hover {
    background-color: #ff7171;
    color: white;
  }
`;
