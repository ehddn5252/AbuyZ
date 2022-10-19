import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function EventItem() {
  return (
    <CardDiv>
      <Link href="/event/detail">
        <Card>
          <CardMedia
            component="img"
            alt="eventpng"
            // 이미지는 대표 이미지 받아오기
            image="/images/event.png"
            height="400"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              이벤트 이름
            </Typography>
            <Typography variant="body2" color="text.secondary">
              이벤트 날짜
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </CardDiv>
  );
}

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;
