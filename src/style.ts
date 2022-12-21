import styled from "styled-components";

export const NotificationsTexts = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
`;

export const NotificationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  :hover {
    background-color: #424242;
  }
`;

export const Circle = styled.div`
  height: 10px;
  width: 10px;
  background-color: #9c27b0;
  border-radius: 50%;
  display: inline-block;
`;
