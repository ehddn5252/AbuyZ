import React, { useState } from "react";
import styled from "styled-components";
import { MyDatePicker } from "./CouponPeriod";
import SweetAlert2 from "react-sweetalert2";

// API
import { modifycoupon } from "../../../pages/api/coupon";

// mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

export default function EditCouponModal(props) {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // alert창
  const [swalProps, setSwalProps] = useState({});

  // 대분류 카테고리
  const [category, setCategory] = useState(
    props.couponInfo.available_categories_uid
  );

  // 쿠폰이름
  const [name, setName] = useState(props.couponInfo.name);
  const [namePlaceholder, setNamePlaceholder] = useState(props.couponInfo.name);

  // 할인금액
  const [sale, setSale] = useState(props.couponInfo.discount_price);
  const [salePlaceholder, setSalePlaceholder] = useState(
    props.couponInfo.discount_price
  );

  // 시작 날짜
  const [startDate, setStartDate] = useState(
    new Date(props.couponInfo.start_date)
  );

  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date(props.couponInfo.end_date));

  // 대분류 셀렉트 했을 때
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // 쿠폰이름 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const nameFocus = () => {
    setNamePlaceholder("");
  };
  const nameBlur = () => {
    setNamePlaceholder(props.couponInfo.name);
  };

  // 할인 금액 입력하면
  const saleChange = (event) => {
    setSale(event.target.value);
  };
  const saleFocus = () => {
    setSalePlaceholder("");
  };
  const saleBlur = () => {
    setSalePlaceholder(props.couponInfo.discount_price);
  };

  // 쿠폰수정 API
  const modiCoupon = () => {
    const couponDto = {
      name: name,
      discount_price: sale,
      start_date: startDate.toISOString().slice(0, 10),
      end_date: endDate.toISOString().slice(0, 10),
      big_categories_uid: Number(category),
    };
    modifycoupon(couponDto, props.couponInfo.uid);
    setSwalProps({
      show: true,
      title: "쿠폰이 수정되었습니다.",
      position: "top-center",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    location.reload();
  };

  return (
    <div>
      <Button
        style={{ background: "#1A6DFF", color: "#fff" }}
        onClick={handleOpen}
      >
        수정하기
      </Button>
      <Modal open={open} onClose={handleClose} sx={{ zIndex: "1000" }}>
        <Box sx={style}>
          <SweetAlert2 {...swalProps} />
          <Grid2
            container
            spacing={1}
            sx={{ padding: "0", margin: "0", background: "#fff" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  paddingLeft: "2rem",
                  margin: "0",
                  paddingTop: "2rem",
                  paddingBottom: "1rem",
                }}
              >
                쿠폰 수정
              </h2>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  cursor: "pointer",
                  marginRight: "2rem",
                  marginTop: "2rem",
                }}
              />
            </div>
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            >
              <hr style={{ background: "#000", margin: "0", padding: "0" }} />
            </Grid2>
            {/* 카테고리 */}
            <Grid2
              xs={3}
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
                height: "7rem",
              }}
            >
              카테고리
            </Grid2>
            <Grid2
              xs={9}
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
                    대분류
                  </InputLabel>
                  <Select
                    value={category}
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
            </Grid2>
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            >
              <hr style={{ background: "#000", margin: "0", padding: "0" }} />
            </Grid2>
            {/* 쿠폰명 */}
            <Grid2
              xs={3}
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
                height: "7rem",
              }}
            >
              쿠폰명
            </Grid2>
            <Grid2
              xs={9}
              sx={{
                padding: "0",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                display: "flex",
                zIndex: "0",
                background: "white",
                alignItems: "center",
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
              <hr style={{ background: "#000", margin: "0", padding: "0" }} />
            </Grid2>
            {/* 할인 금액 */}
            <Grid2
              xs={3}
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
                height: "7rem",
              }}
            >
              할인 금액
            </Grid2>
            <Grid2
              xs={9}
              sx={{
                padding: "0",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                display: "flex",
                zIndex: "0",
                background: "white",
                alignItems: "center",
              }}
            >
              <SaleInput
                placeholder={salePlaceholder}
                onChange={saleChange}
                onFocus={saleFocus}
                onBlur={saleBlur}
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
              <hr style={{ background: "#000", margin: "0", padding: "0" }} />
            </Grid2>
            {/* 기간 */}
            <Grid2
              xs={3}
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
                height: "8rem",
              }}
            >
              기간
            </Grid2>
            <Grid2
              xs={9}
              sx={{
                padding: "0",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                paddingLeft: "1rem",
                display: "flex",
                zIndex: "0",
                background: "white",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "1rem" }}>
                <MyDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  dateFormat="yyyy/MM/dd"
                />
              </div>
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
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            >
              <hr style={{ background: "#000", margin: "0", padding: "0" }} />
            </Grid2>
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
                background: "white",
              }}
            >
              <ButtonBox>
                <AddButton
                  onClick={() => {
                    modiCoupon();
                  }}
                >
                  수정
                </AddButton>
              </ButtonBox>
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
    </div>
  );
}
const WaveTag = styled.div`
  font-size: 2rem;
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

const Input = styled.input`
  border: 0.1rem solid #000000;
  width: 19rem;
  height: 3rem;
  font-size: 1.3rem;
  margin-left: 2rem;
  padding-left: 1rem;

  &::placeholder {
    color: black;
    font-size: 1rem;
  }
`;

const SaleInput = styled.input`
  border: 0.1rem solid #000000;
  width: 19rem;
  height: 3rem;
  font-size: 1.3rem;
  margin-left: 2rem;
  padding-right: 1rem;
  padding-left: 1rem;

  &::placeholder {
    color: black;
    font-size: 1rem;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-bottom: 2rem;
  background-color: white;
`;

const AddButton = styled.button`
  background-color: #1a6dff;
  color: white;
  border: 1px solid;
  height: 3rem;
  width: 6rem;
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
  }
`;
