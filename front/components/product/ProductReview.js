// React
import React, { useState, useEffect } from "react";

// MUI
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "@mui/material/Pagination";
import FlagIcon from "@mui/icons-material/Flag";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

// StyledComponents
import styled from "styled-components";

// Next.js
import { useRouter } from "next/router";

// API
import { review } from "../../pages/api/review";

export default function ProductReview() {
  const [productId, setProductId] = useState("");
  const [page, setPage] = useState(1);
  const [reviewList, setReviewlist] = useState("");
  // 상품 데이터 가져오기
  const getReview = async (id) => {
    const res = await review(id, page);
    console.log(res);
    setReviewlist(res.data);
  };
  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    setProductId(id);
    getReview(id);
  }, []);
  return reviewList.length ? (
    <Container id="reviewView">
      <h1 style={{ fontSize: "3rem" }}>
        리뷰<span style={{ fontSize: "1.5rem" }}>(105)</span>
      </h1>
      <TotalReivew>
        <LeftBox>
          <Rating
            name="customized-color"
            value="3.5"
            readOnly
            precision={0.5}
            sx={{ fontSize: "3.5rem" }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <p style={{ fontSize: "1.5rem", marginLeft: "1rem" }}>3.8/5</p>
        </LeftBox>
        <RightBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>5점</p>
            <BarDiv></BarDiv>
            <p style={{ margin: 0 }}>2</p>
          </ScoreBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>4점</p>
            <BarDiv></BarDiv>
            <p style={{ margin: 0 }}>2</p>
          </ScoreBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>3점</p>
            <BarDiv></BarDiv>
            <p style={{ margin: 0 }}>0</p>
          </ScoreBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>2점</p>
            <BarDiv></BarDiv>
            <p style={{ margin: 0 }}>0</p>
          </ScoreBox>
          <ScoreBox>
            <p style={{ margin: 0 }}>1점</p>
            <BarDiv></BarDiv>
            <p style={{ margin: 0 }}>0</p>
          </ScoreBox>
        </RightBox>
      </TotalReivew>
      <PhotoReivew>
        <TitleBox>
          <h1
            style={{ fontSize: "3rem", textAlign: "start", fontWeight: "1000" }}
          >
            포토리뷰<span style={{ fontSize: "1.5rem" }}>(23)</span>
          </h1>
          <p style={{ textDecoration: "underline" }}>전체보기</p>
        </TitleBox>

        <PhotoList>
          <PhotoImg src="/images/jeep.png" />
          <PhotoImg src="/images/jeep.png" />
          <PhotoImg src="/images/jeep.png" />
          <PhotoImg src="/images/jeep.png" />
          <PhotoImg src="/images/jeep.png" />
        </PhotoList>
      </PhotoReivew>
      <ReviewList>
        <ReviewItem>
          <TitleBox>
            <h1 style={{ marginTop: 0 }}>kjmk1007</h1>
            <div style={{ display: "flex" }}>
              <FlagIcon
                color="error"
                size="large"
                sx={{ marginRight: "1rem" }}
              />
              <p style={{ margin: 0, marginTop: "0.3rem" }}>2022.10.11</p>
            </div>
          </TitleBox>
          <Rating
            name="text-feedback"
            value="3.8"
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <ReviewContent>
            <ReviewInfo>
              <p>옵션: 블랙/S size</p>
              <p>우리 아들 사다줬는데, 너무 이쁘네요.</p>
              <p>110cm/30kg로 인데 s 사이즈 딱 맞아요!</p>
            </ReviewInfo>
            <ReviewImg>
              <img src="/images/jeep.png" />
            </ReviewImg>
          </ReviewContent>
          <IconBox>
            <ThumbUpAltOutlinedIcon
              sx={{ marginRight: "2rem", fontSize: "2.3rem" }}
            />
            <ChatOutlinedIcon sx={{ fontSize: "2.3rem" }} />
          </IconBox>
        </ReviewItem>
        <ReviewItem>
          <TitleBox>
            <h1 style={{ marginTop: 0 }}>zzieun_choi</h1>
            <div style={{ display: "flex" }}>
              <FlagIcon
                color="error"
                size="large"
                sx={{ marginRight: "1rem" }}
              />
              <p style={{ margin: 0, marginTop: "0.3rem" }}>2022.10.12</p>
            </div>
          </TitleBox>
          <Rating
            name="text-feedback"
            value="3.8"
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <ReviewContent>
            <ReviewInfo>
              <p>옵션: 레드/M size</p>
              <p>
                레드 컬러는 낯설어서 걱정 많이 했는데, 얼굴 환해보이고 좋아요!
              </p>
            </ReviewInfo>
            <ReviewImg>
              <img src="/images/jeep.png" />
            </ReviewImg>
          </ReviewContent>
          <IconBox>
            <ThumbUpAltOutlinedIcon
              sx={{ marginRight: "2rem", fontSize: "2.3rem" }}
            />
            <ChatOutlinedIcon sx={{ fontSize: "2.3rem" }} />
          </IconBox>
        </ReviewItem>
        <Pagination count={23} size="large" />
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
  background-color: #56a9f1;
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
  width: 19%;
  object-fit: cover;
  margin: 0.5rem;
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
  padding: 3rem;
`;

const ReviewContent = styled.div`
  display: flex;
`;
const ReviewInfo = styled.div`
  width: 80%;
`;
const ReviewImg = styled.div`
  width: 20%;
`;
const IconBox = styled.div`
  display: flex;
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
