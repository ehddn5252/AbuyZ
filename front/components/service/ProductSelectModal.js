import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { getOrderList, weekorder } from "../../pages/api/order";
import ProductBundleItem from "./ProductBundleItem";
export default function ProductSelectModal({
  setOrderUid,
  setIdxSelected,
  setModalOpen,
  setDate,
  setImg,
  setName,
  setOptions,
  setPrice,
  setCount,
  idxSelected,
}) {
  const closeModal = () => {
    setModalOpen(false);
  };
  const modalRef = useRef(null);
  const [productList, setProductList] = useState([]);

  const [orderuidList, setOrderUidList] = useState([]);
  const weekOrder = async () => {
    const res = await weekorder();
    let orderuid = [];
    for (var i = 0; i < res.data.length; i++) {
      orderuid.push(res.data[i].uid);
    }
    setOrderUidList(orderuid);
  };

  useEffect(() => {
    weekOrder();
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
  }, []);

  const selectfunction = () => {
    setDate(productList[idxSelected].inventoryDto.productDto.date);
    setImg(productList[idxSelected].inventoryDto.productDto.descriptionImg);
    setName(productList[idxSelected].inventoryDto.productDto.name);
    // setOptions(productList[idxSelected].inventoryDto.productOptions);
    setPrice(productList[idxSelected].price);
    setCount(productList[idxSelected].count);
    setOrderUid(productList[idxSelected].orderUid);
    setModalOpen(false);
  };
  return (
    <Container ref={modalRef}>
      <CloseIconDiv>
        <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
      </CloseIconDiv>
      <div>
        <h1 style={{ marginLeft: "3rem" }}>주문상품 선택</h1>
        <hr></hr>
        <Caution>1주일 이내 주문 내역만 노출됩니다.</Caution>
        <Date>
          {/* 7일전 ~ 오늘 날짜 */}
          2022.10.11 - 2022.10.18
        </Date>
        <ProductBundleItem
          orderuidList={orderuidList}
          productList={productList}
          setProductList={setProductList}
          setIdxSelected={setIdxSelected}
          idxSelected={idxSelected}
        ></ProductBundleItem>

        <ButtonDiv>
          <Button onClick={selectfunction}>선택완료</Button>
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
  border: 1px solid #56a9f1;
  border-radius: 8px;
  min-height: 50vh;
`;
const Caution = styled.p`
  margin-left: 3rem;
  margin-top: 1rem;
`;

const Date = styled.p`
  margin-left: 3rem;
  color: rgb(128, 128, 128, 0.8);
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconDiv = styled.div`
  flex: 1;
  margin-top: 3rem;
  margin-left: 1rem;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const cardStyle = {
  width: "90%",
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

const ImageStyle = styled.img`
  width: 4em;
  height: 6rem;
  margin-top: 0.5rem;
  object-fit: cover;
  margin-left: 0.5rem;
`;

const TextDiv = styled.div`
  margin-top: 0.8rem;
  margin-left: 0.4rem;
`;

const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem;
`;
