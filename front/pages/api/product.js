import https from "./https.js";

// 모든 상품 정보 조회
export async function inquireProduct() {
  return new Promise((resolve) => {
    https.get("/product/bo").then((response) => {
      if (response.status === 200) {
        resolve(response.data.data);
      } else {
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
        resolve(response.data.data);
      } else {
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
        resolve(response.data.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 상품 삭제
export async function delProduct(productUid) {
  console.log(productUid);
  return new Promise((resolve) => {
    https.delete(`/product/${productUid}`).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 상품 uid로 찾아서 상태변경하기
export async function changeEdit(productUid) {
  return new Promise((resolve) => {
    https.put(`/product/status/${productUid}/sold_out`).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
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
        resolve(response.data);
      } else {
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
        resolve(response.data);
      } else {
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
      .post("/product/fo-search/keyword/detail", detailDto)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
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
          resolve(response.data);
        } else {
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 상품 번호로 재고 리스트 가져오기
export async function getStockInventory(productUid) {
  return new Promise((resolve) => {
    https.get(`/inventory/${productUid}`).then((response) => {
      if (response.status === 200) {
        resolve(response.data.data);
      } else {
        resolve(response);
      }
    });
  });
}

// 재고 목록 가져오기
export async function getRandomProducts() {
  return new Promise((resolve) => {
    https.get("/product/random").then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  });
}

// 상품 번호로 재고 리스트 가져오기
export async function getStockProductsUid(productUid) {
  return new Promise((resolve) => {
    https.get(`/inventory/${productUid}`).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    });
  });
}
