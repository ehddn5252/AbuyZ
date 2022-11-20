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
    https.post("/review", reviewDto).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 삭제
export async function delreview(reviewId) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.delete(`/review/${reviewId}`).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 좋아요
export async function likereview(reviewDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.post("/review/like", reviewDto).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 좋아요 삭제
export async function dellikereview(reviewId) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.delete(`/review/like/${reviewId}`).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 답글 작성
export async function replyReview(replyDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    console.log(replyDto, "321321");
    https
      .post("/review/reply", {
        content: replyDto.content,
        review_uid: replyDto.review_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 답글 삭제
export async function delreplyreview(reviewId) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.delete(`/review/reply/${reviewId}`).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 해당 상품의 리뷰 조회
// 해당 상품은 왜 주소가 review/1/1??
export async function review(product_uid, page) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get(`/review/${product_uid}/${page}`).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 신고
export async function reportreview(reviewDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.post("/review/report", reviewDto).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
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
        resolve(response.data);
      } else {
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
        resolve(response.data);
      } else {
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
        resolve(response.data);
      } else {
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
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 리뷰 신고 조회
export async function SearchDeclaration(declarationDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/review/search", {
        reasonId: declarationDto.reasonId,
        startDate: declarationDto.startDate,
        endDate: declarationDto.endDate,
        productName: declarationDto.productName,
        status: declarationDto.status,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 신고한 리뷰 가져오기
export async function ReviewDeclaration() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("/review/reported").then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 신고한 리뷰 가져오기
export async function GetReviewDetail(reviewUid) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/review/report/detail", {
        review_uid: reviewUid,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.data);
        } else {
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 신고 상태 변경
export async function PutReviewStatus(reportsUid, status) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .put("/review/report/status", {
        reportsUid: reportsUid,
        status: status,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.data);
        } else {
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 조건에 맞는 리뷰 가져오기
export async function searchReview(reviewDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.post("/review/searchReview", reviewDto).then((response) => {
      if (response.status === 200) {
        resolve(response.data.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}
