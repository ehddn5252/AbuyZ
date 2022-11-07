import React, { useEffect } from "react";
import styled from "styled-components";

// 컴포넌트
import AddEditCategory from "./AddEditCategory";
import AddEditInfo from "./AddEditInfo";
import AddEditOption from "./AddEditOption";
import AddEditImage from "./AddEditImage";
import AddEditMarketing from "./AddEditMarketing";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

import { regisProduct } from "../../../../pages/api/product";

export default function AddProduct() {
  return (
    <Grid2 container spacing={2} sx={{ padding: "0", margin: "0" }}>
      <Grid2 xs={12} sx={{ padding: "0", margin: "0", background: "white" }}>
        {/* 카테고리 */}
        <AddEditCategory />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 마케팅 정보 */}
        <AddEditMarketing />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 이미지 */}
        <AddEditImage />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 상품정보 */}
        <AddEditInfo />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 옵션 */}
        <AddEditOption />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* <ButtonBox>
          <CancelButton>취소</CancelButton>
          <AddButton>등록</AddButton>
        </ButtonBox> */}
      </Grid2>
    </Grid2>
  );
}

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const CancelButton = styled.button`
  background-color: #fff;
  color: black;
  border: 1px solid;
  margin: 1rem;
  height: 3rem;
  width: 10rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  margin: 1rem;
  height: 3rem;
  width: 15rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
