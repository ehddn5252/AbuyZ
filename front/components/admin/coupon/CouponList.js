import React, { useState } from "react";
import styled from "styled-components";
import { MyDatePicker } from "../coupon/CouponPeriod";
import { createcoupon } from "../../../pages/api/coupon";
import CouponModal from "./CouponModal";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import "react-datepicker/dist/react-datepicker.css";

export default function CouponList(props) {
  // 대분류 카테고리
  const [category, setCategory] = useState("");

  // 쿠폰이름
  const [name, setName] = useState("");

  // 할인금액
  const [sale, setSale] = useState("");

  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());
  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

  // const [couponDto, setCouponDto] = useState({});

  // 대분류 셀렉트 했을 때
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // 쿠폰이름 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
  };

  // 할인 금액 입력하면
  const saleChange = (event) => {
    setSale(event.target.value);
  };

  // 체크박스 전체 선택
  // const allCheck = (selectAll) => {
  //   const checkboxes = document.getElementsByName("couponCheck");

  //   checkboxes.forEach((checkbox) => {
  //     checkbox.checked = selectAll.checked;
  //   });
  // };

  const header = [
    "수정",
    "카테고리",
    "쿠폰명",
    "할인금액",
    "시작 날짜",
    "마감 날짜",
  ];

  const cate = [
    "0",
    "식품",
    "생활/건강",
    "가구/인테리어",
    "반려/도서/취미",
    "뷰티",
    "유아동",
    "가전",
    "스포츠/레저/자동차",
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    // bgcolor: "white",
    border: "1px solid #000",
    p: 4,
    // backdrop: "white",
    opacity: "10000%",
  };

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
      <h2 style={{ paddingLeft: "2rem" }}>쿠폰 목록</h2>
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
          marginBottom: "1rem",
        }}
      >
        <TableContainer>
          <thead>
            <TableRow>
              <Th>
                <input
                  // onClick={allCheck(this)}
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
            {props.couponArray.map((e) => (
              <TableRow key={e.uid}>
                <Td>
                  <input
                    type="checkbox"
                    name="couponCheck"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                </Td>
                <Td>
                  <CouponModal couponInfo={e} />
                </Td>
                <Td>{cate[e.available_categories_uid]}</Td>
                <Td>{e.name}</Td>
                <Td>{e.discount_price}원</Td>
                <Td>{e.start_date.slice(0, 10)}</Td>
                <Td>{e.end_date.slice(0, 10)}</Td>
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

const Edit = styled.button`
  width: fit-content;
  background-color: #57a9fb;
  font-size: 1rem;
  color: white;
  border: none;
  padding: 0.6rem;
  &:hover {
    cursor: pointer;
  }
`;

// const ButtonBox = styled.div`
//   display: flex;
//   justify-content: center;
//   padding-bottom: 2rem;
//   background-color: white;
// `;

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

// 모달
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-bottom: 2rem;
  background-color: white;
`;
