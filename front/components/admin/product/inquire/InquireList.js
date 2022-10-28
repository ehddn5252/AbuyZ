import React from "react";
import styled from "styled-components";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useDemoData } from "@mui/x-data-grid-generator";

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${
        theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
      }`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
      {
        width: 8,
        height: 8,
        backgroundColor: "#1890ff",
        transform: "none",
        top: "39%",
        border: 0,
      },
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  ...customCheckbox(theme),
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function InquireList() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 10,
  });

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
      <hr style={{ background: "#ff9494", width: "95%" }} />
      <div
        style={{
          width: "100%",
          paddingTop: "1rem",
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        {/* <CancelButton>선택삭제</CancelButton>
        <SaveButton>수정항목 저장</SaveButton> */}
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <StyledDataGrid
          checkboxSelection
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            Pagination: CustomPagination,
          }}
          {...data}
        />
      </div>
    </Grid2>
  );
}

// export const MyBox = styled(Box)`
//   /* width: 15rem; */
//   /* background-color: transparent; */
//   .MuiDataGrid-columnHeaders {
//     width: 100%;
//     background: #dadada;
//   }
//   .MuiDataGrid-columnHeaderDraggableContainer {
//     border: 1px;
//     border-color: #000;
//   }
//   .MuiDataGrid-columnHeaderTitleContainer {
//     background: #dadada;
//   }
// `;

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

// const SaveButton = styled.button`
//   width: 10%;
//   height: 2.5rem;
//   /* border-radius: 1rem; */
//   font-size: 1rem;
//   background-color: #57a9fb;
//   color: #fff;
//   border: 0;
// `;
