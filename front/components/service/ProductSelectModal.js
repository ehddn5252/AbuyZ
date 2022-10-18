import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
export default function ProductSelectModal({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  const [selected, setSelected] = useState(0);

  const modalRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
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
    <div ref={modalRef} style={container}>
      <div>
        <button style={close} onClick={closeModal}>
          X
        </button>
        <h1 style={{ marginLeft: "3rem" }}>주문상품 선택</h1>
        <hr></hr>
        <p style={{ marginLeft: "3rem", marginTop: "3rem" }}>
          1주일 이내 주문 내역만 노출됩니다.
        </p>
        <br></br>
        <p style={{ marginLeft: "3rem", marginTop: "1rem" }}>
          {/* 7일전 ~ 오늘 날짜 */}
          2022.10.11 - 2022.10.18
        </p>
        {/* for문으로 돌리기 */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1, marginTop: "3rem", marginLeft: "3rem" }}>
            {selected === 0 ? (
              <div>
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
            ) : (
              <div>
                <FontAwesomeIcon icon={faCircle} />
              </div>
            )}
          </div>
          <div style={{ flex: 8 }}>
            <div
              style={{ ...cardStyle, ...(selected === 0 && cardSelect) }}
              onClick={() => setSelected(0)}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1 }}>
                  <img
                    src={"/images/carrot.png"}
                    style={{
                      width: "6rem",
                      height: "5rem",
                      marginTop: "0.5rem",
                      marginLeft: "0.5rem",
                    }}
                  ></img>
                </div>
                <div style={{ flex: 7 }}>
                  {/* 상품 이름 */}
                  <div style={{ marginTop: "0.8rem", marginLeft: "0.4rem" }}>
                    <span>Only Price 1등급 당근 (300g * 2입)</span>
                    <br></br>
                    <br></br>
                    {/* 가격 | 수량 */}
                    <span>3500원 | 2개</span>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1, marginTop: "3rem", marginLeft: "3rem" }}>
            {selected === 1 ? (
              <div>
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
            ) : (
              <div>
                <FontAwesomeIcon icon={faCircle} />
              </div>
            )}
          </div>
          <div style={{ flex: 8 }}>
            <div
              style={{ ...cardStyle, ...(selected === 1 && cardSelect) }}
              onClick={() => setSelected(1)}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1 }}>
                  <img
                    src={"/images/carrot.png"}
                    style={{
                      width: "6rem",
                      height: "5rem",
                      marginTop: "0.5rem",
                      marginLeft: "0.5rem",
                    }}
                  ></img>
                </div>
                <div style={{ flex: 7 }}>
                  {/* 상품 이름 */}
                  <div style={{ marginTop: "0.8rem", marginLeft: "0.4rem" }}>
                    <span>Only Price 1등급 당근 (300g * 2입)</span>
                    <br></br>
                    <br></br>
                    {/* 가격 | 수량 */}
                    <span>3500원 | 2개</span>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div
            style={{ ...cardStyle, ...(selected === 1 && cardSelect) }}
            onClick={() => setSelected(1)}
          >
            {selected === 1 && (
              <div className="select">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
            )}
            <span>우유</span>
          </div> */}
        {/* <div
            style={{ ...cardStyle, ...(selected === 2 && cardSelect) }}
            onClick={() => setSelected(2)}
          >
            {selected === 2 && (
              <div className="select">
                <div className="select">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
              </div>
            )}
            <span>베이글</span>
          </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "1rem",
          }}
        >
          <button style={button}>선택완료</button>
        </div>
      </div>
    </div>
  );
}

const container = {
  width: "30%",
  zIndex: "999",
  position: "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "white",
  border: "1px solid #FF9494",
  borderRadius: "8px",
};

const close = {
  position: "absolute",
  right: "10px",
  top: "10px",
};

const cardStyle = {
  width: "80%",
  height: "6rem",
  background: "white",
  margin: "1rem",
};
const cardSelect = {
  boxShadow: "2px 4px 30px 0px rgba(0, 0, 0, 0.75)",
};

const button = {
  backgroundColor: "white",
  padding: "0.7rem 0.8rem 0.7rem 0.8rem",
  border: "1px solid #FF7171",
  borderRadius: "10px",
};
