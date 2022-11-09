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

export const paymentNum = atom({
  key: "paymentNum",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const filterName = atom({
  key: "filterName",
  default: "최근 등록순",
  effects_UNSTABLE: [persistAtom],
});

export const bigCategoryValue = atom({
  key: "bigCategoryValue",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
