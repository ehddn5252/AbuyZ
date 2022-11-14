// react
import React, { useState, useEffect, useRef } from "react";

// styled
import styled from "styled-components";

// mui
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";

// api
import { cateCoupon } from "../../pages/api/coupon";

export default function MyCouponSelectModal({
  setModalOpen,
  setCouponDiscount,
  uniqueCate,
}) {
  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  const closeCheckModal = () => {
    setModalOpen(false);
    setCouponDiscount(couponList[selected].discount_price);
  };

  // 쿠폰 선택됐는지 확인
  const [selected, setSelected] = useState(-1);

  // 모달 참조
  const modalRef = useRef(null);

  // 쿠폰 리스트 만들기
  const [couponList, setCouponList] = useState([]);
  const ccoupon = async () => {
    let couponlist = [];
    for (var i = 0; i < uniqueCate.length; i++) {
      const res = await cateCoupon(uniqueCate[i]);
      for (var j = 0; j < res.data.result.length; j++) {
        couponlist.push(res.data.result[j]);
      }
    }
    setCouponList(couponlist);
  };
  const nocoupon = () => {
    setCouponDiscount(0);
    setModalOpen(false);
  };
  useEffect(() => {
    ccoupon();
    // 이벤트 핸들러 함수
    const handler = () => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [uniqueCate]);

  return (
    <div style={{ position: "relative" }}>
      <Container ref={modalRef}>
        <CloseIconDiv>
          <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
        </CloseIconDiv>
        <h1>쿠폰 선택</h1>
        <br></br>
        {couponList.length > 0 ? (
          <div>
            {couponList.map((e, idx) => (
              <div>
                <CardStyle key={idx} onClick={() => setSelected(idx)}>
                  <div
                    style={{
                      flex: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
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
                    <TextDiv>
                      <div>
                        <span style={{ fontWeight: "bold" }}>{e.name}</span>
                      </div>
                      <br></br>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.5rem",
                        }}
                      >
                        {e.discount_price}원
                      </span>
                      <span> 할인</span>
                      <br></br>
                      <span style={{ fontSize: "0.9rem", color: "#aaaaaa" }}>
                        {e.available_categories_name} 카테고리 구매 시 사용 가능
                      </span>
                      <br></br>
                      <span style={{ fontSize: "0.9rem", color: "pink" }}>
                        {e.start_date.slice(0, 10)} ~ {e.end_date.slice(0, 10)}
                      </span>
                    </TextDiv>
                    <br></br>
                  </div>
                </CardStyle>
              </div>
            ))}
            <ButtonDiv>
              <NoButton onClick={nocoupon}>쿠폰 사용 안함</NoButton>
              <Button onClick={closeCheckModal}>선택완료</Button>
            </ButtonDiv>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span>😢 사용가능한 쿠폰이 없습니다. 😢</span>
          </div>
        )}
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

const CardStyle = styled.div`
  width: 100%;
  height: 6rem;
  background: white;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const Button = styled.button`
  background-color: #56a9f1;
  color: white;
  border: none;
  border-radius: 5px;
  height: 3rem;
  width: 9rem;
  font-size: 1.2rem;
`;

const NoButton = styled.button`
  background-color: white;
  color: white;
  border: 1px solid #56a9f1;
  border-radius: 5px;
  height: 3rem;
  width: 9rem;
  font-size: 1.2rem;
  color: #56a9f1;
`;

const TextDiv = styled.div`
  margin-top: 0.8rem;
  margin-left: 0.4rem;
`;

const IconDiv = styled.div`
  flex: 1;
  margin-top: 3rem;
`;
