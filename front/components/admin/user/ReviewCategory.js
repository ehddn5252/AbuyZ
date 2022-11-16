import React, { useState, useEffect } from "react";
import moment from "moment";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// StyledComponent
import styled from "styled-components";

// 컴포넌트
import ReviewPeriod from "./ReviewPeriod";
import ReviewList from "./ReviewList";

// API
import { searchReview } from "../../../pages/api/review";

// 대분류에 맞는 소분류 객체
const smallCategoryList = {
  1: ["과일", "채소", "고기", "과자/디저트/아이스크림", "생수/음료/주류"],
  2: ["세제/방향/살충", "세탁용품", "청소용품", "욕실용품", "주방용품"],
  3: ["주방가구", "거실가구", "커튼/블라인드", "학생/사무가구", "침실가구"],
  4: ["도서", "노트/다이어리", "사료", "필기류", "반려동물 용품"],
  5: ["스킨케어", "향수", "헤어/바디", "메이크업", "네일"],
  6: [
    "유아동 의류",
    "유아동 신발",
    "기저귀/물티슈",
    "장난감/완구",
    "유아동가구",
  ],
  7: ["TV/영상가전", "생활가전", "주방가전", "계절가전"],
  8: [
    "헬스/요가/수영",
    "자전거/스키/레저",
    "자동차/오토바이",
    "등산/아웃도어",
    "캠핑/낚시",
  ],
};

