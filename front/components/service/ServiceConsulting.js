import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import "react-dropdown/style.css";
import ProductSelectModal from "./ProductSelectModal";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { post } from "axios";
import { customercenter } from "../../pages/api/customercenter";
export default function ServiceConsulting() {
  const [selected, setSelected] = useState(0);
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [options, setOptions] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
    setCategory(event.target.value);
  };

  // 고객문의 등록 API
  // const regisCS = (e) => {
  //   e.preventDefault();
  //   let formData = new FormData();

  //   let customerCenterWriteReqDto = {

  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    const customerCenterWriteReqDto = {
      title: title,
      content: content,
      customer_center_category: category,
    };
    formData.append(
      "customerCenterWriteReqDto",
      new Blob([JSON.stringify(customerCenterWriteReqDto)], {
        type: "application/json",
      })
    );
    const res = await customercenter(formData);
    console.log(res.data);
  };

  const [currentValue, setCurrentValue] = useState("상품");
  const [ShowOptions, setShowOptions] = useState(false);
  const [isExchange, setIsExchange] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const handleOnChangeSelectValue = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
    setIsExchange(false);
    setSelected(0);
    setName("");
  };
  const handleOnChangeSelectValueex = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
    setIsExchange(true);
    setSelected(0);
    setName("");
  };
  const deleteSelect = () => {
    setName("");
    setSelected(0);
  };

  // const
  return (
    <Container>
      <MajorTitle>1 : 1 문의하기</MajorTitle>
      <hr
        style={{
          height: "0.3rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />
      <AllDiv>
        <div style={{ flex: 2, marginTop: "1rem" }}>
          <span>카테고리</span>
        </div>
        <div style={{ flex: 10 }}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              문의 유형 선택
            </InputLabel>
            <Select value={age} onChange={handleChange} displayEmpty fullWidth>
              <MenuItem
                value={"상품"}
                onClick={(e) => handleOnChangeSelectValue(e)}
              >
                상품
              </MenuItem>

              <MenuItem
                value={"교환_환불"}
                onClick={(e) => handleOnChangeSelectValueex(e)}
              >
                교환/환불
              </MenuItem>
              <MenuItem
                value={"이벤트_프로모션"}
                onClick={(e) => handleOnChangeSelectValue(e)}
              >
                이벤트 프로모션
              </MenuItem>
              <MenuItem
                value={"사이트_개선"}
                onClick={(e) => handleOnChangeSelectValue(e)}
              >
                사이트 개선
              </MenuItem>
              <MenuItem
                value={"주문_결제"}
                onClick={(e) => handleOnChangeSelectValue(e)}
              >
                주문 / 결제
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </AllDiv>
      {isExchange == true ? (
        <AllDiv>
          <div style={{ flex: 2, marginTop: "0.5rem" }}>
            <span>상품 선택</span>
          </div>
          <div style={{ flex: 10 }}>
            {name.length > 0 ? (
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flex: "2" }}>
                    <img
                      src={img}
                      style={{
                        width: "6rem",
                        height: "8rem",
                        objectFit: "cover",
                      }}
                    ></img>{" "}
                  </div>
                  <div style={{ flex: "8", marginTop: "1.7rem" }}>
                    <span style={{ fontWeight: "bold" }}>{name}</span>
                    <br></br>
                    <span>[{options}]</span>
                    <br></br>
                    <span>
                      {price}원 | {count}개
                    </span>
                    <br></br>
                    <span style={{ color: "#aaaaaa" }}>{date}</span>
                  </div>
                  <div style={{ flex: "2" }}>
                    <CloseIcon onClick={deleteSelect}></CloseIcon>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <SelectButton onClick={showModal}>상품 선택</SelectButton>
                {modalOpen && (
                  <ProductSelectModal
                    setModalOpen={setModalOpen}
                    setDate={setDate}
                    setImg={setImg}
                    setName={setName}
                    setOptions={setOptions}
                    setPrice={setPrice}
                    setCount={setCount}
                    setSelected={setSelected}
                    selected={selected}
                  ></ProductSelectModal>
                )}
              </div>
            )}
          </div>
        </AllDiv>
      ) : null}

      <AllDiv>
        <div style={{ flex: 2, marginTop: "1rem" }}>
          <span>문의 제목</span>
        </div>
        <div style={{ flex: 10 }}>
          <TextField
            placeholder="문의 제목을 입력해주세요."
            fullWidth
            onChange={(event) => setTitle(event.currentTarget.value)}
          ></TextField>
        </div>
      </AllDiv>
      <AllDiv>
        <div style={{ flex: 2, marginTop: "1rem" }}>
          <span>문의 내용</span>
        </div>
        <div style={{ flex: 10 }}>
          <TextField
            placeholder="문의 내용을 입력해주세요."
            fullWidth
            onChange={(event) => setContent(event.currentTarget.value)}
          ></TextField>
        </div>
      </AllDiv>
      <AllDiv>
        <div style={{ flex: 2, marginTop: "0.5rem" }}>
          <span>사진 첨부</span>
          <br></br>
          <span>(선택사항)</span>
        </div>
        <div style={{ flex: 10 }}>
          <input
            type="file"
            id="file"
            onChange={() => setFile(event.target.files[0])}
            multiple="multiple"
          />
        </div>
      </AllDiv>

      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <YesButton type="submit" onClick={handleSubmit}>
          등록하기
        </YesButton>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 56rem;
  height: 80vh;
`;

const AllDiv = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: row;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const NoButton = styled.button`
  background-color: white;
  border: 1px solid;
  border-color: #56a9f1;
  border-radius: 5px;
  height: 3.3rem;
  width: 8rem;
  color: #56a9f1;
`;

const YesButton = styled.button`
  background-color: #56a9f1;
  border: none;
  border-radius: 5px;
  height: 3.3rem;
  width: 8rem;
  color: white;
`;

const SelectButton = styled.button`
  background-color: white;
  padding: 0.7rem 0.8rem 0.7rem 0.8rem;
  border: 1px solid;
  color: #56a9f1;
  border-color: #56a9f1;
  border-radius: 5px;
  width: 100%;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;
