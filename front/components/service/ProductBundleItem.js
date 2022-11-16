import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { eachGetOrderList } from "../../pages/api/order";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";

export default function ProductBundleItem({
  orderuidList,
  productList,
  setProductList,
  setIdxSelected,
  idxSelected,
}) {
  const bundleitem = async () => {
    let productlist = [];

    for (var j = 0; j < orderuidList.length; j++) {
      const res = await eachGetOrderList(orderuidList[j]);
      for (var k = 0; k < res.data.length; k++) {
        productlist.push(res.data[k]);
      }
    }
    productlist.sort((a, b) => b.orderUid - a.orderUid);
    setProductList(productlist);
  };
  useEffect(() => {
    bundleitem();
  }, [orderuidList]);

  return (
    <ItemContainer>
      {productList ? (
        <div>
          {productList.map((e, idx) => (
            <Container key={idx} onClick={() => setIdxSelected(idx)}>
              <IconDiv>
                {idxSelected === idx ? (
                  <ExpandCircleDownOutlinedIcon
                    sx={{ color: "#56a9f1", fontSize: "medium" }}
                  ></ExpandCircleDownOutlinedIcon>
                ) : (
                  <div>
                    <CircleOutlinedIcon
                      sx={{
                        color: "rgb(128, 128, 128, 0.7)",
                        fontSize: "medium",
                      }}
                    ></CircleOutlinedIcon>
                  </div>
                )}
              </IconDiv>

              <div style={{ flex: "1", marginTop: "0.5rem" }}>
                <ProductImg src={e.inventoryDto.productDto.descriptionImg} />
              </div>

              {Object.keys(e.inventoryDto.productOptions[0])[0] !== "x" ? (
                <InfoContainer>
                  <DateSpan>
                    {e.inventoryDto.productDto.date.slice(0, 10)}
                  </DateSpan>
                  <ProductIntro>{e.inventoryDto.productDto.name}</ProductIntro>
                  {e.inventoryDto.productOptions.map((e, idx) => (
                    <div key={idx}>
                      {Object.keys(e) == "x" ? null : (
                        <span>{Object.keys(e)} :</span>
                      )}
                      {e[Object.keys(e)] == "x" ? null : (
                        <span> {e[Object.keys(e)]}</span>
                      )}
                    </div>
                  ))}
                </InfoContainer>
              ) : (
                <InfoNoOptionContainer>
                  <DateSpan>
                    {e.inventoryDto.productDto.date.slice(0, 10)}
                  </DateSpan>
                  <ProductIntro>{e.inventoryDto.productDto.name}</ProductIntro>
                </InfoNoOptionContainer>
              )}
              <div style={{ flex: 3, marginTop: "2rem" }}>
                <span style={{ color: "#aaaaaa" }}>
                  {e.count}개 | {e.price.toLocaleString("ko-KR")}원
                </span>
              </div>
            </Container>
          ))}
        </div>
      ) : null}
    </ItemContainer>
  );
}

const IconDiv = styled.div`
  flex: 1;
  margin-top: 1.9rem;
  margin-left: 1rem;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.3rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
`;

const ProductImg = styled.img`
  width: 4rem;
  height: 5rem;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 5;
  margin-left: 2rem;
`;

const InfoNoOptionContainer = styled.div`
  flex: 5;
  margin-left: 2rem;
  margin-top: 0.8rem;
`;
const ProductIntro = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
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

const DateSpan = styled.span`
  color: #aaaaaa;
  font-size: 0.7rem;
`;
