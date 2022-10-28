import React from "react";
import styled from "styled-components";
import EventInquire from "../../components/admin/event/EventInquire";

export default function Event() {
  return (
    <EventPage>
      <EventInquire />
    </EventPage>
  );
}

const EventPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
