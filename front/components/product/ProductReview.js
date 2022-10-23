// React
import React from "react";

// MUI
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "@mui/material/Pagination";
import FlagIcon from "@mui/icons-material/Flag";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
// StyledComponents
import styled from "styled-components";

export default function ProductReview() {
  return (
    <Container>
      <TotalReivew>
        <h1>
          리뷰<span style={{ fontSize: "1rem" }}>(105)</span>
        </h1>
        <Rating
          name="text-feedback"
          value="3.8"
          readOnly
          precision={0.5}
          sx={{ fontSize: "3.5rem" }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <p style={{ fontSize: "1.5rem" }}>3.8/5</p>
      </TotalReivew>
      <PhotoReivew>
        <TitleBox>
          <p style={{ fontSize: "1.6rem", textAlign: "start" }}>포토리뷰(23)</p>
          <p style={{ marginTop: "2rem", textDecoration: "underline" }}>
            전체보기
          </p>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PhotoReivew = styled.div`
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
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
