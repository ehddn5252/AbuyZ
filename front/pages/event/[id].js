import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Next.js
import { useRouter } from "next/router";
import { inquireEvent } from "../api/event";
import { getCoupon } from "../api/coupon";
export default function Detail() {
  const router = useRouter();
  const [eventId, setEventId] = useState(0);
  const [eventList, setEventList] = useState([]);
  const [eventImg, setEventImage] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [eventName, setEventName] = useState("");
  const [couponList, setCouponList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [idx, setIdx] = useState(0);
  const eevent = async () => {
    const res = await inquireEvent();
    setEventList(res.data);
    const temp = res.data;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].uid == eventId) {
        setIdx(i);
        // setEventImage(temp[i].contentImg);
        // setEventContent(temp[i].content);
        // setCouponList(temp[i].coupon_lists);
        // setStartDate(temp[i].start_date);
        // setEndDate(temp[i].end_date);
        // setEventName(temp[i].name);
      }
    }
  };
  const ClickCoupon = async () => {
    const res = await getCoupon(couponList[0].uid);
    alert("쿠폰 지급이 완료되었습니다! 쿠폰함을 확인해주세요👌");
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    setEventId(id);
    eevent();
  }, []);

  return eventList.length ? (
    <Container>
      <TitleContainer>
        <EventP>{eventList[idx].name}</EventP>
      </TitleContainer>
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "25rem" }}
      >
        <p> 일시:</p>
        <p>{eventList[idx].start_date.slice(0, 10)}</p>
        <p> - </p>
        <p>{eventList[idx].end_date.slice(0, 10)}</p>
      </div>
      <ImgDiv>
        <Image src={eventList[idx].contentImg}></Image>
      </ImgDiv>
      <div style={{ marginLeft: "25rem" }}>
        <p>{eventList[idx].content}</p>
      </div>
      <ButtonDiv>
        <StyledButton onClick={() => ClickCoupon()}>쿠폰 받기</StyledButton>
      </ButtonDiv>
      <ButtonDateDiv>
        <h5 style={{ color: "#56a9f1" }}>
          {/* 쿠폰 지급 일자: {eventList[idx].couponList[0].start_date.slice(0, 10)} */}
        </h5>
      </ButtonDateDiv>
    </Container>
  ) : null;
}

const StyledButton = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.5;
  width: 8rem;
  color: white;
  border: none;
  background: #56a9f1;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonDiv = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonDateDiv = styled.div`
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const EventP = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

const Image = styled.img`
  width: 60%;
  object-fit: cover;
`;
