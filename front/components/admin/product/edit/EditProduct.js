import React, { useState, useEffect } from "react";
import styled from "styled-components";

// API
import { productDetail } from "../../../../pages/api/product";
import { getStockInventory } from "../../../../pages/api/product";

// mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid2 from "@mui/material/Unstable_Grid2";
import CloseIcon from "@mui/icons-material/Close";

// 컴포넌트
import EditCategory from "./EditCategory";
import EditInfo from "./EditInfo";
import EditMarketing from "./EditMarketing";
import EditOption from "./EditOption";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "80%",
  overflowY: "scroll",
};

const small_categories_uid = {
  과일: 1,
  채소: 2,
  고기: 3,
  "과자, 디저트, 아이스크림": 4,
  "생수, 음료, 주류": 5,
  "세제, 방향, 살충": 6,
  세탁용품: 7,
  청소용품: 8,
  욕실용품: 9,
  주방용품: 10,
  주방가구: 11,
  거실가구: 12,
  "커튼, 블라인드": 13,
  "학생, 사무가구": 14,
  침실가구: 15,
  도서: 16,
  "노트, 다이어리": 17,
  사료: 18,
  필기류: 19,
  "반려동물 용품": 20,
  스킨케어: 21,
  향수: 22,
  "헤어, 바디": 23,
  메이크업: 24,
  네일: 25,
  "유아동 의류": 26,
  "유아동 신발": 27,
  "기저귀, 물티슈": 28,
  "장난감, 완구": 29,
  유아동가구: 30,
  "TV/영상가전": 31,
  생활가전: 32,
  주방가전: 33,
  계절가전: 34,
  "헬스, 요가, 수영": 35,
  "자전거, 스키, 레저": 36,
  "자동차, 오토바이": 37,
  "등산, 아웃도어": 38,
  "캠핑, 낚시": 39,
};

export default function EditProduct({ productInfo }) {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 소분류 uid
  const [smallCategoriesUid, setSmallCategoriesUid] = useState(
    small_categories_uid[productInfo.smallCategoryName]
  );

  // 상품명
  const [name, setName] = useState(productInfo.name);

  // 할인
  const [discountRate, setDiscountRate] = useState(productInfo.discountRate);

  // 대표가격
  const [price, setPrice] = useState(productInfo.price);

  // 배송비
  const [deliveryFee, setDeliveryFee] = useState(productInfo.deliveryFee);

  // 브랜드명
  const [brandName, setBrandName] = useState(productInfo.brandName);

  // 키워드
  const [keywords, setKeywords] = useState(
    productInfo.productKeywords.join(", ")
  );

  // 대표 이미지
  const [mainImg, setMainImg] = useState(null);

  // 추가 이미지
  const [extraImg, setExtraImg] = useState(null);

  // 상세 이미지
  const [descImg, setDescImg] = useState(null);

  // 옵션
  const [optionDetail, setOptionDetail] = useState(null);

  // 옵션 없는 상품 총 재고
  const [totalCount, setTotalCount] = useState(0);

  // 옵션 없는 상품 uid
  const [noOptionUid, setNoOptionUid] = useState(0);

  const getDetail = async () => {
    const tmp = await productDetail(productInfo.uid);
    // console.log(tmp, "@@@");
    setMainImg(tmp.data.products.repImg);
    setExtraImg(tmp.data.productPictureDto);
    setDescImg(tmp.data.products.descriptionImg);
    setOptionDetail(tmp.data.productOptionListMap);
  };

  const getStock = async () => {
    const sub = await getStockInventory(productInfo.uid);
    let sub_c = 0;
    if (sub[0]) {
      if (Object.keys(sub[0].productOptions[0]).includes("x")) {
        setNoOptionUid(sub[0].productOptionUidString);
        console.log(sub[0].productOptionUidString, "옵션 선택 안했음");
      }
      for (let i = 0; i < sub.length; i++) {
        sub_c += sub[i].count;
      }
      setTotalCount(sub_c);
    }
  };

  useEffect(() => {
    getDetail();
    getStock();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <EditButton
        onClick={() => {
          handleOpen(), getDetail();
        }}
      >
        수정하기
      </EditButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid2
            container
            spacing={1}
            sx={{ padding: "0", margin: "0", background: "#fff" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  paddingLeft: "2rem",
                  margin: "0",
                  paddingTop: "2rem",
                  paddingBottom: "1rem",
                }}
              >
                상품 수정
              </h2>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  cursor: "pointer",
                  marginRight: "2rem",
                  marginTop: "2rem",
                }}
              />
            </div>
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            >
              <hr style={{ background: "#000", margin: "0", padding: "0" }} />
            </Grid2>
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            >
              {/* 카테고리 */}
              <EditCategory
                setSmallCategoriesUid={setSmallCategoriesUid}
                bigCategoryName={productInfo.bigCategoryName}
                smallCategoryName={productInfo.smallCategoryName}
              />
              <hr
                style={{ background: "#ff9494", margin: "0", padding: "0" }}
              />
              {/* 판매정보 */}
              <EditInfo
                setName={setName}
                setDiscountRate={setDiscountRate}
                setPrice={setPrice}
                setDeliveryFee={setDeliveryFee}
                nameInfo={productInfo.name}
                discountRateInfo={productInfo.discountRate}
                priceInfo={productInfo.price}
                deliveryFeeInfo={productInfo.deliveryFee}
              />
              <hr
                style={{ background: "#ff9494", margin: "0", padding: "0" }}
              />
              {/* 마케팅 정보 */}
              <EditMarketing
                setBrandName={setBrandName}
                setKeywords={setKeywords}
                brandName={productInfo.brandName}
                keywords={productInfo.productKeywords}
              />
              <hr
                style={{ background: "#ff9494", margin: "0", padding: "0" }}
              />
              {/* 옵션 */}
              <EditOption
                smallCategoriesUid={smallCategoriesUid}
                name={name}
                discountRate={discountRate}
                price={price}
                deliveryFee={deliveryFee}
                brandName={brandName}
                keywords={keywords}
                optionDetail={optionDetail}
                totalCount={totalCount}
                setOpen={setOpen}
                noOptionUid={noOptionUid}
                productUid={productInfo.uid}
              />
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
    </div>
  );
}

const EditButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  font-size: 1rem;
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;
