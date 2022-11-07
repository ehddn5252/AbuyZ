import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
export default function MyCouponSelectModal({
  setModalOpen,
  setCouponDiscount,
  categoryList,
}) {
  const closeModal = () => {
    setModalOpen(false);
    setCouponDiscount(CouponList[selected].discountprice);
    CouponList[selected].isused = true;
    console.log(CouponList);
  };
  const [selected, setSelected] = useState(0);

  const modalRef = useRef(null);

  const CouponList = [
    {
      id: 0,
      couponname: "abuyz 처음 구매 고객 3000원 쿠폰",
      discountprice: "3000",
      category: "의류",
      startdate: "2022.10.28",
      finishdate: "2022.10.31",
      isused: false,
    },
    {
      id: 1,
      couponname: "abuyz 가구 첫 입점 축하 쿠폰",
      discountprice: "5000",
      category: "가구",
      info: "중복 사용 불가",
      startdate: "2022.10.28",
      finishdate: "2022.10.31",
      isused: false,
    },
  ];
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
        <CloseIconDiv>
          <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
        </CloseIconDiv>
        <h1>쿠폰 선택</h1>
        <br></br>
        {CouponList.map((e) =>
          categoryList.includes(e.category) && e.isused == false ? (
            <Card
              key={e.id}
              style={{
                ...cardStyle,
                display: "flex",
                flexDirection: "row",
                height: "100%",
              }}
              onClick={() => setSelected(e.id)}
            >
              <div
                style={{ flex: 2, display: "flex", justifyContent: "center" }}
              >
                <IconDiv>
                  {selected === e.id ? (
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
                <TextDiv>
                  <div>
                    <span style={{ fontWeight: "bold" }}>{e.couponname}</span>
                  </div>
                  <br></br>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    {e.discountprice}원
                  </span>
                  <span> 할인</span>
                  <br></br>
                  <span style={{ fontSize: "0.9rem", color: "#aaaaaa" }}>
                    {e.category} 카테고리 구매 시 사용 가능
                  </span>
                  <br></br>
                  <span style={{ fontSize: "0.9rem", color: "pink" }}>
                    {e.startdate} ~ {e.finishdate}
                  </span>
                </TextDiv>
                <br></br>
              </div>
            </Card>
          ) : null
        )}

        <ButtonDiv>
          <Button onClick={closeModal}>선택완료</Button>
        </ButtonDiv>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(40%, -90%);
  width: 30rem;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
  border-radius: 5px;
  border-color: #56a9f1;
  padding: 2rem;
  z-index: 999;
`;

const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
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
`;

const TextDiv = styled.div`
  margin-top: 0.8rem;
  margin-left: 0.4rem;
`;

const IconDiv = styled.div`
  flex: 1;
  margin-top: 3rem;
`;
