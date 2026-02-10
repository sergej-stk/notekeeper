import display from "@/src/constants/display";
import { useLayoutEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export type DisplayResolution = {
  min: number;
  max: number | "*";
};

export type DisplayResolutionSettings = {
  mobileBreakpoint: "md" | "sm";
  md: DisplayResolution;
  sm: DisplayResolution;
};

type Bounds = Pick<DOMRect, "width" | "height">;

type UseDisplay = [boolean];
type UseDisplayInit = {
  isMobile?: boolean;
};

const useDisplayInitDefault: UseDisplayInit = {
  isMobile: false,
};

export function useDisplay(
  init: UseDisplayInit = useDisplayInitDefault,
): UseDisplay {
  const [isMobile, setMobile] = useState(init.isMobile ?? false);

  const getBounds = (): Bounds | null => {
    try {
      const body = document.body;
      if (body === undefined || body === null) {
        return null;
      }
      return {
        height: body.getBoundingClientRect().height,
        width: body.getBoundingClientRect().width,
      };
    } catch (e) {
      return null;
    }
  };

  function update() {
    const bounds = getBounds();

    if (bounds === null) {
      setMobile(false);
      return;
    }

    const breakPoint = display.mobileBreakpoint;
    const settings = display[breakPoint];

    let mobile = false;

    if (settings.min < bounds.width) {
      if (settings.max === "*") {
        mobile = true;
      } else {
        mobile = settings.max >= bounds.width;
      }
    }

    setMobile(mobile);
  }

  useLayoutEffect(() => {
    if (window.addEventListener === undefined) {
      update();
      return;
    }
    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  return [isMobile];
}
