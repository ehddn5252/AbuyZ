import https from "../https.js";

// 내 문의 내역 가져오기
export function mycenter() {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get("/customer-center/my").then((response) => {
    if (response === 200) {
      console.log("내 문의 내역 가져오기 성공", response);
      return response;
    } else {
      console.log("내 문의 내역 가져오기 실패", response);
      return response;
    }
  });
}

// 전체 문의 내역 가져오기
export function allcenter() {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get("/customer-center").then((response) => {
    if (response === 200) {
      console.log("전체 문의 내역 가져오기 성공", response);
      return response;
    } else {
      console.log("전체 문의 내역 가져오기 실패", response);
      return response;
    }
  });
}

// uid로 특정 문의 내역 가져오기
export function getnumbercenter(centernumber) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.get(`/customer-center/detail/${centernumber}`).then((response) => {
    if (response === 200) {
      console.log("특정 문의 내역 가져오기 성공", response);
      return response;
    } else {
      console.log("특정 문의 내역 가져오기 실패", response);
      return response;
    }
  });
}

// uid로 특정 문의 내역 삭제하기
export function delnumbercenter(centernumber) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https.delete(`/customer-center/detail/${centernumber}`).then((response) => {
    if (response === 200) {
      console.log("특정 문의 내역 삭제 성공", response);
      return response;
    } else {
      console.log("특정 문의 내역 삭제 실패", response);
      return response;
    }
  });
}

// 해당 uid 문의 내역 수정하기
// export function modifynumbercenter(centernumber, centerDto) {
//   const accessToken = localStorage.getItem("access-Token");
//   https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//   https.put(`/customer-center/${centernumber}`, centerDto).then((response) => {
//     if (response === 200) {
//       console.log("해당 문의 내역 수정 성공", response);
//       return response;
//     } else {
//       console.log("해당 문의 내역 수정 실패", response);
//       return response;
//     }
//   });
// }

// 문의 답변 작성하기
export function replycenter(replyDto) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  https
    .post("/customer-center/reply", {
      parent_uid: replyDto.parent_uid,
      content: replyDto.content,
    })
    .then((response) => {
      if (response === 200) {
        console.log("문의 답변 작성 성공", response);
        return response;
      } else {
        console.log("문의 답변 작성 실패", response);
        return response;
      }
    });
}

// 문의 작성
export function customercenter(customerCenterWriteReqDto) {
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  https.defaults.headers.common["Content-type"] = "multipart/form-data";

  https
    .post("/customer-center/list", {
      title: customerCenterWriteReqDto.title,
      content: customerCenterWriteReqDto.content,
      customer_center_category:
        customerCenterWriteReqDto.customer_center_category,
      img_url: customerCenterWriteReqDto.img_url,
    })
    .then((response) => {
      if (response === 200) {
        console.log("문의 작성 성공", response);
        return response;
      } else {
        console.log("문의 작성 실패", response);
        return response;
      }
    });
}
