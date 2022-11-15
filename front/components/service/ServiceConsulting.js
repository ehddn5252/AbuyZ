// react
import React, { useEffect, useState } from "react";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";

import { submitNum } from "../../states";
import { useRecoilState } from "recoil";

// styled
import styled from "@emotion/styled";

// dropdown
import "react-dropdown/style.css";

// 하위 component
import ProductSelectModal from "./ProductSelectModal";

// api
import { customercenter } from "../../pages/api/customercenter";
import axios from "axios";

export default function ServiceConsulting() {
  const [pageNum, setPageNum] = useRecoilState(submitNum);

  const router = useRouter();
  // 드롭다운 이름 변경할 변수
  const [categoryname, setCategoryname] = useState("");
  // 환불 시 보여줄 상품 날짜, 이미지, 이름, 옵션, 가격, 수량
  const [date, setDate] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [options, setOptions] = useState([]);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);

  // 문의 등록시 문의 카테고리, 문의 제목, 문의 내용, 파일, (환불시) 주문 uid
  // 이미지 정보
  const [imgData, setImgData] = useState(null);
  // 이미지 미리 보기
  const [imgPreview, setImgPreview] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [orderUid, setOrderUid] = useState(0);
  const [idxSelected, setIdxSelected] = useState(-1);

  // 드롭다운 이름 변경
  const handleChange = (event) => {
    setCategoryname(event.target.value);
    setCategory(event.target.value);
  };

  // 문의 등록 api 연결
  const handleSubmit = async () => {
    let formData = new FormData();

    if (idxSelected === -1) {
      var customerCenterWriteReqDto = {
        title: title,
        content: content,
        customer_center_category: category,
      };
    } else {
      var customerCenterWriteReqDto = {
        title: title,
        content: content,
        customer_center_category: category,
        order_uid: orderUid,
      };
    }

    console.log(customerCenterWriteReqDto);
    formData.append(
      "customerCenterWriteReqDto",
      new Blob([JSON.stringify(customerCenterWriteReqDto)], {
        type: "application/json",
      })
    );

    if (imgData !== null) {
      formData.append("file", imgData[0]);
    }
    const accessToken = sessionStorage.getItem("access-token");
    axios.defaults.headers.common["access_token"] = accessToken;

    axios
      .post("https://k7e201.p.ssafy.io:8081/api/customer-center", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res, "문의등록 성공!");
        alert("문의를 등록하였습니다.");
        setPageNum(2);
        router.push("/mypage");
      })
      .catch((err) => {
        console.log(err, "문의등록에 실패하였습니다.");
      });
  };

  // 문의하는 문의 카테고리, 드롭다운에 사용
  const [currentValue, setCurrentValue] = useState("상품");
  // 교환 일 때 상품 상세 정보 보여주기
  const [isExchange, setIsExchange] = useState(false);
  // 상품 선택 할 수 있는 모달 보여주기
  const [modalOpen, setModalOpen] = useState(false);

  // 모달 보여주기
  const showModal = () => {
    setModalOpen(true);
  };
  // 환불이 아닌 카테고리 클릭시
  const handleOnChangeSelectValue = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
    setIsExchange(false);
    setIdxSelected(-1);
    setName("");
  };
  // 환불 카테고리 클릭시
  const handleOnChangeSelectValueex = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
    setIsExchange(true);
    setIdxSelected(-1);
    setName("");
  };
  // 이미 선택된 상품 변경하기
  const deleteSelect = () => {
    setName("");
    setIdxSelected(-1);
  };

  const uploadImage = (e) => {
    const imgList = e.target.files;
    const target = Object.values(imgList);

    if (target.length < 2) {
      setImgData(target);
      if (target !== []) {
        const a = [];
        const subUrl = URL.createObjectURL(target[0]);
        a.push({
          file: target[0],
          thumbnail: subUrl,
          type: target[0].type.slice(0, 5),
        });
        setImgPreview(a);
      }
    } else {
      alert("최대 1개까지 등록 가능합니다.");
    }
  };

  return (
    <Container>
      <MajorTitle>1 : 1 문의하기</MajorTitle>
      <Hr />
      <AllDiv>
        <ElementContainer>
          <span>카테고리</span>
        </ElementContainer>
        <ElementContent>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              문의 유형 선택
            </InputLabel>
            <Select
              value={categoryname}
              onChange={handleChange}
              displayEmpty
              fullWidth
            >
              <MenuItem
                value={"상품"}
                onClick={(e) => handleOnChangeSelectValue(e)}
              >
                상품
              </MenuItem>
              <MenuItem
                value={"교환_환불"}
                onClick={(e) => handleOnChangeSelectValueex(e)}
              >
                환불
              </MenuItem>
              <MenuItem
                value={"이벤트"}
                onClick={(e) => handleOnChangeSelectValue(e)}
              >
                이벤트 프로모션
              </MenuItem>
              <MenuItem
                value={"사이트_개선"}
                onClick={(e) => handleOnChangeSelectValue(e)}
              >
                사이트 개선
              </MenuItem>
              <MenuItem
                value={"주문결제"}
                onClick={(e) => handleOnChangeSelectValue(e)}
              >
                주문 / 결제
              </MenuItem>
            </Select>
          </FormControl>
        </ElementContent>
      </AllDiv>

      {/* 교환/환불일 경우만 보여줌 */}
      {isExchange == true ? (
        <AllDiv>
          <ElementContainer>
            <span>상품 선택</span>
          </ElementContainer>
          <ElementContent>
            {name.length > 0 ? (
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flex: "2" }}>
                    <Img src={img}></Img>
                  </div>
                  <div style={{ flex: "8", marginTop: "1.7rem" }}>
                    <span style={{ fontWeight: "bold" }}>{name}</span>
                    <br></br>
                    {Object.keys(options[0])[0] === "x" ? null : (
                      <div>
                        {options.map((e, idx) => (
                          <div key={idx}>
                            {Object.keys(e) == "x" ? null : (
                              <span>{Object.keys(e)} :</span>
                            )}
                            {e[Object.keys(e)] == "x" ? null : (
                              <span> {e[Object.keys(e)]}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <span style={{ color: "#aaaaaa" }}>
                      {price.toLocaleString("ko-KR")}원 | {count}개
                    </span>
                    <br></br>
                    <span style={{ color: "#aaaaaa" }}>
                      주문일시: {date.slice(0, 10)}
                    </span>
                  </div>
                  <IconDiv>
                    <CloseIcon
                      onClick={deleteSelect}
                      sx={{ color: "#56a9f1" }}
                    ></CloseIcon>
                  </IconDiv>
                </div>
              </div>
            ) : (
              <div>
                <SelectButton onClick={showModal}>상품 선택</SelectButton>
                {modalOpen && (
                  <ProductSelectModal
                    idxSelected={idxSelected}
                    setIdxSelected={setIdxSelected}
                    setModalOpen={setModalOpen}
                    setDate={setDate}
                    setImg={setImg}
                    setName={setName}
                    setOptions={setOptions}
                    setPrice={setPrice}
                    setCount={setCount}
                    setOrderUid={setOrderUid}
                  ></ProductSelectModal>
                )}
              </div>
            )}
          </ElementContent>
        </AllDiv>
      ) : null}

      <AllDiv>
        <ElementContainer>
          <span>문의 제목</span>
        </ElementContainer>
        <ElementContent>
          <TextField
            placeholder="문의 제목을 입력해주세요."
            required
            fullWidth
            onChange={(event) => setTitle(event.currentTarget.value)}
          ></TextField>
        </ElementContent>
      </AllDiv>
      <AllDiv>
        <ElementContainer>
          <span>문의 내용</span>
        </ElementContainer>
        <ElementContent>
          <TextField
            placeholder="문의 내용을 입력해주세요."
            required
            fullWidth
            onChange={(event) => setContent(event.currentTarget.value)}
          ></TextField>
        </ElementContent>
      </AllDiv>
      <AllDiv>
        <ElementContainer>
          <span>사진 첨부</span>
          <br></br>
          <span>(선택사항)</span>
        </ElementContainer>
        <ElementContent>
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={uploadImage}
            style={{ marginLeft: "1rem" }}
          />
        </ElementContent>
        <div style={{ display: "flex" }}>
          {imgPreview.map((e, idx) => (
            <div key={idx} style={{ marginRight: "1rem" }}>
              <Img src={e.thumbnail} alt={e.type} onClick={uploadImage} />
            </div>
          ))}
        </div>
      </AllDiv>

      <ButtonCont>
        <YesButton type="submit" onClick={handleSubmit}>
          등록
        </YesButton>
      </ButtonCont>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 56rem;
  min-height: 80vh;
`;

const Hr = styled.hr`
  height: 0.3rem;
  background: #7895b2;
  border-radius: 1rem;
`;

const ElementContainer = styled.div`
  flex: 2;
  margin-top: 1rem;
`;
const ElementContent = styled.div`
  flex: 10;
`;
const AllDiv = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: row;
`;

const YesButton = styled.button`
  background-color: #56a9f1;
  border: none;
  border-radius: 5px;
  height: 3.3rem;
  width: 8rem;
  color: white;
`;

const SelectButton = styled.button`
  background-color: white;
  padding: 0.7rem 0.8rem 0.7rem 0.8rem;
  border: 1px solid;
  color: #56a9f1;
  border-color: #56a9f1;
  border-radius: 5px;
  width: 100%;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;

const Img = styled.img`
  width: 6rem;
  height: 8rem;
  object-fit: cover;
`;

const IconDiv = styled.div`
  flex: 2;
  display: flex;
  justify-content: end;
  margin-top: 0.7rem;
`;

const ButtonCont = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
