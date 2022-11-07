// React
import React, { useEffect, useState } from "react";
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
import { mypageNum, pageNameState } from "../states";
import { useRecoilState } from "recoil";
export default function Mypage() {
  const [mypageN, setMypageN] = useRecoilState(mypageNum);
  const [tap, setTap] = useState(mypageNum); // eslint-disable-line no-unused-vars
  const [activeTap, SetActiveTap] = useState(0);
  const [prevUrl, setPrevUrl] = useRecoilState(pageNameState);
  const [reviewCnt, setReviewCnt] = useState(0);
  useEffect(() => {
    const path = window.location.pathname;
    if (prevUrl !== path) {
      setMypageN(0);
    } else {
      setTap(mypageN);
      SetActiveTap(mypageN);
    }
  }, [mypageN]);

  useEffect(() => {
    const path = window.location.pathname;
    if (prevUrl !== path) {
      setTap(0);
      SetActiveTap(0);
    } else {
    }
  }, []);
  return (
    <div style={{ minHeight: "80vh" }}>
      <div style={{ margin: "0" }}>
        <MyInfo
          setTap={setTap}
          SetActiveTap={SetActiveTap}
          reviewCnt={reviewCnt}
        />
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
            <MypageSideNav
              setTap={setTap}
              activeTap={activeTap}
              SetActiveTap={SetActiveTap}
            />
          </div>
          <div style={{ flex: 4 }}>
            {tap === 0 ? <MyOrderList /> : null}
            {tap === 1 ? <MyWishList /> : null}
            {tap === 2 ? <MyComplainList /> : null}
            {tap === 3 ? <MyCouponList /> : null}
            {tap === 4 ? <MyInfoChange /> : null}
            {tap === 5 ? <DeliveryList /> : null}
            {tap === 6 ? <CanReview setReviewCnt={setReviewCnt} /> : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
