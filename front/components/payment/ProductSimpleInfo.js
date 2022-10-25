import React from "react";
import styled from "styled-components";
export default function ProductSimpleInfo() {
  return (
    <div>
      <h1>상품정보</h1>
      <hr></hr>
      {/* for문 돌려서 */}
      <InfoDiv>
        <ImgDiv>
          <img
            src={"/images/carrot.png"}
            style={{ height: 150, width: 150 }}
          ></img>
        </ImgDiv>
        <TextDiv>
          <h1>싱싱한 햇살 당근</h1>
          <div style={{ display: "flex" }}>
            <CountDiv>
              {/* 옵션 /로 끊어서 가져오기 */}
              <span>옵션: 300g / 2입</span>
              <br></br>
              <br></br>
              {/* 수량 가져오기 */}
              <span>수량: 2개</span>
            </CountDiv>
            <PriceDiv>
              {/* 총 가격 가져오기 */}
              <PriceP>900원</PriceP>
            </PriceDiv>
          </div>
        </TextDiv>
      </InfoDiv>
    </div>
  );
}

const InfoDiv = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const ImgDiv = styled.div`
  flex: 2;
  margin-left: 1rem;
`;

const TextDiv = styled.div`
  flex: 9;
`;

const CountDiv = styled.div`
  flex: 7;
`;

const PriceDiv = styled.div`
  flex: 2;
`;

const PriceP = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;
