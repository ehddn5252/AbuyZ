// React
import React, { useState, useEffect } from "react";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ReviewCategory from "../../../components/admin/user/ReviewCategory";
import { searchReview } from "../../../pages/api/admin";
import ReviewList from "../../../components/admin/user/ReviewList";

export default function Review() {
  const [reviewSearch, setReviewSearch] = useState(false);

  const [reviews, setReviews] = useState([
    {
      uid: 0,
      writer: "",
      productName: "",
      content: "",
      createdDate: "",
      answerDate: "",
      rating: "",
      answered: false,
    },
  ]);

  const [searchDto, setSearchDto] = useState({
    // bigCategoryUid: 1,
    // smallCategoryUid: 1,
    // productName: "에어",
    // content: "",
    // startDate: "2022-11-04",
    // endDate: "2022-11-08",
    // isAnswered: 0,
    isAnswered: 0,
    startDate: "2022-11-04",
    bigCategoryUid: 2,
    smallCategoryUid: 8,
    productName: "에어",
    content: "",
    endDate: "2022-11-08",
  });

  const loadData = async (searchDto) => {
    const res = await searchReview(searchDto);
    setReviews(res.data);
    // console.log(res.data);
  };

  const buttonClick = () => {
    loadData(searchDto);
  };

  // useEffect(() => {
  //   loadData(searchDto);
  // }, []);

  return (
    <Container>
      <ReviewCategory
        setReviewSearch={setReviewSearch}
        setSearchDto={setSearchDto}
        buttonClick={buttonClick}
      />
      {reviewSearch ? <ReviewList reviews={reviews} /> : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
  min-height: 89vh;
`;
