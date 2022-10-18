import React, { useState } from "react";
import styled from "@emotion/styled";
import "react-dropdown/style.css";
import ProductSelectModal from "./ProductSelectModal";
export default function ServiceConsulting() {
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
  };
  const handleOnChangeSelectValueex = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
    setIsExchange(true);
  };
  return (
    <div>
      <h1>1 : 1 문의하기</h1>
      <ColoredLine color="red" />
      <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <span>카테고리</span>
        </div>
        <div style={{ flex: 3 }}>
          <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
            <Label>{currentValue}</Label>
            <SelectOptions show={ShowOptions}>
              <Option onClick={handleOnChangeSelectValue}>상품</Option>
              <Option onClick={handleOnChangeSelectValueex}>교환/환불</Option>
              <Option onClick={handleOnChangeSelectValue}>
                이벤트 프로모션
              </Option>
              <Option onClick={handleOnChangeSelectValue}>사이트 개선</Option>
              <Option onClick={handleOnChangeSelectValue}>주문/결제</Option>
            </SelectOptions>
          </SelectBox>
        </div>
      </div>
      {isExchange == true ? (
        <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <span>상품 선택</span>
          </div>
          <div style={{ flex: 3 }}>
            <button style={select} onClick={showModal}>
              상품 선택
            </button>
            {modalOpen && (
              <ProductSelectModal
                setModalOpen={setModalOpen}
              ></ProductSelectModal>
            )}
          </div>
        </div>
      ) : null}

      <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <span>문의 제목</span>
        </div>
        <div style={{ flex: 3 }}>
          <input
            placeholder="문의 제목을 입력해주세요."
            style={{ width: "80%" }}
          ></input>
        </div>
      </div>
      <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <span>문의 내용</span>
        </div>
        <div style={{ flex: 3 }}>
          <input
            placeholder="문의 내용을 입력해주세요."
            style={{ width: "80%", height: 300 }}
          ></input>
        </div>
      </div>
      <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <span>사진 첨부</span>
          <br></br>
          <span>(선택사항)</span>
        </div>
        <div style={{ flex: 3 }}>
          <input type="file" multiple={true} id="fileUpload" />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5rem",
        }}
      >
        <button style={no}>취소</button>
        <button style={yes}>등록하기</button>
      </div>
    </div>
  );
}
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
);
const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

const SelectBox = styled.div`
  position: relative;
  width: 200px;
  padding: 8px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #49c181;
    font-size: 20px;
  }
`;
const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 18px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 145px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
`;

const no = {
  backgroundColor: "white",
  padding: "1rem 2rem 1rem 2rem",
  border: "1px solid #616161",
  borderRadius: "10px",
};

const yes = {
  backgroundColor: "#FF7171",
  padding: "1rem 2rem 1rem 2rem",
  border: "none",
  borderRadius: "10px",
  marginLeft: "3rem",
};

const select = {
  backgroundColor: "white",
  padding: "0.7rem 0.8rem 0.7rem 0.8rem",
  border: "1px solid #FF7171",
  borderRadius: "10px",
};
