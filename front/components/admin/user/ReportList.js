import React, { useState } from "react";
import styled from "styled-components";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";

// 컴포넌트
import ReportItemModal from "./ReportItemModal";
import CustomerPagination from "./CustomerPagination";

export default function ReportList(props) {
  // 내림차순정렬
  const declaration = props.declaration;
  declaration.sort(function (a, b) {
    return b.uid - a.uid;
  });

  const header = [
    "해결 유무",
    "신고 사유",
    "상품명",
    "리뷰내용",
    "신고 일시",
    "처리 일시",
    "작성자",
  ];

  // 페이지네이션
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  return (
    <Grid2
      xs={12}
      sx={{
        margin: "0",
        background: "white",
        padding: "0",
      }}
    >
      <div
        style={{
          height: 531,
          width: "100%",
          justifyContent: "center",
          margin: "auto",
          border: "1px solid black",
        }}
      >
        <TableContainer>
          <thead>
            <TableRow>
              {header.map((e, idx) => (
                <Th key={idx}>{e}</Th>
              ))}
            </TableRow>
          </thead>
          <tbody style={{ height: "50%" }}>
            {declaration
              ? declaration.slice(offset, offset + limit).map((row) => (
                  <TableRow key={row.uid}>
                    <Td>
                      <ReportItemModal row={row} />
                    </Td>
                    <Td>{row.reason}</Td>
                    <Td>{row.productName}</Td>
                    <Td>
                      {row.reviewName.length <= 20
                        ? row.reviewName
                        : row.reviewName.slice(0, 20) + "..."}
                    </Td>
                    <Td>{row.reportDate.slice(0, 10)}</Td>
                    <Td>{row.processDate.slice(0, 10)}</Td>
                    <Td>{row.writer}</Td>
                  </TableRow>
                ))
              : null}
          </tbody>
        </TableContainer>
      </div>
      <div style={{ marginTop: "1rem" }}>
        {declaration ? (
          <CustomerPagination
            total={declaration.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        ) : null}
      </div>
    </Grid2>
  );
}

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
