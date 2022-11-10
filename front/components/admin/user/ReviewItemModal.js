import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import styled from "styled-components";

// api
import { detailReview } from "../../../pages/api/admin";
import { writeReply } from "../../../pages/api/admin";

export default function ReviewItemModal({ originalReview, handleClose }) {
  const [review, setReview] = useState({
    id: 0,
    content: "",
    Rating: 0,
    email: "",
    Date: "",
    imgUrl: "",
    options: [{ x: "x" }],
  });
  const [reply, setReply] = useState({
    content: "",
    review_uid: originalReview.uid,
  });

  const loadData = async () => {
    if (originalReview.uid !== 0) {
      const res = await detailReview(originalReview.uid);
      setReview(res.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   *
   * reply
   */

  const handleChange = (e) => {
    console.log("content", e.target.value);
    setReply((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const writeClick = async () => {
    const res = await writeReply(reply);
    handleClose();
  };

  return (
    <Container>
      <TitleDiv>상세 리뷰</TitleDiv>
      <ReviewBox>
        <TitleTag>리뷰</TitleTag>
        <ContentDiv>
          <ImageBox>
            <img src={review.imgUrl} />
          </ImageBox>
          <ContentBox>
            <TitleBox>
              <ContentP style={{ fontSize: "2rem" }}>
                {originalReview.productName}
              </ContentP>
              <ContentP>
                {originalReview.createdDate.slice(0, 10)}{" "}
                {originalReview.createdDate.slice(11, 16)}
              </ContentP>
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
            <ContentP>작성자 : {originalReview.writer}</ContentP>
            <ContentP>옵션 : {}</ContentP>
            {review.options.map((option) => (
              <ContentP>
                {Object.keys(option)}: {Object.values(option)}
              </ContentP>
            ))}

            <ContentP>{originalReview.content}</ContentP>
          </ContentBox>
        </ContentDiv>
      </ReviewBox>
      <AnswerBox>
        <TitleTag>답변</TitleTag>
        <textarea
          name="content"
          style={{ width: "90%", height: "10rem" }}
          onChange={handleChange}
        ></textarea>
      </AnswerBox>

      {!originalReview.answered ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RefusalButton onClick={handleClose}>취소</RefusalButton>
          <AcceptButton onClick={writeClick}>작성</AcceptButton>
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
