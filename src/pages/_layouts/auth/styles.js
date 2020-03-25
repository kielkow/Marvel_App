import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #f0141e, #f13941);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 370px;
  text-align: center;
  background: #fff;
  padding: 20px 30px;
  border-radius: 4px;
  img {
    margin-top: 15px;
    width: 250px;
    height: 100px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    input {
      border: 0.5px solid #c7c7c7;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;
      &::placeholder {
        color: #c7c7c7;
      }
    }
    span {
      color: #f0141e;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-top: 5px;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #f0141e;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#f0141e')};
      }
    }
    a {
      color: #444444;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    label {
      color: ${lighten(0.15, '#000')};
      align-self: flex-start;
      margin: 0 0 10px;
      margin-top: 15px;
      font-weight: bold;
    }
  }
`;
