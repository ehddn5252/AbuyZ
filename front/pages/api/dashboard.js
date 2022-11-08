import https from "./https.js";

// 오늘의 할일 목록 가져오기
export async function getDashboardTodo() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .get("/dashboard/to-do")
      .then((response) => {
        if (response.status === 200) {
          console.log("오늘 할일 목록 가져오기 성공", response);
          resolve(response.data);
        } else {
          console.log("오늘 할일 목록 가져오기 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 일자별 요약 가져오기
export async function getDashboardDaily() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .get("/dashboard/daily")
      .then((response) => {
        if (response.status === 200) {
          console.log("일자별 요약 가져오기 성공", response);
          resolve(response.data);
        } else {
          console.log("일자별 요약 가져오기 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 리뷰와 고객센터 가져오기
export async function getDashboardList() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .get("/dashboard/list")
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰와 고객센터 가져오기 성공", response);
          resolve(response.data);
        } else {
          console.log("리뷰와 고객센터 가져오기 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
