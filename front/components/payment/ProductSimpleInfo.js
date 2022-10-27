import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";
export default function ProductSimpleInfo() {
  const [productList, setProductList] = useState(false);
  const cartList = [
    {
      id: 0,
      name: "싱싱한 햇살 당근",
      options: "당근당근",
      count: 3,
      price: 15000,
      img: "/images/carrot.png",
      discount: 30,
    },
    {
      id: 1,
      name: "싱싱한 뭐시기",
      options: "샌드위치샌드위치",
      count: 7,
      price: 2000,
      img: "/images/sandwich.png",
      discount: 10,
    },
  ];
  return (
    <div>
      <ProductShow onClick={() => setProductList(!productList)}>
        <div>
          <SubTitle>주문 상품</SubTitle>
        </div>
        <div>
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        </div>
      </ProductShow>
      <hr></hr>
      {productList ? (
        <div>
          {cartList.map((e) => (
            <InfoDiv key={e.id}>
              <ImgDiv>
                <Img src={e.img}></Img>
              </ImgDiv>
              <TextDiv>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <NameOption>
                    <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      {e.name}
                    </span>
                    <br></br>
                    <span>[{e.options}]</span>
                  </NameOption>
                  <Count>
                    <span>{e.count}개</span>
                  </Count>
                  <PriceDiv>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#aaaaaa",
                      }}
                    >
                      {e.price}원
                    </span>
                    <br></br>
                    <span style={{ fontWeight: "bold", fontSize: "1.1REM" }}>
                      {(e.price * (100 - e.discount)) / 100}원
                    </span>
                  </PriceDiv>
                </div>
              </TextDiv>
            </InfoDiv>
          ))}
        </div>
      ) : (
        <div
          style={{ padding: "3rem", display: "flex", justifyContent: "center" }}
        >
          <span style={{ fontWeight: "bold" }}>{cartList[0].name} </span>
          <span> 외 {cartList.length}개의 상품을 주문했습니다.</span>
        </div>
      )}
      {/* for문 돌려서 */}
    </div>
  );
}

const ProductShow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SubTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;

const InfoDiv = styled.div`
  display: flex;
`;

const Img = styled.img`
  height: 6rem;
  width: 4rem;
  object-fit: cover;
`;

const ImgDiv = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const TextDiv = styled.div`
  flex: 9;
`;

const NameOption = styled.div`
  flex: 7;
  margin-top: 1.5rem;
`;

const Count = styled.div`
  flex: 3;
  margin-top: 2rem;
`;

const PriceDiv = styled.div`
  flex: 2;
  margin-top: 1.5rem;
`;
