// React
import React, { useEffect, useState } from "react";

// StyledCopmoent
import styled from "styled-components";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { delnumbercenter } from "../../pages/api/customercenter";
import { useRouter } from "next/router";
import { productDetail } from "../../pages/api/product";
export default function MyComplainItem({
  complain,
  idx,
  selected,
  setSelected,
}) {
  const router = useRouter();
  const productUid = complain.productsUid;
  const [product, setProduct] = useState({});

  const ansOpen = () => {
    setContentOpen(!contentOpen);
  };

  // 문의 내역 삭제하기
  const deletecomplain = async () => {
    const res = await delnumbercenter(complain.uid);
    alert("문의 내역이 삭제 되었습니다");
    router.reload();
  };

  // 상품 상세 정보 가져오기
  const products = async () => {
    const rres = await productDetail(productUid);
    setProduct(rres.data.products);
  };

  const [contentOpen, setContentOpen] = useState(false);

  useEffect(() => {
    if (complain.productsUid !== null) {
      products();
    }
  }, []);

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{ flex: "10" }}
          onClick={() => setContentOpen(!contentOpen)}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ComplainTitle>
              [{complain.customerCenterCategory}] {complain.title}
              <br></br>
              <br></br>
              <GraySpan>
                문의 일시: {complain.start_date.slice(0, 10)}{" "}
                {complain.start_date.slice(11, 16)}
              </GraySpan>
            </ComplainTitle>

            {selected === idx ? (
              <Relative>
                <Absolute>
                  <DeleteForeverIcon
                    style={{ fontSize: "xx-large", color: "red" }}
                    onClick={deletecomplain}
                  ></DeleteForeverIcon>
                </Absolute>
                {complain.customerCenterCategory === "교환_환불" ? (
                  <div>
                    <br></br>
                    <span style={{ fontWeight: "bold" }}>환불 진행 상품</span>

                    <ExchangeCont>
                      <div
                        style={{
                          flex: 2,
                          paddingBottom: "0.7rem",
                          paddingLeft: "0.7rem",
                        }}
                      >
                        <br></br>
                        <Img src={product.descriptionImg}></Img>
                      </div>
                      <div style={{ flex: 10 }}>
                        <ComplainContent>
                          <span>{product.name}</span>
                        </ComplainContent>
                      </div>
                    </ExchangeCont>
                  </div>
                ) : null}
                {complain.imgUrl !== null ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 2 }}>
                      <br></br>
                      <Img src={complain.imgUrl}></Img>
                    </div>
                    <div style={{ flex: 10 }}>
                      <ComplainContent>
                        <span>{complain.content}</span>
                      </ComplainContent>
                    </div>
                  </div>
                ) : (
                  <ComplainContent>
                    <span>{complain.content}</span>
                  </ComplainContent>
                )}

                <ContentDiv>
                  {complain.reply !== null ? (
                    <div style={{ padding: "2rem" }}>
                      <SubdirectoryArrowRightIcon
                        style={{ color: "#56a9f1" }}
                      ></SubdirectoryArrowRightIcon>
                      <span
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          color: "#56a9f1",
                        }}
                      >
                        AbuyZ
                      </span>
                      <br></br>
                      <div style={{ padding: "2rem" }}>
                        <span>{complain.reply}</span>
                        <br></br>
                        <br></br>
                        <GraySpan>
                          {complain.end_date.slice(0, 10)}{" "}
                          {complain.end_date.slice(11, 16)}
                        </GraySpan>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "2rem",
                      }}
                    >
                      <HourglassBottomIcon></HourglassBottomIcon>
                      <span>
                        현재 문의 내역을 처리중입니다. 곧 답변 드리겠습니다.
                      </span>
                    </div>
                  )}
                </ContentDiv>
              </Relative>
            ) : null}
          </div>
        </div>
        <div style={{ flex: "2" }}>
          {complain.reply !== null ? (
            <CompleteDiv onClick={ansOpen}>
              <p>답변 완료</p>
            </CompleteDiv>
          ) : (
            <InCompleteDiv>
              <p>처리 중</p>
            </InCompleteDiv>
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 4px solid;
  border-color: rgba(128, 128, 128, 0.17);
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Relative = styled.div`
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;
  top: 5%;
  right: 0%;
`;

const ExchangeCont = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid rgb(170, 170, 170, 0.5);
  border-radius: 5px;
  margin-top: 1rem;
`;
const CompleteDiv = styled.div`
  background-color: #56a9f1;
  color: white;
  width: 7rem;
  font-size: 1rem;
  border: none;
  height: 2rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 5rem;
  height: 7rem;
  object-fit: cover;
`;

const InCompleteDiv = styled.div`
  background-color: rgba(182, 193, 232, 0.55);
  color: #56a9f1;
  width: 7rem;
  font-size: 1rem;
  border: none;
  height: 2rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentDiv = styled.div`
  width: 100%;
  background-color: rgba(86, 169, 241, 0.07);
  margin-top: 1rem;
  border-radius: 5px;
`;

const ComplainContent = styled.div`
  width: 100%;
  margin-top: 1rem;
  border-radius: 5px;
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const ComplainTitle = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

const GraySpan = styled.span`
  color: #aaaaaa;
`;
