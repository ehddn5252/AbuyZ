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
