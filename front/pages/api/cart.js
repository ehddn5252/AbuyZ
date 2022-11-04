// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import https from "./https.js";

// 장바구니에 담기
export async function regiscart(cartDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
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
        if (response.status === 200) {
          console.log("장바구니에 담기 완료", response);
          resolve(response.data);
        } else {
          console.log("장바구니에 담기 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 장바구니 목록 가져오기
export async function cartlist() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .get("/cart")
      .then((response) => {
        if (response.status === 200) {
          console.log("장바구니 목록 가져오기 성공", response);
          resolve(response.data);
        } else {
          console.log("장바구니 목록 가져오기 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

// 장바구니에서 삭제하기
export async function delcart(cartDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .delete("/cart", {
        carts_uid: cartDto.carts_uid,
      })
      .then((response) => {
        if (response === 200) {
          console.log("장바구니에서 삭제 성공", response);
          resolve(response.data);
        } else {
          console.log("장바구니에서 삭제 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
