import https from "./https.js";

// 상품 번호로 재고 리스트 가져오기
export async function inventoryList(productnumber) {
  return new Promise((resolve) => {
    https.get(`/inventory/${productnumber}`).then((response) => {
      if (response.status === 200) {
        console.log("상품 번호로 재고 리스트 가져오기 성공", response);
        resolve(response.data);
      } else {
        console.log("상품 번호로 재고 리스트 가져오기 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 재고 변경하기
export async function modifyinventory(modifyinventoryDto) {
  return new Promise((resolve) => {
    https.put("/inventory", modifyinventoryDto).then((response) => {
      if (response.status === 200) {
        console.log("재고 변경 성공", response);
        resolve(response.data);
      } else {
        console.log("재고 변경 실패", response);
        resolve(resolve);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}
