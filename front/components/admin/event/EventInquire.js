import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

// API
import { inquireEvent } from "../../../pages/api/event";
import { inquirecoupon } from "../../../pages/api/coupon";

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

export default function CouponInquire() {
  // 이벤트명
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] =
    useState("이벤트명을 입력해주세요.");

  // 적용할 쿠폰 uid
  const [couponUid, setCouponUid] = useState("");

  // 적용 가능한 쿠폰 리스트
  const [couponList, setCouponList] = useState([]);

  // 기준 기간
  const [standDate, setStandDate] = useState(0);

  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());

  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

  // 리셋 감지기
  const [reset, setReset] = useState(0);

  // 이벤트 데이터
  const [eventArray, setEventArray] = useState([]);

  // 삭제 감지기
  const [delNum, setDelNum] = useState(0);

  // 숫자가 올라갈 때 리셋시키기
  const resetNumUp = () => {
    setReset(reset + 1);
  };

  // 쿠폰 목록 가져오기
  const getCoupon = async () => {
    const c = await inquirecoupon();
    const c_lst = Object.entries(c.data);
    setCouponList(c_lst);
  };

  // 렌더링 시 쿠폰 리스트 들고옴
  useEffect(() => {
    getCoupon();
  }, []);

  // 이벤트명 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const nameFocus = () => {
    setNamePlaceholder("");
  };
  const nameBlur = () => {
    setNamePlaceholder("쿠폰명을 입력해주세요.");
  };

  // 쿠폰 셀렉트 했을 때
  const handleChange = (event) => {
    setCouponUid(event.target.value);
  };

  // 이벤트 등록 모달
  const [add, setAdd] = useState(false);

  // 이벤트 등록 껐다 켜기
  const handleClickOpen = () => {
    setAdd(true);
  };

  // Object에 특정 value가 존재하는지 확인
  const getKeyByValue = (obj, value) => {
    if (obj === undefined) {
      return true;
    }
    return Object.keys(obj).find((key) => obj[key] === value);
  };

  // 조건에 맞는 이벤트 조회
  const getEvent = async () => {
    const e = await inquireEvent();
    const e_lst = Object.entries(e.data);
    const tmp = [];
    // 조건 검사
    for (let i = 0; i < e_lst.length; i++) {
      // 이벤트명을 포함하고 있는지
      if (e_lst[i][1].name.includes(name) || name == "") {
        // 적용 쿠폰을 포함하고 있는지
        if (
          getKeyByValue(e_lst[i][1].coupon_lists[0], couponUid) ||
          couponUid == ""
        ) {
          // 기준 기간에 따른 날짜를 측정
          // 기준기간 선택 안했을 때
          if (standDate === 0) {
            if (
              moment(startDate).format().slice(0, 10) <=
              moment(endDate).format().slice(0, 10)
            ) {
              tmp.push(e_lst[i][1]);
            }
          }
          // 이벤트 시작 일시
          else if (standDate === 1) {
            if (
              moment(startDate).format().slice(0, 10) <= e_lst[i][1].start_date
            ) {
              tmp.push(e_lst[i][1]);
            }
          }
          // 이벤트 마감 일시
          else if (standDate === 2) {
            if (e_lst[i][1].end_date <= endDate.toISOString().slice(0, 10)) {
              tmp.push(e_lst[i][1]);
            }
          }
        }
      }
    }
    setEventArray(tmp);
  };

  // 초기화
  const handleReset = () => {
    setName("");
    setCouponUid("");
    setStandDate(0);
    setStartDate(new Date());
    setEndDate(new Date());
    setEventArray([]);
  };

  // 삭제 감지기
  useEffect(() => {
    getEvent();
  }, [delNum]);

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
        이벤트명
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
              value={couponUid}
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
                // getcontentanchorel: null,
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
            >
              {/* 쿠폰 이름 map으로 불러오기 */}
              {couponList.map((e, idx) => (
                <MenuItem key={idx} value={e[1].uid}>
                  {e[1].name}
                </MenuItem>
              ))}
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
        <EventPeriod
          reset={reset}
          setStandDate={setStandDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
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
            <ResetButton
              onClick={() => {
                handleReset();
                resetNumUp();
              }}
            >
              초기화
            </ResetButton>
            <SearchButton onClick={getEvent}>검색</SearchButton>
          </div>
          <AddButton onClick={handleClickOpen}>이벤트 등록</AddButton>
        </ButtonBox>
        <AddEventModal add={add} setAdd={setAdd} couponList={couponList} />
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
          <EventList eventArray={eventArray} setDelNum={setDelNum} />
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
