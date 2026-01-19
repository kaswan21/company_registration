import { useMediaQuery } from 'react-responsive';

// Define breakpoints matching MUI defaults
const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

// Custom hooks for responsive design
export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: breakpoints.sm - 1 });
  const isTablet = useMediaQuery({
    minWidth: breakpoints.sm,
    maxWidth: breakpoints.md - 1,
  });
  const isDesktop = useMediaQuery({ minWidth: breakpoints.md });
  const isLargeDesktop = useMediaQuery({ minWidth: breakpoints.lg });

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isSmallScreen: isMobile || isTablet,
  };
};

// Device-specific hooks
export const useIsMobile = () => useMediaQuery({ maxWidth: breakpoints.sm - 1 });
export const useIsTablet = () =>
  useMediaQuery({ minWidth: breakpoints.sm, maxWidth: breakpoints.md - 1 });
export const useIsDesktop = () => useMediaQuery({ minWidth: breakpoints.md });

// Orientation hooks
export const useIsPortrait = () => useMediaQuery({ orientation: 'portrait' });
export const useIsLandscape = () => useMediaQuery({ orientation: 'landscape' });

export default useResponsive;
