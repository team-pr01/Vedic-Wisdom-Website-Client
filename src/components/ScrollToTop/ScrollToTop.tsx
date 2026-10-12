import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  /** Optional ref of the scrollable container */
  containerRef?: React.RefObject<HTMLDivElement>;
}

const ScrollToTop = ({ containerRef }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (containerRef?.current) {
      // Scroll the inner container
      containerRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    } else {
      // Fallback: scroll the window
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, containerRef]);

  return null;
};

export default ScrollToTop;