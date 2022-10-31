// React
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
// StyledComponents
import styled from "styled-components";
import ReviewAddModel from "./ReviewAddModel";
export default function MyReviewItem(product) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ItemContainer>
      <span style={{ fontSize: "0.8rem", color: "#aaaaaa" }}>
        {product.product.dateOfPurchase}
      </span>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1" }}>
          <ProductImg src="/images/sandwich.png" />
        </div>
        <div style={{ flex: "7", marginLeft: "1rem" }}>
          <div style={{ paddingTop: "1.8rem" }}>
            <br></br>
            <ProductName>{product.product.productName}</ProductName>
            <br></br>
            <ProductOptions>{product.product.options}</ProductOptions>
          </div>
        </div>
        <div style={{ flex: "1" }}>
          <ReviewButton onClick={handleOpen}>리뷰 작성</ReviewButton>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ReviewAddModel
            productName={product.product.productName}
            productOptions={product.product.options}
          />
        </Modal>
      </div>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  margin-right: 0.3rem;
  height: 100%;
`;

const ProductImg = styled.img`
  object-fit: cover;
  width: 7rem;
  height: 8rem;
`;

const ProductName = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const ProductOptions = styled.span`
  font-size: 1.1rem;
`;

const ReviewButton = styled.button`
  margin-top: 3.5rem;
  background-color: #56a9f1;
  border: none;
  height: 1.8rem;
  width: 7rem;
  color: white;
  border-radius: 5px;
`;
