import https from "./https";

// 소분류를 1개 uid로 조회 - tmp
export async function inquireSmallCategory(smallcategory_num) {
  return new Promise((resolve) => {
    https
      .get(`/category/small-category/${smallcategory_num}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("소분류 조회 성공", response);
          resolve(response.data);
        } else {
          console.log("소분류 조회 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 대분류를 uid로 조회
export async function inquireBigCategory(bigcategory_num) {
  return new Promise((resolve) => {
    https.get(`/category/big-category/${bigcategory_num}`).then((response) => {
      if (response.status === 200) {
        console.log("대분류 조회 성공", response);
        resolve(response.data);
      } else {
        console.log("대분류 조회 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 소분류 조회
export async function smallCategory() {
  return new Promise((resolve) => {
    https.get("/category/small-category").then((response) => {
      if (response.status === 200) {
        console.log("소분류 조회 성공", response);
        resolve(response.data);
      } else {
        console.log("소분류 조회 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 대분류 조회
export async function BigCategory() {
  return new Promise((resolve) => {
    https.get("/category/big-category").then((response) => {
      if (response.status === 200) {
        console.log("대분류 조회 성공", response);
        resolve(response.data);
      } else {
        console.log("대분류 조회 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 특정 대분류의 소분류 조회
export async function bigSmallCategory(bigcategory_num) {
  return new Promise((resolve) => {
    https
      .get(`/category/big-category/${bigcategory_num}/small-category`)
      .then((response) => {
        if (response.status === 200) {
          console.log("특정 대분류 소분류 조회 성공", response);
          resolve(response.data);
        } else {
          console.log("특정 대분류 소분류 조회 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}
