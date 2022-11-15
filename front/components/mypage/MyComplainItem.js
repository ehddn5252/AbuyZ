// React
import React, { useState } from "react";

// StyledCopmoent
import styled from "styled-components";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { delnumbercenter } from "../../pages/api/customercenter";
import { useRouter } from "next/router";
export default function MyComplainItem({
  complain,
  idx,
  selected,
  setSelected,
}) {
  const router = useRouter();
  const ansOpen = () => {
    setContentOpen(!contentOpen);
  };

  const deletecomplain = async () => {
    const res = await delnumbercenter(complain.uid);
    alert("문의 내역이 삭제 되었습니다");
    router.reload();
  };

  const [contentOpen, setContentOpen] = useState(false);

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
              <span style={{ color: "#aaaaaa" }}>
                문의 일시: {complain.start_date.slice(0, 10)}{" "}
                {complain.start_date.slice(11, 16)}
              </span>
            </ComplainTitle>

            {selected === idx ? (
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: "5%", right: "5%" }}>
                  <DeleteForeverIcon
                    style={{ fontSize: "xx-large", color: "red" }}
                    onClick={deletecomplain}
                  ></DeleteForeverIcon>
                </div>
                {complain.customerCenterCategory === "교환_환불" ? (
                  <span>상품이 놓일 자리</span>
                ) : null}
                {complain.imgUrl !== null ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 2 }}>
                      <br></br>
                      <img
                        src={complain.imgUrl}
                        style={{
                          width: "5rem",
                          height: "7rem",
                          objectFit: "cover",
                        }}
                      ></img>
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
                        <span style={{ color: "#aaaaaa" }}>
                          {complain.end_date.slice(0, 10)}{" "}
                          {complain.end_date.slice(11, 16)}
                        </span>
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
              </div>
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

      {/* {answerOpen ? (
        <ContentDiv>
          <div style={{ padding: "2rem" }}>
            <span>{complain.reply}</span>
          </div>
        </ContentDiv>
      ) : null} */}
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 1px solid;
  border-color: rgba(128, 128, 128, 0.17);
  padding-top: 1rem;
  padding-bottom: 1rem;
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
