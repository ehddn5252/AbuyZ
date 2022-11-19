import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
export default function DeliveryListModal({
  settAddressModalOpen,
  setPostcode,
  setAddress,
  setDetailAddress,
  setName,
  setPhone,
  addressList,
}) {
  const closeModal = () => {
    settAddressModalOpen(false);
  };
  const [selected, setSelected] = useState(0);

  const modalRef = useRef(null);

  const selectfunction = () => {
    setPostcode(addressList[selected].postalCode);
    setAddress(addressList[selected].address);
    setDetailAddress(addressList[selected].detailAddress);
    setName(addressList[selected].recipient);
    setPhone(addressList[selected].contact);
    settAddressModalOpen(false);
  };

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        settAddressModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });
  return (
    <DeliveryListModalContainer ref={modalRef}>
      <CloseIconDiv>
        <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
      </CloseIconDiv>
      <h1>배송지 선택</h1>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          padding: "1rem",
        }}
      >
        <div style={{ flex: 2, display: "flex", justifyContent: "start" }}>
          <span>선택</span>
        </div>
        <div style={{ flex: 10, display: "flex", justifyContent: "center" }}>
          <span>배송정보</span>
        </div>
      </div>
      {/* for문으로 돌리기 */}
      {addressList.map((e, idx) => (
        <Card
          key={idx}
          style={{ ...cardStyle, display: "flex", flexDirection: "row" }}
          onClick={() => setSelected(idx)}
        >
          <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
            <IconDiv>
              {selected === idx ? (
                <ExpandCircleDownOutlinedIcon
                  sx={{ color: "#56a9f1" }}
                ></ExpandCircleDownOutlinedIcon>
              ) : (
                <div>
                  <CircleOutlinedIcon
                    sx={{ color: "rgb(128, 128, 128, 0.7)" }}
                  ></CircleOutlinedIcon>
                </div>
              )}
            </IconDiv>
          </div>
          <div style={{ flex: 10 }}>
            <div>
              <TextDiv>
                <span>[{e.postalCode}]</span>
                <br></br>
                <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {e.address} {e.detailAddress}
                </span>
                <br></br>
                <span style={{ fontSize: "0.9rem", color: "#aaaaaa" }}>
                  {e.recipient} | {e.contact}
                </span>
              </TextDiv>
              <br></br>
            </div>
          </div>
        </Card>
      ))}

      <ButtonDiv>
        <Button onClick={selectfunction}>선택완료</Button>
      </ButtonDiv>
    </DeliveryListModalContainer>
  );
}

const TextDiv = styled.div`
  margin-top: 0.8rem;
  margin-left: 0.4rem;
`;

const DeliveryListModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 30rem;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
  border-radius: 5px;
  border-color: #56a9f1;
  padding: 2rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
`;

const cardStyle = {
  width: "100%",
  height: "6rem",
  background: "white",
  margin: "1rem",
};

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const Button = styled.button`
  background-color: #56a9f1;
  color: white;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 7rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const IconDiv = styled.div`
  flex: 1;
  margin-top: 3rem;
`;
