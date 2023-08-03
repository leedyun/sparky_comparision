import styled from "styled-components";

export const VideoStyleContainer = styled.table`
  width: 100%;
  .checkedBox {
    color: rgba(182, 183, 184, 1);
  }
  @media screen and (max-width: 760px) {
    .title {
      display: none;
    }
    .videoStyle {
      grid-template-columns: 1fr 3fr 6fr;
    }

    .participate,
    .date {
      display: none;
    }
  }

  @media screen and (max-width: 480px) {
    .videoStyle {
      grid-template-columns: 0.5fr 1fr 3fr 0fr 0fr;
    }

    .image {
      width: 100px;
      height: 60px;
    }

    .describe {
      font-size: 8px;
      font-weight: 100;
    }

    .dataIndex {
      font-size: 10px;
    }
  }
`;
export const Title = styled.tr`
  height: 18px;
  color: var(--light-main-text, #090909);
  text-align: center;
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 0.14px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 70px 160px 4fr 0.8fr 1fr;
  .select {
    border: none;
    color: var(--light-main-text, #090909);
    text-align: center;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: 0.14px;
    cursor: pointer;
    text-align: left;
    option {
      .hover {
        background: #f5f6f8;
      }
    }
  }
`;
export const VideoStyle = styled.tr`
  height: 82px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #ebeff4;
  color: var(--light-main-text, #090909);
  text-align: center;
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: 0.14px;
  align-items: center;
  margin-top: 12px;
  display: grid;
  grid-template-columns: 70px 160px 4fr 0.8fr 1fr;
`;
export const CheckBox = styled.td`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;
export const Youtube = styled.td`
  width: 148px;
`;
export const Describe = styled.td`
  color: var(--light-main-text, #090909);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;
export const Participate = styled.td`
  color: var(--light-main-text, #090909);
  font-weight: 700;
`;
export const Date = styled.td`
  color: var(--light-main-text, #090909);
  font-weight: 700;
`;

export const Sub = styled.div`
  display: flex;
  margin-top: 36px;
  margin-bottom: 45px;
  justify-content: space-between;
  font-family: Poppins;
  font-style: normal;
  line-height: normal;
  align-items: center;
`;
export const More = styled.div`
  color: #065fd4;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .img {
    display: flex;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  @media screen and (max-width: 760px) {
    font-size: 16px;
  }
  @media screen and (max-width: 480px) {
    font-size: 13px;
    .img {
      width: 20px;
      height: 20px;
    }
  }
`;
export const Index = styled.button`
  margin-left: 8px;
  cursor: pointer;
  padding: 1px 7px;
  gap: 10px;
  border-radius: 2px;
  border: 1px solid var(--neutral-5, #d9d9d9);
  background: var(--neutral-1, #fff);
  width: 32px;
  height: 30px;
  color: var(--character-primary-65, rgba(0, 0, 0, 0.65));
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  &:hover,
  &.active {
    background: var(--light-point, #5100ce);
    color: var(--dark-main-text, #f5f6f8);
  }
  @media screen and (max-width: 760px) {
    margin-left: 5px;
    width: 28px;
    height: 26px;
    font-size: 13px;
  }
  @media screen and (max-width: 480px) {
    margin-left: 2px;
    width: 24px;
    height: 22px;
    font-size: 11px;
  }
`;
