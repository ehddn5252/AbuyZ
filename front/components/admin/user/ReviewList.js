import React, { useState } from "react";
import styled from "styled-components";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

// 컴포넌트
import CustomerPagination from "./CustomerPagination";
import ReviewModal from "./ReviewModal";

export default function ReviewList({ reviewList }) {
  const header = [
    "답변 유무",
    "평점",
    "제품명",
    "리뷰 내용",
    "등록 일시",
    "답변 일시",
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
            {reviewList
              ? reviewList.slice(offset, offset + limit).map((row) => (
                  <TableRow key={row.uid}>
                    <Td>
                      <ReviewModal row={row} />
                    </Td>
                    <Td>
                      <Rating
                        name="text-feedback"
                        value={row.rating}
                        precision={0.5}
                        readOnly
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </Td>
                    <Td>{row.productName}</Td>
                    <Td>
                      {row.content.length <= 30
                        ? row.content
                        : row.content.slice(0, 30) + "..."}
                    </Td>
                    <Td>{row.start_date ? row.start_date.slice(0, 10) : 0}</Td>
                    <Td>
                      {row.answerDate ? row.answerDate.slice(0, 10) : "미완료"}
                    </Td>
                    <Td>{row.writer}</Td>
                  </TableRow>
                ))
              : null}
          </tbody>
        </TableContainer>
      </div>
      <div style={{ marginTop: "1rem" }}>
        {reviewList ? (
          <CustomerPagination
            total={reviewList.length}
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
