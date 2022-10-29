import React from "react";
import styled from "styled-components";
import EventList from "../../components/event/EventList";

export default function Event() {
  return (
    <AllDiv>
      <EventList />
    </AllDiv>
  );
}

const AllDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 80vh;
`;
