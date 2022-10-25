import React from "react";
import styled from "styled-components";
import { Container } from "@mui/material";
import SaleEventList from "../../components/admin/event/SaleEventList";
import AddEvent from "../../components/admin/event/AddEvent";

export default function Event() {
  return (
    <EventPage>
      <Container maxWidth="xxl" sx={{ paddingTop: "1rem" }}>
        <SaleEventList />
        {/* <AddEvent /> */}
      </Container>
    </EventPage>
  );
}

const EventPage = styled.div`
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
`;
