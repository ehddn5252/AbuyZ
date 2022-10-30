import https from "../https";

// 이벤트등록
export function createEvent(eventDto) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/event/create", {
      name: eventDto.name,
      start_date: eventDto.start_date,
      end_date: eventDto.end_date,
      coupon_lists: eventDto.coupon_lists,
      content: eventDto.content,
    })
    .then((response) => {
      if (response === 200) {
        console.log("이벤트 등록 성공", response);
        return response;
      } else {
        console.log("이벤트 등록 실패", response);
        return response;
      }
    });
}

// 이벤트 수정
export function modifyEvent(eventDto, eventnumber) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.put(`/event/${eventnumber}`, eventDto).then((response) => {
    if (response === 200) {
      console.log("이벤트 수정 성공", response);
      return response;
    } else {
      console.log("이벤트 수정 실패", response);
      return response;
    }
  });
}

// 이벤트 조회
export function inquireEvent() {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get("/event").then((response) => {
    if (response === 200) {
      console.log("이벤트 조회 성공", response);
      return response;
    } else {
      console.log("이벤트 조회 실패", response);
      return response;
    }
  });
}

// 이벤트 삭제
export function delEvent(eventnumber) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.delete(`/event/${eventnumber}`).then((response) => {
    if (response === 200) {
      console.log("이벤트 삭제 성공", response);
      return response;
    } else {
      console.log("이벤트 삭제 실패", response);
      return response;
    }
  });
}
