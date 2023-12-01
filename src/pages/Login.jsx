import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const onChangeIdHandler = (e) => setId(e.target.value);
  const onChangePasswordHandler = (e) => setPassword(e.target.value);
  const onChangeNickNameHandler = (e) => setNickname(e.target.value);

  const signLogIn = () => navigate("/");
  const toggleSingUp = (e) => {
    e.preventDefault();
    setShowSignUp(!showSignUp);
  };

  const signUpComplete = (e) => {
    e.preventDefault();
    setShowSignUp(!showSignUp);
    // ※ 회원가입 로직 처리 ※
  };

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
