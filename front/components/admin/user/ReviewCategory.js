// React
import React, { useState, useEffect } from "react";

// MUI
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// StyledComponent
import styled from "styled-components";
// Calender
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// API
import { BigCategory } from "../../../pages/api/category";
import { bigSmallCategory } from "../../../pages/api/category";

export default function ReviewCategory({
  setReviewSearch,
  setSearchDto,
  buttonClick,
}) {
  var d = new Date();
  var dayOfMonth = d.getDate();
  d.setDate(dayOfMonth - 7);

  const [startDate, setStartDate] = useState(d);
  const [endDate, setEndDate] = useState(new Date());
  const [bigCategoryUid, setBigCategoryUid] = useState(0);
  const [smallCategoryUid, setSmallCategoryUid] = useState(0);

  const [bigCategoryName, setBigCategoryName] = useState({
    uid: 0,
    categoryName: "대분류",
  });
  const [smallCategoryName, setSmallCategoryName] = useState({
    uid: 0,
    categoryName: "소분류",
  });

  const [productName, setProductName] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  /**
   * 카테고리
   */

  const [bigCategory, setbigCategory] = useState([
    {
      uid: 0,
      categoryName: "대분류",
    },
  ]);
  const [smallCategory, setSmallCategory] = useState([
    {
      uid: 0,
      categoryName: "소분류",
    },
  ]);

  const loadBigCategory = async () => {
    const res = await BigCategory();
    setbigCategory(res.data);
  };

  const loadSmallCategory = async () => {
    const res = await bigSmallCategory(bigCategoryUid);
    setSmallCategory(res.data);
  };

  useEffect(() => {
    loadBigCategory();
  }, []);

  useEffect(() => {
    loadSmallCategory();
  }, [bigCategoryUid]);

  useEffect(() => {
    if ((bigCategoryUid !== 0) & (smallCategoryUid !== 0)) {
      setSearchDto((prevState) => ({
        ...prevState,
        bigCategoryUid: bigCategoryUid,
        smallCategoryUid: smallCategoryUid,
      }));
    }
  }, [smallCategoryUid]);

  const dateList = () => [{ label: "리뷰작성일시" }];

  const searchButton = () => {
    setReviewSearch(true);
    buttonClick();
  };

  const resetButton = () => {
    setReviewSearch(false);
    setProductName("");
    setReviewContent("");
    setBigCategoryName((prevState) => ({
      ...prevState,
      categoryName: "대분류",
    }));
    setSmallCategoryName((prevState) => ({
      ...prevState,
      categoryName: "소분류",
    }));
    setStartDate(d);
    setEndDate(new Date());
  };

  // 초기화용
  const handleReset = (e, categoryName, name) => {
    console.log("handleReset@@@@", name);
    console.log("handleReset@@@@", categoryName);
    if (name === "bigCategoryUid" && categoryName !== "대분류") {
      setBigCategoryName((prevState) => ({
        ...prevState,
        categoryName: categoryName,
      }));
    }
    if (name === "smallCategoryUid" && categoryName !== "소분류") {
      setSmallCategoryName((prevState) => ({
        ...prevState,
        categoryName: categoryName,
      }));
    }
  };

  // searchdto 변경
  const handleChange = (e) => {
    if (e.target.name === "productName") {
      setProductName(e.target.value);
    }
    if (e.target.name === "content") {
      setReviewContent(e.target.value);
    }

    setSearchDto((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setSearchDto((prevState) => ({
      ...prevState,
      startDate: startDate,
      endDate: endDate,
    }));
  }, [startDate, endDate]);

  return (
    <Container>
      <SearchBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>카테고리</p>
          </TitleDiv>
          <CategoryDiv>
            <Autocomplete
              name="bigCategoryUid"
              disablePortal
              size="small"
              options={bigCategory}
              getOptionLabel={(category) => category.categoryName}
              sx={{ width: 400, paddingLeft: "2rem" }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue={Object.values(bigCategory)[0]}
              value={bigCategoryName}
              onChange={(e, category) => {
                setBigCategoryUid(category.uid);
                handleReset(e, category.categoryName, "bigCategoryUid");
              }}
            />
            <Autocomplete
              name="smallCategoryUid"
              disablePortal
              size="small"
              options={smallCategory}
              defaultValue={Object.values(smallCategory)[0]}
              getOptionLabel={(category) => category.categoryName}
              sx={{ width: 400, paddingLeft: "2rem" }}
              renderInput={(params) => <TextField {...params} />}
              value={smallCategoryName}
              onChange={(e, category) => {
                setSmallCategoryUid(category.uid);
                handleReset(e, category.categoryName, "smallCategoryUid");
              }}
            />
          </CategoryDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>제품명</p>
          </TitleDiv>
          <CategoryDiv>
            <TextField
              size="small"
              sx={{ width: 400, paddingLeft: "2rem" }}
              name="productName"
              onChange={handleChange}
              value={productName}
            />
          </CategoryDiv>
        </ColumnBox>

        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>리뷰 내용</p>
          </TitleDiv>
          <CategoryDiv>
            <TextField
              size="small"
              sx={{ width: 400, paddingLeft: "2rem" }}
              name="content"
              onChange={handleChange}
              value={reviewContent}
            />
          </CategoryDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>답변유무</p>
          </TitleDiv>
          <CategoryDiv style={{ paddingLeft: "7rem" }}>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="0"
              name="isAnswered"
              onChange={handleChange}
            >
              <FormControlLabel value="0" control={<Radio />} label="전체" />
              <FormControlLabel value="1" control={<Radio />} label="미답변" />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="답변완료"
              />
            </RadioGroup>
          </CategoryDiv>
        </ColumnBox>
        {/* 기간 */}
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>기간</p>
          </TitleDiv>
          <DateDiv>
            <Autocomplete
              disablePortal
              options={dateList()}
              size="small"
              sx={{ width: 400, paddingLeft: "2rem" }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue="리뷰작성일시"
            />
            <CalendarDiv>
              <MyDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                dateFormat="yyyy-MM-dd"
              />
              <MyDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsStart
                startDate={endDate}
                dateFormat="yyyy-MM-dd"
              />
            </CalendarDiv>
          </DateDiv>
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
  width: 16%;
  height: 4.2rem;
  background-color: #dadada;
  font-size: 1.3rem;
`;

const CategoryDiv = styled.div`
  display: flex;
  align-items: center;
  width: 84%;
  height: 100%;
  padding-top: 0.5rem;
  padding-left: 5rem;
  padding-bottom: 0.5rem;
  background-color: white;
`;

const DateDiv = styled.div`
  display: flex;
  align-items: center;
  width: 84%;
  height: 100%;
  padding-top: 0.5rem;
  padding-left: 5rem;
  padding-bottom: 0.5rem;
  background-color: white;
`;

const CalendarDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: white;
`;

const MyDatePicker = styled(DatePicker)`
  width: 10rem;
  /* background-color: transparent; */
  border-color: #c4c4c4;
  height: 2rem;
  margin-left: 10rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  border: 1px solid;
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
