import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

// api
import { regisreview } from "../../pages/api/review";
import axios from "axios";

export default function ReviewAddModel({
  productName,
  productOptions,
  setOpen,
  image,
  orderUid,
  productUid,
}) {
  // // 상품 이름
  // console.log(productName, "1");
  // // 모르겠음
  // console.log(productOptions, "2");
  // // 모달 닫는 거
  // console.log(setOpen, "3");
  // // 이미지 url
  // console.log(image, "4");
  // // 오더 번호
  // console.log(orderUid, "5");
  // // 상품 번호
  // console.log(productUid, "6");
  // http://localhost:8080/api/review
  // { "product_uid" : 519, "rating": 1.0, "content" : "사람이실수할수도있지", "order_uid" : 50 }
  // 평점
  const [value, setValue] = useState(0);
  // 리뷰 내용
  const [content, setContent] = useState("");
  // 이미지 정보
  const [imgData, setImgData] = useState(null);
  // 이미지 미리 보기
  const [imgPreview, setImgPreview] = useState([]);

  // 리뷰 등록 API
  const regisrv = () => {
    let formData = new FormData();

    let reviewDto = {
      product_uid: productUid,
      rating: value,
      content: content,
      order_uid: orderUid,
    };
    console.log(reviewDto);

    formData.append(
      "dto",
      new Blob([JSON.stringify(reviewDto)], { type: "application/json" })
    );

    for (let i = 0; i < imgData.length; i++) {
      formData.append("file", imgData[i]);
    }

    const accessToken = sessionStorage.getItem("access-token");
    axios.defaults.headers.common["access_token"] = accessToken;

    axios
      .post("https://k7e201.p.ssafy.io:8081/api/review", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res, "리뷰등록 성공!");
        alert("리뷰를 등록하였습니다.");
        closeModal();
      })
      .catch((err) => {
        console.log(err, "리뷰등록에 실패하였습니다.");
      });
  };

  // 모달 닫기
  const closeModal = () => {
    setOpen(false);
  };

  // 이미지 등록 함수
  const uploadImage = (e) => {
    const imgList = e.target.files;
    const target = Object.values(imgList);
    if (target.length < 3) {
      setImgData(target);
      if (target !== []) {
        const a = [];
        for (let i = 0; i < target.length; i++) {
          const subUrl = URL.createObjectURL(target[i]);
          a.push({
            file: target[i],
            thumbnail: subUrl,
            type: target[i].type.slice(0, 5),
          });
        }
        setImgPreview(a);
      }
    } else {
      alert("최대 2개까지 등록 가능합니다.");
    }
  };

  return (
    <Container>
      <IconDiv>
        <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
      </IconDiv>
      <ModalTitle style={{ fontWeight: "bold", fontSize: "2rem" }}>
        리뷰 작성
      </ModalTitle>
      <Box sx={{ display: "flex", marginTop: "2rem" }}>
        <ProductImg src={image}></ProductImg>
        <ProductInfo>
          <span style={{ fontWeight: "bold" }}>{productName}</span>
          {/* <span>{productOptions}</span> */}
        </ProductInfo>
        {/* <p>{product.productName}</p> */}
      </Box>
      <div style={{ marginTop: "2rem" }}>
        <span>별점등록 [{value}/5]</span>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <span style={{ marginBottom: "1rem" }}>리뷰 내용</span>
        <AnswerDiv
          onChange={(event) => setContent(event.target.value)}
        ></AnswerDiv>
      </div>
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <div style={{ marginBottom: "1rem", display: "flex" }}>
          <span>사진 첨부</span>
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={uploadImage}
            multiple="multiple"
            style={{ marginLeft: "1rem" }}
          />
        </div>
        <div style={{ display: "flex" }}>
          {imgPreview.map((e, idx) => (
            <div key={idx} style={{ marginRight: "1rem" }}>
              <img
                src={e.thumbnail}
                alt={e.type}
                onClick={uploadImage}
                width="110px"
                height="140px"
              />
            </div>
          ))}
        </div>
      </div>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button variant="contained" onClick={regisrv}>
          등록
        </Button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 90%;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
  padding: 2rem;
`;

const ProductImg = styled.img`
  width: 4rem;
  height: 5rem;
`;
const AnswerDiv = styled.textarea`
  width: 100%;
  height: 10rem;
  margin-top: 1rem;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-top: 1rem;
`;

const RateContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2rem;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ModalTitle = styled.h1``;
