import React from "react";
import EventItem from "./EventItem";

export default function EventList() {
  return (
    <div>
      {/* for문으로 만들기 */}
      <EventItem />
      <EventItem />
    </div>
  );
}
