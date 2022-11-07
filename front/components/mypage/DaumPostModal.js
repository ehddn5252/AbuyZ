import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import DaumPostcode from "react-daum-postcode";
export default function DaumPostModal({
  setAddressOpen,
  setAddress,
  setPostccode,
}) {
  const closeModal = () => {
    setAddressOpen(false);
  };
  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    setAddress(fullAddr);
    setPostccode(data.zonecode);
    setAddressOpen(false);
  };
  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "95%",
    height: "90%",
    zIndex: 100,
  };
  return (
    <DaumModalContainer>
      <CloseIconDiv>
        <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
      </CloseIconDiv>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={onCompletePost}
      />
    </DaumModalContainer>
  );
}
const DaumModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  border: 2px solid;
  border-color: #56a9f1;
  background-color: white;
  box-shadow: 24;
  border-radius: 5px;
  padding: 1rem;
  height: 40rem;
`;

const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
