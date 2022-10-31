// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import https from "../https.js";

// 쿠폰 생성
export function createcoupon(couponDto) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/coupon/create", {
      name: couponDto.name,
      discount_price: couponDto.discount_price,
      start_date: couponDto.start_date,
      end_date: couponDto.end_date,
      big_categories_uid: couponDto.big_categories_uid,
    })
    .then((response) => {
      if (response === 200) {
        console.log("쿠폰 생성 완료", response);
        return response;
      } else {
        console.log("쿠폰 생성 실패", response);
        return response;
      }
    });
}

// 사용자 쿠폰 조회
export function couponlist() {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get("/coupon").then((response) => {
    if (response === 200) {
      console.log("쿠폰 조회 성공", response);
      return response;
    } else {
      console.log("쿠폰 조회 실패", response);
    }
  });
}
