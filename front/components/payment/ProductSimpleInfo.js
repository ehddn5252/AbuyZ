import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";
export default function ProductSimpleInfo({ paymentList }) {
  console.log("결제리스트", paymentList);
  const [productList, setProductList] = useState(false);

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
          {paymentList.map((e, idx) => (
            <InfoDiv key={idx}>
              <ImgDiv>
                <Img src={e.productDto.repImg}></Img>
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
          <span style={{ fontWeight: "bold" }}>
            {/* {paymentList[0].productDto.name}{" "} */}
          </span>
          {/* <span> 외 {cartList.length}개의 상품을 주문했습니다.</span> */}
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
