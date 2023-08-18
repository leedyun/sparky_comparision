import { useContext } from "react";
import { SelectedVideosContext } from "../SelectedVideosContext";
import { Main, Sub, Compare } from "./DescribeStyle";

const Describe = () => {
  const { selectedVideos, setSelectedVideos } = useContext(
    SelectedVideosContext
  );
  const Cancle = () => {
    setSelectedVideos([]);
  };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ textAlign: "left", display: "flex", flexDirection: "column" }}
      >
        <Main>동영상 비교</Main>
        <Sub>Tip. 비교를 통해 참여를 높힐 수 있는 인사이트를 얻어보세요.</Sub>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flex: 1,
        }}
      >
        <Compare onClick={Cancle}>비교 초기화</Compare>
      </div>
    </div>
  );
};

export default Describe;
