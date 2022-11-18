// React
import React, { useEffect, useState } from "react";

// MUI
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Grid from "@mui/material/Grid";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import MyWishItem from "./MyWishItem";

// api
import { listwish } from "../../pages/api/wish";

export default function MyWishList() {
  const [productList, setProductList] = useState(null);
  const llistwish = async () => {
    const res = await listwish();
    setProductList(res.data?.products);
  };

  useEffect(() => {
    llistwish();
  }, []);

  return (
    <MyOrderContainer>
      <MajorTitle>찜한 상품</MajorTitle>
      <Hr />
      {productList ? (
        <ProductListBox>
          <Grid container>
            {productList.map((e, idx) => (
              <Grid key={idx} item xs={3} marginBottom={3}>
                <MyWishItem product={e}></MyWishItem>
              </Grid>
            ))}
          </Grid>
        </ProductListBox>
      ) : (
        <BlankBox>
          <FavoriteBorderOutlinedIcon
            sx={{ fontSize: "4rem", color: "rgb(86, 169, 241,0.7)" }}
          />
          <p style={{ fontSize: "2rem", color: "rgb(86, 169, 241,0.7)" }}>
            찜한 상품이 없습니다
          </p>
        </BlankBox>
      )}
      {/* {productList.length < 4 ? null : (
        <ButtonDiv>
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{ borderRadius: "3rem" }}
          >
            더보기
          </Button>
        </ButtonDiv>
      )} */}
    </MyOrderContainer>
  );
}

const MyOrderContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 56rem;
  min-height: 80vh;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;

const ProductListBox = styled.div`
  display: flex;
  margin-top: 1rem;
  height: 80vh;
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

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Hr = styled.hr`
  height: 0.3rem;
  background: #7895b2;
  border-radius: 1rem;
`;
