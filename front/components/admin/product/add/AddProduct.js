import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 컴포넌트
import AddEditCategory from "./AddEditCategory";
import AddEditInfo from "./AddEditInfo";
import AddEditOption from "./AddEditOption";
import AddEditImage from "./AddEditImage";
import AddEditMarketing from "./AddEditMarketing";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

import { regisProduct } from "../../../../pages/api/product";

export default function AddProduct() {
  // 소분류 uid
  const [smallCategoriesUid, setSmallCategoriesUid] = useState(0);

  // 상품명
  const [name, setName] = useState("");

  // 할인
  const [discountRate, setDiscountRate] = useState(0);

  // 대표가격
  const [price, setPrice] = useState(0);

  // 배송비
  const [deliveryFee, setDeliveryFee] = useState(0);

  // 브랜드명
  const [brandName, setBrandName] = useState("");

  // 키워드
  const [keywords, setKeywords] = useState("");

  // 메타태그
  const [metaTag, setMetaTag] = useState("");

  // 대표 이미지
  const [mainImg, setMainImg] = useState(null);

  // 추가 이미지
  const [extraImg, setExtraImg] = useState(null);

  // 상세 이미지
  const [descImg, setDescImg] = useState(null);

  return (
    <Grid2 container spacing={2} sx={{ padding: "0", margin: "0" }}>
      <Grid2 xs={12} sx={{ padding: "0", margin: "0", background: "white" }}>
        {/* 카테고리 */}
        <AddEditCategory setSmallCategoriesUid={setSmallCategoriesUid} />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 판매정보 */}
        <AddEditInfo
          setName={setName}
          setDiscountRate={setDiscountRate}
          setPrice={setPrice}
          setDeliveryFee={setDeliveryFee}
        />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 마케팅 정보 */}
        <AddEditMarketing
          setBrandName={setBrandName}
          setKeywords={setKeywords}
          setMetaTag={setMetaTag}
        />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 이미지 */}
        <AddEditImage
          setMainImg={setMainImg}
          setExtraImg={setExtraImg}
          setDescImg={setDescImg}
        />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
        {/* 옵션 */}
        <AddEditOption
          smallCategoriesUid={smallCategoriesUid}
          name={name}
          discountRate={discountRate}
          price={price}
          deliveryFee={deliveryFee}
          brandName={brandName}
          keywords={keywords}
          metaTag={metaTag}
          mainImg={mainImg}
          extraImg={extraImg}
          descImg={descImg}
        />
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      </Grid2>
    </Grid2>
  );
}