export default function ReviewCategory() {
  // 대분류
  const [bigCategory, setBigCategory] = useState("");

  // 소분류
  const [smallCategory, setSmallCategory] = useState("");

  // 제품명
  const [name, setName] = useState("");

  // 리뷰 내용
  const [reviewContent, setReviewContent] = useState("");

  // 답변 유무
  // 0 : 전체 / 1 : 미완료 / 2 : 완료
  const [answered, setAnswered] = useState(0);

  // 기간 기준
  const [stand, setStand] = useState(0);

  // 시작일
  const [startDate, setStartDate] = useState("");

  // 마감일
  const [endDate, setEndDate] = useState("");

  // 리셋 감지기
  const [reset, setReset] = useState(0);

  // 리뷰 리스트
  const [reviewList, setReviewList] = useState([]);

  // 대분류 셀렉트 했을 때
  const handleChange = (event) => {
    setSmallCategory("");
    setBigCategory(event.target.value);
  };

  // 소분류 셀렉트 했을 때
  const smallHandleChange = (event) => {
    setSmallCategory(event.target.value);
  };

  // 옵션 체크
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("answeredCheck");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else if (checkboxes[i] === checkThis) {
        if (i === 0) {
          setAnswered(0);
        } else if (i === 1) {
          setAnswered(2);
        } else if (i === 2) {
          setAnswered(1);
        }
      }
    }
  };

  // 초기화
  const handleReset = () => {
    setReset(reset + 1);
    setBigCategory("");
    setSmallCategory("");
    setName("");
    setReviewContent("");
    setAnswered(0);
    setStand(0);
    setStartDate("");
    setEndDate("");
    const checkboxes = document.getElementsByName("answeredCheck");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  };

  // 조건에 맞는 검색하기 (전체 문의 내역 불러오기)
  const handleSearch = async () => {
    const searchDto = {
      bigCategoryUid: bigCategory, // 큰 카테고리
      smallCategoryUid: smallCategory, // 작은 카테고리
      productName: name, // 상품 이름
      content: reviewContent, // 리뷰 내용
      startDate: moment(startDate).format().slice(0, 10), //검색 시작 날짜
      endDate: moment(endDate).format().slice(0, 10), // 검색 끝 날짜
      isAnswered: answered, // 0이면 전체 1이면. 답글 없는 것, 2면 답글 있는 것. 필수값
    };

    if (bigCategory === "") {
      searchDto.bigCategoryUid = null;
    }
    if (smallCategory === "") {
      searchDto.smallCategoryUid = null;
    }
    if (name === "") {
      searchDto.productName = null;
    }
    if (reviewContent === "") {
      searchDto.content = null;
    }
    if (startDate === "") {
      searchDto.startDate = "2012-12-01";
    }
    if (endDate === "") {
      searchDto.endDate = "2032-12-01";
    }

    const lst = await searchReview(searchDto);

    console.log(lst, "!@#!@#!@#");

    {
      lst.length >= 1
        ? lst.sort(function (a, b) {
            return b.uid - a.uid;
          })
        : null;
    }

    const tmp = [];
    for (let i = 0; i < lst.length; i++) {
      if (stand === 1 || stand === 0) {
        tmp.push(lst[i]);
      } else if (stand === 2) {
        if (
          moment(startDate).format().slice(0, 10) <=
            moment(lst[i].reportDate).format().slice(0, 10) ||
          moment(lst[i].reportDate).format().slice(0, 10) >=
            moment(endDate).format().slice(0, 10)
        ) {
          tmp.push(lst[i]);
        }
      } else if (stand === 3) {
        if (
          moment(startDate).format().slice(0, 10) <=
            moment(lst[i].processDate).format().slice(0, 10) ||
          moment(lst[i].reportDate).format().slice(0, 10) >=
            moment(endDate).format().slice(0, 10)
        ) {
          tmp.push(lst[i]);
        }
      }
    }

    setReviewList(tmp);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Grid2
      container
      spacing={2}
      sx={{ padding: "0", margin: "0", background: "white" }}
    >
      {/* 카테고리 */}
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        카테고리
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          zIndex: "0",
          background: "white",
        }}
      >
        <CategoryBox>
          <Title>대분류</Title>
          <FormControl sx={{ minWidth: 200, width: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              대분류
            </InputLabel>
            <Select
              value={bigCategory}
              onChange={handleChange}
              label="대분류"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
            >
              <MenuItem value={"1"}>식품</MenuItem>
              <MenuItem value={"2"}>생활/건강</MenuItem>
              <MenuItem value={"3"}>가구/인테리어</MenuItem>
              <MenuItem value={"4"}>반려/도서/취미</MenuItem>
              <MenuItem value={"5"}>뷰티</MenuItem>
              <MenuItem value={"6"}>유아동</MenuItem>
              <MenuItem value={"7"}>가전</MenuItem>
              <MenuItem value={"8"}>스포츠/레저/자동차</MenuItem>
            </Select>
          </FormControl>
        </CategoryBox>
        <CategoryBox>
          <Title>소분류</Title>
          <FormControl sx={{ minWidth: 100, width: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              소분류
            </InputLabel>
            <Select
              value={smallCategory}
              onChange={smallHandleChange}
              label="소분류"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
            >
              {smallCategoryList[bigCategory]?.map((data, idx) => (
                <MenuItem key={idx} value={idx + 1}>
                  {data}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CategoryBox>
      </Grid2>
      <hr
        style={{
          background: "#ff9494",
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      />
      {/* 제품명 */}
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        제품명
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          zIndex: "0",
          background: "white",
        }}
      >
        <Input
          value={name}
          placeholder={"제품명을 입력해 주세요."}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid2>
      <hr
        style={{
          background: "#ff9494",
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      />
      {/* 리뷰내용 */}
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        리뷰내용
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          zIndex: "0",
          background: "white",
        }}
      >
        <Input
          value={reviewContent}
          placeholder={"리뷰내용을 입력해 주세요."}
          onChange={(e) => setReviewContent(e.target.value)}
        />
      </Grid2>
      <hr
        style={{
          background: "#ff9494",
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      />
      {/* 답변 유무 */}
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        답변 유무
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          paddingLeft: "1.5rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          zIndex: "0",
          background: "white",
          alignItems: "center",
        }}
      >
        <input
          name="answeredCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{
            width: "1.2rem",
            height: "1.5rem",
            marginLeft: "3.5rem",
            marginRight: "0.5rem",
          }}
        />
        <Name>전체</Name>
        <input
          name="answeredCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{ width: "1.2rem", height: "1.5rem", marginRight: "0.5rem" }}
        />
        <Name>완료</Name>
        <input
          name="answeredCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{ width: "1.2rem", height: "1.5rem", marginRight: "0.5rem" }}
        />
        <Name>미완료</Name>
      </Grid2>
      <hr
        style={{
          background: "#ff9494",
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      />
      {/* 기간 */}
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        기간
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          zIndex: "0",
          background: "white",
        }}
      >
        <ReviewPeriod
          reset={reset}
          setStand={setStand}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Grid2>
      <hr
        style={{
          background: "#ff9494",
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      />
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <ButtonDiv>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </ButtonDiv>
        <TableContainer>
          <ReviewList reviewList={reviewList} />
        </TableContainer>
      </Grid2>
    </Grid2>
  );
}

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: 1000;
  margin-right: 1rem;
  margin: 0;
  margin-right: 1rem;
`;

const Input = styled.input`
  border: 0.1rem solid #000000;
  width: 30rem;
  height: 3rem;
  font-size: 1.3rem;
  margin-left: 5rem;
  padding-left: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;

const Name = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  background-color: white;
`;

const ResetButton = styled.button`
  background-color: #ffffff;
  color: black;
  border: 1px solid;
  height: 3rem;
  width: 6rem;
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const SearchButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  margin-left: 1rem;
  height: 3rem;
  width: 7rem;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const TableContainer = styled.div`
  padding: 5rem;
  padding-top: 2rem;
`;
