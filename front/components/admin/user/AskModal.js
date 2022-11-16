import React, { useState, useEffect } from "react";
import styled from "styled-components";

// MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Unstable_Grid2";

// api
import { detailCustomerCenter } from "../../../pages/api/admin";
import { writeInquiryReply } from "../../../pages/api/admin";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AskModal({ row }) {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 문의 상세 정보
  const [askInfo, setAskInfo] = useState([]);

  // 리뷰 데이터 불러오기 감지
  const [upload, setUpload] = useState(0);

  // 답변 내용
  const [answerContent, setAnswerContent] = useState("");

  // 리뷰 데이터 불러오기
  const getDetail = async () => {
    const data = await detailCustomerCenter(row.uid);
    setAskInfo(data.data);
  };

  // 리뷰 답변 작성
  const handleAnswer = () => {
    const answer = {
      uid: row.uid,
      content: answerContent,
    };
    writeInquiryReply(answer);
    alert("답변이 등록되었습니다.");
    location.reload();
  };

  useEffect(() => {
    getDetail();
  }, [upload]);

  return (
    <div>
      {row.status === "답변_미완료" ? (
        <SolvedButton
          onClick={() => {
            handleOpen(), setUpload(upload + 1);
          }}
          style={{ backgroundColor: "#7A7A7A" }}
        >
          미완료
        </SolvedButton>
      ) : (
        <SolvedButton
          onClick={() => {
            handleOpen(), setUpload(upload + 1);
          }}
          style={{ backgroundColor: "#57A9FB" }}
        >
          완료
        </SolvedButton>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid2
            container
            spacing={2}
            sx={{ padding: "0", margin: "0", background: "#fff" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  paddingLeft: "2rem",
                  margin: "0",
                  paddingTop: "2rem",
                  paddingBottom: "1rem",
                }}
              >
                상세 문의
              </h2>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  cursor: "pointer",
                  marginRight: "2rem",
                  marginTop: "2rem",
                }}
              />
            </div>
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            >
              <hr style={{ background: "#000", margin: "0", padding: "0" }} />
            </Grid2>
            <Grid2
              xs={4}
              sx={{
                marginTop: "1rem",
              }}
            >
              {askInfo.imgUrl ? (
                <img
                  src={askInfo.imgUrl}
                  alt={"문의 관련 이미지입니다."}
                  style={{ width: "18rem", height: "17rem" }}
                />
              ) : (
                <img
                  src="/images/ABUYZ_LOGO.png"
                  alt={"이미지를 준비중입니다."}
                  style={{ width: "18rem", height: "17rem" }}
                />
              )}
            </Grid2>
            <Grid2
              xs={7}
              sx={{
                marginLeft: "3rem",
                marginTop: "1rem",
              }}
            >
              <TableContainer>
                <tbody>
                  {askInfo ? (
                    <TableRow>
                      <Td style={{ background: "#E4E4E4" }}>사유</Td>
                      <Td>{askInfo.customerCenterCategory}</Td>
                    </TableRow>
                  ) : null}
                </tbody>
                <tbody>
                  {askInfo ? (
                    <TableRow>
                      <Td style={{ background: "#E4E4E4" }}>문의 일시</Td>
                      <Td>
                        {askInfo.start_date
                          ? askInfo.start_date.slice(0, 10)
                          : 0}
                      </Td>
                    </TableRow>
                  ) : null}
                </tbody>
                <tbody>
                  {askInfo ? (
                    <TableRow>
                      <Td style={{ background: "#E4E4E4" }}>작성자</Td>
                      <Td>{askInfo.userName}</Td>
                    </TableRow>
                  ) : null}
                </tbody>
                <tbody>
                  {askInfo ? (
                    <TableRow>
                      <Td style={{ background: "#E4E4E4" }}>문의명</Td>
                      <Td>{askInfo.title}</Td>
                    </TableRow>
                  ) : null}
                </tbody>
                <tbody>
                  {askInfo ? (
                    <TableRow>
                      <Td style={{ background: "#E4E4E4" }}>문의내용</Td>
                      <Td>{askInfo.content}</Td>
                    </TableRow>
                  ) : null}
                </tbody>
              </TableContainer>
            </Grid2>
          </Grid2>
          <Grid2
            xs={12}
            sx={{
              margin: "0",
              padding: "0",
              width: "100%",
              display: "flex",
              marginTop: "1rem",
            }}
          >
            <TitleP>답변</TitleP>
            <AnswerDiv onChange={(e) => setAnswerContent(e.target.value)} />
          </Grid2>

          <Grid2
            xs={12}
            sx={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <RefusalButton onClick={handleClose}>취소</RefusalButton>
            <AcceptButton
              onClick={() => {
                handleAnswer();
              }}
            >
              답변 등록
            </AcceptButton>
          </Grid2>
        </Box>
      </Modal>
    </div>
  );
}

const TitleP = styled.p`
  margin: 0;
  margin-left: 1rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  font-weight: 800;
`;

const AnswerDiv = styled.textarea`
  width: 90%;
  height: 10rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 0.3rem;
`;

const AcceptButton = styled.button`
  width: 8rem;
  padding: 0.5rem;
  background-color: #1a6dff;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  border: none;
  margin-left: 2rem;
  margin-bottom: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const RefusalButton = styled.button`
  width: 8rem;
  padding: 0.5rem;
  background-color: #fb5757;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  border: none;
  margin-right: 2rem;
  margin-bottom: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const SolvedButton = styled.button`
  color: white;
  background-color: #57a9fb;
  font-weight: bold;
  border: none;
  width: 5rem;
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

const TableContainer = styled.table`
  background-color: white;
  margin-left: 1rem;
  width: 100%;
  height: 7rem;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid black;
`;

const TableRow = styled.tr`
  width: 100%;
  height: 3rem;
  margin: 0;
`;

const Td = styled.td`
  margin: 0;
  border: 1px solid black;
  text-align: center;
  height: fit-content;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;
