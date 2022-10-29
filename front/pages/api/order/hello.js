import https from "../https.js";

// 장바구니 결제
export function payBasket(cartDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.post("/order/cart", cartDto).then((response) => {
    if (response === 200) {
      console.log("장바구니 결제 성공", response);
      return response;
    } else {
      console.log("장바구니 결제 실패", response);
      return response;
    }
  });
}

// 상품 하나 결제하기
export function payProduct(productDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/order/basic", productDto)
    // .post("/user/signup", signup) // 보낼때 형식이 동일하다면 바로 써도 됨
    .then((response) => {
      if (response === 200) {
        console.log("상품 결제 성공", response);
        return response;
      } else {
        console.log("상품 결제 실패", response);
        return response;
      }
    });
}

// 결제 목록 가져오기
export function getOrderList() {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get("/order").then((response) => {
    if (response === 200) {
      console.log("결제목록 조회 성공", response);
      return response;
    } else {
      console.log("결제 목록 조회 실패", response);
      return response;
    }
  });
}
