import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InquireProduct from "../../../components/admin/product/inquire/InquireProduct";
import { myAtomState, getMyAtomState } from "./states";
import { useRecoilState } from "recoil";
import Link from "next/link";
import axios from "axios";
import { inquireProduct } from "../../api/product";

export default function Product() {
  // const [data, setData] = useState("");

  // async function getData() {
  //   try {
  //     const response = await axios.get(
  //       "https://k7e201.p.ssafy.io:8081/api/product"
  //     );
  //     const res = response.data;
  //     setData(res);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  // console.log(data.data[0]);

  // getData();
  // const [a, setA] = useState([]);
  // useEffect(() => {
  //   const res = inquireProduct();
  //   setA(res);
  //   console.log(res);
  // }, []);

  return (
    <ProductPage>
      {/* <span>pageName 상태: {pageName}</span>
      <button
        onClick={() => {
          setPageName("상품조회페이지");
        }}
      >
        현재 페이지 이름으로 상태 변경
      </button>
      <Link href="/admin/product/add">
        <button>등록 페이지 이동</button>
      </Link> */}
      <InquireProduct />
    </ProductPage>
  );
}

export const ProductPage = styled.div`
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;
