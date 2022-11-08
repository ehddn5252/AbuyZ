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
      user: "",
    },
  ]);
  // 리뷰
  const [reviews, setReviews] = useState({
    uid: 0,
    productsUid: 0,
    title: "",
    rating: 0,
    repImg: "",
    reviewContent: "",
    writer: "",
    date: "",
  });

  const ReviewList = [
    {
      id: 0,
      name: "맛있는 부산우유 500ml",
      star: 5,
      content: "우리 아들 사다줬는데, 너무 잘 먹네요.",
      userName: "홍길동",
      date: "2022-10-01 15:15",
    },
    {
      id: 0,
      name: "맛있는 부산우유 500ml",
      star: 3,
      content: "우리 아들 사다줬는데, 너무 잘 먹네요.",
      userName: "홍길동",
      date: "2022-10-01 15:45",
    },
  ];

  const loadData = async () => {
    const res = await getDashboardList();
    setCustomerCenters(res.data.customerCenter);
    setReviews(res.data.review);
  };

  useEffect(() => {
    loadData();
  }, []);

  const ServiceListDiv = customerCenters.map((e) => (
    <div key={e.uid}>
      <div style={{ marginLeft: "2rem" }}>
        <p style={{ fontWeight: "bold" }}>
          [{e.customerCenterCategory}] {e.title}
        </p>
        <p style={{ color: "#969696" }}>
          {e.user} | {e.date}
        </p>
      </div>

      <hr />
    </div>
  ));

  const ReviewListDiv = ReviewList.map((e) => (
    <div key={e.id}>
      <div style={{ marginLeft: "2rem" }}>
        <p style={{ fontWeight: "bold" }}>{e.name}</p>
        <p>{e.content}</p>
        <Rating
          name="text-feedback"
          value={e.star}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <p style={{ fontSize: "0.8rem", color: "#969696", margin: 0 }}>
          {e.name} | {e.date}
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
