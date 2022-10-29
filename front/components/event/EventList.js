import React from "react";
import EventItem from "./EventItem";

export default function EventList() {
  const eventList = [
    {
      id: 0,
      image: "halloween",
    },
    { id: 1, image: "cafe" },
  ];
  return (
    <div>
      {eventList.map((e) => (
        <EventItem key={e.id} image={e.image} />
      ))}
      {/* for문으로 만들기 */}
    </div>
  );
}
