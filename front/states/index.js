import { atom, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const pageNameState = atom({
  key: "pageNameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const serviceNum = atom({
  key: "serviceNum",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const searchName = atom({
  key: "searchName",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const mypageNum = atom({
  key: "mypageNum",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const paymentProduct = atom({
  key: "paymentProduct",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const filterName = atom({
  key: "filterName",
  default: "최근 등록 순",
  effects_UNSTABLE: [persistAtom],
});

export const bigCategoryValue = atom({
  key: "bigCategoryValue",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const smallCategoryValue = atom({
  key: "smallCategoryValue",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const basketProducts = atom({
  key: "basketProducts",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const kakaoUid = atom({
  key: "kakaoUid",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const submitNum = atom({
  key: "submitNum",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// 결제에 쓰일 쿠폰 리스트
export const couponitems = atom({
  key: "couponList",
  default: [0],
  effects_UNSTABLE: [persistAtom],
});

// 장바구니 결제 정보
export const baksetPayments = atom({
  key: "baksetPayments",
  default: {
    productName: "",
    totalPrice: "",
    feePrice: "",
    count: 1,
  },
  effects_UNSTABLE: [persistAtom],
});
