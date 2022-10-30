// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import https from "../https.js";

// 찜하기
export function regiswish(product_uid) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get(`/wish/${product_uid}`).then((response) => {
    if (response === 200) {
      console.log("찜하기 성공", response);
      return response;
    } else {
      console.log("찜하기 실패", response);
      return response;
    }
  });
}

// 찜 목록 조회
export function listwish() {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get("/wish/list").then((response) => {
    if (response === 200) {
      console.log("찜 목록 조회 완료", response);
      return response;
    } else {
      console.log("찜 목록 조회 실패", response);
      return response;
    }
  });
}

// 찜 삭제
export function delwish(wishDto) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .delete("/wish", {
      wish_uid: wishDto.wish_uid,
    })
    .then((response) => {
      if (response === 200) {
        console.log("찜 삭제 성공", response);
        return response;
      } else {
        console.log("찜 삭제 실패", response);
        return response;
      }
    });
}
