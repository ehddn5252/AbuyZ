import React, { useEffect, useState } from "react";
import styled from "styled-components";

// mui
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function SaleProductOption() {
  // 옵션명 갯수
  const [optionCount, setOptionCount] = useState(1);

  // 옵션명 리스트
  const [optionNameList, setOptionNameList] = useState([]);

  // 옵션명 1
  const [optionName1, setOptionName1] = useState("");

  // 옵션값 1
  const [optionValue1, setOptionValue1] = useState([]);

  // 옵션값 갯수 1
  const [count1, setCount1] = useState(0);

  // 옵션명 2
  const [optionName2, setOptionName2] = useState("");

  // 옵션값 2
  const [optionValue2, setOptionValue2] = useState([]);

  // 옵션값 갯수 2
  const [count2, setCount2] = useState(0);

  // 옵션명 3
  const [optionName3, setOptionName3] = useState("");

  // 옵션값 3
  const [optionValue3, setOptionValue3] = useState([]);

  // 옵션값 갯수 3
  const [count3, setCount3] = useState(0);

  // 옵션 목록 보여주기
  const [show, setShow] = useState(false);

  // 옵션 여부 체크
  const [check, setCheck] = useState(0);

  // 옵션 미설정 시 재고수량
  const [stock, setStock] = useState(0);

  // 옵션명 갯수 뺴기
  const optionMinus = () => {
    if (optionCount > 1) {
      setOptionCount(optionCount - 1);
    }
  };

  // 옵션명 갯수 더하기
  const optionPlus = () => {
    if (optionCount < 3) {
      setOptionCount(optionCount + 1);
    }
  };

  // 옵션명 구하기 1
  const changeOptionName1 = (e) => {
    setOptionName1(e.target.value);
  };

  // 옵션값 구하기 1
  const changeOptionValue1 = (e) => {
    const value = e.target.value.split(",");
    for (let i = 0; i < value.length; i++) {
      value[i] = value[i].trim();
    }
    setOptionValue1(value);
    setCount1(value.length);
  };

  // 옵션명 구하기 2
  const changeOptionName2 = (e) => {
    setOptionName2(e.target.value);
  };

  // 옵션값 구하기 2
  const changeOptionValue2 = (e) => {
    const value = e.target.value.split(",");
    for (let i = 0; i < value.length; i++) {
      value[i] = value[i].trim();
    }
    setOptionValue2(value);
    setCount2(value.length);
  };

  // 옵션명 구하기 3
  const changeOptionName3 = (e) => {
    setOptionName3(e.target.value);
  };

  // 옵션값 구하기 3
  const changeOptionValue3 = (e) => {
    const value = e.target.value.split(",");
    for (let i = 0; i < value.length; i++) {
      value[i] = value[i].trim();
    }
    setOptionValue3(value);
    setCount3(value.length);
  };

  // 옵션 갯수에 맞는 optionNameList 만들기
  const changeShow = () => {
    setShow(!show);
    if (optionCount >= 3) {
      setOptionNameList([optionName1, optionName2, optionName3]);
    } else if (optionCount >= 2) {
      setOptionNameList([optionName1, optionName2]);
    } else if (optionCount >= 1) {
      setOptionNameList([optionName1]);
    }
  };

  // 옵션 체크
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("optionCheckbox");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
        if (check === i + 1) {
          setCheck(0);
        } else {
          setCheck(i + 1);
        }
      }
    }
  };

  return (
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
        <Grid2
          container
          xs={12}
          sx={{
            padding: "0",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            alignContent: "center",
            marginLeft: "5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            name="optionCheckbox"
            type="checkbox"
            value="1"
            style={{ width: "1.5rem", height: "1.5rem", fontWeight: "600" }}
            onChange={(e) => checkOnlyOne(e.target)}
          />
          <div
            style={{
              fontWeight: "600",
              marginRight: "3rem",
              marginLeft: "0.5rem",
            }}
          >
            옵션 선택{" "}
          </div>
          <input
            name="optionCheckbox"
            type="checkbox"
            value="2"
            style={{ width: "1.5rem", height: "1.5rem" }}
            onChange={(e) => checkOnlyOne(e.target)}
          />
          <div style={{ fontWeight: "600", marginLeft: "0.5rem" }}>
            옵션 미선택{" "}
          </div>
        </Grid2>
        {/* check 0 이면 아무것도 안나옴 */}
        {/* check 1 이면 옵션 선택없이 재고만 기입 */}
        {/* check 2 이면 옵션 기입 후 상세 옵션 선택 */}
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
                placeholder="숫자만 입력해주세요. ex) 50"
                onChange={(e) => setStock(e.target.value)}
                style={{ height: "3rem" }}
              />
            </Grid2>
            <Grid2
              xs={12}
              sx={{
                padding: "0",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <ButtonBox>
                <CancelButton>취소</CancelButton>
                <AddButton>등록</AddButton>
              </ButtonBox>
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
            <Grid2
              container
              xs={12}
              sx={{
                padding: "0",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                display: "flex",
                alignContent: "center",
              }}
            >
              <RowBox>
                <NameTitle>옵션명</NameTitle>
                <ValueTitle>옵션값</ValueTitle>
              </RowBox>
            </Grid2>
            <Grid2
              container
              xs={12}
              sx={{
                padding: "0",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                display: "flex",
                alignContent: "center",
              }}
            >
              {optionCount >= 1 ? (
                <RowBox>
                  <NameInput
                    placeholder="예시 : 사이즈"
                    onChange={changeOptionName1}
                  ></NameInput>
                  <ValueInput
                    placeholder="예시 : S, M, L ( , 로 구분)"
                    onChange={changeOptionValue1}
                  ></ValueInput>
                  <IndeterminateCheckBoxIcon
                    onClick={optionMinus}
                    sx={{ fontSize: "3rem", color: "gray", marginLeft: "1rem" }}
                  />
                  <AddBoxIcon onClick={optionPlus} sx={{ fontSize: "3rem" }} />
                </RowBox>
              ) : null}
              {optionCount >= 2 ? (
                <RowBox>
                  <NameInput
                    placeholder="예시 : 사이즈"
                    onChange={changeOptionName2}
                  ></NameInput>
                  <ValueInput
                    placeholder="예시 : S, M, L ( , 로 구분)"
                    onChange={changeOptionValue2}
                  ></ValueInput>
                  <IndeterminateCheckBoxIcon
                    onClick={optionMinus}
                    sx={{ fontSize: "3rem", color: "gray", marginLeft: "1rem" }}
                  />
                  <AddBoxIcon onClick={optionPlus} sx={{ fontSize: "3rem" }} />
                </RowBox>
              ) : null}
              {optionCount >= 3 ? (
                <RowBox>
                  <NameInput
                    placeholder="예시 : 사이즈"
                    onChange={changeOptionName3}
                  ></NameInput>
                  <ValueInput
                    placeholder="예시 : S, M, L ( , 로 구분)"
                    onChange={changeOptionValue3}
                  ></ValueInput>
                  <IndeterminateCheckBoxIcon
                    onClick={optionMinus}
                    sx={{ fontSize: "3rem", color: "gray", marginLeft: "1rem" }}
                  />
                  <AddBoxIcon onClick={optionPlus} sx={{ fontSize: "3rem" }} />
                </RowBox>
              ) : null}
            </Grid2>
            <SearchButton onClick={changeShow}>
              상품 등록 후 상세 옵션 설정
            </SearchButton>
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
                        <Th key={idx}>{e}</Th>
                      ))}
                    </TableRow>
                  </thead>
                  <tbody>
                    {optionCount >= 3
                      ? optionValue1.map((v1) =>
                          optionValue2.map((v2) =>
                            optionValue3.map((v3, idx) => (
                              <TableRow key={idx}>
                                <Td>{v1}</Td>
                                <Td>{v2}</Td>
                                <Td>{v3}</Td>
                                <Td>
                                  <OptionInput placeholder="숫자만 입력해주세요. ex) 19000" />
                                </Td>
                                <Td>
                                  <OptionInput placeholder="숫자만 입력해주세요. ex) 100" />
                                </Td>
                              </TableRow>
                            ))
                          )
                        )
                      : optionCount >= 2
                      ? optionValue1.map((v1) =>
                          optionValue2.map((v2, idx) => (
                            <TableRow key={idx}>
                              <Td>{v1}</Td>
                              <Td>{v2}</Td>
                              <Td>
                                <OptionInput placeholder="숫자만 입력해주세요. ex) 19000" />
                              </Td>
                              <Td>
                                <OptionInput placeholder="숫자만 입력해주세요. ex) 100" />
                              </Td>
                            </TableRow>
                          ))
                        )
                      : optionCount >= 1
                      ? optionValue1.map((v1, idx) => (
                          <TableRow key={idx}>
                            <Td>{v1}</Td>
                            <Td>
                              <OptionInput placeholder="숫자만 입력해주세요. ex) 19000" />
                            </Td>
                            <Td>
                              <OptionInput placeholder="숫자만 입력해주세요. ex) 100" />
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
                >
                  <ButtonBox>
                    <CancelButton>취소</CancelButton>
                    <AddButton>등록</AddButton>
                  </ButtonBox>
                </Grid2>
              </Grid2>
            ) : null}
          </Grid2>
        ) : null}
      </Grid2>
    </Grid2>
  );
}

const RowBox = styled.div`
  display: flex;
  font-size: 1.5rem;
  width: 100%;
  padding-top: 1rem;
  margin-left: 5.5rem;
`;

const NameTitle = styled.div`
  width: 10%;
  font-size: 1.3rem;
  font-weight: 800;
  margin-right: 2rem;
`;

const ValueTitle = styled.div`
  width: 70%;
  font-size: 1.3rem;
  font-weight: 800;
  margin-left: 9rem;
`;

const NameInput = styled.input`
  border: 0.1rem solid #000000;
  width: 20%;
  height: 3rem;
  font-size: 1.3rem;
  margin-right: 2rem;
  padding-left: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;

const ValueInput = styled.input`
  border: 0.1rem solid #000000;
  width: 60%;
  height: 100%;
  font-size: 1.3rem;
  padding-left: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;

const SearchButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  margin: 1rem;
  height: 3rem;
  width: 15rem;
  font-size: 1rem;
  margin-left: 5rem;
  &:hover {
    cursor: pointer;
  }
`;

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

// 옵션 미설정 시

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5.5rem;
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
