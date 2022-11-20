import https from "./https.js";

// 상품 번호로 재고 리스트 가져오기
export async function inventoryList(productnumber) {
  return new Promise((resolve) => {
    https.get(`/inventory/${productnumber}`).then((response) => {
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

// 재고 변경하기
export async function modifyinventory(modifyinventoryDto) {
  return new Promise((resolve) => {
    https.put("/inventory", modifyinventoryDto).then((response) => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        resolve(resolve);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}
