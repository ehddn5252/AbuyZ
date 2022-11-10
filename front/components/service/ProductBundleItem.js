import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { eachGetOrderList } from "../../pages/api/order";

export default function ProductBundleItem({ uid }) {
  const [orderBundleItem, setOrderBundleItem] = useState([]);
  const bundleitem = async () => {
    const rres = await eachGetOrderList(uid);
    console.log(rres.data);
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
            {e.inventoryDto.productOptions.length > 0 ? (
              <div>
                {e.inventoryDto.productOptions.map((e) => (
                  <div>
                    {Object.keys(e) == "x" ? null : (
                      <span>[{Object.keys(e)} :</span>
                    )}
                    {e[Object.keys(e)] == "x" ? null : (
                      <span> {e[Object.keys(e)]}]</span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
            {/* <ProductIntro>{e.inventoryDto.productOptions.size}</ProductIntro> */}
            {/* <ProductoptionsInfo>{e.inventoryDto.productDto.options}</ProductoptionsInfo> */}
          </InfoContainer>
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
