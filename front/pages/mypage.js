// React
import React, { useState } from "react";
import { Container } from "@mui/system";
// StyledComponents
import styled from "styled-components";

// 하위컴포넌트
import MypageSideNav from "../components/nav/MypageSideNav";
import MyInfo from "../components/mypage/MyInfo";
import MyInfoChange from "../components/mypage/MyInfoChange";
import MyComplainList from "../components/mypage/MyComplainList";
import MyCouponList from "../components/mypage/MyCouponList";
import MyOrderList from "../components/mypage/MyOrderList";
import MyWishList from "../components/mypage/MyWishList";
import DeliveryList from "../components/mypage/DeliveryList";

export default function Mypage() {
  const [tap, setTap] = useState(1); // eslint-disable-line no-unused-vars
  return (
    <Container
      maxWidth="lg"
      style={{
        background: "#ffffff",
        paddingRight: "5rem",
        paddingLeft: "5rem",
        marginBottom: "5rem",
      }}
    >
      <AllContainer>
        <MyInfo />
      </AllContainer>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ flex: 1 }}>
          <MypageSideNav setTap={setTap} />
        </div>
        <div style={{ flex: 5 }}>
          {tap === 0 ? <MyOrderList /> : null}
          {tap === 1 ? <MyWishList /> : null}
          {tap === 2 ? <MyComplainList /> : null}
          {tap === 3 ? <MyCouponList /> : null}
          {tap === 4 ? <MyInfoChange /> : null}
          {tap === 5 ? <DeliveryList /> : null}
        </div>
      </div>
    </Container>
  );
}
const AllContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MyDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
