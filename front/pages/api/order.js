import https from "./https.js";

// 장바구니 결제
export async function payBasket(cartDto) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.post("/order/cart", cartDto).then((response) => {
      if (response.status === 200) {
        console.log("장바구니 결제 성공", response);
        resolve(response.data);
      } else {
        console.log("장바구니 결제 실패", response);
        return response;
      }
    });
  });
}

// 상품 하나 결제하기
export async function payProduct(productDto) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["Content-Type"] = "application/json";
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.post("/order/basic", productDto).then((response) => {
      if (response.status === 200) {
        console.log("상품 결제 성공", response);
        resolve(response.data);
      } else {
        console.log("상품 결제 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 결제 목록 가져오기
export async function getOrderList() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  // Header에 토큰 집어넣기
  return new Promise((resolve) => {
    https.get("/order").then((response) => {
      if (response.status === 200) {
        console.log("결제목록 조회 성공", response);
        resolve(response.data);
      } else {
        console.log("결제 목록 조회 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 특정 결제 목록의 주문들 가져오기
export async function eachGetOrderList(basketnumber) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https.get(`/order/${basketnumber}`).then((response) => {
      if (response.status === 200) {
        console.log("특정 결제 목록의 주문들 가져오기 성공", response);
        resolve(response.data);
      } else {
        console.log("특정 결제 목록의 주문들 가져오기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

export async function weekorder() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https.get("/order/from-before-week").then((response) => {
      if (response.status === 200) {
        console.log("해당 유저의 7일간 결제 목록 가져오기 성공", response);
        resolve(response.data);
      } else {
        console.log("해당 유저의 7일간 결제 목록 가져오기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}
