// React
import React, { useState } from "react";

// MUI
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Modal from "@mui/material/Modal";
// StyledComponents
import styled from "styled-components";

// 하위 컴포넌트
import ReviewAddModel from "./ReviewAddModel";

export default function MyOrderItem({ product }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ItemContainer>
      <ProductImg src="/images/carrot.png" />

      <DateDiv>
        <p>{product.dateOfPurchase}</p>
      </DateDiv>

      <ProductIntro>{product.productName}</ProductIntro>
      <ProductIntro>{product.price}</ProductIntro>
      <WriteIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ReviewAddModel row={product} />
      </Modal>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 18rem;
  height: 18rem;
  object-fit: cover;
  border-radius: 2rem;
`;

const DateDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;
const ProductIntro = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  font-weight: bolder;
  padding-top: 1rem;
`;

const WriteIcon = styled(RateReviewOutlinedIcon)`
  position: relative;
  top: -42%;
  left: -36%;
  font-size: 3rem;
  color: red;
`;
