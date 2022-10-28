import React from "react";
import styled from "styled-components";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

const header = [
  "수정",
  "판매상태",
  "대분류",
  "소분류",
  "상품명",
  "할인율",
  "판매가",
  "재고수량",
  "브랜드",
  "키워드",
  "메타태그",
  "배송비",
];

const body = [
  {
    id: 0,
    saleStatus: "판매중",
    bigCategory: "생활/건강",
    smallCategory: "의류",
    name: "나이키 청바지",
    discount: 15,
    price: 50000,
    stock: 50,
    brand: "나이키",
    keyword: "가성비, 청바지, 바지",
    metaTag: "나이키, 바지",
    delivery: 300,
  },
];

export default function InquireList() {
  return (
    <Grid2
      xs={12}
      sx={{
        margin: "0",
        marginTop: "2rem",
        background: "white",
        padding: "0",
      }}
    >
      <h2 style={{ paddingLeft: "2rem" }}>검색 목록</h2>
      <hr
        style={{ background: "#ff9494", width: "95%", marginBottom: "2rem" }}
      />
      <div
        style={{
          height: 500,
          width: "90%",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          paddingBottom: "2rem",
          border: "1px solid black",
          marginBottom: "3rem",
        }}
      >
        <TableContainer>
          <thead>
            <TableRow>
              <Th>
                <input
                  type="checkbox"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                />
              </Th>
              {header.map((e, idx) => (
                <Th key={idx}>{e}</Th>
              ))}
            </TableRow>
          </thead>
          <tbody style={{ height: "50%" }}>
            {body.map((e) => (
              <TableRow key={e.id}>
                <Td>
                  <input
                    type="checkbox"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                </Td>
                <Td>
                  <Edit>수정하기</Edit>
                </Td>
                <Td>{e.saleStatus}</Td>
                <Td>{e.bigCategory}</Td>
                <Td>{e.smallCategory}</Td>
                <Td>{e.name}</Td>
                <Td>{e.discount}</Td>
                <Td>{e.price}</Td>
                <Td>{e.stock}</Td>
                <Td>{e.brand}</Td>
                <Td>{e.keyword}</Td>
                <Td>{e.metaTag}</Td>
                <Td>{e.delivery}</Td>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </div>
      <ButtonBox>
        <DeleteButton>선택 삭제</DeleteButton>
        <EditButton>수정 항목 저장</EditButton>
      </ButtonBox>
    </Grid2>
  );
}

export const MyBox = styled(Box)`
  /* width: 15rem; */
  /* background-color: transparent; */
  .MuiDataGrid-columnHeaders {
    width: 100%;
    background: #dadada;
  }
  .MuiDataGrid-columnHeaderDraggableContainer {
    border: 1px;
    border-color: #000;
  }
  .MuiDataGrid-columnHeaderTitleContainer {
    background: #dadada;
  }
`;

const TableContainer = styled.table`
  background-color: white;
  margin: 0;
  width: 100%;
  height: 10rem;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid black;
`;

const TableRow = styled.tr`
  width: 100%;
  height: 3rem;
  margin: 0;
`;

const Th = styled.th`
  margin: 0;
  border: 1px solid black;
  text-align: center;
  background-color: #c5e2ff;
`;

const Td = styled.td`
  margin: 0;
  border: 1px solid black;
  text-align: center;
  height: fit-content;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

// const CancelButton = styled.button`
//   width: 10%;
//   height: 2.5rem;
//   border: 1px solid border;
//   /* border-radius: 1rem; */
//   font-size: 1rem;
//   border: 0;
// `;

const Edit = styled.button`
  width: fit-content;
  /* height: 2rem; */
  background-color: #57a9fb;
  font-size: 1rem;
  color: white;
  border: none;
  padding: 0.6rem;
  &:hover {
    cursor: pointer;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  background-color: white;
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  color: black;
  border: 1px solid;
  height: 3rem;
  width: content;
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const EditButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  margin-left: 1rem;
  height: 3rem;
  width: fit-content;
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
  }
`;
