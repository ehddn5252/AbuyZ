import React from "react";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

import styled from "styled-components";

export default function ReportItemModal({ row }) {
  return (
    <Container>
      <TitleDiv>상세 문의</TitleDiv>
      <ContentDiv>
        <ImageBox>
          <img src="/images/cloth.png" />
        </ImageBox>
        <ContentBox>
          <TitleBox>
            <ContentP style={{ fontSize: "2rem" }}>{row.product}</ContentP>
            <ContentP>{row.report_date}</ContentP>
          </TitleBox>

          <Rating
            name="text-feedback"
            value={3}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <ContentP>작성자 : {row.nickname}</ContentP>
          <ContentP>옵션 : 블랙/S size</ContentP>
          <ContentP>
            옷이 너무 구려요. 옷이 너무 구려요. 옷이 너무 구려요. 옷이 너무
            구려요. 옷이 너무 구려요. 옷이 너무 구려요. 옷이 너무 구려요. 옷이
            너무 구려요. 옷이 너무 구려요. 옷이 너무 구려요. 옷이 너무 구려요.
            옷이 너무 구려요.
          </ContentP>
        </ContentBox>
      </ContentDiv>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <RefusalButton>거절</RefusalButton>
        <AcceptButton>승인</AcceptButton>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
`;

const TitleDiv = styled.div`
  border-bottom: 1px solid #c8c8c8;
  width: 100%;
  padding: 2rem;
  font-size: 1.6rem;
  font-weight: bold;
`;

const ContentDiv = styled.div`
  display: flex;
  padding: 2rem;
`;

const ImageBox = styled.div`
  display: flex;
  width: 40%;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;
const ContentP = styled.p`
  margin: 0;
  padding: 0.5rem;
  font-weight: bold;
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
`;
