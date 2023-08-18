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

export const Compare = styled.div`
  display: flex;
  padding: 7px 18px;
  gap: 4px;
  border-radius: 3px;
  border: 1px solid #ebeff4;
  background: var(--bg-1, #f5f6f8);
  cursor: pointer;
  color: var(--light-main-text, #090909);
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.14px;
`;
