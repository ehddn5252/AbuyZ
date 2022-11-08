import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import { getDashboardList } from "../../../pages/api/dashboard";

export default function ReviewStatus() {
  // 문의
  const [customerCenters, setCustomerCenters] = useState([
    {
      uid: 0,
      title: "",
      content: "",
      status: "",
      imgUrl: "",
      customerCenterCategory: "",
      date: "",
      userName: "",
    },
  ]);
  // 리뷰
  const [reviews, setReviews] = useState([
    {
      uid: 0,
      productsUid: 0,
      title: "",
      rating: 0,
      repImg: "",
      reviewContent: "",
      writer: "",
      date: "",
      productName: "",
    },
  ]);

  const loadData = async () => {
    const res = await getDashboardList();
    setCustomerCenters(res.data.customerCenter);
    setReviews(res.data.review);
  };

  useEffect(() => {
    loadData();
  }, []);

  // console.log(customerCenters);
  const ServiceListDiv = customerCenters.map((e) => (
    <div key={e.uid}>
      <div style={{ marginLeft: "2rem" }}>
        <p style={{ fontWeight: "bold" }}>
          [{e.customerCenterCategory}] {e.title}
        </p>
        {/* 일단 임시로 버그 수정 */}
        {e.start_date && e.end_date ? (
          <p style={{ color: "#969696" }}>
            {e.userName} | {e.start_date.slice(0, 10)}{" "}
            {e.end_date.slice(11, 16)}
          </p>
        ) : null}
      </div>

      <hr />
    </div>
  ));

  const ReviewListDiv = reviews.map((e) => (
    <div key={e.uid}>
      <div style={{ marginLeft: "2rem" }}>
        <p style={{ fontWeight: "bold" }}>{e.productName}</p>
        <p>{e.reviewContent}</p>
        <Rating
          name="text-feedback"
          value={e.rating}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <p style={{ fontSize: "0.8rem", color: "#969696", margin: 0 }}>
          {e.writer} | {e.date.slice(0, 10)} {e.date.slice(11, 16)}
        </p>
      </div>
      <hr />
    </div>
  ));
  return (
    <BoxContainer>
      <TodayBox>
        <h1 style={{ marginLeft: "1rem" }}>최근 문의</h1>
        <hr />
        {ServiceListDiv}
      </TodayBox>
      <DailyBox>
        <h1 style={{ marginLeft: "1rem" }}>최근 리뷰</h1>
        <hr />
        {ReviewListDiv}
      </DailyBox>
    </BoxContainer>
  );
}

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const TodayBox = styled.div`
  width: 100%;
  height: 21rem;
  /* padding: 0.5rem; */
  margin-bottom: 2rem;
  background-color: white;
`;

const DailyBox = styled.div`
  width: 100%;
  height: 23rem;
  /* padding: 0.5rem; */
  background-color: white;
`;
