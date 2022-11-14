import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

// 컴포넌트
import Pagination from "../../coupon/Pagination";
import EditProduct from "../edit/EditProduct";

// API
import { delProduct } from "../../../../pages/api/product";
import { changeEdit } from "../../../../pages/api/product";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";

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
  "배송비",
  "상품 등록일",
];

export default function InquireList(props) {
  // 조회한 상품 정보
  const productInfo = props.productInfo;

  // 내림차순정렬
  productInfo.sort(function (a, b) {
    return b.uid - a.uid;
  });

  // 페이지네이션
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      productInfo.forEach((el) => idArray.push(el.uid));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

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

  // 선택 삭제
  const handleDel = () => {
    checkItems.forEach((e) => delProduct(e));
    alert("상품이 삭제되었습니다.");
    location.reload();
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
      <h2 style={{ paddingLeft: "2rem" }}>검색 목록</h2>
      <hr
        style={{ background: "#ff9494", width: "95%", marginBottom: "2rem" }}
      />
      <div
        style={{
          height: 531,
          width: "90%",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          paddingBottom: "2rem",
          border: "1px solid black",
        }}
      >
        <TableContainer>
          <thead>
            <TableRow>
              <Th>
                <input
                  type="checkbox"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={
                    checkItems.length !== productInfo.length ||
                    checkItems.length === 0
                      ? false
                      : true
                  }
                />
              </Th>
              {header.map((e, idx) => (
                <Th key={idx}>{e}</Th>
              ))}
            </TableRow>
          </thead>
          <tbody style={{ height: "50%" }}>
            {productInfo.slice(offset, offset + limit).map((e) => (
              <TableRow key={e.uid}>
                <Td>
                  <input
                    type="checkbox"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    onChange={(v) => handleSingleCheck(v.target.checked, e.uid)}
                    checked={checkItems.includes(e.uid) ? true : false}
                  />
                </Td>
                <Td>
                  <EditProduct productInfo={e}>수정하기</EditProduct>
                </Td>
                {e.status === "selling" ? (
                  <Td>판매중</Td>
                ) : e.status === "getting_ready" ? (
                  <Td onClick={() => changeEdit(e.uid)}>
                    <WaitButton>승인 대기</WaitButton>
                  </Td>
                ) : (
                  <Td>판매 완료</Td>
                )}
                <Td>{e.bigCategoryName}</Td>
                <Td>{e.smallCategoryName}</Td>
                <Td>
                  {e.name.length <= 15 ? e.name : e.name.slice(0, 16) + "..."}
                </Td>
                <Td>{e.discountRate}</Td>
                <Td>{e.price}</Td>
                <Td>재고</Td>
                <Td>{e.brandName}</Td>
                <Td>{e.productKeywords}</Td>
                <Td>{e.deliveryFee}</Td>
                <Td>{moment(e.date).format().slice(0, 10)}</Td>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </div>
      <ButtonBox>
        <DeleteButton onClick={handleDel}>선택 삭제</DeleteButton>
        {productInfo.length === 0 ? null : (
          <Pagination
            total={productInfo.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
        <EditButton>수정 항목 저장</EditButton>
      </ButtonBox>
    </Grid2>
  );
}

const TableContainer = styled.table`
  background-color: white;
  margin: 0;
  width: 100%;
  height: fit-content;
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
  height: 1rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
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

const WaitButton = styled.button`
  background-color: #44a742;
  color: white;
  border: 1px solid;
  border-radius: 1rem;
  height: 2.5rem;
  width: 5rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
