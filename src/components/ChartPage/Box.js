import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-areas: 
  "a b c"
  "d e e";
  gap: 36px;
  > .country {
    grid-area: a;
  }
  > .age {
    grid-area: b;
  }
  > .gender {
    grid-area: c;
  }
  > .lang {
    grid-area: d;
  }
  > .time {
    grid-area: e;
  }
`;
export const Box = styled.div`
  width: 326px;
  height: 521px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #ebeff4;
  .header {
    width: 100%;
    height: 121px;
    border-bottom: 1px solid #ebeff4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--light-main-text, #090909);
    text-align: center;
    font-family: Poppins;
    font-style: normal;
    letter-spacing: 0.36px;
  }

  .main {
    font-size: 36px;
    font-weight: 700;
    line-height: normal;
  }

  .sub {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.16px;
  }
`;
export const Last = styled.div`
  width: 688px;
  height: 521px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #ebeff4;
  display:flex;
  flex-direction:column;
  .header {
    width: 50%;
    height: 121px;
    border-bottom: 1px solid #ebeff4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--light-main-text, #090909);
    text-align: center;
    font-family: Poppins;
    font-style: normal;
    letter-spacing: 0.36px;
  }

  .main {
    font-size: 36px;
    font-weight: 700;
    line-height: normal;
  }

  .sub {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.16px;
  }
`;
