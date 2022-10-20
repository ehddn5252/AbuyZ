import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
export default function MyShippingSelectModal({ setModalOpen }) {
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
    <div style={{ position: "relative" }}>
      <Container ref={modalRef}>
        <div>
          <h1 style={{ marginLeft: "3rem" }}>내 쿠폰 선택</h1>
          <Close onClick={closeModal}>X</Close>
        </div>
        <hr></hr>
        <Caution>사용가능한 쿠폰을 선택해주세요.</Caution>
        <br></br>
        {/* for문으로 돌리기 */}
        <Card>
          <div
            style={{ ...cardStyle, ...(selected === 0 && cardSelect) }}
            onClick={() => setSelected(0)}
          >
            <Title>
              <span>11월 빼빼로 데이 행사 쿠폰</span>
            </Title>
            <Text>
              <ul>
                <li>중복 불가</li>
                <li>300원 할인</li>
              </ul>
            </Text>
          </div>
        </Card>

        <Card>
          <div
            style={{ ...cardStyle, ...(selected === 1 && cardSelect) }}
            onClick={() => setSelected(1)}
          >
            <Title>
              <span>10월 할로윈 데이 행사 쿠폰</span>
            </Title>
            <Text>
              <ul>
                <li>중복 불가</li>
                <li>1030원 할인</li>
              </ul>
            </Text>
          </div>
        </Card>

        <ButtonDiv>
          <Button onClick={closeModal}>선택완료</Button>
        </ButtonDiv>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 50%;
  z-index: 999;
  position: absolute;
  bottom: -100%;
  left: 50%;
  transform: translate(-50%, 50%);
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

const Card = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  font-weight: bold;
`;

const Text = styled.div`
  font-size: 1rem;
`;

const cardStyle = {
  width: "80%",
  height: "6rem",
  background: "white",
  margin: "1rem",
  marginLeft: "3rem",
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
