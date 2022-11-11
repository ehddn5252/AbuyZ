import React from "react";

import styled from "styled-components";

// Next.js
import { useRouter } from "next/router";

export default function EventItem(event) {
  const router = useRouter();
  const goDetail = () => {
    router.push(`/event/${event.event.uid}`);
  };
  return (
    <CardDiv>
      {/* <image src={}></image> */}
      <img
        onClick={goDetail}
        src={event.event.thumbnail}
        style={{ height: "15rem", width: "100%", objectFit: "cover" }}
      />
    </CardDiv>
  );
}

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 63rem;
  align-items: center;
  margin-top: 3rem;
`;
