// React
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import Coupon from "../../public/images/coupon.png";
import { couponlist } from "../../pages/api/coupon";
// MUI
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import MyCouponItem from "./MyCouponItem";

export default function MyCouponList() {
  //쿠폰 지훈 담당 {result: null, count: 0} 이렇게불러와짐
  const ccoupon = async () => {
    const res = await couponlist();
    console.log("쿠폰 내역", res.data);
  };
  const [couponList, setCouponList] = useState([
    {
      id: 0,
      couponName: "잇다 출시기념 감사 쿠폰, 사용 불가능",
      saleprice: "3000 원",
      startPeriod: "2022.10.18",
      expirationPeriod: "2022.10.19",
      used: 0,
      category: "의류",
    },
    {
      id: 1,
      couponName: "잇다 출시기념 감사 쿠폰, 만료",
      saleprice: "3000 원",
      startPeriod: "2022.10.18",
      expirationPeriod: "2022.10.19",
      used: 1,
      category: "식품",
    },
    {
      id: 2,
      couponName: "잇다 출시기념 감사 쿠폰, 사용 불가능",
      saleprice: "3000 원",
      startPeriod: "2022.10.18",
      expirationPeriod: "2022.10.19",
      used: 2,
      category: "의류",
    },
    {
      id: 3,
      couponName: "잇다 출시기념 감사 쿠폰123, 사용 가능",
      saleprice: "3000 원",
      startPeriod: "2022.10.18",
      expirationPeriod: "2022.10.19",
      used: 1,
      category: "가구",
    },
  ]); // eslint-disable-line no-unused-vars
  // const [couponList, setCouponList] = useState([]);

  couponList.sort((a, b) => a.used - b.used);
  console.log(couponList);
  useEffect(() => {
    setCouponList([
      {
        id: 0,
        couponName: "잇다 출시기념 감사 쿠폰, 사용 가능",
        saleprice: "3000 원",
        startPeriod: "2022.10.18",
        expirationPeriod: "2022.10.19",
        used: 0,
        category: "의류",
      },
      {
        id: 1,
        couponName: "잇다 출시기념 감사 쿠폰, 사용 불가능",
        saleprice: "3000 원",
        startPeriod: "2022.10.18",
        expirationPeriod: "2022.10.19",
        used: 1,
        category: "식품",
      },
      {
        id: 2,
        couponName: "잇다 출시기념 감사 쿠폰, 사용 만료",
        saleprice: "3000 원",
        startPeriod: "2022.10.18",
        expirationPeriod: "2022.10.19",
        used: 2,
        category: "의류",
      },
      {
        id: 3,
        couponName: "잇다 출시기념 감사 쿠폰123, 사용 불가능",
        saleprice: "3000 원",
        startPeriod: "2022.10.18",
        expirationPeriod: "2022.10.19",
        used: 1,
        category: "가구",
      },
      {
        id: 4,
        couponName: "잇다 출시기념 감사 쿠폰123, 사용 가능",
        saleprice: "3000 원",
        startPeriod: "2022.10.18",
        expirationPeriod: "2022.10.19",
        used: 0,
        category: "반려/",
      },
    ]);
    ccoupon();
  }, []);
  return (
    <MyCouponContainer>
      <MajorTitle>쿠폰</MajorTitle>
      <hr
        style={{
          height: "0.3rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />
      {/* <MyCouponItem couponList={couponList}></MyCouponItem> */}
      {couponList.length ? (
        <Grid container spacing={1} style={{ width: "100%", height: "100%" }}>
          {couponList.map((coupon) => (
            <Grid
              key={coupon.id}
              item
              xs={6}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={
                  coupon.used === 0
                    ? {
                        backgroundImage: "url(/images/coupon.png)",
                        resize: "cover",
                        backgroundSize: "27rem",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "14rem",
                      }
                    : coupon.used === 1
                    ? {
                        backgroundImage: "url(/images/coupon_completed.png)",
                        resize: "cover",
                        backgroundSize: "27rem",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "14rem",
                      }
                    : {
                        backgroundImage: "url(/images/coupon_expired.png)",
                        resize: "cover",
                        backgroundSize: "27rem",
                        backgroundRepeat: "no-repeat",
                        // backgroundColor: "black",
                        width: "100%",
                        height: "14rem",
                      }
                }
              >
                {coupon.used === 0 ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        color: "black",
                        flex: 8,
                        marginLeft: "2.5rem",
                        marginTop: "2rem",
                      }}
                    >
                      <span style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                        {coupon.saleprice}
                      </span>
                      <br></br>
                      <p>{coupon.couponName}</p>
                      <br></br>
                      <span>사용 카테고리: {coupon.category}</span>
                      <br></br>
                      <span style={{ color: "#aaaaaa" }}>
                        {coupon.startPeriod} ~ {coupon.expirationPeriod}
                      </span>
                    </div>
                    <div
                      style={{
                        flex: 4,
                        marginTop: "4rem",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        [{coupon.category}]
                      </span>
                      <br></br>
                      <span>쇼핑하기</span>
                      <br></br>
                      <br></br>
                      <ArrowCircleRightOutlinedIcon
                        sx={{ width: "2.5rem", height: "2.5rem" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "2rem", color: "#aaaaaa" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                      {coupon.saleprice}
                    </span>
                    <br></br>
                    <p>{coupon.couponName}</p>
                    <br></br>
                    <span>사용 카테고리: {coupon.category}</span>
                    <br></br>
                    <span style={{ color: "#aaaaaa" }}>
                      {coupon.startPeriod} ~ {coupon.expirationPeriod}
                    </span>
                  </div>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <BlankBox>
          <LocalOfferOutlinedIcon sx={{ fontSize: "6rem" }} />
          <p>보유하신 쿠폰이 없습니다</p>
        </BlankBox>
      )}
    </MyCouponContainer>
  );
}

const MyCouponContainer = styled.div`
  margin-top: 4.5rem;
  width: 56rem;
  min-height: 80vh;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;

const BlankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  font-size: 3rem;
  font-weight: bolder;
  color: #aaaaaa;
`;

// const Back = styled.div`
//   /* background-image: url("../../public/images/coupon.png"); */
//   background-image: `url(${coupon})`;
//   /* background-color: black; */
//   height: 100%;
//   width: 100%;
// `;
