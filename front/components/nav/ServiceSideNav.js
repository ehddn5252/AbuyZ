import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "@mui/material/Container";
import { serviceNum, pageNameState } from "../../states";
import { useRecoilState } from "recoil";

export default function ServiceSideNav(props) {
  // 사이드바 번호(전역)
  const [side, setSide] = useRecoilState(serviceNum);

  // 전역으로 불러온 값을 여기에 넣어줌(사이드바 번호)
  const [activeTap, SetActiveTap] = useState(serviceNum);

  // 이전 페이지 주소(전역)
  const [prevUrl, setPrevUrl] = useRecoilState(pageNameState);

  // 새로고침과 다른 페이지 접근 구분
  // 전의 주소와 비교
  useEffect(() => {
    const path = window.location.pathname;
    if (prevUrl !== path) {
      SetActiveTap(0);
    } else {
    }
  }, []);

  // act 값이 바뀔 때마다 useEffect
  // 전의 주소와 비교
  useEffect(() => {
    const path = window.location.pathname;
    if (prevUrl !== path) {
      // SetActiveTap(0);
    } else {
      SetActiveTap(side);
    }
  }, [side]);

  const tap0Change = () => {
    props.setServiceTap(0);
    setSide(0);
    SetActiveTap(0);
  };
  const tap1Change = () => {
    props.setServiceTap(1);
    setSide(1);
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
