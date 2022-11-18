import React, { useEffect, useState } from "react";
import styled from "styled-components";

// API
import axios from "axios";
import { getStockInventory } from "../../../../pages/api/product";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

export default function EditOption(props) {
  // 부모 상속 --------------------------------------------
  // 소분류 uid
  const [smallCategoriesUid, setSmallCategoriesUid] = useState(
    props.smallCategoriesUid
  );

  // 상품명
  const [name, setName] = useState(props.name);

  // 할인
  const [discountRate, setDiscountRate] = useState(props.discountRate);

  // 대표가격
  const [price, setPrice] = useState(props.price);

  // 배송비
  const [deliveryFee, setDeliveryFee] = useState(props.deliveryFee);

  // 브랜드명
  const [brandName, setBrandName] = useState(props.brandName);

  // 키워드
  const [keywords, setKeywords] = useState(props.keywords);

  // 소분류 uid 실시간 불러오기
  useEffect(() => {
    setSmallCategoriesUid(props.smallCategoriesUid);
  }, [props.smallCategoriesUid]);

  // 상품명 실시간 불러오기
  useEffect(() => {
    setName(props.name);
  }, [props.name]);

  // 할인 실시간 불러오기
  useEffect(() => {
    setDiscountRate(props.discountRate);
  }, [props.discountRate]);

  // 배송비 실시간 불러오기
  useEffect(() => {
    setDeliveryFee(props.deliveryFee);
  }, [props.deliveryFee]);

  // 대표가격 실시간 불러오기
  useEffect(() => {
    setPrice(props.price);
  }, [props.price]);

  // 브랜드명 실시간 불러오기
  useEffect(() => {
    setBrandName(props.brandName);
  }, [props.brandName]);

  // 키워드 실시간 불러오기
  useEffect(() => {
    setKeywords(props.keywords);
  }, [props.keywords]);

  // 여기서 생성 ------------------------------------------
  // 옵션명 갯수
  const [optionCount, setOptionCount] = useState(
    Object.keys(props.optionDetail).length
  );

  // 옵션명 리스트
  const [optionNameList, setOptionNameList] = useState(
    Object.keys(props.optionDetail)
  );

  // 옵션값 1
  const [optionValue1, setOptionValue1] = useState(
    Object.values(props.optionDetail)[0]
      ? Object.values(props.optionDetail)[0]
      : ""
  );

  // 옵션값 2
  const [optionValue2, setOptionValue2] = useState(
    Object.values(props.optionDetail)[1]
      ? Object.values(props.optionDetail)[1]
      : ""
  );

  // 옵션값 갯수 2
  const [count2, setCount2] = useState(
    Object.values(props.optionDetail)[1]
      ? Object.values(props.optionDetail)[1].length
      : 1
  );

  // 옵션값 3
  const [optionValue3, setOptionValue3] = useState(
    Object.values(props.optionDetail)[2]
      ? Object.values(props.optionDetail)[2]
      : ""
  );

  // 옵션값 갯수 3
  const [count3, setCount3] = useState(
    Object.values(props.optionDetail)[2]
      ? Object.values(props.optionDetail)[2].length
      : 1
  );

  // 옵션 목록 보여주기
  const [show, setShow] = useState(true);

  // 옵션 여부 체크
  const [check, setCheck] = useState(0);

  // 옵션 미설정 시 재고수량
  const [stock, setStock] = useState(props.totalCount ? props.totalCount : 0);

  // 옵션 설정 시 ------------------------------------------

  // 재고 리스트(상품별 재고 조회 했을 때)
  const [stockList, setStockList] = useState([]);

  // 기존 옵션에 따른 옵션체크
  useEffect(() => {
    getStock(props.productUid);
    if (props.optionDetail["x"] === undefined) {
      setCheck(2);
    } else {
      setCheck(1);
    }
  }, []);

  // 상품 정보 수정 API ------------------------------------------
  const handleOptionModify = () => {
    let formData = new FormData();

    let data = {
      productsUid: props.productUid,
      smallCategoriesUid: smallCategoriesUid,
      name: name,
      discountRate: discountRate,
      price: price,
      deliveryFee: deliveryFee,
      brandName: brandName,
      keywords: keywords,
    };

    formData.append(
      "productCreateDto",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    const accessToken = sessionStorage.getItem("access-token");
    axios.defaults.headers.common["access_token"] = accessToken;

    axios
      .put("https://k7e201.p.ssafy.io:8081/api/product/modify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res, "옵션 없는 상품 수정에 성공!");
        alert("상품이 수정되었습니다.");
        location.reload();
      })
      .catch((err) => {
        console.log(err, "옵션 없는 상품 수정에 실패하였습니다.");
      });
  };

  // 옵션별 가격
  const [optionPrice, setOptionPrice] = useState([]);

  // 옵션별 수량
  const [optionStock, setOptionStock] = useState([]);

  // 상품 재고 조회 API ------------------------------------------
  const getStock = async (productUid) => {
    const stocks = await getStockInventory(productUid);
    setStockList(stocks);
    const tmpPrice = [];
    const tmpStock = [];
    for (let i = 0; i < stocks.length; i++) {
      tmpPrice.push(stocks[i].price);
      tmpStock.push(stocks[i].count);
    }
    setOptionPrice(tmpPrice);
    setOptionStock(tmpStock);
  };

  // 옵션가 입력 함수(옵션 1개일 때)
  const handleOptionPrice1 = (e, idx1) => {
    let copy = [...optionPrice];
    copy[idx1] = e.target.value;
    setOptionPrice(copy);
  };

  // 옵션 수량 입력 함수(옵션 1개일 때)
  const handleOptionStock1 = (e, idx1) => {
    let copy = [...optionStock];
    copy[idx1] = e.target.value;
    setOptionStock(copy);
  };

  // 옵션가 입력 함수(옵션 2개일 때)
  const handleOptionPrice2 = (e, idx1, idx2) => {
    let copy = [...optionPrice];
    copy[idx1 + idx2] = e.target.value;
    setOptionPrice(copy);
  };

  // 옵션 수량 입력 함수(옵션 2개일 때)
  const handleOptionStock2 = (e, idx1, idx2) => {
    let copy = [...optionStock];
    copy[idx1 + idx2] = e.target.value;
    setOptionStock(copy);
  };

  // 옵션가 입력 함수(옵션 3개일 때)
  const handleOptionPrice3 = (e, idx1, idx2, idx3) => {
    let copy = [...optionPrice];
    copy[idx1 + idx2 + idx3] = e.target.value;
    setOptionPrice(copy);
  };

  // 옵션 수량 입력 함수(옵션 3개일 때)
  const handleOptionStock3 = (e, idx1, idx2, idx3) => {
    let copy = [...optionStock];
    copy[idx1 + idx2 + idx3] = e.target.value;
    setOptionStock(copy);
  };

  // 옵션 가격 및 수량 수정 API ------------------------------------------
  const handleChangeOption = () => {
    const data = stockList;
    const res = {};

    if (check === 1) {
      res[props.noOptionUid.toString()] = {
        price: price,
        count: stock,
      };
    } else {
      for (let i = 0; i < optionPrice.length; i++) {
        res[data[i].productOptionUidString] = {
          price: optionPrice[i],
          count: optionStock[i],
        };
      }
    }

    axios
      .put("https://k7e201.p.ssafy.io:8081/api/inventory", {
        inventory_option_list: res,
      })
      .then((res) => {
        console.log(res, "재고 수정에 성공!");
        handleOptionModify();
      })
      .catch((err) => {
        console.log(err, "재고 수정에 실패하였습니다.");
      });
  };

  return (
    <div>
      <Grid2 sx={{ padding: "0", display: "flex" }}>
        <Grid2
          xs={2}
          sx={{
            padding: "0",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            background: "#DADADA",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            fontWeight: "600",
          }}
        >
          옵션
        </Grid2>
        <Grid2
          container
          xs={10}
          sx={{
            padding: "0",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            alignContent: "center",
          }}
        >
          {/* check 0 이면 아무것도 안나옴 */}
          {/* check 1 이면 옵션 선택없이 재고만 수정 */}
          {/* check 2 이면 옵션 고정으로 하고 옵션가, 수량만 수정 */}
          {check === 0 ? null : check === 1 ? (
            <Grid2
              container
              xs={12}
              sx={{
                padding: "0",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Grid2
                xs={12}
                sx={{
                  padding: "0",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  display: "flex",
                  alignContent: "center",
                }}
              >
                <TitleBox>
                  <Title>재고수량</Title>
                </TitleBox>
                <Input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  style={{ height: "3rem" }}
                />
              </Grid2>
            </Grid2>
          ) : check === 2 ? (
            <Grid2
              container
              xs={10}
              sx={{
                padding: "0",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                display: "flex",
                alignContent: "center",
                marginLeft: "0.5rem",
              }}
            >
              {show ? (
                <Grid2
                  container
                  xs={12}
                  sx={{
                    padding: "0",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    display: "flex",
                    alignContent: "center",
                    marginLeft: "0.2rem",
                  }}
                >
                  <TableContainer>
                    <thead>
                      <TableRow>
                        <Th colSpan={optionCount}>옵션</Th>
                        <Th rowSpan="2">옵션가</Th>
                        <Th rowSpan="2">수량</Th>
                      </TableRow>
                      <TableRow>
                        {optionNameList.map((e, idx) => (
                          <Th key={idx} style={{ width: "4rem" }}>
                            {e}
                          </Th>
                        ))}
                      </TableRow>
                    </thead>
                    <tbody>
                      {optionCount >= 3
                        ? optionValue1.map((v1, idx1) =>
                            optionValue2.map((v2, idx2) =>
                              optionValue3.map((v3, idx3) => (
                                <TableRow key={idx3}>
                                  <Td>{v1}</Td>
                                  <Td>{v2}</Td>
                                  <Td>{v3}</Td>
                                  <Td>
                                    <OptionInput
                                      onChange={(e) =>
                                        handleOptionPrice3(
                                          e,
                                          idx1 * (count2 * count3),
                                          idx2 * count3,
                                          idx3
                                        )
                                      }
                                      value={
                                        optionPrice[
                                          idx1 * (count2 * count3) +
                                            idx2 * count3 +
                                            idx3
                                        ]
                                          ? optionPrice[
                                              idx1 * (count2 * count3) +
                                                idx2 * count3 +
                                                idx3
                                            ]
                                          : 0
                                      }
                                    />
                                  </Td>
                                  <Td>
                                    <OptionInput
                                      onChange={(e) =>
                                        handleOptionStock3(
                                          e,
                                          idx1 * (count2 * count3),
                                          idx2 * count3,
                                          idx3
                                        )
                                      }
                                      value={
                                        optionStock[
                                          idx1 * (count2 * count3) +
                                            idx2 * count3 +
                                            idx3
                                        ]
                                          ? optionStock[
                                              idx1 * (count2 * count3) +
                                                idx2 * count3 +
                                                idx3
                                            ]
                                          : 0
                                      }
                                    />
                                  </Td>
                                </TableRow>
                              ))
                            )
                          )
                        : optionCount >= 2
                        ? optionValue1.map((v1, idx1) =>
                            optionValue2.map((v2, idx2) => (
                              <TableRow key={idx1 * count2 + idx2}>
                                <Td>{v1}</Td>
                                <Td>{v2}</Td>
                                <Td>
                                  <OptionInput
                                    onChange={(e) =>
                                      handleOptionPrice2(e, idx1 * count2, idx2)
                                    }
                                    value={
                                      optionPrice[idx1 * count2 + idx2]
                                        ? optionPrice[idx1 * count2 + idx2]
                                        : 0
                                    }
                                  />
                                </Td>
                                <Td>
                                  <OptionInput
                                    onChange={(e) =>
                                      handleOptionStock2(e, idx1 * count2, idx2)
                                    }
                                    value={
                                      optionStock[idx1 * count2 + idx2]
                                        ? optionStock[idx1 * count2 + idx2]
                                        : 0
                                    }
                                  />
                                </Td>
                              </TableRow>
                            ))
                          )
                        : optionCount >= 1
                        ? optionValue1.map((v1, idx1) => (
                            <TableRow key={idx1}>
                              <Td>{v1}</Td>
                              <Td>
                                <OptionInput
                                  onChange={(e) => handleOptionPrice1(e, idx1)}
                                  value={
                                    optionPrice[idx1] ? optionPrice[idx1] : 0
                                  }
                                />
                              </Td>
                              <Td>
                                <OptionInput
                                  onChange={(e) => handleOptionStock1(e, idx1)}
                                  value={
                                    optionStock[idx1] ? optionStock[idx1] : 0
                                  }
                                />
                              </Td>
                            </TableRow>
                          ))
                        : null}
                    </tbody>
                  </TableContainer>
                  <Grid2
                    xs={12}
                    sx={{
                      padding: "0",
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  ></Grid2>
                </Grid2>
              ) : null}
            </Grid2>
          ) : null}
        </Grid2>
      </Grid2>
      <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      <ButtonBox>
        <CancelButton onClick={() => props.setOpen(false)}>취소</CancelButton>
        <AddButton onClick={handleChangeOption}>수정</AddButton>
      </ButtonBox>
    </div>
  );
}

const TableContainer = styled.table`
  background-color: white;
  margin: 0;
  margin-left: 5rem;
  width: 85%;
  height: 10rem;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid black;
`;

const TableRow = styled.tr`
  width: 100%;
  height: 3rem;
  margin: 0;
`;

const Th = styled.th`
  margin: 0;
  border: 1px solid black;
  text-align: center;
  background-color: #c5e2ff;
`;

const Td = styled.td`
  margin: 0;
  border: 1px solid black;
  text-align: center;
  height: fit-content;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const OptionInput = styled.input`
  border: 0.1rem solid #000000;
  width: 80%;
  height: 2.5rem;
  font-size: 1.3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.5rem;
  width: 7rem;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
`;

const Input = styled.input`
  border: 0.1rem solid #000000;
  width: 17rem;
  height: 3rem;
  font-size: 1.3rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
`;

// 버튼 박스
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const CancelButton = styled.button`
  background-color: #fff;
  color: black;
  border: 1px solid;
  margin: 1rem;
  height: 3rem;
  width: 10rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  margin: 1rem;
  height: 3rem;
  width: 15rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
