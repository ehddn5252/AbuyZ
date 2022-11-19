// React
import React, { useState, useEffect } from "react";

// MUI
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "@mui/material/Pagination";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ReportIcon from "@mui/icons-material/Report";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
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
import { height } from "@mui/system";

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
    setPhotoList(res.data);
  };
  // 평균 점수랑 점수대 가져오기
  const getTotalRating = async (total, id) => {
    let tempTotalRating = 0;
    let five = 0;
    let four = 0;
    let three = 0;
    let two = 0;
    let one = 0;
    let count = 0;
    for (let j = 1; j < total + 1; j++) {
      const res = await review(id, j);
      const reviewData = res.data.dto;
      for (let i = 0; i < reviewData.length; i++) {
        const temp = reviewData[i].rating;
        count += 1;
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
    }

    setTotal(count);

    setTotalRatingList([one, two, three, four, five]);
    setTotalValue((tempTotalRating / count).toFixed(1));
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
    } else {
      const res = await likereview(reviewDto);
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
    setReviewlist(reviewlist);
    getTotalRating(res.data.pageCnt, id);
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
      <h1 style={{ fontSize: "2.5rem" }}>
        리뷰<span style={{ fontSize: "1.5rem" }}>({total})</span>
      </h1>
      <span>후기 작성은 배송완료일로부터 30일 이내 가능합니다.</span>
      <br></br>
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

      <ReviewItem>
        {reviewList.map((data, idx) => (
          <div key={idx}>
            <ReviewList>
              <div style={{ flex: 2 }}>
                <NickName>{data.nickName}</NickName>
                <br></br>
                <br></br>
                <Rating
                  name="text-feedback"
                  value={data.rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <br></br>
                <br></br>
                <Date>{data.date.slice(0, 10)}</Date>
              </div>
              <div style={{ flex: 8 }}>
                <ReviewInfo>
                  <span style={{ color: "#aaaaaa" }}>
                    [
                    {data.options.map((option, idx) => (
                      <span key={idx}>{Object.values(option)} </span>
                    ))}
                    ]
                  </span>
                  <p>{data.content}</p>
                  {data.imgUrl === null ? null : (
                    <ReviewImg>
                      <Img
                        src={data.imgUrl}
                        onClick={() => window.open(data.imgUrl)}
                      />
                    </ReviewImg>
                  )}
                  {data.reply ? (
                    <ReviewContent>
                      <SubdirectoryArrowRightIcon
                        style={{ position: "absolute", top: "25%", left: "2%" }}
                      ></SubdirectoryArrowRightIcon>

                      <p>{data.replyContent}</p>
                    </ReviewContent>
                  ) : null}
                </ReviewInfo>
              </div>
              <div style={{ flex: 2, paddingLeft: "1rem" }}>
                <Report onClick={(e) => reportReviewItem(data.id)}>
                  <span>😒신고</span>
                </Report>
                <Good>
                  {data.like ? (
                    <div onClick={(e) => changeLike(data.like, data.id)}>
                      <span>😍도움 </span>
                      <span>{data.likeCount}</span>
                    </div>
                  ) : (
                    <div onClick={(e) => changeLike(data.like, data.id)}>
                      <span>😍도움 </span>
                      <span>0</span>
                    </div>
                  )}
                </Good>
              </div>
            </ReviewList>
            <Hr></Hr>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={page}
            onChange={changePage}
            count={totalPage}
            size="large"
          />
        </div>
      </ReviewItem>
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
  border: 1px solid rgb(170, 170, 170, 0.5);
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
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  margin: 0.5rem;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 150;
  padding: 1rem;
`;

const ReviewItem = styled.div`
  margin-top: 3rem;
`;

const NickName = styled.span`
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Date = styled.span`
  margin: 0;
  margin-top: 0.3rem;
  color: #aaaaaa;
`;

const Img = styled.img`
  width: 7rem;
  height: 7rem;
  object-fit: cover;
`;
const ReviewContent = styled.div`
  background-color: rgb(120, 120, 120, 0.2);
  padding: 1rem;
  padding-left: 2.5rem;
  border-radius: 5px;
  position: relative;
`;

const ReviewInfo = styled.div`
  width: 100%;
  height: auto;
`;

const ReviewImg = styled.div`
  width: 25%;
  height: auto;
`;

const Report = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #aaaaaa;
  width: 6rem;
  border-radius: 15px;
`;

const Good = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #aaaaaa;
  width: 6rem;
  border-radius: 15px;
  margin-top: 1rem;
`;

const Hr = styled.hr`
  border: solid 1px rgb(170, 170, 170, 0.3);
  width: 95%;
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
