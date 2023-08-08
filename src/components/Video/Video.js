import { useState, useMemo, useContext, useEffect } from "react";
import {
  Title,
  VideoStyle,
  Youtube,
  Describe,
  Participate,
  Date,
  More,
  Sub,
  Index,
  VideoStyleContainer,
  CheckBox,
} from "./VideoStyle";
import VideoData, { SelectedVideoData, zeroData } from "./VideoData";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import Select from "react-select";
import { SelectedVideosContext } from "../SelectedVideosContext";

const Video = () => {
  const [showAllRows, setShowAllRows] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = showAllRows ? 10 : 3;
  const totalPages = Math.ceil(VideoData.length / pageSize);
  const visiblePages = 5;
  const [selectedFilter, setSelectedFilter] = useState("participate");
  const { selectedVideos, setSelectedVideos } = useContext(
    SelectedVideosContext
  );

  const handleShowAllRows = () => {
    setShowAllRows(true);
    setPage(0);
  };

  const handleHideAllRows = () => {
    setShowAllRows(false);
    setPage(0);
  };

  const handleNextPage = () => {
    const nextPage = page + 5;
    setPage(Math.min(nextPage, totalPages - 1, Math.floor(nextPage / 5) * 5));
  };

  const handlePrevPage = () => {
    const prevPage = page - 5;
    setPage(Math.max(prevPage, 0, Math.floor(prevPage / 5) * 5 + 4));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSelectVideo = (index) => {
    const realIndex = page * pageSize + index;
    const selectedVideo = VideoData[realIndex];
    setSelectedVideos((prevSelected) => {
      if (prevSelected.some((video) => video === selectedVideo)) {
        return prevSelected.filter((video) => video !== selectedVideo);
      } else {
        return prevSelected.length < 2
          ? [...prevSelected, selectedVideo]
          : prevSelected;
      }
    });
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor(page / visiblePages) * visiblePages;
    const endPage = Math.min(startPage + visiblePages - 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Index
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === page ? "active" : ""}
        >
          {i + 1}
        </Index>
      );
    }

    return pageNumbers;
  };

  const filterOptions = [
    { value: "participate", label: "참여순" },
    { value: "latest", label: "최신순" },
    { value: "play", label: "플레이순" },
    { value: "replay", label: "리플레이순" },
    { value: "playTime", label: "플레이시간순" },
  ];
  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption.value);
  };

  const sortedData = useMemo(() => {
    const dataCopy = [...VideoData];

    switch (selectedFilter) {
      case "latest":
        return dataCopy.sort((a, b) => b.date - a.date);
      case "play":
        return dataCopy.sort((a, b) => b.play - a.play);
      case "replay":
        return dataCopy.sort((a, b) => b.replay - a.replay);
      case "playTime":
        return dataCopy.sort((a, b) => b.time - a.time);
      default:
        return dataCopy.sort((a, b) => b.participate - a.participate);
    }
  }, [selectedFilter]);

  const Data = useMemo(() => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [page, pageSize, sortedData]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      cursor: "pointer",
      width: 150,
      background: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "right",
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: "left",
      borderRadius: 3,
      background: "var(--bg-2, #FCFCFC)",
      color: "black",
      "&:hover": {
        background: "#F5F6F8",
      },
    }),
    input: (provided) => ({
      ...provided,
      caretColor: "transparent",
    }),
  };

  const selectedColors = ["#FCF4E5", "#E6F0FB"];
  const checkSelectedColors = [
    "rgba(250, 173, 20, 1)",
    "rgba(34, 131, 245, 1)",
  ];

  return (
    <div>
      <VideoStyleContainer responsive="true" borderless="true">
        <thead>
          <Title className="title">
            <th>동영상</th>
            <th></th>
            <th></th>
            <th>참여</th>
            <th>공개된 날짜</th>
          </Title>
        </thead>
        <tbody>
          {SelectedVideoData.map((adata) => (
            <VideoStyle key={0} style={{ background: "#EBE3F7" }}>
              <CheckBox className="checkedBox">
                <MdCheckBox />
              </CheckBox>
              <Youtube>
                <img src="img.png" alt="img" className="image" />
              </Youtube>
              <Describe>{adata.describe}</Describe>
              <Participate>{adata.participate}</Participate>
              <Date>{adata.date}</Date>
            </VideoStyle>
          ))}
          <Title className="title">
            <th>비교</th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <Select
                options={filterOptions}
                styles={customStyles}
                onChange={handleFilterChange}
                value={filterOptions.find(
                  (option) => option.value === selectedFilter
                )}
              />
            </th>
          </Title>
          {Data.length > 0 ? (
            Data.map((tdata, index) => (
              <VideoStyle
                key={index}
                className={`videoStyle ${
                  selectedVideos.includes(VideoData[page * pageSize + index])
                    ? "selected"
                    : ""
                }`}
                style={
                  selectedVideos.includes(VideoData[page * pageSize + index])
                    ? {
                        background:
                          selectedColors[
                            selectedVideos.indexOf(
                              VideoData[page * pageSize + index]
                            )
                          ],
                      }
                    : {}
                }
                onClick={() => handleSelectVideo(index)}
              >
                <CheckBox className="checkBox">
                  {selectedVideos.includes(
                    VideoData[page * pageSize + index]
                  ) ? (
                    <MdCheckBox
                      style={
                        selectedVideos.includes(
                          VideoData[page * pageSize + index]
                        )
                          ? {
                              color:
                                checkSelectedColors[
                                  selectedVideos.indexOf(
                                    VideoData[page * pageSize + index]
                                  )
                                ],
                            }
                          : {}
                      }
                    />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </CheckBox>

                <Youtube className="youtube">
                  <img src="img.png" alt="img" className="image" />
                </Youtube>
                <Describe className="describe">{tdata.describe}</Describe>
                <Participate className="participate">
                  {tdata.participate}
                </Participate>
                <Date className="date">{tdata.date}</Date>
              </VideoStyle>
            ))
          ) : (
            <tr style={{ textAlign: "center" }}>
              아직 비교할 수 있는 동영상이 없네요 :( 동영상을 더 업로드해보세요!
            </tr>
          )}
        </tbody>
      </VideoStyleContainer>
      <Sub>
        {!showAllRows ? (
          <More onClick={handleShowAllRows} className="more">
            더보기
            <img src={"/arrow.jpg"} alt="img" className="img" />
          </More>
        ) : (
          <>
            <More onClick={handleHideAllRows} className="more">
              간략히 보기
              <img src={"/upArrow.png"} alt="img" className="img" />
            </More>
            <div>
              {page > 0 && (
                <Index className="index" onClick={handlePrevPage}>
                  &lt;
                </Index>
              )}
              {generatePageNumbers()}
              {page < totalPages - 1 && (
                <Index className="button" onClick={handleNextPage}>
                  &gt;
                </Index>
              )}
            </div>
          </>
        )}
      </Sub>
    </div>
  );
};

export default Video;
