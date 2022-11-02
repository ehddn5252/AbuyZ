import https from "./https.js";

// 모든 상품 정보 조회
export async function inquireProduct() {
  return new Promise((resolve) => {
    https.get("/product").then((response) => {
      if (response.status === 200) {
        console.log("모든 상품 가져오기 성공", response);
        resolve(response.data);
      } else {
        console.log("모든 상품 가져오기 실패", response);
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
    https
      .post("/product/fo-search/detail", {
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

// FO 조건 상품 키워드 + 조건 검색
export async function kwcdSearch(detailDto) {
  return new Promise((resolve) => {
    https
      .post("/product/fo-search/detail", {
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
export async function productDetail(product) {
  return new Promise((resolve) => {
    https
      .post("/product/detail", {
        products_uid: product.products_uid,
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

// 상품 등록
export async function regisProduct(productCreateReqDto) {
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return new Promise((resolve) => {
    https
      .post(
        "/product/register",
        {
          user_id: productCreateReqDto.user_id,
          small_categories_uid: productCreateReqDto.small_categories_uid,
          name: productCreateReqDto.name,
          discount_rate: productCreateReqDto.discount_rate,
          price: productCreateReqDto.price,
          delivery_fee: productCreateReqDto.delivery_fee,
          brand_name: productCreateReqDto.brand_name,
          description_img: productCreateReqDto.description_img,
          rep_img: productCreateReqDto.rep_img,
          options: productCreateReqDto.options,
          keywords: productCreateReqDto.keywords,
          meta_tag: productCreateReqDto.meta_tag,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("상품 등록 성공", response);
          resolve(response.data);
        } else {
          console.log("상품 등록 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 상품 변경
export async function modifyProduct(productCreateReqDto) {
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return new Promise((resolve) => {
    https
      .put("/product/modify", productCreateReqDto, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("상품 변경 성공", response);
          resolve(response.data);
        } else {
          console.log("상품 변경 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 재고 목록 가져오기
export async function stock() {
  return new Promise((resolve) => {
    https.get("/inventory").then((response) => {
      if (response.status === 200) {
        console.log("모든 상품 가져오기 성공", response);
        resolve(response.data);
      } else {
        console.log("모든 상품 가져오기 실패", response);
        resolve(response);
      }
    });
  });
}
