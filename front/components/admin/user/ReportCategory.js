// React
import React, { useState, useEffect } from "react";
import moment from "moment";

// API
import { SearchDeclaration } from "../../../pages/api/review";

// MUI
import Grid2 from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Calender
import "react-datepicker/dist/react-datepicker.css";

// StyledComponent
import styled from "styled-components";

// 컴포넌트
import ReportList from "./ReportList";
import ReportPeriod from "./ReportPeriod";

export default function ReportCategory() {
  // 신고 데이터
  const [declaration, setDeclaration] = useState([]);

  // 신고 사유(0:허위사실유포, 1:욕설, 2:전체)
  const [reason, setReason] = useState("");

  // 제품명
  const [name, setName] = useState("");

  // 승인 유무
  // 0:대기, 1:거절, 2:승인, 3:전체
  const [approval, setApproval] = useState(3);

  // 기간 기준
  const [stand, setStand] = useState(0);

  // 시작일
  const [startDate, setStartDate] = useState("");

  // 마감일
  const [endDate, setEndDate] = useState("");

  // 리셋 감지기
  const [reset, setReset] = useState(0);

  // 신고 사유 셀렉트 했을 때
  const handleChange = (event) => {
    setReason(event.target.value);
  };

  // 제품명 입력하면
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
          setApproval(3);
        } else if (i === 1) {
          setApproval(0);
        } else if (i === 2) {
          setApproval(1);
        } else if (i === 3) {
          setApproval(2);
        }
      }
    }
  };

  // 리뷰 신고 조회
  const getSearch = async () => {
    const declarationDto = {
      reasonId: reason,
      startDate: startDate,
      endDate: endDate,
      productName: name,
      status: approval,
    };
    if (reason === "2") {
      declarationDto.reasonId = "";
    }

    const decList = await SearchDeclaration(declarationDto);

    let tmp = [];
    for (let i = 0; i < decList.data.length; i++) {
      if (stand === 1 || stand === 0) {
        tmp.push(decList.data[i]);
      } else if (stand === 2) {
        if (
          moment(startDate).format().slice(0, 10) <=
            moment(decList.data[i].reportDate).format().slice(0, 10) ||
          moment(decList.data[i].reportDate).format().slice(0, 10) >=
            moment(endDate).format().slice(0, 10)
        ) {
          tmp.push(decList.data[i]);
        }
      } else if (stand === 3) {
        if (
          moment(startDate).format().slice(0, 10) <=
            moment(decList.data[i].processDate).format().slice(0, 10) ||
          moment(decList.data[i].reportDate).format().slice(0, 10) >=
            moment(endDate).format().slice(0, 10)
        ) {
          tmp.push(decList.data[i]);
        }
      }
    }
    setDeclaration(tmp);
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
    setApproval(3);
  };

  // 렌더링 시 리뷰 신고 조회
  useEffect(() => {
    getSearch();
  }, []);

  // 초기화 됐을 때 신고 조회
  useEffect(() => {
    getSearch();
  }, [reset]);

  return (
    <Grid2
      container
      spacing={2}
      sx={{ padding: "0", margin: "0", background: "white" }}
    >
      {/* 신고 사유 */}
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
        신고 사유
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
              신고 사유
            </InputLabel>
            <Select
              value={reason}
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
              <MenuItem value={"2"}>전체</MenuItem>
              <MenuItem value={"0"}>허위사실유포</MenuItem>
              <MenuItem value={"1"}>욕설</MenuItem>
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
          onChange={nameChange}
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
      {/* 승인 유무 */}
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
        승인 유무
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
        <Name>대기</Name>
        <input
          name="approvalCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{ width: "1.2rem", height: "1.5rem", marginRight: "0.5rem" }}
        />
        <Name>거절</Name>
        <input
          name="approvalCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{ width: "1.2rem", height: "1.5rem", marginRight: "0.5rem" }}
        />
        <Name>승인</Name>
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
        <ReportPeriod
          reset={reset}
          setStand={setStand}
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
        <ButtonDiv>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
          <SearchButton onClick={getSearch}>검색</SearchButton>
        </ButtonDiv>
        <TableContainer>
          <ReportList declaration={declaration} />
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
