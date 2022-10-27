// React
import React from "react";

// MUI

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

// StyledComponent
import styled from "styled-components";

export default function ReportCategory({ setReportSearch }) {
  const inquiryList = () => [
    { label: "전체" },
    { label: "상품문의" },
    { label: "이벤트 프로모션" },
    { label: "주문, 결제" },
  ];
  const dateList = () => [{ label: "전체" }, { label: "문의일시" }];
  const solvedList = () => [
    { label: "전체" },
    { label: "미답변" },
    { label: "답변완료" },
  ];
  const searchButton = () => {
    setReportSearch(true);
  };
  const resetButton = () => {
    setReportSearch(false);
  };
  return (
    <Container>
      <SearchBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>신고 사유</p>
          </TitleDiv>
          <CategoryDiv>
            <Autocomplete
              disablePortal
              options={inquiryList()}
              sx={{ width: 400, paddingLeft: "2rem" }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue="전체"
            />
          </CategoryDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>제품명</p>
          </TitleDiv>
          <CategoryDiv>
            <TextField sx={{ width: 400, paddingLeft: "2rem" }} />
          </CategoryDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>기간</p>
          </TitleDiv>
          <CategoryDiv>
            <Autocomplete
              disablePortal
              options={dateList()}
              sx={{ width: 400, paddingLeft: "2rem" }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue="전체"
            />
          </CategoryDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>승인 유무</p>
          </TitleDiv>
          <CategoryDiv>
            <Checkbox
              defaultChecked
              name="check"
              sx={{ paddingLeft: "2rem" }}
            />
            <p style={{ paddingRight: "2rem" }}>전체</p>
            <Checkbox name="check" />
            <p style={{ paddingRight: "2rem" }}>대기</p>
            <Checkbox name="check" />
            <p style={{ paddingRight: "2rem" }}>거절</p>
            <Checkbox name="check" />
            <p style={{ paddingRight: "2rem" }}>승인</p>
          </CategoryDiv>
        </ColumnBox>
        <ButtonDiv>
          <ResetButton onClick={resetButton}>초기화</ResetButton>
          <SearchButton onClick={searchButton}>검색</SearchButton>
        </ButtonDiv>
      </SearchBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: white;
`;

const ColumnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #c8c8c8;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 20%;
  height: 5.5rem;
  background-color: #dadada;
  font-size: 1.3rem;
`;

const CategoryDiv = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: white;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ResetButton = styled.button`
  border: 1px solid black;
  background-color: white;
  margin-right: 1rem;
  padding: 1rem;
  width: 10%;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.3rem;
`;

const SearchButton = styled.button`
  border: none;
  background-color: #57a9fb;
  font-size: 1.3rem;
  margin-left: 1rem;
  padding: 1rem;
  width: 10%;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;
