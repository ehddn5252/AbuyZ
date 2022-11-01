// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import https from "../https.js";

// 장바구니에 담기
// content type 넣는건 어떻게 하는거지?
export function regiscart(cartDto) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/cart", {
      products_uid: cartDto.products_uid,
      product_count: cartDto.product_count,
      option_values: {
        size: cartDto.size,
        color: cartDto.color,
      },
    })
    .then((response) => {
      if (response === 200) {
        console.log("장바구니에 담기 완료", response);
        return response;
      } else {
        console.log("장바구니에 담기 실패", response);
        return response;
      }
    });
}

// 장바구니 목록 가져오기
export function cartlist() {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get("/cart").then((response) => {
    if (response === 200) {
      console.log("장바구니 목록 가져오기 성공", response);
      return response;
    } else {
      console.log("장바구니 목록 가져오기 실패", response);
      return response;
    }
  });
}

// 장바구니에서 삭제하기
export function delcart(cartDto) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .delete("/cart", {
      carts_uid: cartDto.carts_uid,
    })
    .then((response) => {
      if (response === 200) {
        console.log("장바구니에서 삭제 성공", response);
        return response;
      } else {
        console.log("장바구니에서 삭제 실패", response);
        return response;
      }
    });
}
