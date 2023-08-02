import styled from "styled-components";

export const Main = styled.div`
  color: var(--light-main-text, #090909);
  font-size: 18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.18px;
  margin-top: 36px;
  @media screen and (max-width: 760px) {
    font-size: 16px;
    font-weight: 620;
  }
`;

export const Sub = styled.div`
  color: var(--light-sub-text-icon, #334d6e);
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.14px;
  margin-top: 12px;
  @media screen and (max-width: 760px) {
    font-size: 11px;
    font-weight: 330;
  }
`;
