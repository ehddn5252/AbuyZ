import React, { useState } from "react";
import styled from "styled-components";

// 컴포넌트
import EventList from "./EventList";
import EventPeriod from "./EventPeriod";
import AddEventModal from "./AddEventModal";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid2 from "@mui/material/Unstable_Grid2";
import { inquireEvent } from "../../../pages/api/event";

export default function CouponInquire() {
  // 쿠폰명
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] =
    useState("쿠폰명을 입력해주세요.");

  // 대분류
  const [bigCategory, setBigCategory] = useState("");

  // 이벤트 등록 모달
  const [add, setAdd] = useState(false);

  // 대분류 셀렉트 했을 때
  const handleChange = (event) => {
    setBigCategory(event.target.value);
  };

  // 쿠폰명 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const nameFocus = () => {
    setNamePlaceholder("");
  };
  const nameBlur = () => {
    setNamePlaceholder("쿠폰명을 입력해주세요.");
  };

  // 이벤트 등록 모달
  const handleClickOpen = () => {
    setAdd(true);
  };

  const handleClose = () => {
    setAdd(false);
  };

  const handleInquireEvent = () => {
    inquireEvent();
  };

  return (
    <Grid2 container spacing={2} sx={{ padding: "0", margin: "0" }}>
      {/* 쿠폰명 */}
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
        쿠폰명
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
          placeholder={namePlaceholder}
          onChange={nameChange}
          onFocus={nameFocus}
          onBlur={nameBlur}
        />
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      </Grid2>
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
        적용 쿠폰
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
          <FormControl sx={{ minWidth: 200, width: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              쿠폰명
            </InputLabel>
            <Select
              value={bigCategory}
              onChange={handleChange}
              label="쿠폰명"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
            >
              <MenuItem value="쿠폰명">
                <em>쿠폰명</em>
              </MenuItem>
              {/* 쿠폰 이름 map으로 불러오기 */}
              <MenuItem value={"식품"}>식품</MenuItem>
              <MenuItem value={"생활, 건강"}>생활/건강</MenuItem>
              <MenuItem value={"가구, 인테리어"}>가구/인테리어</MenuItem>
              <MenuItem value={"반려, 도서, 취미"}>반려/도서/취미</MenuItem>
              <MenuItem value={"뷰티"}>뷰티</MenuItem>
            </Select>
          </FormControl>
        </CategoryBox>
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      </Grid2>
      {/* 기간 */}
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <EventPeriod />
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          marginBottom: "2rem",
          padding: "0",
          width: "100%",
          background: "white",
          // height: "5rem",
        }}
      >
        <ButtonBox>
          <WhiteButton>숨겨진 버튼</WhiteButton>
          <div>
            <ResetButton>초기화</ResetButton>
            <SearchButton onClick={handleInquireEvent}>검색</SearchButton>
          </div>
          <AddButton onClick={handleClickOpen}>이벤트 등록</AddButton>
        </ButtonBox>
        <AddEventModal add={add} setAdd={setAdd} />
      </Grid2>
      <Grid2
        container
        spacing={2}
        sx={{ padding: "0", margin: "0", width: "100%" }}
      >
        <Grid2
          item
          xs={12}
          sx={{
            margin: "0",
            padding: "0",
            background: "white",
          }}
        >
          {/* 조회한 쿠폰 리스트 */}
          <EventList />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;
`;

const Input = styled.input`
  border: 0.1rem solid #000000;
  width: 19rem;
  height: 3rem;
  font-size: 1.3rem;
  margin-left: 5rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-bottom: 2rem;
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

const AddButton = styled.button`
  background-color: #1a6dff;
  color: white;
  border: 1px solid;
  margin-right: 3rem;
  height: 3rem;
  width: fit-content;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const WhiteButton = styled.button`
  background-color: #fff;
  color: white;
  border: 1px solid;
  margin-left: 3rem;
  height: 3rem;
  width: fit-content;
  font-size: 1.5rem;
`;
