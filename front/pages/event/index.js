import React from "react";
import styled from "styled-components";
import EventList from "../../components/event/EventList";

export default function Event() {
  return (
    <div>
      <AllDiv>
        <h1> 이벤트 몰</h1>
      </AllDiv>

      <EventList />
    </div>
  );
}

const AllDiv = styled.div`
  display: flex;
  justify-content: center;
`;
