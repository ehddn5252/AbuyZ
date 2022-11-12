import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Next.js
import { Event, inquireEvent } from "../api/event";
import { couponlist, getCoupon } from "../api/coupon";
import { useRouter } from "next/router";
import { detailEvent } from "../api/event";
export default function Detail() {
  const router = useRouter();
  const [eventId, setEventId] = useState(0);
  const [eventList, setEventList] = useState([]);
  const [couponList, setCouponList] = useState([]);
  const [couponuidList, setCouponuidList] = useState([]);
  const [currentEvent, setCurretEvent] = useState([]);
  const [duplicate, setDuplicate] = useState(false);
  const ddetailEvent = async () => {
    const rrres = await detailEvent(eventId);
    setCurretEvent(rrres.data);
  };

  const myCoupon = async () => {
    const rres = await couponlist();
    setCouponList(rres.data.result);
    // console.log("내 쿠폰", rres.data.result);
  };
  // console.log(currentEvent.coupon_lists[0].uid);
  // console.log("나야나", couponUidList);
  const ClickCoupon = async () => {
    // console.log(currentEvent.)
    // const res = await getCoupon(eventList[idx].coupon_lists[0].uid);
    alert("쿠폰 지급이 완료되었습니다! 쿠폰함을 확인해주세요👌");
  };

  // let currentEvent = [];
  useEffect(() => {
    // 사이트 주소에서 마지막 번호 받아오고
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    // 이벤트 아이디로 설정
    setEventId(id);

    // 현재 이벤트의 상세 정보 가져오기
    ddetailEvent();
    myCoupon();

    //
    var mycouponlist = [];
    for (var i = 0; i < couponList.length; i++) {
      mycouponlist.push(couponList[i].coupon_uid);
      console.log(couponList[i].coupon_uid);
    }
    setCouponuidList(mycouponlist);
    if (couponuidList.includes(currentEvent.coupon_lists[0].uid)) {
      console.log("마자?");
      setDuplicate(true);
    }
  }, [eventId]);

  return (
    <Container>
      {currentEvent.length === 0 ? (
        <div>
          <TitleContainer>
            {/* <EventP>{currentEvent.name}</EventP> */}
          </TitleContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "25rem",
            }}
          >
            <p> 일시:</p>
            {/* <p>{currentEvent.start_date.slice(0, 10)}</p> */}

            <p> - </p>
            {/* <p>{currentEvent.end_date.slice(0, 10)}</p> */}
          </div>
          <ImgDiv>{/* <Image src={currentEvent.contentImg}></Image> */}</ImgDiv>
          <div style={{ marginLeft: "25rem" }}>
            {/* <p>{currentEvent.content}</p> */}
          </div>
          <ButtonDiv>
            <StyledButton onClick={() => ClickCoupon()}>쿠폰 받기</StyledButton>
          </ButtonDiv>
          <ButtonDateDiv>
            <h5 style={{ color: "#56a9f1" }}>
              {/* 쿠폰 지급 일자: {eventList[idx].couponList[0].start_date.slice(0, 10)} */}
            </h5>
          </ButtonDateDiv>{" "}
        </div>
      ) : (
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

          {duplicate ? (
            <div>
              <ButtonDiv>
                <StyledNoButton disabled>쿠폰 지급 완료</StyledNoButton>
              </ButtonDiv>
              <ButtonDateDiv>
                <h5 style={{ color: "#56a9f1" }}>
                  {/* 쿠폰 지급 일자:{" "}
            {currentEvent.coupon_lists[0].start_date.slice(0, 10)} */}
                </h5>
              </ButtonDateDiv>{" "}
            </div>
          ) : (
            <div>
              <ButtonDiv>
                <StyledButton onClick={() => ClickCoupon()}>
                  쿠폰 받기
                </StyledButton>
              </ButtonDiv>
              <ButtonDateDiv>
                <h5 style={{ color: "#56a9f1" }}>
                  쿠폰 지급 일자:{" "}
                  {currentEvent.coupon_lists[0].start_date.slice(0, 10)}
                </h5>
              </ButtonDateDiv>{" "}
            </div>
          )}
        </div>
      )}
    </Container>
  );
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

const StyledNoButton = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.5;
  width: 8rem;
  color: white;
  border: none;
  background: #aaaaaa;
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
  min-height: 80vh;
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
