import { useState, useLayoutEffect } from "react";
import { isMobile } from "react-device-detect";

type UseDevice = [boolean];
type UseDeviceInit = {
  isDesktop?: boolean;
};

const useDeviceInitDefault: UseDeviceInit = {
  isDesktop: true,
};

export function useDevice(
  init: UseDeviceInit = useDeviceInitDefault,
): UseDevice {
  const [isDesktop, setDesktop] = useState(init.isDesktop ?? false);

  useLayoutEffect(() => {
    setDesktop(!isMobile);
  }, []);

  return [isDesktop];
}
