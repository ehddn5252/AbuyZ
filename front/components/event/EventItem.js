import React from "react";
import Link from "next/link";

import styled from "styled-components";

export default function EventItem(image) {
  return (
    <CardDiv>
      {/* <image src={}></image> */}
      <Link href="/event/detail">
        <img
          src={`/images/${image.image}.png`}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </Link>
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
