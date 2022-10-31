import https from "../https.js";

// 상품 번호로 재고 리스트 가져오기
export function inventoryList(productnumber) {
  https.get(`/inventory/${productnumber}`).then((response) => {
    if (response === 200) {
      console.log("상품 번호로 재고 리스트 가져오기 성공", response);
      return response;
    } else {
      console.log("상품 번호로 재고 리스트 가져오기 실패", response);
      return response;
    }
  });
}

// 재고 변경하기
export function modifyinventory(modifyinventoryDto) {
  https.put("/inventory", modifyinventoryDto).then((response) => {
    if (response === 200) {
      console.log("재고 변경 성공", response);
      return response;
    } else {
      console.log("재고 변경 실패", response);
      return response;
    }
  });
}
