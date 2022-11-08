import https from "./https.js";

// 이벤트 등록
export async function createEvent() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  // console.log(https.defaults.headers.common);
  let formData = new FormData();

  let data = {
    name: "테스트 이벤트",
    start_date: "2022-10-21",
    end_date: "2022-11-21",
    coupon_lists: [9, 10],
    content: "testsetsets",
  };

  formData.append(
    "eventDto",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  return new Promise((resolve) => {
    console.log("1단계");
    https
      .post("/event/create", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log("이벤트 등록 성공", response);
          resolve(response.data);
        } else {
          console.log("이벤트 등록 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e, "@@@");
      });
  });
}

// 이벤트 수정
export async function modifyEvent(eventDto, eventnumber) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .put(`/event/${eventnumber}`, eventDto)
      .then((response) => {
        if (response.status === 200) {
          console.log("이벤트 수정 성공", response);
          resolve(response.data);
        } else {
          console.log("이벤트 수정 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 이벤트 조회
export async function inquireEvent() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("/event").then((response) => {
      if (response.status === 200) {
        console.log("이벤트 조회 성공", response.data);
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
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .delete(`/event/${eventnumber}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("이벤트 삭제 성공", response);
          resolve(response.data);
          location.reload();
        } else {
          console.log("이벤트 삭제 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
