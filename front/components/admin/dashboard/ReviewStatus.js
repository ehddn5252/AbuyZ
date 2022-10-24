import React from "react";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function ReviewStatus() {
  const ServiceList = [
    {
      id: 0,
      tag: "교환/환불",
      title: "환불해주세요",
      name: "홍길동",
      date: "2022-10-01 15:15",
    },
    {
      id: 1,
      tag: "주문/결제",
      title: "문의합니다",
      name: "홍길동",
      date: "2022-10-01 15:25",
    },
    {
      id: 2,
      tag: "이벤트 프로모션",
      title: "이벤트 해주세요",
      name: "홍길동",
      date: "2022-10-01 16:15",
    },
  ];

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
  const ServiceListDiv = ServiceList.map((e) => (
    <div key={e.id}>
      <div style={{ marginLeft: "2rem" }}>
        <p style={{ fontWeight: "bold" }}>
          {e.tag} {e.title}
        </p>
        <p style={{ color: "#969696" }}>
          {e.name} | {e.date}
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
  height: 23rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  background-color: white;
`;

const DailyBox = styled.div`
  width: 100%;
  height: 23rem;
  padding: 0.5rem;
  background-color: white;
`;
