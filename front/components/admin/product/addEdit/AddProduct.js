import React from "react";
import styled from "styled-components";

// 컴포넌트
import AddEditCategory from "./AddEditCategory";
import AddEditInfo from "./AddEditInfo";
import AddEditOption from "./AddEditOption";
import AddEditImage from "./AddEditImage";
import AddEditMore from "./AddEditMore";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

export default function AddProduct() {
  return (
    <Grid2 container spacing={2} sx={{ padding: "0", margin: "0" }}>
      <Grid2 xs={12} sx={{ padding: "0", margin: "0", background: "white" }}>
        {/* 카테고리 */}
        <AddEditCategory />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 검색어 */}
        <AddEditInfo />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 옵션 */}
        <AddEditOption />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 판매상태 */}
        <AddEditMore />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 이미지 */}
        <AddEditImage />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        <ButtonBox>
          <CancelButton>취소</CancelButton>
          <AddButton>등록</AddButton>
        </ButtonBox>
      </Grid2>
    </Grid2>
  );
}

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  background-color: #ffffff;
  color: gray;
  border: 1px solid;
  border-radius: 0.8rem;
  height: 3rem;
  width: 5rem;
  font-size: 1.3rem;
`;

const AddButton = styled.button`
  background-color: #ff7171;
  color: white;
  border: 1px solid;
  border-radius: 0.8rem;
  margin-left: 1rem;
  height: 3rem;
  width: 7rem;
  font-size: 1.5rem;
`;
