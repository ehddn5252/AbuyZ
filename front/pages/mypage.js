// React
import React, { useState } from "react";
import { Container } from "@mui/system";

// 하위컴포넌트
import MypageSideNav from "../components/nav/MypageSideNav";
import MyInfo from "../components/mypage/MyInfo";
import MyInfoChange from "../components/mypage/MyInfoChange";
import MyComplainList from "../components/mypage/MyComplainList";
import MyCouponList from "../components/mypage/MyCouponList";
import MyOrderList from "../components/mypage/MyOrderList";
import MyWishList from "../components/mypage/MyWishList";
import DeliveryList from "../components/mypage/DeliveryList";
import CanReview from "../components/mypage/CanReview";

export default function Mypage() {
  const [tap, setTap] = useState(0); // eslint-disable-line no-unused-vars
  return (
    <div style={{ minHeight: "80vh" }}>
      <div style={{ margin: "0" }}>
        <MyInfo setTap={setTap} />
      </div>
      <Container
        maxWidth="lg"
        style={{
          background: "#ffffff",
          paddingRight: "7rem",
          paddingLeft: "3rem",
          marginBottom: "5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ flex: 1 }}>
            <MypageSideNav setTap={setTap} />
          </div>
          <div style={{ flex: 4 }}>
            {tap === 0 ? <MyOrderList /> : null}
            {tap === 1 ? <MyWishList /> : null}
            {tap === 2 ? <MyComplainList /> : null}
            {tap === 3 ? <MyCouponList /> : null}
            {tap === 4 ? <MyInfoChange /> : null}
            {tap === 5 ? <DeliveryList /> : null}
            {tap === 6 ? <CanReview /> : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
