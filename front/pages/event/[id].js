import React, { useEffect, useState } from "react";

// Style
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Next.js
import { useRouter } from "next/router";

// API
import { couponlist, getCoupon } from "../api/coupon";
import { detailEvent } from "../api/event";

// Component
import EventCouponButton from "../../components/event/EventCouponButton";

export default function Detail() {
  const router = useRouter();
  // 이벤트 아이디
  const [eventId, setEventId] = useState(0);
  // 내가 가지고 있는 쿠폰 리스트
  const [couponList, setCouponList] = useState([]);
  // 현재 이벤트 정보
  const [currentEvent, setCurretEvent] = useState([]);

  const [isgiven, setIsGiven] = useState(false);

  // 현재 이벤트에 대한 상세 정보 가져오기
  const ddetailEvent = async () => {
    const rrres = await detailEvent(eventId);
    setCurretEvent(rrres.data);
  };

  // 내가 가지고 있는 쿠폰 리스트 가져오기
  const myCoupon = async () => {
    const rres = await couponlist();
    setCouponList(rres.data.result);
  };

  const backClick = () => {
    router.back();
  };
  useEffect(() => {
    // 사이트 주소에서 마지막 번호 받아오고
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];

    // 이벤트 아이디로 설정
    setEventId(id);

    // 현재 이벤트의 상세 정보 가져오기
    ddetailEvent();
    myCoupon();
  }, [eventId]);

  return currentEvent.length !== 0 ? (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginTop: "2rem",
          marginLeft: "24rem",
        }}
      >
        <ArrowBackIcon
          onClick={backClick}
          sx={{ fontSize: "2rem", fontWeight: "bold" }}
        />
      </div>
      <div>
        <TitleContainer>
          <EventP>{currentEvent.name}</EventP>
        </TitleContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "25rem",
          }}
        >
          <p> 일시:</p>
          <p>{currentEvent.start_date.slice(0, 10)}</p>

          <p> - </p>
          <p>{currentEvent.end_date.slice(0, 10)}</p>
        </div>
        <ImgDiv>
          <Image src={currentEvent.contentImg}></Image>
        </ImgDiv>
        <div style={{ marginLeft: "25rem" }}>
          <p>{currentEvent.content}</p>
        </div>

        <div>
          <ButtonDiv>
            <EventCouponButton
              // 현재 이벤트에서 제공하고 있는 쿠폰 아이디
              uid={currentEvent.coupon_lists[0]}
              // 내가 가지고 있는 쿠폰들의 아이디
              list={couponList}
              setIsGiven={setIsGiven}
              isgiven={isgiven}
              currentEvent={currentEvent}
            ></EventCouponButton>
          </ButtonDiv>
        </div>
      </div>
    </Container>
  ) : null;
}

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

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 80vh;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const EventP = styled.p`
  font-size: 2.5rem;
  margin-top: 0;
  font-weight: bold;
  text-align: center;
`;

const Image = styled.img`
  width: 60%;
  object-fit: cover;
`;
