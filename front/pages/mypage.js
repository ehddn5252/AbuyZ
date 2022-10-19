// React
import React, { useState } from "react";

// StyledComponents
import styled from "styled-components";

// 하위컴포넌트
import MypageSideNav from "../components/nav/MypageSideNav";
import MyInfo from "../components/mypage/MyInfo";
import MyInfoChange from "../components/mypage/MyInfoChange";
import MyComplainList from "../components/mypage/MyComplainList";
import MyCouponList from "../components/mypage/MyCouponList";
import MyOrderList from "../components/mypage/MyOrderList";

export default function Mypage() {
  const [tap, setTap] = useState(0); // eslint-disable-line no-unused-vars
  return (
    <MypageContainer>
      <MypageSideNav setTap={setTap} />
      <MyInfo />
      {tap === 0 ? <MyOrderList /> : null}
      {tap === 1 ? <MyComplainList /> : null}
      {tap === 2 ? <MyCouponList /> : null}
      {tap === 3 ? <MyInfoChange /> : null}
    </MypageContainer>
  );
}

const MypageContainer = styled.div`
  display: flex;
  padding: 5rem;
  padding-right: 10rem;
  padding-left: 10rem;
`;
