import { useState, useEffect } from 'react';

// Breakpoints estándar (siguiendo Tailwind CSS)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Hook para detectar el tamaño de pantalla actual
 * @returns {Object} Información sobre el tamaño de pantalla
 */
export const useBreakpoint = () => {
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        width: 0,
        height: 0,
        breakpoint: 'sm',
        isSm: false,
        isMd: false,
        isLg: false,
        isXl: false,
        is2xl: false,
        isMobile: true,
        isTablet: false,
        isDesktop: false
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
      breakpoint: getCurrentBreakpoint(width),
      isSm: width >= breakpoints.sm && width < breakpoints.md,
      isMd: width >= breakpoints.md && width < breakpoints.lg,
      isLg: width >= breakpoints.lg && width < breakpoints.xl,
      isXl: width >= breakpoints.xl && width < breakpoints['2xl'],
      is2xl: width >= breakpoints['2xl'],
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        width,
        height,
        breakpoint: getCurrentBreakpoint(width),
        isSm: width >= breakpoints.sm && width < breakpoints.md,
        isMd: width >= breakpoints.md && width < breakpoints.lg,
        isLg: width >= breakpoints.lg && width < breakpoints.xl,
        isXl: width >= breakpoints.xl && width < breakpoints['2xl'],
        is2xl: width >= breakpoints['2xl'],
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

/**
 * Hook para detectar si estamos en un breakpoint específico o superior
 * @param {string} breakpoint - Breakpoint a verificar
 * @returns {boolean} Si estamos en ese breakpoint o superior
 */
export const useMediaQuery = (breakpoint) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= breakpoints[breakpoint];
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[breakpoint]}px)`);
    
    const handleChange = (e) => {
      setMatches(e.matches);
    };

    mediaQuery.addListener(handleChange);
    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeListener(handleChange);
  }, [breakpoint]);

  return matches;
};

/**
 * Hook para detectar si estamos en modo móvil
 * @returns {boolean} Si estamos en móvil
 */
export const useIsMobile = () => {
  return !useMediaQuery('md');
};

/**
 * Hook para detectar si estamos en tablet
 * @returns {boolean} Si estamos en tablet
 */
export const useIsTablet = () => {
  const isMd = useMediaQuery('md');
  const isLg = useMediaQuery('lg');
  return isMd && !isLg;
};

/**
 * Hook para detectar si estamos en desktop
 * @returns {boolean} Si estamos en desktop
 */
export const useIsDesktop = () => {
  return useMediaQuery('lg');
};

/**
 * Hook para obtener valores responsivos basados en el breakpoint actual
 * @param {Object} values - Objeto con valores para cada breakpoint
 * @returns {*} Valor correspondiente al breakpoint actual
 */
export const useResponsiveValue = (values) => {
  const { breakpoint } = useBreakpoint();
  
  // Orden de prioridad de breakpoints
  const breakpointOrder = ['2xl', 'xl', 'lg', 'md', 'sm'];
  
  // Encontrar el valor más específico disponible
  for (const bp of breakpointOrder) {
    if (values[bp] !== undefined && shouldUseBreakpoint(breakpoint, bp)) {
      return values[bp];
    }
  }
  
  // Fallback al valor base o el primer valor disponible
  return values.base || values[Object.keys(values)[0]];
};

/**
 * Hook para manejar orientación del dispositivo
 * @returns {Object} Información sobre la orientación
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        angle: 0,
        type: 'portrait-primary',
        isPortrait: true,
        isLandscape: false
      };
    }

    const screen = window.screen;
    const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    
    return {
      angle: orientation?.angle || 0,
      type: orientation?.type || 'portrait-primary',
      isPortrait: window.innerHeight > window.innerWidth,
      isLandscape: window.innerWidth > window.innerHeight
    };
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      const screen = window.screen;
      const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
      
      setOrientation({
        angle: orientation?.angle || 0,
        type: orientation?.type || 'portrait-primary',
        isPortrait: window.innerHeight > window.innerWidth,
        isLandscape: window.innerWidth > window.innerHeight
      });
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return orientation;
};

/**
 * Hook para detectar si el usuario prefiere modo oscuro
 * @returns {boolean} Si prefiere modo oscuro
 */
export const usePrefersDarkMode = () => {
  const [prefersDark, setPrefersDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setPrefersDark(e.matches);
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersDark;
};

/**
 * Hook para detectar si el usuario prefiere movimiento reducido
 * @returns {boolean} Si prefiere movimiento reducido
 */
export const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersReduced;
};

// Funciones auxiliares
const getCurrentBreakpoint = (width) => {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

const shouldUseBreakpoint = (current, target) => {
  const order = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = order.indexOf(current);
  const targetIndex = order.indexOf(target);
  return currentIndex >= targetIndex;
};

export default useBreakpoint;
