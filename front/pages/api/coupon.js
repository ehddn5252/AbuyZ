// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import https from "./https.js";

// 관리자 쿠폰 생성
export async function createcoupon(couponDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/coupon/create", {
        name: couponDto.name,
        discount_price: couponDto.discount_price,
        start_date: couponDto.start_date,
        end_date: couponDto.end_date,
        big_categories_uid: couponDto.big_categories_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("쿠폰 생성 완료", response);
          resolve(response.data);
        } else {
          console.log("쿠폰 생성 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 관리자 쿠폰 조회
export async function inquirecoupon() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .get("/coupon/list")
      .then((response) => {
        if (response.status === 200) {
          console.log("쿠폰 조회 완료", response);
          resolve(response.data);
        } else {
          console.log("쿠폰 조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 관리자 쿠폰 수정
export async function modifycoupon(couponDto, couponNum) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .put(`/coupon/modify/${couponNum}`, {
        name: couponDto.name,
        discount_price: couponDto.discount_price,
        start_date: couponDto.start_date,
        end_date: couponDto.end_date,
        big_categories_uid: couponDto.big_categories_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("쿠폰 수정 완료", response);
          resolve(response.data);
        } else {
          console.log("쿠폰 수정 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 관리자 쿠폰 삭제
export async function delcoupon(couponNum) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .delete(`/coupon/list/${couponNum}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("쿠폰 삭제 완료", response);
          resolve(response.data);
          location.reload();
        } else {
          console.log("쿠폰 삭제 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 사용자 쿠폰 조회
export async function couponlist() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .get("/coupon")
      .then((response) => {
        if (response.status === 200) {
          console.log("쿠폰 조회 성공", response);
          resolve(response.data);
        } else {
          console.log("쿠폰 조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 쿠폰 발급 요청
export async function getCoupon(couponNumber) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .get(`/coupon/${couponNumber}`)
      .then((response) => {
        if (response.data.status === 200) {
          console.log("쿠폰 발급 요청 성공", response);
          resolve(response.data);
        } else {
          console.log("쿠폰 발급 요청 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 현재 사용 가능한 쿠폰 (카테고리 uid에 맞춰)
export async function cateCoupon(couponNumber) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .get(`/coupon/available-coupons/${couponNumber}`)
      .then((response) => {
        if (response.data.status === 200) {
          console.log("카테고리 쿠폰 조회 성공", response);
          resolve(response.data);
        } else {
          console.log("카테고리 쿠푼 조회 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
