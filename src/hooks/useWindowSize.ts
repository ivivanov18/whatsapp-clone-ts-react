import React, { useState, useEffect } from "react";

type Transform<T extends number> = `scale(${T})`;

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean;
  transform: Transform<number>;
};

const CLASSIC_WIDTH = 1366;
const CLASSIC_HEIGHT = 768;
const MOBILE_HEIGHT = 760;

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isMobile: false,
    transform: `scale(1)`,
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    function handleResize() {
      const { innerWidth, innerHeight } = window;

      if (innerHeight > CLASSIC_HEIGHT && innerWidth > CLASSIC_WIDTH) {
        const ratio = CLASSIC_HEIGHT / CLASSIC_WIDTH;
        const currentRatio = innerHeight / innerWidth;

        if (ratio < currentRatio) {
          setWindowSize({
            width: CLASSIC_WIDTH,
            height: window.innerHeight * (CLASSIC_WIDTH / window.innerWidth),
            transform: `scale(${window.innerWidth / CLASSIC_WIDTH})`,
            isMobile: false,
          });
        } else if (ratio > currentRatio) {
          setWindowSize({
            width: window.innerWidth * (CLASSIC_HEIGHT / window.innerHeight),
            height: CLASSIC_HEIGHT,
            transform: `scale(${window.innerHeight / CLASSIC_HEIGHT})`,
            isMobile: false,
          });
        } else {
          setWindowSize({
            width: CLASSIC_WIDTH,
            height: CLASSIC_HEIGHT,
            transform: `scale(${window.innerHeight / CLASSIC_HEIGHT})`,
            isMobile: false,
          });
        }
      }
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= MOBILE_HEIGHT,
        transform: `scale(1)`,
      });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
