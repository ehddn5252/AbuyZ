import React from "react";
export default function CanUseCoupon({ setCouponCnt, couponL, couponCnt }) {
  for (var i = 0; i < couponL.length; i++) {
    if (couponL[i].status === "사용가능") {
    }
  }
  console.log("차암나", couponCnt);
  return <span>{couponCnt}건</span>;
}
