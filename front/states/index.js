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