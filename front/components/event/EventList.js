import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import styled from "styled-components";
import { inquireEvent } from "../../pages/api/event";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

export default function EventList() {
  const [eventList, setEventList] = useState([]);
  const eevent = async () => {
    const res = await inquireEvent();
    console.log(res.data);
    setEventList(res.data);
  };
  useEffect(() => {
    eevent();
  }, []);
  return (
    <div>
      {eventList.length > 0 ? (
        <div>
          {eventList.map((e) => (
            <EventItem key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <BlankBox>
          <p>😢</p>
          <p>현재 진행중인 이벤트가 없습니다.</p>
        </BlankBox>
      )}
    </div>
  );
}

const BlankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  font-size: 2rem;
  font-weight: bolder;
  color: #aaaaaa;
`;
