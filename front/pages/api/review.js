import https from "./https.js";

// 내 리뷰 내역은 아직 미완성
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

// 리뷰 작성
export function regisreview(reviewDto) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  https.defaults.headers.common["Content-type"] = "multipart/form-data";
  https
    .post("/review", {
      product_uid: reviewDto.product_uid,
      rating: reviewDto.rating,
      content: reviewDto.content,
    })
    .then((response) => {
      if (response === 200) {
        console.log("리뷰 작성 완료", response);
        return response;
      } else {
        console.log("리뷰 작성 실패", response);
        return response;
      }
    });
}

// 리뷰 삭제
export function delreview(review) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .delete("/review", {
      review_uid: review.review_uid,
    })
    .then((response) => {
      if (response === 200) {
        console.log("리뷰 삭제 완료", response);
        return response;
      } else {
        console.log("리뷰 삭제 실패", response);
        return response;
      }
    });
}

// 리뷰 좋아요
export function likereview(reviewlike) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/review/like", {
      review_uid: reviewlike.review_uid,
    })
    .then((response) => {
      if (response === 200) {
        console.log("리뷰 좋아요 완료", response);
        return response;
      } else {
        console.log("리뷰 좋아요 실패", response);
        return response;
      }
    });
}

// 리뷰 좋아요 삭제
export function dellikereview(reviewlikedel) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .delete("/review/like", {
      review_uid: reviewlikedel.review_uid,
    })
    .then((response) => {
      if (response === 200) {
        console.log("리뷰 좋아요 삭제 완료", response);
        return response;
      } else {
        console.log("리뷰 좋아요 삭제 실패", response);
        return response;
      }
    });
}

// 리뷰 답글 작성
export function replyreview(replyDto) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/review/reply", {
      content: replyDto.content,
      review_uid: replyDto.review_uid,
    })
    .then((response) => {
      if (response === 200) {
        console.log("리뷰 답글 작성 완료", response);
        return response;
      } else {
        console.log("리뷰 답글 작성 실패", response);
        return response;
      }
    });
}

// 리뷰 답글 삭제
export function delreplyreview(replydel) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .delete("/review/reply", {
      review_uid: replydel.review_uid,
    })
    .then((response) => {
      if (response === 200) {
        console.log("리뷰 삭제 완료", response);
        return response;
      } else {
        console.log("리뷰 삭제 실패", response);
        return response;
      }
    });
}

// 해당 상품의 리뷰 조회
// 해당 상품은 왜 주소가 review/1/1??
export function review(product_uid) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get(`/review/${product_uid}`).then((response) => {
    if (response === 200) {
      console.log("리뷰 조회 성공", response);
      return response;
    } else {
      console.log("리뷰 조회 실패", response);
      return response;
    }
  });
}

// 리뷰 신고
export function reportreview(review) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/review/report", {
      review_uid: review.review_uid,
    })
    .then((response) => {
      if (response === 200) {
        console.log("리뷰 신고 완료");
        return response;
      } else {
        console.log("리뷰 신고 실패");
        return response;
      }
    });
}

// 이미지 업로드 테스트

// 포토 리뷰 모아보기 - 일부

// 포토 리뷰 모아보기 - 전체

// 포토 리뷰 상세보기
