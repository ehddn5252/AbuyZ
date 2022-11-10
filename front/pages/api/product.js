import https from "./https.js";

// 모든 상품 정보 조회
export async function inquireProduct() {
  return new Promise((resolve) => {
    https.get("/product").then((response) => {
      if (response.status === 200) {
        console.log("모든 상품 가져오기 성공", response);
        resolve(response.data.data);
      } else {
        console.log("모든 상품 가져오기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 모든 상품 상태 조회
export async function inquireProductStatus() {
  return new Promise((resolve) => {
    https.get("/product/status/selling").then((response) => {
      if (response.status === 200) {
        console.log("모든 상품 상태 가져오기 성공", response);
        resolve(response.data.data);
      } else {
        console.log("모든 상품 상태 가져오기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 모든 상품 상태 개수로 조회
export async function inquireProductStatusCount(Status) {
  return new Promise((resolve) => {
    https.get(`/product/status/num/${Status}`).then((response) => {
      if (response.status === 200) {
        // console.log("모든 상품 상태 개수 가져오기 성공", response);
        resolve(response.data.data);
      } else {
        // console.log("모든 상품 상태 개수 가져오기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 상품 삭제
export async function delProduct(productDto) {
  return new Promise((resolve) => {
    https
      .delete("/product", {
        products_uid: productDto.products_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("상품 삭제 성공", response);
          resolve(response.data);
        } else {
          console.log("상품 삭제 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// FO 상품 키워드 검색
export async function keywordSearch(keyword) {
  return new Promise((resolve) => {
    https.get(`/product/fo-search/basic/${keyword}`).then((response) => {
      if (response.status === 200) {
        console.log("키워드 검색 성공", response);
        resolve(response.data);
      } else {
        console.log("키워드 검색 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// FO 조건 상품 조건 탐색
export async function conditionSearch(detailDto) {
  return new Promise((resolve) => {
    https.post("/product/fo-search/detail", detailDto).then((response) => {
      if (response.status === 200) {
        console.log("fo 조건 상품 조건 검색 성공", response);
        resolve(response.data);
      } else {
        console.log("fo 조건 상품 조건 검색 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// FO 조건 상품 키워드 + 조건 검색
export async function kwcdSearch(detailDto) {
  return new Promise((resolve) => {
    https
      .post("/product/fo-search/keyword/detail", {
        small_categories_uid: detailDto.small_categories_uid,
        price_uid: detailDto.price_uid,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("fo 조건 상품 조건 검색 성공", response);
          resolve(response.data);
        } else {
          console.log("fo 조건 상품 조건 검색 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 상품 상세 페이지
export async function productDetail(product_id) {
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https
      .post("/product/detail", {
        products_uid: product_id,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("상품 상세 페이지 성공", response);

          resolve(response.data);
        } else {
          console.log("상품 상세 페이지 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 재고 목록 가져오기
export async function getStockInventory(product_id) {
  return new Promise((resolve) => {
    https.get(`/inventory/${product_id}`).then((response) => {
      if (response.status === 200) {
        console.log("재고 목록 가져오기 성공", response);
        resolve(response.data.data);
      } else {
        console.log("재고 목록 가져오기 실패", response);
        resolve(response);
      }
    });
  });
}
