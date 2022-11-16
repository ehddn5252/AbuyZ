import React, { useEffect, useState } from "react";

import styled from "styled-components";

// Next.js
import { useRouter } from "next/router";

export default function EventItem({ event }) {
  const [startday, setStartDay] = useState("");
  const [endday, setEndDay] = useState("");

  const router = useRouter();
  const goDetail = () => {
    router.push(`/event/${event.uid}`);
  };
  useEffect(() => {
    const week = ["일", "월", "화", "수", "목", "금", "토", "일"];
    if (event) {
      let start = new Date(event.start_date);
      let end = new Date(event.end_date);

      setStartDay(
        start.toLocaleDateString().slice(0, -1) +
          " " +
          "(" +
          week[start.getDay()] +
          ")"
      );
      setEndDay(
        end.toLocaleDateString().slice(0, -1) +
          " " +
          "(" +
          week[end.getDay()] +
          ")"
      );
    }
  }, []);
  return (
    <CardDiv>
      <img
        onClick={goDetail}
        src={event.thumbnail}
        style={{ height: "15rem", width: "100%", objectFit: "cover" }}
      />
      <DateDiv>
        <p style={{ margin: 0 }}>
          {startday} ~ {endday}
        </p>
      </DateDiv>
    </CardDiv>
  );
}

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 63rem;
  align-items: center;
  border: #393e46 1px solid;
  margin-top: 3rem;
`;

const DateDiv = styled.div`
  display: flex;
  background-color: #f8f8f8;
  justify-content: flex-start;
  padding: 1rem;
  padding-left: 2rem;
  width: 100%;
`;
