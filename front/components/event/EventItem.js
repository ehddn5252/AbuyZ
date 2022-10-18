import React from "react";
import Link from "next/link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function EventItem() {
  return (
    <div>
      <br></br>
      <br></br>
      <Link href="/event/detail">
        <Card sx={{ maxWidth: 900 }}>
          <CardMedia
            component="img"
            alt="eventpng"
            height="400"
            image="/images/event.png"
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
    </div>
  );
}
