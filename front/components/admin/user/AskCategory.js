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
import AskPeriod from "./AskPeriod";
import AskList from "./AskList";

// API
import { searchCustomerCenter } from "../../../pages/api/admin";

export default function AskCategory() {
  // 문의 사유(전체, 상품, 환불, 배송, 사이트, 주문결제)
  const [reason, setReason] = useState("");

  // 문의명
  const [name, setName] = useState("");

  // 답변 유무
  // 전체, 답변_완료, 답변_미완료
  const [approval, setApproval] = useState("");

  // 기간 기준
  const [stand, setStand] = useState(0);

  // 시작일
  const [startDate, setStartDate] = useState("");

  // 마감일
  const [endDate, setEndDate] = useState("");

  // 리셋 감지기
  const [reset, setReset] = useState(0);

  // 문의 리스트
  const [askList, setAskList] = useState([]);

  // 문의 사유 셀렉트 했을 때
  const handleChange = (event) => {
    setReason(event.target.value);
  };

  // 문의명 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
  };

  // 옵션 체크
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("approvalCheck");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else if (checkboxes[i] === checkThis) {
        if (i === 0) {
          setApproval("");
        } else if (i === 1) {
          setApproval("답변_완료");
        } else if (i === 2) {
          setApproval("답변_미완료");
        }
      }
    }
  };

  // 초기화
  const handleReset = () => {
    setReset(reset + 1);
    setReason("");
    setName("");
    setStand(0);
    setStartDate("");
    setEndDate("");
    const checkboxes = document.getElementsByName("approvalCheck");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setApproval(0);
  };

  // 조건에 맞는 검색하기 (전체 문의 내역 불러오기)
  const handleSearch = async () => {
    const searchDto = {
      customerCenterCategory: reason,
      title: name,
      status: approval,
      start_date: moment(startDate).format().slice(0, 10) + " 00:00:00",
      end_date: moment(endDate).format().slice(0, 10) + " 00:00:00",
    };
    if (reason === "전체" || reason === "") {
      searchDto.customerCenterCategory = null;
    }
    if (name === "") {
      searchDto.title = null;
    }
    if (approval === "") {
      searchDto.status = null;
    }
    if (startDate === "") {
      searchDto.start_date = "2012-12-01 00:00:00";
    }
    if (endDate === "") {
      searchDto.end_date = "2032-12-01 00:00:00";
    }

    const lst = await searchCustomerCenter(searchDto);

    lst.sort(function (a, b) {
      return b.uid - a.uid;
    });

    const tmp = [];
    for (let i = 0; i < lst.length; i++) {
      // console.log(lst[i]);
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

    setAskList(tmp);
  };

  // 렌더링 시 리뷰 신고 조회
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Grid2
      container
      spacing={2}
      sx={{ padding: "0", margin: "0", background: "white" }}
    >
      {/* 문의 사유 */}
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
        문의 사유
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
              문의 사유
            </InputLabel>
            <Select
              value={reason}
              onChange={handleChange}
              label="문의 사유"
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
              <MenuItem value={"전체"}>전체</MenuItem>
              <MenuItem value={"상품"}>상품</MenuItem>
              <MenuItem value={"환불"}>환불</MenuItem>
              <MenuItem value={"배송"}>배송</MenuItem>
              <MenuItem value={"사이트"}>사이트</MenuItem>
              <MenuItem value={"주문결제"}>주문결제</MenuItem>
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
      {/* 문의명 */}
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
        문의명
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
          onChange={nameChange}
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
          name="approvalCheck"
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
          name="approvalCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{ width: "1.2rem", height: "1.5rem", marginRight: "0.5rem" }}
        />
        <Name>완료</Name>
        <input
          name="approvalCheck"
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
        <AskPeriod
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
          <AskList askList={askList} />
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

const Input = styled.input`
  border: 0.1rem solid #000000;
  width: 19rem;
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
