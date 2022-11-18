// React
import React, { useEffect, useState } from "react";

// MUI
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import MyReviewItem from "./MyReviewItem";

// api
import { reviewYet } from "../../pages/api/review";

export default function CanReview() {
  const [productList, setProductList] = useState([]);

  const rreviewYet = async () => {
    const res = await reviewYet();
    res.data.sort((a, b) => b.orderUid - a.orderUid);
    setProductList(res.data);
  };

  useEffect(() => {
    rreviewYet();
  }, []);

  return (
    <MyOrderContainer>
      <MajorTitle>작성 가능한 리뷰</MajorTitle>
      <hr
        style={{
          height: "0.3rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />
      {productList ? (
        <ProductListBox>
          {productList.map((e, idx) => (
            <MyReviewItem key={idx} product={e} />
          ))}
        </ProductListBox>
      ) : (
        <BlankBox>
          <FavoriteBorderOutlinedIcon sx={{ fontSize: "6rem" }} />
          <p>작성 가능한 리뷰가 없습니다.</p>
        </BlankBox>
      )}
    </MyOrderContainer>
  );
}

const MyOrderContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 56rem;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;

const ProductListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const BlankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  font-size: 3rem;
  font-weight: bolder;
  color: #aaaaaa;
`;
