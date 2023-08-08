import React, { useEffect, createContext, useState, useContext } from "react";

export const SelectedVideosContext = createContext();

export const SelectedVideosProvider = ({ children }) => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  useEffect(() => {
    console.log(selectedVideos);
  });
  return (
    <SelectedVideosContext.Provider
      value={{ selectedVideos, setSelectedVideos }}
    >
      {children}
    </SelectedVideosContext.Provider>
  );
};

export const useSelectedVideos = () => {
  const context = useContext(SelectedVideosContext);
  if (!context) {
    throw new Error(
      "useSelectedVideos must be used within a SelectedVideosProvider"
    );
  }
  return context;
};
