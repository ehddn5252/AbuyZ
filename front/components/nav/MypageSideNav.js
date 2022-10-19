// React
import React from "react";

// MUI
import Container from "@mui/material/Container";

// StyledComponents
import styled from "styled-components";

export default function MypageSideNav(props) {
  const tap0Change = () => {
    props.setTap(0);
  };
  const tap1Change = () => {
    props.setTap(1);
  };
  const tap2Change = () => {
    props.setTap(2);
  };
  const tap3Change = () => {
    props.setTap(3);
  };

  return (
    <Container>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>마이페이지</SidebarTitle>
          <SidebarList>
            <SidebarListItem>
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={tap0Change}
              >
                주문/리뷰 내역
              </button>
            </SidebarListItem>
            <SidebarListItem>
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={tap1Change}
              >
                문의 내역
              </button>
            </SidebarListItem>
            <SidebarListItem>
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={tap2Change}
              >
                쿠폰함
              </button>
            </SidebarListItem>
            <SidebarListItem>
              <button
                style={{ border: "none", backgroundColor: "white" }}
                onClick={tap3Change}
              >
                회원정보관리문의 내역
              </button>
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </Container>
  );
}

const SidebarWrapper = styled.div`
  padding: 20px;
  color: black;
`;

const SidebarMenu = styled.div`
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h3`
  font-size: 3rem;
  color: rgb(197, 197, 197);
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
  border-radius: 10px;
  font-size: 2rem;
`;
