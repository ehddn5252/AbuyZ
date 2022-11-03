import https from "./https.js";

const setCookie = (key, value, expiredDays) => {
  // 자동 삭제 날짜를 지정하는 코드
  let today = new Date();
  today.setDate(today.getDate() + expiredDays);
  // 쿠키에 값을 저장
  document.cookie =
    key +
    "=" +
    JSON.stringify(value) +
    "; path=/; expires=" +
    today.toGMTString() +
    ";";
};

const getCookie = (key) => {
  //쿠키는 한번에 모두 불러와지기 때문에 사용할때 ';'나눠서 선택적으로 가져와야한다.
  const cookies = document.cookie.split(`; `).map((el) => el.split("="));
  let getItem = [];

  for (let i = 0; i < cookies.length; i++) {
    // 해당하는 key를 갖는 쿠키데이터를 찾기위해 반복문을 사용했는데 다른방법도 연구해봐야겠다.
    if (cookies[i][0] === key) {
      getItem.push(cookies[i][1]);
      break;
    }
  }

  if (getItem.length > 0) {
    return JSON.parse(getItem[0]);
  }
};

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
        console.log("로그인 완료", response.data);
        // 토큰 저장
        window.sessionStorage.setItem(
          "access-token",
          response.data.data.access_token
        );
        setCookie("refresh_token", response.data.data.refresh_token, 30);
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
export async function chnagePw(pwDto) {
  // Header에 토큰 집어넣기
  return new Promise((resolve) => {
    const accessToken = sessionStorage.getItem("access-Token");
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
  }).catch((e) => {
    console.log(e);
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
export async function addAddress(addressDto) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.post("/user/addresses", addressDto).then((response) => {
      if (response.status === 200) {
        console.log("주소 추가 성공", response);
        resolve(response);
      } else {
        console.log("주소 추가 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 주소 조회
export async function getAddress() {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("/user/addresses").then((response) => {
      if (response.status === 200) {
        console.log("주소 조회 성공", response);
        resolve(response);
      } else {
        console.log("주소 조회 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 주소 삭제
export async function delAddress(number) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.delete(`/user/addresses/${number}`).then((response) => {
      if (response.status === 200) {
        console.log("주소 삭제 성공", response);
        resolve(response);
      } else {
        console.log("주소 삭제 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 회원정보 수정
export async function changeInfo(userDto) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.put("/user/change-info", userDto).then((response) => {
      if (response.status === 200) {
        console.log("회원 수정 성공", response);
        resolve(response);
      } else {
        console.log("회원 수정 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}

// 주소 수정
export async function changeAddress(addressDto) {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.put("/user/addresses", addressDto).then((response) => {
      if (response.status === 200) {
        console.log("주소 수정 성공", response);
        resolve(response);
      } else {
        console.log("주소 수정 실패", response);
        resolve(response);
      }
    });
  }).catch((e) => {
    console.log(e);
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

// Logout
export async function logout() {
  // Header에 토큰 집어넣기
  const accessToken = sessionStorage.getItem("access-token");
  https.defaults.headers.common["access_token"] = accessToken;
  return new Promise((resolve) => {
    https.get("user/log-out").then((response) => {
      if (response.status === 200) {
        sessionStorage.removeItem("access-token");
        console.log("로그아웃 통신 완료", response);
        resolve(response);
      } else {
        resolve(response);
      }
    });
  });
}

// token 재요청
export async function refresh() {
  const refreshToken = getCookie("refresh_token");
  https.defaults.headers.common["refresh_token"] = refreshToken;
  return new Promise((resolve) => {
    https.get("/user/refresh").then((response) => {
      if (response.status === 200) {
        console.log("재발급 완료", response.data);
        // 토큰 저장
        window.sessionStorage.setItem(
          "access-token",
          response.data.data.access_token
        );
        setCookie("refresh_token", response.data.data.refresh_token, 30);
        resolve(response.data);
      } else {
        console.log("재발급 실패", response);
        resolve(response);
      }
    });
  });
}
