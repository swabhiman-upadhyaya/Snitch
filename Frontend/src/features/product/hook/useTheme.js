import { useMemo } from 'react'

/**
 * Reads CSS custom properties (--theme-1 through --theme-4) from :root
 * and returns them as a plain object so inline styles can use the theme.
 */
export function useTheme() {
  return useMemo(() => {
    const root = getComputedStyle(document.documentElement)
    const t1 = root.getPropertyValue('--theme-1').trim()
    const t2 = root.getPropertyValue('--theme-2').trim()
    const t3 = root.getPropertyValue('--theme-3').trim()
    const t4 = root.getPropertyValue('--theme-4').trim()

    // Helper: convert hex to rgba
    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r},${g},${b},${alpha})`
    }

    return {
      t1, t2, t3, t4,
      // Pre-computed alpha variants
      t1_20: hexToRgba(t1, 0.2),
      t1_30: hexToRgba(t1, 0.3),
      t2_20: hexToRgba(t2, 0.2),
      t4_06: hexToRgba(t4, 0.06),
      t4_08: hexToRgba(t4, 0.08),
      t4_03: hexToRgba(t4, 0.03),
      t4_10: hexToRgba(t4, 0.1),
      t4_15: hexToRgba(t4, 0.15),
      t4_18: hexToRgba(t4, 0.18),
      t4_35: hexToRgba(t4, 0.35),
      t4_60: hexToRgba(t4, 0.6),
      t4_95: hexToRgba(t4, 0.95),
      // Derived light backgrounds
      bgGradient: `linear-gradient(160deg, #fafbfc 0%, ${hexToRgba(t2, 0.12)} 100%)`,
      borderLight: hexToRgba(t3, 0.25),
      borderHover: hexToRgba(t3, 0.5),
      borderInput: hexToRgba(t2, 0.5),
      imgBg: hexToRgba(t2, 0.15),
      skeletonDark: hexToRgba(t2, 0.35),
      skeletonLight: hexToRgba(t2, 0.2),
      cardHoverBg: hexToRgba(t2, 0.06),
      divider: hexToRgba(t2, 0.2),
    }
  }, [])
}
