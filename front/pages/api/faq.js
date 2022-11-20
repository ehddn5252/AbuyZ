import https from "./https.js";
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
          resolve(response.data);
        } else {
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
      .put(`/faq/${faq_uid}`, faqDto)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
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
          resolve(response.data);
        } else {
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
      .delete(`/faq/${faq_uid}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
