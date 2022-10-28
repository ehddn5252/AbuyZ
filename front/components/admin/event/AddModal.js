import React, { useState } from "react";
import styled from "styled-components";

// 달력
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid2 from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function AddModal(props) {
  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());
  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

  // 대분류
  const [bigCategory, setBigCategory] = useState("");

  // 대분류 셀렉트 했을 때
  const handleChange = (event) => {
    setBigCategory(event.target.value);
  };

  return (
    <div>
      <Dialog open={props.add} onClose={() => props.setAdd(false)}>
        <Grid2 container spacing={2} sx={{ padding: "0", margin: "0" }}>
          {/* 헤더 */}
          <Grid2
            xs={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              fontWeight: "600",
              padding: "1rem",
            }}
          >
            <ModalHeader>이벤트 등록</ModalHeader>
          </Grid2>
          <Grid2 xs={5.5} />
          <Grid2
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              fontWeight: "600",
              // paddingLeft: "80%",
            }}
          >
            <IconButton>
              <CloseIcon
                onClick={() => props.setAdd(false)}
                aria-label="Delete"
              />
            </IconButton>
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
          {/* 이벤트명 */}
          <Grid2
            xs={4}
            sx={{
              fontSize: "1rem",
              fontWeight: "800",
              padding: "1rem",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            이벤트명
          </Grid2>
          <Grid2 xs={8}>
            <NameInput />
          </Grid2>
          {/* 내용 */}
          <Grid2
            xs={4}
            sx={{
              fontSize: "1rem",
              fontWeight: "800",
              padding: "1rem",
              paddingRight: "2.5rem",
              textAlign: "center",
            }}
          >
            내용
          </Grid2>
          <Grid2 xs={8}>
            <ContentInput />
          </Grid2>
          {/* 기간 */}
          <Grid2
            xs={4}
            sx={{
              fontSize: "1rem",
              fontWeight: "800",
              padding: "1rem",
              paddingRight: "2.5rem",
              textAlign: "center",
            }}
          >
            기간
          </Grid2>
          <Grid2
            xs={8}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "1rem",
              fontWeight: "800",
              textAlign: "start",
              paddingLeft: "1.5rem",
            }}
          >
            <MyDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              dateFormat="yyyy/MM/dd"
            />
            <WaveTag>~</WaveTag>
            <MyDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy/MM/dd"
            />
          </Grid2>
          {/* 적용 쿠폰 */}
          <Grid2
            xs={4}
            sx={{
              fontSize: "1rem",
              fontWeight: "800",
              padding: "1rem",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            적용 쿠폰
          </Grid2>
          <Grid2
            xs={8}
            sx={{
              padding: "0",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              background: "white",
              paddingLeft: "1.5rem",
            }}
          >
            <FormControl sx={{ minWidth: 200, width: 300 }}>
              <InputLabel>쿠폰명</InputLabel>
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
          </Grid2>
          {/* 대표 이미지 */}
          <Grid2
            xs={4}
            sx={{
              fontSize: "1rem",
              fontWeight: "800",
              padding: "1rem",
              textAlign: "center",
              alignSelf: "center",
              paddingLeft: "2rem",
            }}
          >
            대표 이미지
          </Grid2>
          <Grid2
            xs={3}
            sx={{
              paddingLeft: "1.5rem",
            }}
          >
            <LeadButton>대표 이미지</LeadButton>
          </Grid2>
          <Grid2
            xs={4}
            sx={{
              display: "flex",
              alignContent: "center",
            }}
          >
            <Description>권장 크기 : 600px X 200px</Description>
          </Grid2>
          {/* 상세 이미지 */}
          <Grid2
            xs={4}
            sx={{
              fontSize: "1rem",
              fontWeight: "800",
              padding: "1rem",
              textAlign: "center",
              alignSelf: "center",
              paddingLeft: "2rem",
            }}
          >
            상세 이미지
          </Grid2>
          <Grid2
            xs={3}
            sx={{
              paddingLeft: "1.5rem",
            }}
          >
            <DetailButton>상세 이미지</DetailButton>
          </Grid2>
          <Grid2
            xs={4}
            sx={{
              display: "flex",
              alignContent: "center",
            }}
          >
            <Description>권장 크기 : 600px X 200px</Description>
          </Grid2>
          <Grid2
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
              // paddingLeft: "1.5rem",
            }}
          >
            <AddButton onClick={() => props.setAdd(false)}>등록</AddButton>
          </Grid2>
        </Grid2>
      </Dialog>
    </div>
  );
}

const ModalHeader = styled.div`
  font-size: 2rem;
`;

const NameInput = styled.input`
  width: 80%;
  height: 2rem;
  margin: 1rem;
`;

const ContentInput = styled.textarea`
  width: 80%;
  height: 8rem;
  margin-left: 1rem;
`;

const WaveTag = styled.div`
  font-size: 2rem;
  padding-right: 2rem;
`;

export const MyDatePicker = styled(DatePicker)`
  /* width: 15rem; */
  /* background-color: transparent; */
  height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  border: 1px solid;
  width: 70%;

  .react-datepicker-wrapper {
    width: 10rem;
  }
`;

const LeadButton = styled.button`
  background-color: #3b7cbe;
  color: white;
  border: 1px solid;
  height: 2rem;
  width: fit-content;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const DetailButton = styled.button`
  background-color: #6c747c;
  color: white;
  border: 1px solid;
  height: 2rem;
  width: fit-content;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const AddButton = styled.button`
  background-color: #1a6dff;
  color: white;
  border: 1px solid;
  height: 2rem;
  width: 6rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
