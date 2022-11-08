import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MyDatePicker } from "./AddEventModal";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid2 from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { inquirecoupon } from "../../../pages/api/coupon";

export default function EditEventModal(props) {
  // 이벤트 이름
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] =
    useState("쿠폰 이름을 입력해주세요.");

  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());
  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

  // 쿠폰 리스트
  const [couponArray, setCouponArray] = useState([]);

  // 선택한 쿠폰 인덱스
  const [selectCoupon, setSelectCoupon] = useState("");

  // 이벤트명 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  const nameFocus = () => {
    setNamePlaceholder("");
  };
  const nameBlur = () => {
    setNamePlaceholder("쿠폰 이름을 입력해주세요.");
  };

  // 쿠폰명 셀렉트 했을 때
  const handleChange = (event) => {
    setSelectCoupon(event.target.value);
  };

  useEffect(() => {
    getCoupong();
  }, []);

  const getCoupong = async () => {
    const c = await inquirecoupon();
    const c_lst = Object.entries(c.data);
    setCouponArray(c_lst);
  };

  // -------------------------------------------------------------

  // 대분류
  const [bigCategory, setBigCategory] = useState("");

  // 대표 이미지 정보
  const [profile, setProfile] = useState(null);

  // 대표 이미지
  const profileRef = useRef(null);

  // 대표 이미지 등록
  const handleClickProfile = () => {
    profileRef.current?.click();
  };

  // 대표 이미지 등록 함수
  const uploadProfile = (e) => {
    const profileList = e.target.files[0];
    // console.log(profileList[0]);
    // console.log(profileList);
    if (profileList) {
      // console.log("####");
      const url = URL.createObjectURL(profileList);
      setProfile({
        file: profileList,
        thumbnail: url,
        type: profileList.type.slice(0, 5),
      });
    }
  };

  // 1번 방법
  const handleAddEvet = () => {
    const formData = new FormData();
    // formData.append("image", profile);
    const data = {
      name: "도건 이벤트",
      content: "안녕하세요",
      start_date: startDate.toISOString().slice(0, 10),
      end_date: endDate.toISOString().slice(0, 10),
      coupon_lists: [11, 12],
    };
    formData.append("eventDto", JSON.stringify(data));
    console.log(formData);
    createEvent(formData);
  };

  // -------------------------------------------------------------

  return (
    <div>
      <Dialog open={props.edit} onClose={() => props.setEdit(false)}>
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
                onChange={() => props.setAdd(false)}
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
            <div>
              <MyDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                dateFormat="yyyy/MM/dd"
              />
            </div>
            <WaveTag>~</WaveTag>
            <div>
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
                value={couponArray[selectCoupon]}
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
                {couponArray.map((e, idx) => {
                  <MenuItem key={idx} value={idx}>
                    {e.name}
                  </MenuItem>;
                })}
                {/* <MenuItem value={"2"}>생활/건강</MenuItem>
                <MenuItem value={"3"}>가구/인테리어</MenuItem>
                <MenuItem value={"4"}>반려/도서/취미</MenuItem>
                <MenuItem value={"5"}>뷰티</MenuItem>
                <MenuItem value={"6"}>유아동</MenuItem>
                <MenuItem value={"7"}>가전</MenuItem>
                <MenuItem value={"8"}>스포츠/레저/자동차</MenuItem> */}
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
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              ref={profileRef}
              onChange={uploadProfile}
              style={{ display: "none" }}
            />
            <LeadButton onClick={handleClickProfile}>대표 이미지</LeadButton>
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
            <AddButton onClick={() => handleAddEvent()}>등록</AddButton>
          </Grid2>
        </Grid2>
      </Dialog>
    </div>
  );
}

// ------------------------------------------------------------

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

// ------------------------------------------------------------

const AddCouponBox = styled.div`
  border: 0.3rem solid #ff9494;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

const ContentBox = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 4rem;
  display: flex;
`;

const ContentTitle = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: 0.1rem solid #ff9494;
  border-radius: 0.5rem;
  width: 15rem;
  height: 2rem;
  font-size: 1.3rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
`;

const ImgAddButton = styled.button`
  background-color: #ffffff;
  color: black;
  border: 1px solid;
  border-radius: 0.4rem;
  margin-left: 1rem;
  height: 2rem;
  width: 8rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  color: gray;
  border: 1px solid;
  border-radius: 0.8rem;
  height: 2rem;
  width: 3rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const EditButton = styled.button`
  background-color: #ff7171;
  color: white;
  border: 1px solid;
  border-radius: 0.8rem;
  margin-left: 1rem;
  height: 2rem;
  width: 5rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
