import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "redux/modules/authSlice";
import styled from "styled-components";

function Layout() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      dispatch(logout());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <>
      <Navigate>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div>Home</div>
        </Link>
        <Section>
          <Link to="profile" style={{ textDecoration: "none" }}>
            <div>My Profile</div>
          </Link>
          <LayoutP onClick={handleLogout}>LogOut</LayoutP>
        </Section>
      </Navigate>
      <Outlet />
    </>
  );
}

export default Layout;

const Navigate = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: gray;
  padding: 10px;
  font-size: 25px;
  & div {
    color: black;
    cursor: pointer;
    transition: color 0.3s ease; /* transition 효과를 추가해서 부드럽게 변경되도록 설정 */

    &:hover {
      color: yellow; /* Home과 My profile에 hover 효과를 주는 색상 */
    }
  }
`;

const LayoutP = styled.p`
  padding-left: 20px;
  font-size: 25px;
  cursor: pointer;
  transition: color 0.3s ease; /* transition 효과를 추가해서 부드럽게 변경되도록 설정 */

  &:hover {
    color: red; /* Logout에 hover 효과를 주는 색상 */
  }
`;

const Section = styled.section`
  display: flex;
`;
