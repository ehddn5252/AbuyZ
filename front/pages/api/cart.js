// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import https from "./https.js";
// Alert
import Swal from "sweetalert2";
// 장바구니에 담기
export async function regiscart(cartDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .post("/cart", cartDto)
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
        Swal.fire({
          title: "장바구니에 담기를 실패하였습니다.",
          icon: "error",
          showConfirmButton: false,
        });
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
export async function delcart(cartUid) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .delete(`/cart/${cartUid}`)
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

// 장바구니에서 수량 변경하기
export async function changeCart(cartDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .put("/cart", cartDto)
      .then((response) => {
        if (response === 200) {
          console.log("장바구니에서 변경 성공", response);
          resolve(response.data);
        } else {
          console.log("장바구니에서 변경 실패", response);
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
