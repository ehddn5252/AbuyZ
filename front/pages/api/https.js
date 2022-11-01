// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "https://k7e201.p.ssafy.io:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});
