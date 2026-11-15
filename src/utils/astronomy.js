/**
 * astronomy.js — Lunar coordinate geometry & formatting helpers
 * Grounded in NASA planetary coordinates and Wueller et al. (2026) conventions.
 */

/**
 * Converts lunar latitude and longitude to 3D Cartesian coordinates on a sphere of radius R.
 * In this coordinate space:
 * - South Pole is aligned towards negative Y (-R).
 * - Latitude: -90° (South Pole) to +90° (North Pole).
 * - Longitude: -180° to +180° (East-positive convention).
 *
 * @param {number} lat - Latitude in degrees (-90 to +90)
 * @param {number} lon - Longitude in degrees (-180 to +180)
 * @param {number} radius - Sphere radius in 3D units
 * @returns {[number, number, number]} [x, y, z] coordinates
 */
export function latLonToVector3(lat, lon, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180) // 0 at North Pole, PI at South Pole
  const theta = (lon + 180) * (Math.PI / 180) // Azimuthal angle

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi) // Positive for north, negative for south
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return [x, y, z]
}

/**
 * Formats a duration in days into clean, truthful text.
 * Strictly respects 0 as a valid modeled duration (e.g., NR2_K2023 in 2031).
 *
 * @param {number|null|undefined} days
 * @returns {string}
 */
export function formatDuration(days) {
  if (days === null || days === undefined) {
    return 'Data not retrieved'
  }
  if (days === 0) {
    return '0 days (No visibility window)'
  }
  return `${days} ${days === 1 ? 'day' : 'days'}`
}

/**
 * Checks if WebGL is supported by the client browser.
 * @returns {boolean}
 */
export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}
