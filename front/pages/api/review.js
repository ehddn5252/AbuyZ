import https from "./https.js";

// 내 리뷰 내역은 아직 미완성
// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

// 리뷰 작성
export async function regisreview(reviewDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  https.defaults.headers.common["Content-type"] = "multipart/form-data";

  return new Promise((resolve) => {
    https
      .post("/review", {
        product_uid: reviewDto.product_uid,
        rating: reviewDto.rating,
        content: reviewDto.content,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰 작성 완료", response);
          resolve(response.data);
        } else {
          console.log("리뷰 작성 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 삭제
export async function delreview(review) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .delete("/review", {
        review_uid: review.review_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰 삭제 완료", response);
          resolve(response.data);
        } else {
          console.log("리뷰 삭제 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 좋아요
export async function likereview(reviewlike) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/review/like", {
        review_uid: reviewlike.review_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰 좋아요 완료", response);
          resolve(response.data);
        } else {
          console.log("리뷰 좋아요 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 좋아요 삭제
export async function dellikereview(reviewlikedel) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .delete("/review/like", {
        review_uid: reviewlikedel.review_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰 좋아요 삭제 완료", response);
          resolve(response.data);
        } else {
          console.log("리뷰 좋아요 삭제 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 답글 작성
export async function replyreview(replyDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/review/reply", {
        content: replyDto.content,
        review_uid: replyDto.review_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰 답글 작성 완료", response);
          resolve(response.data);
        } else {
          console.log("리뷰 답글 작성 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 답글 삭제
export async function delreplyreview(replydel) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .delete("/review/reply", {
        review_uid: replydel.review_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰 삭제 완료", response);
          resolve(response.data);
        } else {
          console.log("리뷰 삭제 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 해당 상품의 리뷰 조회
// 해당 상품은 왜 주소가 review/1/1??
export async function review(product_uid) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get(`/review/${product_uid}`).then((response) => {
      if (response.status === 200) {
        console.log("리뷰 조회 성공", response);
        resolve(response.data);
      } else {
        console.log("리뷰 조회 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 신고
export async function reportreview(review) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/review/report", {
        review_uid: review.review_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("리뷰 신고 완료", response);
          resolve(response.data);
        } else {
          console.log("리뷰 신고 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 이미지 업로드 테스트

// 포토 리뷰 모아보기 - 일부
export async function photoreviewSome(photoId) {
  return new Promise((resolve) => {
    https.get(`/review/photo/${photoId}`).then((response) => {
      if (response.status === 200) {
        console.log("포토 리뷰 모아보기 일부 성공", response);
        resolve(response.data);
      } else {
        console.log("포토 리뷰 모아보기 일부 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 포토 리뷰 모아보기 - 전체

export async function photoreviewAll(photoId) {
  return new Promise((resolve) => {
    https.get(`/review/photos/${photoId}`).then((response) => {
      if (response.status === 200) {
        console.log("포토 리뷰 모아보기 전체 성공", response);
        resolve(response.data);
      } else {
        console.log("포토 리뷰 모아보기 전체 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 포토 리뷰 상세보기

export async function photoreviewDetail(photoId) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get(`/review/detail/${photoId}`).then((response) => {
      if (response.status === 200) {
        console.log("포토 리뷰 상세보기 성공", response);
        resolve(response.data);
      } else {
        console.log("포토 리뷰 상세보기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰를 안 쓴 주문들 가져오기
export async function reviewYet() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("/order/no-review").then((response) => {
      if (response.status === 200) {
        console.log("리뷰 안쓴 리스트 성공", response);
        resolve(response.data);
      } else {
        console.log("리뷰 안쓴 리스트 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}
