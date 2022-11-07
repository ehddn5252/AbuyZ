import https from "./https.js";

// 총 매출 조회
export async function getTotalsales(DateDto) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/statistics/sales", {
        start_date: DateDto.start_date,
        end_date: DateDto.end_date,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("총 매출 조회 완료", response);
          resolve(response.data);
        } else {
          console.log("총 매출 조회 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 장바구니 통계 조회
export async function getCartStatistics() {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("/statistics/cart").then((response) => {
      if (response.status === 200) {
        console.log("장바구니 통계 조회 완료", response);
        resolve(response.data);
      } else {
        console.log("장바구니 통계 조회 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 요일별 조회
export async function getDailyStatistics(DateDto) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/statistics/daily", {
        start_date: DateDto.start_date,
        end_date: DateDto.end_date,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("요일별 조회 완료", response);
          resolve(response.data);
        } else {
          console.log("요일별 조회 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}
// 카테고리별 백분율 조회
export async function getCategoryStatistics(DateDto) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/statistics/category-percentage", {
        start_date: DateDto.start_date,
        end_date: DateDto.end_date,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("카테고리별 백분율 조회 완료", response);
          resolve(response.data);
        } else {
          console.log("카테고리별 백분율 조회 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}
// 제품별 통계 조회
export async function getProductStatistics(DateDto) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/statistics/product", {
        start_date: DateDto.start_date,
        end_date: DateDto.end_date,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("제품별 통계 조회 완료", response);
          resolve(response.data);
        } else {
          console.log("제품별 통계 조회 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}
