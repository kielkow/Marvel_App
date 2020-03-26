import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 0px auto;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    justify-content: space-between;
    strong {
      display: flex;
      align-items: center;
      font-size: 24px;
      color: ${lighten(0.03, '#444444')};
      svg {
        margin-right: 5px;
      }
    }
    div {
      display: flex;
      justify-content: center;
      a {
        background: #ee4d63;
        color: #fff;
        padding: 5px 10px;
        border: 0;
        font-weight: bold;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:hover {
          background: ${darken(0.05, '#ee4d63')};
        }
      }
    }
  }
`;

export const Content = styled.form`
  display: flex;
  justify-content: left;
  align-items: center;
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  padding: 20px;
  img {
    height: 160px;
    width: 160px;
    border-radius: 10%;
    margin-right: 20px;
  }
  div {
    display: flex;
    flex-direction: column;
    flex: 1;
    span {
      font-weight: bold;
      margin-bottom: 5px;
    }
    input {
      padding: 10px 10px;
      border-radius: 4px;
      border: 0.5px solid #eee;
    }
    textarea {
      font-size: 14px;
      font-family: 'Roboto';
      padding: 10px 10px;
      border-radius: 4px;
      border: 0.5px solid #eee;
      flex: 1;
      resize: none;
    }
    & + div {
      margin-top: 20px;
      height: 200px;
    }
  }
`;
