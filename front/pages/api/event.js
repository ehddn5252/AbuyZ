import https from "./https.js";

// 이벤트등록
export async function createEvent(eventDto) {
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return new Promise((resolve) => {
    https
      .post("/event/create", {
        name: eventDto.name,
        start_date: eventDto.start_date,
        end_date: eventDto.end_date,
        coupon_lists: eventDto.coupon_lists,
        content: eventDto.content,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("이벤트 등록 성공", response);
          resolve(response.data);
        } else {
          console.log("이벤트 등록 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 이벤트 수정
export async function modifyEvent(eventDto, eventnumber) {
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return new Promise((resolve) => {
    https.put(`/event/${eventnumber}`, eventDto).then((response) => {
      if (response.status === 200) {
        console.log("이벤트 수정 성공", response);
        resolve(response.data);
      } else {
        console.log("이벤트 수정 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 이벤트 조회
export async function inquireEvent() {
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return new Promise((resolve) => {
    https.get("/event").then((response) => {
      if (response.status === 200) {
        console.log("이벤트 조회 성공", response);
        resolve(response.data);
      } else {
        console.log("이벤트 조회 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 이벤트 삭제
export async function delEvent(eventnumber) {
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return new Promise((resolve) => {
    https.delete(`/event/${eventnumber}`).then((response) => {
      if (response.status === 200) {
        console.log("이벤트 삭제 성공", response);
        resolve(response.data);
      } else {
        console.log("이벤트 삭제 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}
