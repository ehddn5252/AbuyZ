import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";
export default function ProductSimpleInfo({ paymentList }) {
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
                      {e.productDto.name}
                    </span>
                    <br></br>
                    <div>
                      {e.inventoryDto.productOptions.map((o) => (
                        <div>
                          {Object.keys(o) == "x" ? null : (
                            <span style={{ color: "#aaaaaa" }}>
                              [{Object.keys(o)} :
                            </span>
                          )}
                          {o[Object.keys(o)] == "x" ? null : (
                            <span style={{ color: "#aaaaaa" }}>
                              {o[Object.keys(o)]}]
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </NameOption>
                  <Count>
                    <span>{e.productCount}개</span>
                  </Count>
                  <PriceDiv>
                    {e.productDto.discountRate > 0 ? (
                      <div>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#aaaaaa",
                          }}
                        >
                          {e.productDto.price.toLocaleString("ko-KR")}원
                        </span>
                        <br></br>
                        <PriceSpan>
                          {(
                            (e.productDto.price *
                              (100 - e.productDto.discountRate)) /
                            100
                          ).toLocaleString("ko-KR")}
                          원
                        </PriceSpan>
                      </div>
                    ) : (
                      <div style={{ marginTop: "0.6rem" }}>
                        <PriceSpan>
                          {e.productDto.price.toLocaleString("ko-KR")}원
                        </PriceSpan>
                      </div>
                    )}
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
          {paymentList.length > 0 ? (
            <div>
              {paymentList[0].productDto.name.length > 20 ? (
                <span style={{ fontWeight: "bold" }}>
                  {paymentList[0].productDto.name.slice(0, 20)} ...
                </span>
              ) : (
                <span style={{ fontWeight: "bold" }}>
                  {paymentList[0].productDto.name}
                </span>
              )}

              {paymentList.length === 1 ? (
                <span> 상품을 주문했습니다.</span>
              ) : (
                <span>
                  외 {paymentList.length - 1}개의 상품을 주문했습니다.
                </span>
              )}
            </div>
          ) : null}
        </div>
      )}
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
  margin-left: 0.3rem;
`;

const Count = styled.div`
  flex: 3;
  margin-top: 2rem;
  text-align: center;
`;

const PriceDiv = styled.div`
  flex: 2;
  margin-top: 1.5rem;
`;

const PriceSpan = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;
