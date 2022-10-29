import https from "../https.js";

// 총 매출 조회
export function getTotalsales(DateDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/statistics/sales", {
      start_date: DateDto.start_date,
      end_date: DateDto.end_date,
    })
    .then((response) => {
      if (response === 200) {
        console.log("총 매출 조회 완료", response);
        return response;
      } else {
        console.log("총 매출 조회 실패", response);
        return response;
      }
    });
}

// 장바구니 통계 조회
export function getCartStatistics(DateDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .get("/statistics/cart", {
      start_date: DateDto.start_date,
      end_date: DateDto.end_date,
    })
    .then((response) => {
      if (response === 200) {
        console.log("장바구니 통계 조회 완료", response);
        return response;
      } else {
        console.log("장바구니 통계 조회 실패", response);
        return response;
      }
    });
}

// 요일별 조회
export function getDailyStatistics(DateDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/statistics/daily", {
      start_date: DateDto.start_date,
      end_date: DateDto.end_date,
    })
    .then((response) => {
      if (response === 200) {
        console.log("요일별 조회 완료", response);
        return response;
      } else {
        console.log("요일별 조회 실패", response);
        return response;
      }
    });
}
// 카테고리별 백분율 조회
export function getCategoryStatistics(DateDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/statistics/category-percentage", {
      start_date: DateDto.start_date,
      end_date: DateDto.end_date,
    })
    .then((response) => {
      if (response === 200) {
        console.log("카테고리별 백분율 조회 완료", response);
        return response;
      } else {
        console.log("카테고리별 백분율 조회 실패", response);
        return response;
      }
    });
}
// 제품별 통계 조회
export function getProductStatistics(DateDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/statistics/product", {
      start_date: DateDto.start_date,
      end_date: DateDto.end_date,
    })
    .then((response) => {
      if (response === 200) {
        console.log("제품별 통계 조회 완료", response);
        return response;
      } else {
        console.log("제품별 통계 조회 실패", response);
        return response;
      }
    });
}
