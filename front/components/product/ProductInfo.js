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

// Alert
import Swal from "sweetalert2";

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
  const [optionidx, setOptionIdx] = useState(0);

  // 상품 데이터 가져오기
  const getProduct = async (id) => {
    const res = await productDetail(id);
    console.log("니야니", res.data);
    setProduct(res.data);
    if (res.data.isWished) {
      setWish(res.data.isWished.wished);
      setWishId(res.data.isWished.uid);
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
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
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
      } else {
        Swal.fire({
          title: "로그인이 필요한 기능입니다.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        }).then((e) => {
          router.push("/login");
        });
      }
    }
  };

  // 바로 결제하기
  const goPayment = () => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        const productDto = [
          {
            inventoryDto: {
              productOptions: [optionValue],
            },
            productDto: {
              brandName: product.products.brandName,
              bigCategoryUid: product.products.bigCategoryUid,
              repImg: product.products.repImg,
              name: product.products.name,
              price: product.products.price,
              deliveryFee: 3000,
              discountRate: product.products.discountRate,
            },
            productCount: count,
            uid: productId,
          },
        ];
        setPaymentValue(productDto);
        router.push("/payment");
      } else {
        Swal.fire({
          title: "로그인이 필요한 기능입니다.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        }).then((e) => {
          router.push("/login");
        });
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
      // console.log("aa", value);
      temp2.push(value[0]);
      tempDto[key] = value;
      temp.push(tempDto);
    }
    setOptions(temp2);
    setOptionValue(defaulttemp);
    setOptionList(temp);
  };
  // console.log(options);
  // console.log(optionidx);
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
  console.log("옵션 리스트", options);
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
            <span style={{ color: "#aaaaaa" }}>az배송</span>
            <br></br>
            <PNameSpan>{product.products.name}</PNameSpan>
          </div>
          <div onClick={changeWish}>
            <br></br>
            {wish ? (
              <FavoriteIcon color="error" fontSize="large" />
            ) : (
              <FavoriteBorderIcon color="error" fontSize="large" />
            )}
          </div>
        </TitleBox>
        <PriceBox>
          <PriceTop>
            {product.products.discountRate === 0 ? null : (
              <DiscountRate>{product.products.discountRate}%</DiscountRate>
            )}

            <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: "1000" }}>
              {(
                product.products.price -
                0.01 * product.products.discountRate * product.products.price
              ).toLocaleString("ko-KR")}
              원
            </p>
          </PriceTop>
          <PriceBottom>
            {product.products.discountRate === 0 ? null : (
              <p
                style={{
                  margin: 0,
                  marginRight: "0.5rem",
                  textDecoration: "line-through",
                }}
              >
                {product.products.price.toLocaleString("ko-KR")}원
              </p>
            )}
          </PriceBottom>
        </PriceBox>
        <OptionBox>
          {optionList.map((option) => (
            <Option>
              {Object.keys(option)[0] === "x" ? null : (
                <p style={{ width: "20%" }}>
                  {/* {Object.keys(option)} */}
                  상품선택
                </p>
              )}
              {Object.keys(option)[0] === "x" ? null : (
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
              )}
            </Option>
          ))}

          <Options>
            <OptionOne>
              <div>
                {options[0] === "x" ? (
                  <p>{product.products.name}</p>
                ) : (
                  <div>
                    {options.length ? (
                      <p>
                        {options.map((data) => (
                          <span>{data} </span>
                        ))}
                      </p>
                    ) : (
                      <p>기본</p>
                    )}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 6, display: "flex", flexDirection: "row" }}>
                  <MinusIcon onClick={minus}></MinusIcon>
                  <CountDiv>
                    <p>{count}</p>
                  </CountDiv>
                  <PlusIcon onClick={() => setCount(count + 1)}></PlusIcon>
                </div>
                {product.products.discountRate > 0 ? (
                  <OptionTwo>
                    <span
                      style={{
                        color: "#aaaaaa",
                        textDecoration: "line-through",
                      }}
                    >
                      {(product.products.price * count).toLocaleString("ko-KR")}
                      원{" "}
                    </span>
                    <span style={{ marginLeft: "0.5rem" }}>
                      {(
                        (product.products.price -
                          0.01 *
                            product.products.discountRate *
                            product.products.price) *
                        count
                      ).toLocaleString("ko-KR")}
                      원
                    </span>
                  </OptionTwo>
                ) : (
                  <OptionTwo>
                    <span style={{ marginLeft: "0.5rem" }}>
                      {(
                        (product.products.price -
                          0.01 *
                            product.products.discountRate *
                            product.products.price) *
                        count
                      ).toLocaleString("ko-KR")}
                      원
                    </span>
                  </OptionTwo>
                )}
              </div>
            </OptionOne>
          </Options>
        </OptionBox>
        <ResultBox>
          <TitleTag>총 상품금액:</TitleTag>
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
  width: 45%;
  min-height: 30rem;
`;

const MajorImgBox = styled.div`
  width: 90%;
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
  width: 55%;
  min-height: 40rem;
`;

const PNameSpan = styled.span`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

// Title
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PriceBox = styled.div`
  margin-top: 1rem;
`;

const DiscountRate = styled.p`
  margin: 0;
  color: #56a9f1;
  margin-right: 0.5rem;
  font-size: 1.4rem;
  font-weight: 1000;
`;

const PriceTop = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 1.8rem;
`;
const PriceBottom = styled.div`
  display: flex;
  font-size: 1rem;
  color: #aaa;
  margin-top: 0.5rem;
`;

// Option
const OptionBox = styled.div`
  margin-bottom: 1rem;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;
const Options = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
  justify-content: end;
`;
const OptionOne = styled.div`
  display: flex;
  border: 1px solid rgb(170, 170, 170, 0.4);
  border-radius: 5px;
  padding: 1rem;
  width: 83%;
  flex-direction: column;
`;
const OptionTwo = styled.div`
  flex: 6;
  margin-top: 0.8rem;
  display: flex;
  justify-content: end;
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
  width: 5rem;
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
  font-size: 0.9rem;
  margin-right: 1rem;
`;
const ContentTag = styled.div`
  font-size: 1.7rem;
  font-weight: 1000;
`;
// Button

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
`;

const BasketButton = styled.button`
  border: 1px solid #56a9f1;
  border-radius: 5px;
  width: 45%;
  height: 2.5rem;
  background-color: #fff;
  color: #56a9f1;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
`;

const BuyButton = styled.button`
  border: none;
  border-radius: 5px;
  width: 45%;
  height: 2.5rem;
  background-color: #56a9f1;
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
`;
