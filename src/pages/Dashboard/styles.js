import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  max-width: 1000px;
  margin: 0px auto;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  strong {
    font-size: 24px;
    color: ${lighten(0.03, '#444444')};
    margin-bottom: 40px;
  }
  header {
    display: flex;
    justify-content: space-between;
    input {
      width: 240px;
      padding: 8px 10px;
      border-radius: 1px;
      border: 0.5px solid ${lighten(0.6, '#444444')};
    }
    div {
      display: flex;
      justify-content: center;
      a {
        background: #f0141e;
        color: #fff;
        padding: 5px 10px;
        border: 0;
        font-weight: bold;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:hover {
          background: ${darken(0.05, '#f0141e')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 20px;
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  header {
    display: flex;
    justify-content: left;
    max-width: 1000px;
    font-weight: bold;
    margin-bottom: 20px;
    padding-left: 15px;
  }
  ul {
    display: flex;
    flex-direction: column;
    justify-content: left;
    li {
      display: flex;
      align-items: center;
      padding: 15px;
      border-radius: 4px;
      border-bottom: 1px solid #eee;
      background: #fff;
      & + li {
        margin-top: 15px;
      }
      color: ${lighten(0.03, '#444444')};
      svg {
        transition: all 0.1s ease-in-out;
        &:hover {
          color: ${'#f0141e'};
          cursor: pointer;
          -webkit-transform: scale(1.3);
          -ms-transform: scale(1.3);
          transform: scale(1.3);
        }
      }
    }
    li > span:first-child {
      width: 20.5%;
    }
    li > span:first-child + span {
      width: 64%;
    }
    li > span:first-child + span + span {
      width: 31%;
    }
    li > div {
      width: 0%;
    }
  }
  header > span:first-child {
    width: 23.5%;
  }
  header > span:first-child + span {
    width: 73.5%;
  }
  header > span:first-child + span + span {
    width: 40.5%;
  }
`;

export const Pagination = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  span {
    color: #f0141e;
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const Previous = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.page === 1 || props.loadingNext,
}))`
  background: #f0141e;
  color: #eee;
  font-style: bold;
  & + button {
    margin-left: 10px;
  }
  font-size: 17px;
  float: center;
  display: flex;
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover {
    background: ${darken(0.05, '#f0141e')};
  }
`;

export const Next = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.loadingNext || props.finalPage,
}))`
  background: #f0141e;
  color: #eee;
  font-style: bold;
  & + button {
    margin-left: 10px;
  }
  font-size: 17px;
  float: center;
  display: flex;
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover {
    background: ${darken(0.05, '#f0141e')};
  }
`;
