import React from "react";
import EventItem from "./EventItem";

export default function EventList() {
  return (
    <div>
      <h1>이벤트 리스트</h1>
      <EventItem />
      <EventItem />
    </div>
  );
}