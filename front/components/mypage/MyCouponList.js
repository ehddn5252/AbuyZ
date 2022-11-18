// React
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { couponlist } from "../../pages/api/coupon";
// MUI
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

// StyledComponents
import styled from "styled-components";

export default function MyCouponList() {
  const [couponList, setCouponList] = useState([]);
  const ccoupon = async () => {
    const res = await couponlist();
    // res.data.result.sort((a,b) => a.used - b.used)
    setCouponList(res.data.result);
  };
  useEffect(() => {
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
          {couponList.map((coupon, idx) => (
            <Grid
              key={idx}
              item
              xs={6}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={
                  coupon.status === "사용가능"
                    ? {
                        backgroundImage: "url(/images/coupon.png)",
                        resize: "cover",
                        backgroundSize: "27rem",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "14rem",
                      }
                    : coupon.status === "사용"
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
                      {coupon.discount_price.toLocaleString("ko-KR")}원
                    </span>
                    <br></br>
                    <p>{coupon.name}</p>
                    <br></br>
                    <span style={{ color: "#aaaaaa" }}>
                      사용 카테고리: {coupon.available_categories_name}
                    </span>
                    <br></br>
                    <span style={{ color: "#aaaaaa" }}>
                      {coupon.start_date.slice(0, 10)} ~{" "}
                      {coupon.end_date.slice(0, 10)}
                    </span>
                  </div>

                  {coupon.status === "사용가능" ? (
                    <div
                      style={{
                        flex: 4,
                        marginTop: "4rem",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          color: "white",
                        }}
                      >
                        쿠폰으로
                      </span>
                      <br></br>
                      <span style={{ color: "white" }}>쇼핑하기</span>
                      <br></br>
                      <br></br>
                      <ArrowCircleRightOutlinedIcon
                        sx={{
                          width: "2.5rem",
                          height: "2.5rem",
                          color: "white",
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <BlankBox>
          <LocalOfferOutlinedIcon
            sx={{ fontSize: "4rem", color: "rgb(86, 169, 241,0.7)" }}
          />
          <p style={{ fontSize: "2rem", color: "rgb(86, 169, 241,0.7)" }}>
            보유하신 쿠폰이 없습니다
          </p>
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
