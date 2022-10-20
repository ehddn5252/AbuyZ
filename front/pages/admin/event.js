import React from "react";
import styled from "styled-components";
import SaleEventList from "../../components/admin/event/SaleEventList";

export default function Event() {
  return (
    <EventPage>
      <EventHeaderBox>
        <HeaderText>이벤트 관리</HeaderText>
        <AddEventButton>이벤트 등록</AddEventButton>
      </EventHeaderBox>
      <SaleEventList />
    </EventPage>
  );
}

const EventPage = styled.div`
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
  /* width: 100vw;
  height: 100vh; */
`;

const EventHeaderBox = styled.div`
  border: 0.3rem solid #ff9494;
  border-radius: 1rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5rem;
`;

const HeaderText = styled.p`
  font-size: 1.5rem;
  font-weight: 800;
`;

const AddEventButton = styled.button`
  background-color: white;
`;
