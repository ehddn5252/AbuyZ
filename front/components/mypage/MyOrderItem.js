// React
import React, { useEffect, useRef, useState } from "react";

// MUI
import Modal from "@mui/material/Modal";

// StyledComponents
import styled from "styled-components";

// 하위 컴포넌트
import ReviewAddModel from "./ReviewAddModel";

// api
import { eachGetOrderList } from "../../pages/api/order";

export default function MyOrderItem({ uid }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const modalRef = useRef(null);

  // 장바구니 내 모든 리스트
  const [orderBundleItem, setOrderBundleItem] = useState([]);

  const bundleitem = async () => {
    const rres = await eachGetOrderList(uid);
    console.log("갖고온고 보여줘", rres.data);
    setOrderBundleItem(rres.data);
  };

  useEffect(() => {
    bundleitem();
  }, []);
  return (
    <ItemContainer>
      {orderBundleItem.map((e) => (
        <Container>
          <div style={{ flex: "1" }}>
            <ProductImg src={e.inventoryDto.productDto.descriptionImg} />
          </div>
          <InfoContainer>
            <ProductIntro>{e.inventoryDto.productDto.name}</ProductIntro>
            <ProductIntro>{e.inventoryDto.productOptions.size}</ProductIntro>
            {/* <ProductoptionsInfo>{e.inventoryDto.productDto.options}</ProductoptionsInfo> */}
          </InfoContainer>
          <ButtonContainer>
            {/* {product.reviewCheck === true ? (
            <ReviewFinishButton>리뷰 작성 완료</ReviewFinishButton>
          ) : (
            <ReviewButton onClick={handleOpen}>리뷰 작성</ReviewButton>
          )} */}
            <CartButton>장바구니 담기</CartButton>
            <Modal
              ref={modalRef}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ReviewAddModel
                productName={e.inventoryDto.productDto.name}
                // productOptions={product.options}
                setOpen={setOpen}
              />
            </Modal>
          </ButtonContainer>
        </Container>
      ))}
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.3rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductImg = styled.img`
  width: 7rem;
  height: 8rem;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 7;
  margin-left: 2rem;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  flex: 1;
  margin-top: 1.5rem;
`;

const ProductoptionsInfo = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  padding-top: 1rem;
  color: black;
`;
const ProductIntro = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
  font-weight: bolder;
  padding-top: 1rem;
`;

const ReviewFinishButton = styled.button`
  background-color: #aaaaaa;
  color: white;
  width: 7rem;
  border: none;
  height: 2rem;
  border-radius: 5px;
`;

const ReviewButton = styled.button`
  background-color: #56a9f1;
  color: white;
  width: 7rem;
  border: none;
  height: 2rem;
  border-radius: 5px;
`;

const CartButton = styled.button`
  background-color: white;
  color: #56a9f1;
  width: 7rem;
  border: 1px solid #56a9f1;
  margin-top: 1rem;
  height: 2rem;
  border-radius: 5px;
`;
