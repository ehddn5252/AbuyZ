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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1" }}>
          <ProductImg
            src={product.product.inventoryDto.productDto.descriptionImg}
          />
        </div>
        <div style={{ flex: "7", marginLeft: "1rem" }}>
          <div>
            <br></br>
            <ProductName>
              {product.product.inventoryDto.productDto.name}
            </ProductName>
            <br></br>
            {product.product.inventoryDto.productOptions.length > 0 ? (
              <div>
                {product.product.inventoryDto.productOptions.map((e) => (
                  <div>
                    {Object.keys(e) == "x" ? (
                      <div>
                        <br></br>
                        <br></br>
                      </div>
                    ) : (
                      <span>{Object.keys(e)} :</span>
                    )}
                    {e[Object.keys(e)] == "x" ? null : (
                      <span> {e[Object.keys(e)]} </span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
            <span
              style={{
                fontSize: "0.8rem",
                color: "#aaaaaa",
                marginTop: "0.3rem",
              }}
            >
              주문 날짜:{" "}
              {product.product.inventoryDto.productDto.date.slice(0, 10)}
            </span>
            <br></br>
            {/* <ProductOptions>{product.product.inventoryDto.productOptionUidString}</ProductOptions> */}
          </div>
        </div>
        <div style={{ flex: "1" }}>
          <ReviewButton onClick={handleOpen}>리뷰 작성</ReviewButton>
        </div>

        {open && (
          <ReviewAddModel
            productName={product.product.inventoryDto.productDto.name}
            setOpen={setOpen}
            image={product.product.inventoryDto.productDto.descriptionImg}
            orderUid={product.product.orderUid}
            productUid={product.product.inventoryDto.productDto.uid}
            // productOptions={product.product.options}
          />
        )}
      </div>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  margin-right: 0.3rem;
  height: 100%;
  margin-top: 0.5rem;
`;

const ProductImg = styled.img`
  object-fit: cover;
  width: 7rem;
  height: 8rem;
  border: 1px solid black;
`;

const ProductName = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const ReviewButton = styled.button`
  margin-top: 3.5rem;
  background-color: rgb(86, 166, 241, 0.7);
  border: none;
  height: 1.8rem;
  width: 7rem;
  color: white;
  border-radius: 5px;
`;
