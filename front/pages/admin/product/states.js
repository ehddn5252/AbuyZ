import { atom, selector } from "recoil";
import axios from "axios";

export const myAtomState = atom({
  key: "myAtomState",
  default: false,
});

export const getMyAtomState = selector({
  key: "getMyAtom",
  get: async ({ get }) => {
    try {
      const data = await axios.get(
        "https://k7e201.p.ssafy.io:8081/api/product"
      );
      // return data.data;
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  },
  set: ({ set }, newValue) => {
    set(myAtomState, newValue);
  },
});

// const [data, setData] = useState(inquireProduct);

// const data = async () => {
//   try {
//     const res = await axios.get("https://k7e201.p.ssafy.io/api/product");
//     console.log(res.data);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// data();
// async () => {
//   await inquireProduct
//     .then(getList)
//     .then((res) => console.log(res, "@@@@@@@@@@@@@2"));
// };
