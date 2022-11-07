// React
import React, { useEffect, useState } from "react";

// MUI
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import MyWishItem from "./MyWishItem";

// api
import { listwish } from "../../pages/api/wish";
export default function MyWishList() {
  const [productList, setProductList] = useState([]);
  const llistwish = async () => {
    const res = await listwish();
    setProductList(res.data.products);
    // setProductList(res.data);
  };
  console.log(productList);
  useEffect(() => {
    llistwish();
  }, []);

  return (
    <MyOrderContainer>
      <MajorTitle>찜한 상품</MajorTitle>
      <hr
        style={{
          height: "0.3rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />
      {productList ? (
        <ProductListBox>
          {productList.map((e) => (
            <MyWishItem product={e}></MyWishItem>
          ))}
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
      {productList.length < 4 ? null : (
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
      )}
    </MyOrderContainer>
  );
}

const MyOrderContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 100%;
  width: 56rem;
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
