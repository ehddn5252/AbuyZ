// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import https from "../https.js";

// 내 리뷰 내역은 아직 미완성
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

// 리뷰 작성
export function regisreview(reviewDto) {
  // multipart는 어떻게 처리?
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

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
