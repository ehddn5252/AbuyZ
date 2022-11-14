import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { eachGetOrderList } from "../../pages/api/order";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";

export default function ProductBundleItem({ orderuid }) {
  console.log("dhej", orderuid);
  const [selected, setSelected] = useState(0);

  const [productList, setProductList] = useState([]);
  const bundleitem = async () => {
    let productlist = [];
    for (var j = 0; j < orderuid.length; j++) {
      const res = await eachGetOrderList(orderuid[j]);
      for (var k = 0; k < res.data.length; k++) {
        productlist.push(res.data[k]);
      }
    }
    setProductList(productlist);
  };
  console.log(productList);
  useEffect(() => {
    bundleitem();
  }, []);

  return (
    <ItemContainer>
      {productList ? (
        <div>
          {productList.map((e, idx) => (
            <Container key={idx} onClick={() => setSelected(idx)}>
              <IconDiv>
                {selected === idx ? (
                  <ExpandCircleDownOutlinedIcon
                    sx={{ color: "#56a9f1" }}
                  ></ExpandCircleDownOutlinedIcon>
                ) : (
                  <div>
                    <CircleOutlinedIcon
                      sx={{ color: "rgb(128, 128, 128, 0.7)" }}
                    ></CircleOutlinedIcon>
                  </div>
                )}
              </IconDiv>

              <div style={{ flex: "1" }}>
                <ProductImg src={e.inventoryDto.productDto.descriptionImg} />
              </div>
              <InfoContainer>
                <ProductIntro>{e.inventoryDto.productDto.name}</ProductIntro>
                {e.inventoryDto.productOptions.length > 0 ? (
                  <div>
                    {e.inventoryDto.productOptions.map((e, idx) => (
                      <div key={idx}>
                        {Object.keys(e) == "x" ? null : (
                          <span>[{Object.keys(e)} :</span>
                        )}
                        {e[Object.keys(e)] == "x" ? null : (
                          <span> {e[Object.keys(e)]}]</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}
              </InfoContainer>
            </Container>
          ))}
        </div>
      ) : null}
    </ItemContainer>
  );
}

const IconDiv = styled.div`
  flex: 1;
  margin-top: 3rem;
  margin-left: 1rem;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.3rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductImg = styled.img`
  width: 3rem;
  height: 4rem;
  object-fit: cover;
  border: 1px solid black;
`;

const InfoContainer = styled.div`
  flex: 7;
  margin-left: 2rem;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  flex: 1;
  margin-top: 1.5rem;
`;

const ProductoptionsInfo = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  padding-top: 1rem;
  color: black;
`;
const ProductIntro = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
  font-weight: bolder;
  padding-top: 1rem;
`;

const ReviewFinishButton = styled.button`
  background-color: #aaaaaa;
  color: white;
  width: 7rem;
  border: none;
  height: 2rem;
  border-radius: 5px;
`;

const ReviewButton = styled.button`
  background-color: #56a9f1;
  color: white;
  width: 7rem;
  border: none;
  height: 2rem;
  border-radius: 5px;
`;

const CartButton = styled.button`
  background-color: white;
  color: #56a9f1;
  width: 7rem;
  border: 1px solid #56a9f1;
  margin-top: 1rem;
  height: 2rem;
  border-radius: 5px;
`;
