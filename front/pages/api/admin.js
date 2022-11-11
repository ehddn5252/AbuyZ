import https from "./https.js";

// 문의관리 - 조회
export async function searchCustomerCenter(searchDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post("/customer-center/search", searchDto)
      .then((response) => {
        if (response.status === 200) {
          console.log("문의관리 - 조회 완료", response);
          resolve(response.data);
        } else {
          console.log("문의관리 - 조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 신고관리 - 조회
export async function searchReport(searchDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post("/", searchDto)
      .then((response) => {
        if (response.status === 200) {
          console.log("신고관리 - 조회 완료", response);
          resolve(response.data);
        } else {
          console.log("신고관리 - 조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
/**
 *
 * 리뷰
 *
 */

// 리뷰관리 - 조회
export async function searchReview(searchDto) {
  console.log("searchReview@@@@@@@", searchDto);
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post("/review/searchReview", searchDto)
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰관리 - 조회 완료", response);
          resolve(response.data);
        } else {
          // console.log("리뷰관리 - 조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 리뷰 상세보기(모달)
export async function detailReview(uid) {
  console.log("상세보기@@@@@@@");
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .get(`/review/detail/${uid}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰 상세보기(모달) 완료", response);
          resolve(response.data);
        } else {
          console.log("리뷰 상세보기(모달) 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 리뷰 답글 작성
export async function writeReply(reply) {
  console.log("writeReply@@@@@@@@@@@", reply);
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post(`/review/reply`, reply)
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰 답글 작성 완료", response);
          resolve(response.data);
        } else {
          console.log("리뷰 답글 작성 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
