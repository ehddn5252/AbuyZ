import React from "react";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import styled from "styled-components";
export default function ReviewItemModal({ review }) {
  return (
    <Container>
      <TitleDiv>상세 리뷰</TitleDiv>
      <ReviewBox>
        <TitleTag>리뷰</TitleTag>
        <ContentDiv>
          <ImageBox>
            <img src="/images/cloth.png" />
          </ImageBox>
          <ContentBox>
            <TitleBox>
              <ContentP style={{ fontSize: "2rem" }}>{review.product}</ContentP>
              <ContentP>{review.createdDate}</ContentP>
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
            <ContentP>작성자 : {review.writer}</ContentP>
            <ContentP>옵션 : 블랙/S size</ContentP>
            <ContentP>{review.content}</ContentP>
          </ContentBox>
        </ContentDiv>
      </ReviewBox>
      <AnswerBox>
        <TitleTag>답변</TitleTag>
        <textarea style={{ width: "90%", height: "10rem" }}></textarea>
      </AnswerBox>

      {!review.answered ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RefusalButton>취소</RefusalButton>
          <AcceptButton>작성</AcceptButton>
        </Box>
      ) : null}
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

const TitleTag = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
`;

const ReviewBox = styled.div`
  display: flex;
  margin-top: 0.3rem;
`;

const AnswerBox = styled.div`
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
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
  width: 90%;
  border: 1px solid black;
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
