import React from "react";
import EventList from "../../components/event/EventList";

export default function Event() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1> 이벤트 몰</h1>
      </div>

      <EventList />
    </div>
  );
}
