import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
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
    <Container ref={modalRef}>
      <div>
        <Close onClick={closeModal}>X</Close>
        <h1 style={{ marginLeft: "3rem" }}>주문상품 선택</h1>
        <hr></hr>
        <Caution>1주일 이내 주문 내역만 노출됩니다.</Caution>
        <br></br>
        <Date>
          {/* 7일전 ~ 오늘 날짜 */}
          2022.10.11 - 2022.10.18
        </Date>
        {/* for문으로 돌리기 */}
        <Card>
          <IconDiv>
            {selected === 0 ? (
              <div>
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
            ) : (
              <div>
                <FontAwesomeIcon icon={faCircle} />
              </div>
            )}
          </IconDiv>
          <div style={{ flex: 8 }}>
            <div
              style={{ ...cardStyle, ...(selected === 0 && cardSelect) }}
              onClick={() => setSelected(0)}
            >
              <RowDiv>
                <div style={{ flex: 1 }}>
                  <ImageStyle src={"/images/carrot.png"}></ImageStyle>
                </div>
                <div style={{ flex: 7 }}>
                  {/* 상품 이름 */}
                  <TextDiv>
                    <span>Only Price 1등급 당근 (300g * 2입)</span>
                    <br></br>
                    <br></br>
                    {/* 가격 | 수량 */}
                    <span>3500원 | 2개</span>
                  </TextDiv>
                  <br></br>
                </div>
              </RowDiv>
            </div>
          </div>
        </Card>

        <Card>
          <IconDiv>
            {selected === 1 ? (
              <div>
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
            ) : (
              <div>
                <FontAwesomeIcon icon={faCircle} />
              </div>
            )}
          </IconDiv>
          <div style={{ flex: 8 }}>
            <div
              style={{ ...cardStyle, ...(selected === 1 && cardSelect) }}
              onClick={() => setSelected(1)}
            >
              <RowDiv>
                <div style={{ flex: 1 }}>
                  <ImageStyle src={"/images/carrot.png"}></ImageStyle>
                </div>
                <div style={{ flex: 7 }}>
                  {/* 상품 이름 */}
                  <TextDiv>
                    <span>Only Price 1등급 당근 (300g * 2입)</span>
                    <br></br>
                    <br></br>
                    {/* 가격 | 수량 */}
                    <span>3500원 | 2개</span>
                  </TextDiv>
                  <br></br>
                </div>
              </RowDiv>
            </div>
          </div>
        </Card>

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
        <ButtonDiv>
          <Button>선택완료</Button>
        </ButtonDiv>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 30%;
  z-index: 999;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ff9494;
  border-radius: 8px;
`;

const Close = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Caution = styled.p`
  margin-left: 3rem;
  margin-top: 3rem;
`;

const Date = styled.p`
  margin-left: 3rem;
  margin-top: 1rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconDiv = styled.div`
  flex: 1;
  margin-top: 3rem;
  margin-left: 3rem;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const cardStyle = {
  width: "80%",
  height: "6rem",
  background: "white",
  margin: "1rem",
};

const cardSelect = {
  boxShadow: "2px 4px 30px 0px rgba(0, 0, 0, 0.75)",
};

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const Button = styled.button`
  background-color: white;
  padding: 0.7rem 0.8rem 0.7rem 0.8rem;
  border: 1px solid #ff7171;
  border-radius: 10px;
`;

const ImageStyle = styled.img`
  width: 6rem;
  height: 5rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;

const TextDiv = styled.div`
  margin-top: 0.8rem;
  margin-left: 0.4rem;
`;
