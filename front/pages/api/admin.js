import https from "./https.js";

// 문의관리 - 조회
export async function searchCustomerCenter(searchDto) {
  console.log("searchCustomerCenter@@@@@@@", searchDto);
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post("/customer-center/search", searchDto)
      .then((response) => {
        if (response.status === 200) {
          // console.log("문의관리 - 조회 완료", response);
          resolve(response.data);
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
  // console.log("writeInquiryReply@@", reply);
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post(`/customer-center/reply`, reply)
      .then((response) => {
        if (response.status === 200) {
          // console.log("문의관리 - 답변 작성 완료", response);
          resolve(response.data);
        } else {
          // console.log("문의관리 - 답변 작성 실패", response);
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

/**
 *
 * FAQ
 *
 */

// FAQ관리 - 등록
export async function registFAQ(faqDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post("/faq/create", faqDto)
      .then((response) => {
        if (response.status === 200) {
          console.log("FAQ관리 - 등록 완료", response);
          resolve(response.data);
        } else {
          console.log("FAQ관리 - 등록 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// FAQ관리 - 수정 -> 나중에 faqDto.faq_uid 로 데려오기
export async function updateFAQ(faq_uid, faqDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .put("/faq/create" + faq_uid, faqDto)
      .then((response) => {
        if (response.status === 200) {
          console.log("FAQ관리 - 수정 완료", response);
          resolve(response.data);
        } else {
          console.log("FAQ관리 - 수정 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// FAQ관리 - 조회
export async function getFAQ() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .get("/faq")
      .then((response) => {
        if (response.status === 200) {
          console.log("FAQ관리 - 조회 완료", response);
          resolve(response.data);
        } else {
          console.log("FAQ관리 - 조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// FAQ관리 - 삭제
export async function deleteFAQ(faq_uid) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .delete("/faq/create" + faq_uid)
      .then((response) => {
        if (response.status === 200) {
          console.log("FAQ관리 - 삭제 완료", response);
          resolve(response.data);
        } else {
          console.log("FAQ관리 - 삭제 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
