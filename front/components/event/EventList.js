import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import styled from "styled-components";
import { inquireallEvent } from "../../pages/api/event";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

export default function EventList() {
  const [eventList, setEventList] = useState([]);
  const eevent = async () => {
    const res = await inquireallEvent();
    setEventList(res.data.reverse());
  };
  useEffect(() => {
    eevent();
  }, []);
  return (
    <div>
      {eventList.length > 0 ? (
        <div>
          {eventList.map((e, idx) => (
            <EventItem key={idx} event={e} />
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
