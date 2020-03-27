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
  border-bottom: 0.5px solid #c5c4c4;
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
      height: 150px;
    }
  }
`;

export const ContentChild = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  margin-top: 10px;
  border-radius: 4px;
  padding: 10px;
  header {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    strong {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-size: 18px;
      border-bottom: 0.5px solid #eee;
      padding-bottom: 5px;
      color: ${lighten(0.03, '#444444')};
      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const SeriesList = styled.ul`
  margin-top: 10px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    & + li {
      margin-top: 20px;
      border-top: 0.5px solid #eee;
      padding-top: 20px;
    }
    #content {
      flex: 1;
      height: 120px;
      div {
        display: flex;
        justify-content: space-between;
        span {
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
      textarea {
        width: 100%;
        height: 80%;
        font-size: 14px;
        font-family: 'Roboto';
        padding: 10px 10px;
        border-radius: 4px;
        border: 0.5px solid #eee;
        flex: 1;
        resize: none;
      }
    }
    img {
      height: 120px;
      width: 120px;
      border-radius: 10%;
      margin-right: 20px;
    }
  }
`;
