// React
import React, { useState, useEffect } from "react";

// MUI
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "@mui/material/Pagination";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ReportIcon from "@mui/icons-material/Report";
// StyledComponents
import styled from "styled-components";

// Next.js
import { useRouter } from "next/router";

// API
import {
  review,
  reportreview,
  photoreviewSome,
  likereview,
  dellikereview,
} from "../../pages/api/review";

export default function ProductReview() {
  const [productId, setProductId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [TotalRatingList, setTotalRatingList] = useState([0, 0, 0, 0, 0]);
  const [reviewList, setReviewlist] = useState("");
  const [photoList, setPhotoList] = useState("");

  // 포토리뷰 가져오기
  const getphotoReview = async (productId) => {
    const res = await photoreviewSome(productId);
    console.log(res);
    setPhotoList(res.data);
  };
  // 평균 점수랑 점수대 가져오기
  const getTotalRating = (reviewData) => {
    let tempTotalRating = 0;
    let five = 0;
    let four = 0;
    let three = 0;
    let two = 0;
    let one = 0;
    for (let i = 0; i < reviewData.length; i++) {
      const temp = reviewData[i].rating;
      tempTotalRating += temp;
      if (temp === 5) {
        five += 1;
      } else if (temp < 5 && temp >= 4) {
        four += 1;
      } else if (temp < 4 && temp >= 3) {
        three += 1;
      } else if (temp < 3 && temp >= 2) {
        two += 1;
      } else one += 1;
    }
    console.log(one, two, three, four, five);
    console.log(tempTotalRating);
    setTotalRatingList([one, two, three, four, five]);
    setTotalValue(tempTotalRating / reviewData.length);
  };

  // 리뷰 신고하기
  const reportReviewItem = async (reviewId) => {
    const reviewDto = {
      review_uid: reviewId,
    };
    const res = await reportreview(reviewDto);
    if (res.message === "리뷰 신고 실패 - 이미 신고함") {
      alert("이미 신고한 리뷰입니다.");
    }
  };

  // 좋아요
  const changeLike = async (likeState, id) => {
    const reviewDto = {
      review_uid: id,
    };
    if (likeState) {
      const res = await dellikereview(id);
      console.log("좋아요 취소");
    } else {
      const res = await likereview(reviewDto);
      console.log("좋아요");
    }
  };
  const changePage = (e, value) => {
    setPage(value);
  };
  // 상품 데이터 가져오기
  const getReview = async (id, page) => {
    const res = await review(id, page);
    const reviewlist = res.data.dto;
    setTotalPage(res.data.pageCnt);
    setTotal(res.data.totalCnt);
    setReviewlist(reviewlist);
    getTotalRating(res.data.dto);
  };
  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    setProductId(id);
    getReview(id, page);
    getphotoReview(id);
  }, [page]);
  return reviewList.length ? (
    <Container id="reviewView">
      <h1 style={{ fontSize: "3rem" }}>
        리뷰<span style={{ fontSize: "1.5rem" }}>({total})</span>
      </h1>
      <TotalReivew>
        <LeftBox>
          <Rating
            name="customized-color"
            value={totalValue}
            readOnly
            precision={0.5}
            sx={{ fontSize: "3.5rem" }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <p style={{ fontSize: "1.5rem", marginLeft: "1rem" }}>
            {totalValue}/5
          </p>
        </LeftBox>
        <RightBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>5점</p>
            <BarDiv>
              <div
                style={{
                  width: `${(TotalRatingList[4] / total) * 100}%`,
                  backgroundColor: "#56a9f1",
                  height: "100%",
                }}
              ></div>
            </BarDiv>
            <p style={{ margin: 0 }}>{TotalRatingList[4]}</p>
          </ScoreBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>4점</p>
            <BarDiv>
              <div
                style={{
                  width: `${(TotalRatingList[3] / total) * 100}%`,
                  backgroundColor: "#56a9f1",
                  height: "100%",
                }}
              ></div>
            </BarDiv>
            <p style={{ margin: 0 }}>{TotalRatingList[3]}</p>
          </ScoreBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>3점</p>
            <BarDiv>
              <div
                style={{
                  width: `${(TotalRatingList[2] / total) * 100}%`,
                  backgroundColor: "#56a9f1",
                  height: "100%",
                }}
              ></div>
            </BarDiv>
            <p style={{ margin: 0 }}>{TotalRatingList[2]}</p>
          </ScoreBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>2점</p>
            <BarDiv>
              <div
                style={{
                  width: `${(TotalRatingList[1] / total) * 100}%`,
                  backgroundColor: "#56a9f1",
                  height: "100%",
                }}
              ></div>
            </BarDiv>
            <p style={{ margin: 0 }}>{TotalRatingList[1]}</p>
          </ScoreBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>1점</p>
            <BarDiv>
              <div
                style={{
                  width: `${(TotalRatingList[0] / total) * 100}%`,
                  backgroundColor: "#56a9f1",
                  height: "100%",
                }}
              ></div>
            </BarDiv>
            <p style={{ margin: 0 }}>{TotalRatingList[0]}</p>
          </ScoreBox>
        </RightBox>
      </TotalReivew>
      <PhotoReivew>
        <TitleBox>
          <h1
            style={{ fontSize: "3rem", textAlign: "start", fontWeight: "1000" }}
          >
            포토리뷰
            <span style={{ fontSize: "1.5rem" }}>({photoList.totalCnt})</span>
          </h1>
          {photoList.dto.length > 5 ? (
            <p style={{ textDecoration: "underline" }}>전체보기</p>
          ) : null}
        </TitleBox>

        <PhotoList>
          {photoList.dto.map((photo, idx) => (
            <PhotoImg key={idx} src={photo.imgUrl} />
          ))}
        </PhotoList>
      </PhotoReivew>

      <ReviewList>
        {reviewList.map((data, idx) => (
          <ReviewItem key={idx}>
            <TitleBox>
              <h1 style={{ marginTop: 0 }}>{data.nickName}</h1>
              <div style={{ display: "flex" }}>
                <div onClick={(e) => reportReviewItem(data.id)}>
                  <ReportIcon
                    color="error"
                    sx={{
                      fontSize: "2rem",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </TitleBox>
            <ReviewContent>
              <Rating
                name="text-feedback"
                value={data.rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <p
                style={{
                  margin: 0,
                  marginTop: "0.3rem",
                  marginLeft: "2rem",
                }}
              >
                {data.date.slice(0, 10)}
              </p>
            </ReviewContent>

            <ReviewContent>
              <ReviewInfo>
                <p>
                  <span>옵션 : </span>
                  {data.options.map((option, idx) => (
                    <span key={idx}>{Object.values(option)} </span>
                  ))}
                </p>
                <p>{data.content}</p>
              </ReviewInfo>
              <ReviewImg>
                <img
                  src={data.imgUrl}
                  style={{
                    width: "12rem",
                    height: "12rem",
                    objectFit: "cover",
                    border: "1px black solid",
                  }}
                />
              </ReviewImg>
            </ReviewContent>
            <IconBox>
              <ChatOutlinedIcon sx={{ fontSize: "2.3rem" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "1rem" }}>
                  {data.likeCount} 명에게 도움이 됐어요.
                </span>
                {data.like ? (
                  <div onClick={(e) => changeLike(data.like, data.id)}>
                    <ThumbUpAltOutlinedIcon
                      sx={{
                        fontSize: "3rem",
                        paddingLeft: "1rem",
                        color: "red",
                      }}
                    />
                  </div>
                ) : (
                  <div onClick={(e) => changeLike(data.like, data.id)}>
                    <ThumbUpAltOutlinedIcon
                      sx={{ fontSize: "3rem", paddingLeft: "1rem" }}
                    />
                  </div>
                )}
              </div>
            </IconBox>
            {data.reply ? <ReplyBox>{data.replyContent}</ReplyBox> : null}
          </ReviewItem>
        ))}

        <Pagination
          page={page}
          onChange={changePage}
          count={totalPage}
          size="large"
        />
      </ReviewList>
    </Container>
  ) : (
    <Container id="reviewView">
      <BlankBox>
        <p>상품 리뷰가 없습니다</p>
      </BlankBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const TotalReivew = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  align-items: center;
  background-color: rgba(170, 170, 170, 0.13);
  border-radius: 2rem;
  padding: 3rem;
`;

const LeftBox = styled.div`
  display: flex;
  width: 50%;
`;
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const ScoreBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 0.5rem;
`;

const BarDiv = styled.div`
  height: 1rem;
  width: 40%;
`;
const PhotoReivew = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PhotoList = styled.div`
  display: flex;
`;

const PhotoImg = styled.img`
  width: 13rem;
  height: 13rem;
  object-fit: cover;
  margin: 0.5rem;
  border: 1px black solid;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ReviewItem = styled.div`
  width: 100%;
  height: auto;
  padding-top: 2rem;
  padding-bottom: 1.5rem;
`;

const ReviewContent = styled.div`
  display: flex;
`;

const ReviewInfo = styled.div`
  width: 75%;
  height: auto;
`;

const ReviewImg = styled.div`
  width: 25%;
  padding-left: 3rem;
  height: auto;
`;
const IconBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  justify-content: space-between;
`;

const BlankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30rem;
  font-size: 3rem;
  font-weight: bolder;
  color: #aaaaaa;
`;

const ReplyBox = styled.div`
  background-color: rgba(128, 128, 128, 0.17);
  border: none;
  padding: 3rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;
