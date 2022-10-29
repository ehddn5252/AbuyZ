// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
// axios 객체 생성
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});
