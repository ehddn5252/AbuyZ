import React, { useState } from "react";
import MypageSideNav from "../components/nav/MypageSideNav";
import MyInfo from "../components/mypage/MyInfo";
import MyInfoChange from "../components/mypage/MyInfoChange";
import MyComplainList from "../components/mypage/MyComplainList";
import MyCouponList from "../components/mypage/MyCouponList";
import MyOrderList from "../components/mypage/MyOrderList";

export default function Mypage() {
  const [tap, setTap] = useState(1); // eslint-disable-line no-unused-vars
  return (
    <div>
      <h1> 마이페이지</h1>
      <MypageSideNav />
      <MyInfo />
      {tap === 1 ? <MyOrderList /> : null}
      {tap === 2 ? <MyComplainList /> : null}
      {tap === 3 ? <MyCouponList /> : null}
      {tap === 4 ? <MyInfoChange /> : null}
    </div>
  );
}
