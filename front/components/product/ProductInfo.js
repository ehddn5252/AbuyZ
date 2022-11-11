// React
import React, { useState, useEffect } from "react";

// MUI
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// StyleComponent
import styled from "styled-components";

// Next.js
import { useRouter } from "next/router";
// API
import { productDetail } from "../../pages/api/product";
import { regiswish, delwish } from "../../pages/api/wish";
import { regiscart } from "../../pages/api/cart";

// State
import { paymentProduct } from "../../states";
import { useRecoilState } from "recoil";
export default function ProductInfo() {
  const router = useRouter();

  const [wish, setWish] = useState(false);
  const [wishId, setWishId] = useState("");
  const [productId, setProductId] = useState(0);
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [optionList, setOptionList] = useState([]);
  const [optionValue, setOptionValue] = useState([]);
  const [options, setOptions] = useState("");
  const [paymentValue, setPaymentValue] = useRecoilState(paymentProduct);

  // 상품 데이터 가져오기
  const getProduct = async (id) => {
    const res = await productDetail(id);
    setProduct(res.data);
    if (res.data.isWished) {
      setWish(res.data.isWished.wished);
      setWishId(res.data.isWished.uid);
      console.log(res.data.isWished.uid);
    }

    MakeOption(res.data.productOptionListMap);
  };

  const minus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  // 옵션변경
  const getOptionValue = (key, value) => {
    let temp = optionValue;
    const keylist = key.split("-");
    temp[keylist[0]] = value;
    setOptions(Object.values(temp));
    setOptionValue(temp);
  };
  // 장바구니 가기
  const goBasket = async () => {
    let cartDto;
    if (product.productOptionListMap.length !== 1) {
      cartDto = {
        productsUid: product.products.uid,
        productCount: count,
        optionValues: optionValue,
      };
    } else if (product.productOptionListMap.length === 1) {
      cartDto = {
        productsUid: product.products.uid,
        productCount: count,
        optionValues: {
          x: "x",
        },
      };
    }
    await regiscart(cartDto);
    router.push("/basket");
  };

  // 바로 결제하기
  const goPayment = () => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        const productDto = {
          productId: productId,
          count: count,
          optionValues: optionValue,
        };
        setPaymentValue(productDto);
        router.push("/payment");
      } else {
        alert("로그인이 필요한 기능입니다.");
        router.push("/login");
      }
    }
  };
  // Load
  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    setProductId(id);
    getProduct(id);
  }, [productId, wish]);

  // 옵션 만들기
  const MakeOption = (data) => {
    let temp = [];
    let defaulttemp = {};
    let temp2 = [];
    for (let [key, value] of Object.entries(data)) {
      let tempDto = {};
      if (!defaulttemp[key]) {
        defaulttemp[key] = value[0];
      }
      temp2.push(value[0]);
      tempDto[key] = value;
      temp.push(tempDto);
    }
    setOptions(temp2);
    setOptionValue(defaulttemp);
    setOptionList(temp);
  };

  const changeWish = () => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        if (wish) {
          delwish(wishId);
          setWish(false);
        } else {
          regiswish(productId);
          setWish(true);
        }
      } else {
        alert("로그인이 필요한 기능입니다.");
      }
    }
  };

  return optionList.length !== 0 && product.length !== 0 ? (
    <Container>
      <ImgBox>
        <MajorImgBox>
          <MajorImg src={product.products.repImg} />
        </MajorImgBox>
        <SubImgBox>
          {product.productPictureDto.map((productImg, idx) => (
            <SubImg key={idx} src={productImg.imgUrl} />
          ))}
        </SubImgBox>
      </ImgBox>
      <InfoBox>
        <TitleBox>
          <div>
            <p style={{ margin: 0, marginBottom: "0.5rem", fontSize: "2rem" }}>
              {product.products.name}
            </p>
          </div>
          <div onClick={changeWish}>
            {wish ? (
              <FavoriteIcon color="error" fontSize="large" />
            ) : (
              <FavoriteBorderIcon color="error" fontSize="large" />
            )}
          </div>
        </TitleBox>
        <PriceBox>
          <PriceTop>
            <p
              style={{
                margin: 0,
                color: "#56A9F1",
                marginRight: "0.5rem",
                fontSize: "1.1rem ",
              }}
            >
              {product.products.discountRate}%
            </p>
            <p style={{ margin: 0 }}>
              {(
                product.products.price -
                0.01 * product.products.discountRate * product.products.price
              ).toLocaleString("ko-KR")}
              원
            </p>
          </PriceTop>
          <PriceBottom>
            <p
              style={{
                margin: 0,
                marginRight: "0.5rem",
                textDecoration: "line-through",
              }}
            >
              {product.products.price.toLocaleString("ko-KR")}원
            </p>
          </PriceBottom>
        </PriceBox>
        <OptionBox>
          {optionList.map((option) => (
            <Option>
              <p style={{ width: "20%" }}>{Object.keys(option)}</p>
              <Autocomplete
                disablePortal
                id={Object.keys(option)}
                options={Object.values(option)[0]}
                size="small"
                fullWidth
                renderInput={(params) => <TextField {...params} />}
                defaultValue={Object.values(option)[0][0]}
                onChange={(e, newInputValue) => {
                  getOptionValue(e.target.id, newInputValue);
                }}
              />
            </Option>
          ))}
          <Option>
            <p style={{ width: "20%" }}>수량</p>
            <MinusIcon onClick={minus}></MinusIcon>
            <CountDiv>
              <p>{count}</p>
            </CountDiv>
            <PlusIcon onClick={() => setCount(count + 1)}></PlusIcon>
          </Option>

          <Option>
            <p style={{ width: "20%" }}>선택옵션</p>
            {options.length ? (
              <p>
                {options.map((data) => (
                  <span>{data} </span>
                ))}
              </p>
            ) : (
              <p>기본</p>
            )}
          </Option>
        </OptionBox>
        <ResultBox>
          <TitleTag>총 금액</TitleTag>
          <ContentTag>
            {(
              (product.products.price -
                0.01 * product.products.discountRate * product.products.price) *
              count
            ).toLocaleString("ko-KR")}
            원
          </ContentTag>
        </ResultBox>
        <ButtonBox>
          <BasketButton onClick={goBasket}>장바구니</BasketButton>
          <BuyButton onClick={goPayment}>구매하기</BuyButton>
        </ButtonBox>
      </InfoBox>
    </Container>
  ) : null;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3rem;
  align-items: center;
