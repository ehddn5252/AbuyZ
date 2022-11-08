import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 컴포넌트
import EditCouponModal from "./EditCouponModal";

// API
import { delcoupon } from "../../../pages/api/coupon";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "./Pagination";

export default function CouponList(props) {
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 쿠폰 목록
  const couponArr = props.couponArray;

  // 내림차순정렬
  couponArr.sort(function (a, b) {
    return b.uid - a.uid;
  });

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

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, uid) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, uid]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== uid));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      couponArr.forEach((el) => idArray.push(el.uid));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  const handleDel = () => {
    checkItems.forEach((e) => delcoupon(e));
  };

  const handleSave = () => {
    window.location.reload();
  };

  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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
          height: 483,
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
                  type="checkbox"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={
                    checkItems.length !== couponArr.length ||
                    checkItems.length === 0
                      ? false
                      : true
                  }
                  style={{ width: "1.5rem", height: "1.5rem" }}
                />
              </Th>
              {header.map((e, idx) => (
                <Th key={idx}>{e}</Th>
              ))}
            </TableRow>
          </thead>
          <tbody style={{ height: "50%" }}>
            {couponArr.slice(offset, offset + limit).map((e) => (
              <TableRow key={e.uid}>
                <Td>
                  <input
                    type="checkbox"
                    onChange={(v) => handleSingleCheck(v.target.checked, e.uid)}
                    checked={checkItems.includes(e.uid) ? true : false}
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                </Td>
                <Td>
                  <EditCouponModal couponInfo={e} />
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
        <DeleteButton onClick={handleDel}>선택 삭제</DeleteButton>
        {couponArr.length === 0 ? null : (
          <Pagination
            total={couponArr.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
        <EditButton onClick={handleSave}>수정 항목 저장</EditButton>
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
  height: 7rem;
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
  justify-content: space-around;
  margin-top: 2rem;
  padding-bottom: 2rem;
  background-color: white;
`;
