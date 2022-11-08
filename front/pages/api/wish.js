import https from "./https.js";

// 찜하기
export async function regiswish(product_uid) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https.get(`/wish/${product_uid}`).then((response) => {
      if (response.status === 200) {
        console.log("찜하기 성공", response);
        resolve(response.data);
      } else {
        console.log("찜하기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 찜 목록 조회
export async function listwish() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("/wish/list?page=0&size=12&sort=uid,asc").then((response) => {
      if (response.status === 200) {
        console.log("찜 목록 조회 완료", response);
        resolve(response.data);
      } else {
        console.log("찜 목록 조회 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 찜 삭제
export async function delwish(productId) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https
      .delete("/wish", {
        wish_uid: productId,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("찜 삭제 성공", response);
          resolve(response.data);
        } else {
          console.log("찜 삭제 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}
