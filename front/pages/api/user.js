import https from "./https.js";

// 회원가입
export async function signup(signDto) {
  return new Promise((resolve) => {
    https.post("/user/signup", signDto).then((response) => {
      if (response.status === 200) {
        console.log("회원가입 완료", response);
        resolve(response);
      } else {
        console.log("회원가입 실패", response);
        resolve(response);
      }
    });
  });
}

// 로그인
export async function login(loginDto) {
  return new Promise((resolve) => {
    https.post("/user/login", loginDto).then((response) => {
      if (response.status === 200) {
        console.log("로그인 완료", response.data.data.access_token);
        // 토큰 저장
        window.sessionStorage.setItem(
          "access-token",
          response.data.data.access_token
        );

        resolve(response);
      } else {
        console.log("로그인 실패", response);
        resolve(response);
      }
    });
  });
}

// 유저 정보 조회
export async function getMyInfo() {
  return new Promise((resolve) => {
    // Header에 토큰 집어넣기
    const accessToken = sessionStorage.getItem("access-token");
    https.defaults.headers.common["access_token"] = accessToken;

    https.get("/user").then((response) => {
      if (response.status === 200) {
        console.log("내 정보 조회 성공", response);
        resolve(response.data);
      } else {
        console.log("내 정보 조회 실패", response);
        resolve(response);
      }
    });
  });
}

// 회원 탈퇴
export async function withdrawal() {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  return new Promise((resolve) => {
    https.put("/user/withdrawal").then((response) => {
      if (response.status === 200) {
        console.log("회원 탈퇴 여부", response.data.message);
        resolve(response.data);
      } else {
        console.log("회원 탈퇴 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 이메일 인증 번호 전송
export async function sendCheckNumber(email) {
  return new Promise((resolve) => {
    https.get(`/user/send-email/${email}`).then((response) => {
      if (response === 200) {
        console.log("이메일 인증 성공", response);
        resolve(response.data);
      } else {
        console.log("이메일 인증 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}
// 이메일 인증
export async function emailCheck(emailDto) {
  return new Promise((resolve) => {
    https
      .post("/user/authentication-email", {
        email: emailDto.email,
        certification_number: emailDto.certification_number,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("이메일 인증 성공", response);
          resolve(response.data);
        } else {
          console.log("이메일 인증 실패", response);
          resolve(response);
        }
      });
  }).catch((e) => {
    console.log(e);
  });
}

// 비밀번호 변경
export function chnagePw(pwDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-Token");
  https.defaults.headers.common["access_token"] = accessToken;

  https
    .put("/user/change-pw", {
      password: pwDto.password,
      new_password: pwDto.new_password,
    })
    .then((response) => {
      if (response === 200) {
        console.log("비밀번호 변경 성공", response);
        return response;
      } else {
        console.log("비밀번호 변경 실패", response);
        return response;
      }
    });
}

// 닉네임 중복 확인
export async function checkNickname(nickname) {
  return new Promise((resolve) => {
    https.get(`/user/check-nickname/${nickname}`).then((response) => {
      if (response.status === 200) {
        console.log("닉네임 중복 확인 성공", response);
        resolve(response.data);
      } else {
        console.log("닉네임 중복 확인 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 이메일 중복 확인
export async function checkEmail(email) {
  return new Promise((resolve) => {
    https.get(`/user/check-email/${email}`).then((response) => {
      if (response.status === 200) {
        console.log("이메일 중복 확인 성공", response);
        resolve(response.data);
      } else {
        console.log("이메일 중복 확인 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 주소 추가
export function addAddress(addressDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  https
    .post("/user/addresses", {
      nickname: addressDto.nickname,
      address: addressDto.address,
      detailAddress: addressDto.detailAddress,
      postalCode: addressDto.postalCode,
      recipient: addressDto.recipient,
      contact1: addressDto.contact1,
      contact2: addressDto.contact2,
      note: addressDto.note,
    })
    .then((response) => {
      if (response === 200) {
        console.log("주소 추가 성공", response);
        return response;
      } else {
        console.log("주소 추가 실패", response);
        return response;
      }
    });
}

// 주소 조회
export function getAddress() {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  https.get("/user/addresses").then((response) => {
    if (response === 200) {
      console.log("주소 조회 성공", response);
      return response;
    } else {
      console.log("주소 조회 실패", response);
      return response;
    }
  });
}

// 주소 삭제
export function delAddress(number) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;

  https.delete(`/user/addresses/${number}`).then((response) => {
    if (response === 200) {
      console.log("주소 삭제 성공", response);
      return response;
    } else {
      console.log("주소 삭제 실패", response);
      return response;
    }
  });
}

// 주소 수정
export function changeAddress(addressDto) {
  // Header에 토큰 집어넣기
  const accessToken = localStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  https.put("/user/addresses", addressDto).then((response) => {
    if (response === 200) {
      console.log("주소 수정 성공", response);
      return response;
    } else {
      console.log("주소 수정 실패", response);
      return response;
    }
  });
}

// 임시비밀번호 발송 완료
export async function findPW(pwDto) {
  return new Promise((resolve) => {
    https.post("/user/find-pw", pwDto).then((response) => {
      if (response.status === 200) {
        console.log("임시비밀번호 전송 성공 ", response);
        resolve(response);
      } else {
        console.log("임시비밀번호 전송 실패", response);
        resolve(response);
      }
    });
  });
}