// React
import React from "react";

// MUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// StyledComponent
import styled from "styled-components";

export default function ServiceCategory({ setSearch }) {
  const inquiryList = () => [
    { label: "전체" },
    { label: "상품문의" },
    { label: "이벤트 프로모션" },
    { label: "주문, 결제" },
  ];
  const solvedList = () => [
    { label: "전체" },
    { label: "미해결" },
    { label: "해결" },
  ];
  const searchButton = () => {
    setSearch(true);
  };
  return (
    <Container>
      <h1>카데고리</h1>
      <hr style={{ color: "#aaaaaa" }} />
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-around" }}
      >
        <Box>
          <p>문의사항</p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={inquiryList()}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
            defaultValue="전체"
          />
        </Box>
        <Box>
          <p>해결유무</p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={solvedList()}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
            defaultValue="전체"
          />
        </Box>
      </Box>

      <Button
        onClick={searchButton}
        variant="contained"
        color="error"
        sx={{ margin: "2rem" }}
      >
        검색
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5rem;
  width: 100%;
`;
