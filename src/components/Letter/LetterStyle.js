import styled from "styled-components";

const LetterStyle = styled.div`
  height: 120px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #ebeff4;
  color: #090909;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.3px;
  flex-wrap: wrap;
  span {
    color: rgba(234, 51, 35, 1);
  }
  p {
    color: var(--light-sub-text-icon, #334d6e);
    text-align: center;
    font-size: 16px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.16px;
  }
  @media screen and (max-width: 760px) {
    height: 100px;
    font-size: 20px;
    font-weight: 600;
    p {
      font-size: 10px;
      font-weight: 300;
    }
  }
`;

export const Box = styled.div``;

export default LetterStyle;
