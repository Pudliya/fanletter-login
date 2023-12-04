import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginSuccess, logout } from "../redux/modules/authSlice";
import { setMember } from "../redux/modules/member";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // Handler
  const onChangeIdHandler = (e) => setId(e.target.value);
  const onChangePasswordHandler = (e) => setPassword(e.target.value);
  const onChangeNickNameHandler = (e) => setNickname(e.target.value);

  // 회원가입 버튼 클릭
  const toggleSingUp = (e) => {
    e.preventDefault();
    setShowSignUp(!showSignUp);
  };

  // 회원가입시 비밀번호 확인
  const onChangePasswordFirmHandler = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 다릅니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 같습니다.");
      setIsPasswordConfirm(true);
    }
  };

  // 회원가입시 데이터 전송
  const signUpComplete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id,
          password,
          nickname,
        }
      );
      console.log("회원가입 성공", data);
      setShowSignUp(!showSignUp);
      // 회원가입 성공 시 처리
    } catch (error) {
      console.error("회원가입 실패", error);
      // 회원가입 실패 시 처리
    }
  };

  // 로그인
  const signLogIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id,
          password,
        }
      );
      console.log("로그인 성공", data);

      // accessToken, userId, avatar, nickname을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("avatar", data.avatar);
      localStorage.setItem("nickname", data.nickname);
      dispatch(setMember(data.userId, data.nickname));
      dispatch(loginSuccess(data.userId, data.nickname));
      navigate("/");
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // 서버에서 사용자 정보 가져오기
        const response = await axios.get(
          "https://moneyfulpublicpolicy.co.kr/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const userData = response.data;
        // 유저 정보가 존재하면 로그인 상태로 만들기
        if (userData.id && userData.nickname) {
          dispatch(
            loginSuccess({
              userId: userData.id,
              nickname: userData.nickname,
              avatar: userData.avatar,
              accessToken: localStorage.getItem("accessToken"),
            })
          );
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  // AccessToken 유효성 검사 및 로그아웃 처리
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "https://moneyfulpublicpolicy.co.kr/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const userData = response.data;

        if (userData.id && userData.nickname) {
          // 유저 정보가 존재하면 로그인 상태로 만들기
          dispatch(
            loginSuccess({
              userId: userData.id,
              nickname: userData.nickname,
              avatar: userData.avatar,
              accessToken: localStorage.getItem("accessToken"),
            })
          );
        } else {
          // 만료된 토큰이면 로그아웃 처리
          dispatch(logout());
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("avatar");
          localStorage.removeItem("nickname");
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
        // 에러 발생 시 로그아웃 처리
        dispatch(logout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("avatar");
        localStorage.removeItem("nickname");
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  return (
    <Container>
      {!showSignUp ? (
        <Form onSubmit={signLogIn}>
          <h2>로그인</h2>
          <InputSection>
            <label htmlFor="id">아이디 : </label>
            <input
              required
              value={id}
              name="id"
              placeholder="아이디 (4~10글자)"
              minLength={4}
              maxLength={10}
              onChange={onChangeIdHandler}
            />
          </InputSection>
          <InputSection>
            <label htmlFor="password">비밀번호 : </label>
            <input
              required
              type="password"
              value={password}
              name="password"
              placeholder="비밀번호 (4~15글자)"
              minLength={4}
              maxLength={15}
              onChange={onChangePasswordHandler}
            />
          </InputSection>
          <ButtonInput>
            <button type="submit">로그인</button>
            <button onClick={toggleSingUp}>회원가입</button>
          </ButtonInput>
        </Form>
      ) : (
        <Form onSubmit={signUpComplete}>
          <h2>회원가입</h2>
          <InputSection>
            <label>아이디 : </label>
            <input
              required
              value={id}
              name="id"
              placeholder="아이디 (4~10글자)"
              minLength={4}
              maxLength={10}
              onChange={onChangeIdHandler}
            />
          </InputSection>
          <InputSection>
            <label>비밀번호 : </label>
            <input
              required
              type="password"
              value={password}
              name="password"
              placeholder="비밀번호 (4~15글자)"
              minLength={4}
              maxLength={15}
              onChange={onChangePasswordHandler}
            />
          </InputSection>
          <InputSection>
            <label>비밀번호 확인 : </label>
            <input
              required
              type="password"
              value={passwordConfirm}
              name="passwordConfirm"
              placeholder="비밀번호 (4~15글자)"
              minLength={4}
              maxLength={15}
              onChange={onChangePasswordFirmHandler}
            />
            <p>{passwordConfirmMessage}</p>
          </InputSection>
          <InputSection>
            <label>닉네임 : </label>
            <input
              required
              value={nickname}
              name="nickname"
              placeholder="닉네임 (1~10글자)"
              minLength={1}
              maxLength={10}
              onChange={onChangeNickNameHandler}
            />
          </InputSection>
          <ButtonInput>
            <button type="submit">회원가입 완료</button>
          </ButtonInput>
        </Form>
      )}
    </Container>
  );
}

export default Login;

const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5rem;
`;

const Form = styled.form`
  background-color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 500px;
  border-radius: 12px;
  margin: 20px 0;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonInput = styled.div`
  display: flex;
`;
