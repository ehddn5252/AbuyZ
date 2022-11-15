import https from "./https.js";

// 내 문의 내역 가져오기
export async function mycenter() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("/customer-center/my").then((response) => {
      if (response.status === 200) {
        console.log("내 문의 내역 가져오기 성공", response);
        resolve(response.data);
      } else {
        console.log("내 문의 내역 가져오기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e, "@@");
  });
}

// 전체 문의 내역 가져오기
export async function allcenter() {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("/customer-center").then((response) => {
      if (response.status === 200) {
        console.log("전체 문의 내역 가져오기 성공", response);
        resolve(response.data);
      } else {
        console.log("전체 문의 내역 가져오기 실패", response);
        return response;
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// uid로 특정 문의 내역 가져오기
export async function getnumbercenter(centernumber) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get(`/customer-center/detail/${centernumber}`).then((response) => {
      if (response.status === 200) {
        console.log("특정 문의 내역 가져오기 성공", response);
        resolve(response.data);
      } else {
        console.log("특정 문의 내역 가져오기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// uid로 특정 문의 내역 삭제하기
export async function delnumbercenter(centernumber) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.delete(`/customer-center/${centernumber}`).then((response) => {
      if (response.status === 200) {
        console.log("특정 문의 내역 삭제 성공", response);
        resolve(response.data);
      } else {
        console.log("특정 문의 내역 삭제 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 문의 답변 작성하기
export async function replycenter(replyDto) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/customer-center/reply", {
        parent_uid: replyDto.parent_uid,
        content: replyDto.content,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("문의 답변 작성 성공", response);
          resolve(response.data);
        } else {
          console.log("문의 답변 작성 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 문의 작성
export async function customercenter(formData) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  https.defaults.headers.common["Content-type"] = "multipart/form-data";

  return new Promise((resolve) => {
    https.post("/customer-center/list", formData).then((response) => {
      if (response.status === 200) {
        console.log("문의 작성 성공", response);
        resolve(response.data);
      } else {
        console.log("문의 작성 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}
