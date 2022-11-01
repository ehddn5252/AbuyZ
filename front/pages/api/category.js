import https from "./https";

// 소분류를 1개 uid로 조회 - tmp
export function inquireSmallCategory(smallcategory_num) {
  https
    .get(`/category/small-category/${smallcategory_num}`)
    .then((response) => {
      if (response === 200) {
        console.log("소분류 조회 성공", response);
        return response;
      } else {
        console.log("소분류 조회 실패", response);
        return response;
      }
    });
}

// 대분류를 uid로 조회
export function inquireBigCategory(bigcategory_num) {
  https.get(`/category/big-category/${bigcategory_num}`).then((response) => {
    if (response === 200) {
      console.log("대분류 조회 성공", response);
      return response;
    } else {
      console.log("대분류 조회 실패", response);
      return response;
    }
  });
}

// 소분류 조회
export function smallCategory() {
  https.get("/category/small-category").then((response) => {
    if (response === 200) {
      console.log("소분류 조회 성공", response);
      return response;
    } else {
      console.log("소분류 조회 실패", response);
      return response;
    }
  });
}

// 대분류 조회
export function BigCategory() {
  https.get("/category/big-category").then((response) => {
    if (response === 200) {
      console.log("대분류 조회 성공", response);
      return response;
    } else {
      console.log("대분류 조회 실패", response);
      return response;
    }
  });
}

// 특정 대분류의 소분류 조회
export function bigSmallCategory(bigcategory_num) {
  https
    .get(`/category/big-category/${bigcategory_num}/small-category`)
    .then((response) => {
      if (response === 200) {
        console.log("특정 대분류 소분류 조회 성공", response);
        return response;
      } else {
        console.log("특정 대분류 소분류 조회 실패", response);
        return response;
      }
    });
}
