import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

// API
import axios from "axios";

// 달력
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid2 from "@mui/material/Unstable_Grid2";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddEventModal(props) {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 이벤트명
  const [name, setName] = useState("");

  // 내용
  const [content, setContent] = useState("");

  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());

  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

  // 쿠폰 목록
  const couponArr = props.couponList;

  // 내림차순정렬
  couponArr.sort(function (a, b) {
    return b.uid - a.uid;
  });

  // 적용 쿠폰
  const [couponName, setCouponName] = useState("");

  // 적용 쿠폰 셀렉트 했을 때
  const handleChange = (event) => {
    setCouponName(event.target.value);
  };

  // 대표 이미지 정보
  const [profileImg, setProfileImg] = useState(null);

  // 대표 이미지
  const profileImgRef = useRef(null);

  // 대표 이미지 등록
  const handleClickProfileImg = () => {
    profileImgRef.current?.click();
  };

  // 대표 이미지 등록 함수
  const uploadProfileImg = (e) => {
    const profileList = e.target.files[0];
    setProfileImg(profileList);
  };

  // 상세 이미지 정보
  const [detailImg, setDetailImg] = useState(null);

  // 상세 이미지
  const detailImgRef = useRef(null);

  // 상세 이미지 등록
  const handleClickDetailImg = () => {
    detailImgRef.current?.click();
  };

  // 상세 이미지 등록 함수
  const uploadDetailImg = (e) => {
    const detailList = e.target.files[0];
    setDetailImg(detailList);
  };

  // 이벤트 등록 API
  const handleAddEvent = () => {
    let formData = new FormData();

    let data = {
      name: name,
      start_date: moment(startDate).format().slice(0, 10),
      end_date: moment(endDate).format().slice(0, 10),
      coupon_lists: [couponName],
      content: content,
    };

    formData.append(
      "eventDto",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    formData.append("thumbnail", profileImg);
    formData.append("content_img", detailImg);

    const accessToken = sessionStorage.getItem("access-token");
    axios.defaults.headers.common["access_token"] = accessToken;

    axios
      .post("https://k7e201.p.ssafy.io:8081/api/event/create", formData, {
        headers: {
          "Contest-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "등록을 실패하였습니다.");
      });
  };

  return (
    <div>
      <InquireAddButton
        style={{ background: "#1A6DFF", color: "#fff" }}
        onClick={handleOpen}
      >
        이벤트 등록
      </InquireAddButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
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
              }}
            >
              <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            </Grid2>
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            >
              <hr
                style={{ background: "#ff9494", margin: "0", padding: "0" }}
              />
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
              <NameInput onChange={(e) => setName(e.target.value)} />
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
              <ContentInput onChange={(e) => setContent(e.target.value)} />
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
              <div style={{ width: "9rem" }}>
                <MyDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  dateFormat="yyyy/MM/dd"
                />
              </div>
              <WaveTag>~</WaveTag>
              <div style={{ width: "9rem" }}>
                <MyDatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="yyyy/MM/dd"
                />
              </div>
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
                  value={couponName}
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
                  }}
                  sx={{ border: 1, height: 50, borderRadius: 0 }}
                >
                  {/* 쿠폰 이름 map으로 불러오기 */}
                  {couponArr.map((e, idx) => (
                    <MenuItem key={idx} value={e[1].uid}>
                      {e[1].name}
                    </MenuItem>
                  ))}
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
              xs={2}
              sx={{
                paddingLeft: "1.5rem",
              }}
            >
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                ref={profileImgRef}
                onChange={uploadProfileImg}
                style={{ display: "none" }}
              />
              <LeadButton onClick={handleClickProfileImg}>
                대표 이미지
              </LeadButton>
            </Grid2>
            <Grid2
              xs={4}
              sx={{
                display: "flex",
                alignContent: "center",
              }}
            >
              {profileImg ? (
                <Description>{profileImg.name}</Description>
              ) : (
                <Description>권장 크기 : 1000px X 240px</Description>
              )}
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
              xs={2}
              sx={{
                paddingLeft: "1.5rem",
              }}
            >
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                ref={detailImgRef}
                onChange={uploadDetailImg}
                style={{ display: "none" }}
              />
              <DetailButton onClick={handleClickDetailImg}>
                상세 이미지
              </DetailButton>
            </Grid2>
            <Grid2
              xs={4}
              sx={{
                display: "flex",
                alignContent: "center",
              }}
            >
              {detailImg ? (
                <Description>{detailImg.name}</Description>
              ) : (
                <Description>권장 크기 : 1000px X 240px</Description>
              )}
            </Grid2>
            <Grid2
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <AddButton
                onClick={() => {
                  handleAddEvent(),
                    alert("이벤트가 생성되었습니다."),
                    location.reload(),
                    handleClose();
                }}
              >
                등록
              </AddButton>
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
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
  padding-right: 1rem;
`;

export const MyDatePicker = styled(DatePicker)`
  height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  border: 1px solid;
  width: 80%;
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

const InquireAddButton = styled.button`
  background-color: #1a6dff;
  color: white;
  border: 1px solid;
  margin-right: 3rem;
  height: 3rem;
  width: 10rem;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;