`;
// Image
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const MajorImgBox = styled.div`
  width: 80%;
`;

const MajorImg = styled.img`
  width: 100%;
  margin: 0.5rem;
  object-fit: cover;
`;

const SubImgBox = styled.div`
  display: flex;
  width: 20%;
  margin: 0.5rem;
`;
const SubImg = styled.img`
  width: 100%;
  margin-right: 1rem;
  object-fit: cover;
`;

// Info
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
`;

// Title
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TitleDiv = styled.div``;
const IconBox = styled.div``;
const PriceBox = styled.div`
  margin-top: 1rem;
`;

const PriceTop = styled.div`
  display: flex;
  font-size: 1.8rem;
`;
const PriceBottom = styled.div`
  display: flex;
  font-size: 1rem;
  color: #aaa;
`;

// Option
const OptionBox = styled.div``;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const MinusIcon = styled(RemoveOutlinedIcon)`
  border: 1px solid #aaaaaa;
  margin-top: 0.7rem;
  cursor: pointer;
`;

const CountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.5rem;
  margin-top: 0.7rem;
  height: 1.5rem;
  border: 1px solid #aaaaaa;
`;

const PlusIcon = styled(AddOutlinedIcon)`
  border: 1px solid #aaaaaa;
  margin-top: 0.7rem;
  cursor: pointer;
`;

const ResultBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const TitleTag = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
`;
const ContentTag = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;
// Button

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
`;

const BasketButton = styled.button`
  border: 1px solid #56a9f1;
  border-radius: 1rem;
  width: 40%;
  height: 2.5rem;
  background-color: #fff;
  color: #56a9f1;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
`;

const BuyButton = styled.button`
  border: none;
  border-radius: 1rem;
  width: 40%;
  height: 2.5rem;
  background-color: #56a9f1;
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
`;
