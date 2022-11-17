import https from "./https.js";

// 전체 문의 내역 가져오기
export async function getAsk() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .get("/customer-center")
      .then((response) => {
        if (response.status === 200) {
          // console.log("전체 문의 내역 가져오기", response);
          resolve(response.data.data);
        } else {
          // console.log("전체 문의 내역 가져오기 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 문의관리 - 조회
export async function searchCustomerCenter(AskDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    console.log(AskDto, "@#");
    https
      .post("/customer-center/search", AskDto)
      .then((response) => {
        if (response.status === 200) {
          // console.log("문의관리 - 조회 완료", response);
          resolve(response.data.data);
        } else {
          // console.log("문의관리 - 조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 문의관리 - 특정 문의 조회
export async function detailCustomerCenter(uid) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .get(`/customer-center/detail/${uid}`)
      .then((response) => {
        if (response.status === 200) {
          // console.log("문의관리 - 특정 문의 조회 완료", response);
          resolve(response.data);
        } else {
          // console.log("문의관리 - 특정 문의 조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 문의 관리 - 답변 작성
export async function writeInquiryReply(reply) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post(`/customer-center/reply`, reply)
      .then((response) => {
        if (response.status === 200) {
          console.log("신고관리 - 조회 완료", response);
          resolve(response.data);
        } else {
          console.log("신고관리 - 조회 완료", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e, "$$");
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
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post("/review/searchReview", searchDto)
      .then((response) => {
        if (response.status === 200) {
          // console.log("리뷰관리 - 조회 완료", response);
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
          // console.log("리뷰 상세보기(모달) 완료", response);
          resolve(response.data);
        } else {
          // console.log("리뷰 상세보기(모달) 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 리뷰 답글 작성
export async function writeReviewReply(reply) {
  console.log("writeReviewReply@@@@@@@@@@@", reply);
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post(`/review/reply`, reply)
      .then((response) => {
        if (response.status === 200) {
          // console.log("리뷰 답글 작성 완료", response);
          resolve(response.data);
        } else {
          // console.log("리뷰 답글 작성 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}