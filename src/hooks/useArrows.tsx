import { useEffect } from "react";

export const useArrows = (
  keyHandler: {
    onUp: (e: KeyboardEvent) => void;
    onDown: (e: KeyboardEvent) => void;
    onLeft: (e: KeyboardEvent) => void;
    onRight: (e: KeyboardEvent) => void;
  },
  deps: any[],
) => {
  useEffect(() => {
    const ac = new AbortController();

    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "ArrowUp" || e.key === "w") {
          e.preventDefault();
          keyHandler.onUp(e);
        } else if (e.key === "ArrowDown" || e.key === "s") {
          e.preventDefault();
          keyHandler.onDown(e);
        } else if (e.key === "ArrowLeft" || e.key === "a") {
          e.preventDefault();
          keyHandler.onLeft(e);
        } else if (e.key === "ArrowRight" || e.key === "d") {
          e.preventDefault();
          keyHandler.onRight(e);
        }
      },
      ac,
    );

    return () => ac.abort();
  }, deps);
};
