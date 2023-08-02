import styled from "styled-components";

export const PrimaryNav = styled.div`
  height: 47px;
  display: flex;
`;
export const Menu = styled.button`
  width: 116.667px;
  height: 47px;
  background: #f5f6f8;
  color: var(--light-sub-text-icon, #334d6e);
  text-align: center;
  font-size: 15px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.15px;
  color: rgba(51, 77, 110, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  &:hover,
  &.active,
  &:active {
    border-radius: 3px 0px 0px 0px;
    background: var(--bg-2, #fcfcfc);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 760px) {
    width: 97px;
    height: 40px;
    font-size: 13px;
    font-weight: 650;
  }
  @media screen and (max-width: 480px) {
    width: 80px;
    height: 34px;
    font-size: 10px;
    font-weight: 600;
  }
`;
