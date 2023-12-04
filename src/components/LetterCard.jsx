import styled from "styled-components";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "util/date";
import Avatar from "./common/Avatar";

export default function LetterCard({ letter }) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const handleDelete = () => {
    dispatch(deleteLetter(letter.id));
  };

  const handleEdit = () => {
    // 수정 로직 구현
  };

  const handleOptionsToggle = () => {
    setShowOptions(!showOptions);
  };

  return (
    <LetterWrapper onClick={() => navigate(`/detail/${letter.id}`)}>
      {currentUser && currentUser.id === letter.userId && (
        <OptionsButton onClick={handleOptionsToggle}>Options</OptionsButton>
      )}
      {showOptions && currentUser && currentUser.id === letter.userId && (
        <OptionsWrapper>
          <Button onClick={handleEdit}>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </OptionsWrapper>
      )}
      <UserInfo>
        <Avatar src={letter.avatar} />
        <NicknameAndDate>
          <p>{letter.nickname}</p>
          <time>{getFormattedDate(letter.createdAt)}</time>
        </NicknameAndDate>
      </UserInfo>
      <Content>{letter.content}</Content>
    </LetterWrapper>
  );
}

const LetterWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: white;
  padding: 12px;
  border: 1px solid white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const NicknameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Content = styled.p`
  background-color: gray;
  border-radius: 12px;
  padding: 12px;
  margin-left: 62px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Button = styled.button`
  background-color: whitesmoke;
`;
