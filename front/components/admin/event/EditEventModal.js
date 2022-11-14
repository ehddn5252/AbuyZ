import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MyDatePicker } from "./AddEventModal";
import moment from "moment";

// API
import { inquirecoupon } from "../../../pages/api/coupon";
import axios from "axios";

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
  //   width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditEventModal(props) {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 이벤트명
  const [name, setName] = useState(props.eventInfo.name);

  // 내용
  const [content, setContent] = useState(props.eventInfo.content);

  // 시작 날짜
  const [startDate, setStartDate] = useState(
    new Date(props.eventInfo.start_date)
  );

  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date(props.eventInfo.end_date));

  // 적용 쿠폰
  const [selectCoupon, setSelectCoupon] = useState(
    props.eventInfo.coupon_lists[0]
      ? props.eventInfo.coupon_lists[0].uid
      : "쿠폰"
  );

  // 쿠폰명 셀렉트 했을 때
  const handleChange = (event) => {
    setSelectCoupon(event.target.value);
  };

  // 이벤트명 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
  };

  // 사용 가능한 쿠폰 목록
  const [couponArray, setCouponArray] = useState([]);

  // 사용 가능한 쿠폰 목록 가져오기
  const getCoupong = async () => {
    const c = await inquirecoupon();
    const c_lst = Object.entries(c.data);
    setCouponArray(c_lst);
  };

  // 렌더링 됐을 때
  useEffect(() => {
    getCoupong();
  }, []);

  // 대표 이미지 정보
  const [profileImg, setProfileImg] = useState(props.eventInfo.thumbnail);

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
  const [detailImg, setDetailImg] = useState(props.eventInfo.contentImg);

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

  // 이벤트 수정 API
  const handleEditEvent = () => {
    let formData = new FormData();

    let data = {
      name: name,
      start_date: moment(startDate).format().slice(0, 10),
      end_date: moment(endDate).format().slice(0, 10),
      coupon_lists: [selectCoupon],
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
      .put(
        `https://k7e201.p.ssafy.io:8081/api/event/${props.eventInfo.uid}`,
        formData,
        {
          headers: {
            "Contest-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((err) => {
        console.log(err, "수정을 실패하였습니다.");
      });
  };

  return (
    <div>
      <EditButton
        style={{ background: "#1A6DFF", color: "#fff" }}
        onClick={handleOpen}
      >
        수정
      </EditButton>
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
              <ModalHeader>이벤트 수정</ModalHeader>
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
              <NameInput
                onChange={(e) => setName(e.target.value)}
                placeholder={props.eventInfo.name}
              />
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
              <ContentInput
                onChange={(e) => setContent(e.target.value)}
                placeholder={props.eventInfo.content}
              />
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
                <InputLabel>
                  {props.eventInfo.coupon_lists[0]
                    ? props.eventInfo.coupon_lists[0].name
                    : "쿠폰"}
                </InputLabel>
                <Select
                  value={selectCoupon}
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
                    // getContentAnchorEl: null,
                  }}
                  sx={{ border: 1, height: 50, borderRadius: 0 }}
                >
                  {/* 쿠폰 이름 map으로 불러오기 */}
                  {couponArray.map((e, idx) => (
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
                typeof profileImg === "string" ? (
                  <Description>{profileImg.slice(46)}</Description>
                ) : (
                  <Description>{profileImg.name}</Description>
                )
              ) : null}
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
                typeof profileImg === "string" ? (
                  <Description>{detailImg.slice(46)}</Description>
                ) : (
                  <Description>{detailImg.name}</Description>
                )
              ) : null}
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
              <AddButton
                onClick={() => {
                  handleEditEvent();
                }}
              >
                수정
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
  padding-left: 0.5rem;
  width: 80%;
  height: 2rem;
  margin: 1rem;
`;

const ContentInput = styled.textarea`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: 80%;
  height: 8rem;
  margin-left: 1rem;
`;

const WaveTag = styled.div`
  font-size: 2rem;
  padding-right: 2rem;
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

const EditButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  margin-left: 1rem;
  height: 2rem;
  width: 5rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
