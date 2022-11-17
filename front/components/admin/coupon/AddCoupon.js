import React, { useState } from "react";
import styled from "styled-components";
import { MyDatePicker } from "../coupon/CouponPeriod";
import { createcoupon } from "../../../pages/api/coupon";
import Swal from "sweetalert2";
import moment from "moment";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid2 from "@mui/material/Unstable_Grid2";
import "react-datepicker/dist/react-datepicker.css";

export default function AddCoupon() {
  // 대분류 카테고리
  const [category, setCategory] = useState("");

  // 쿠폰이름
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] =
    useState("쿠폰 이름을 입력해주세요.");

  // 할인금액
  const [sale, setSale] = useState("");
  const [salePlaceholder, setSalePlaceholder] =
    useState("숫자만 입력해주세요.");

  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());

  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

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
    setNamePlaceholder("쿠폰 이름을 입력해주세요.");
  };

  // 할인 금액 입력하면
  const saleChange = (event) => {
    setSale(event.target.value);
  };
  const saleFocus = () => {
    setSalePlaceholder("");
  };
  const saleBlur = () => {
    setSalePlaceholder("숫자만 입력해주세요.");
  };

  const regisCoupon = () => {
    const couponDto = {
      name: name,
      discount_price: sale,
      start_date: moment(startDate).format().slice(0, 10),
      end_date: moment(endDate).format().slice(0, 10),
      big_categories_uid: Number(category),
    };
    if (category === "" || name === "" || sale === "" || !Number(sale)) {
      Swal.fire({
        show: true,
        title: "값을 다시 입력해주세요.",
        position: "top-center",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      createcoupon(couponDto);
      Swal.fire({
        show: true,
        title: "쿠폰이 등록되었습니다.",
        position: "top-center",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      location.reload();
    }
  };

  return (
    <Grid2
      container
      spacing={1}
      sx={{ padding: "0", margin: "0", background: "#ffffff" }}
    >
      <h2
        style={{
          paddingLeft: "2rem",
          margin: "0",
          paddingTop: "2rem",
          paddingBottom: "1rem",
        }}
      >
        쿠폰 등록
      </h2>
      <hr
        style={{
          background: "#000000",
          width: "95%",
          marginBottom: "2rem",
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
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
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
                // getContentAnchorEl: null,
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
            >
              {/* <MenuItem value="대분류">
                <em>대분류</em>
              </MenuItem> */}
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
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
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
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
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
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
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
            // endDate={endDate}
            style={{ width: "40%" }}
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
          style={{ width: "40%" }}
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
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
          background: "white",
          // height: "5rem",
        }}
      >
        <ButtonBox>
          <AddButton
            onClick={() => {
              regisCoupon();
            }}
          >
            등록
          </AddButton>
        </ButtonBox>
      </Grid2>
    </Grid2>
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

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
`;

const SaleInput = styled.input`
  border: 0.1rem solid #000000;
  width: 19rem;
  height: 3rem;
  font-size: 1.3rem;
  margin-left: 2rem;
  padding-right: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
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
