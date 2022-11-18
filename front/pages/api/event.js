import https from "./https.js";

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

// 이벤트 조회(관리자)
export async function inquireEvent() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("/event/all").then((response) => {
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

// 이벤트 상세 조회
export async function detailEvent(eventNum) {
  return new Promise((resolve) => {
    https
      .get(`/event/detail/${eventNum}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("이벤트 상세 조회 성공", response);
          resolve(response.data);
        } else {
          console.log("이벤트 상세조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 이벤트 조회(fO)
export async function inquireallEvent() {
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
