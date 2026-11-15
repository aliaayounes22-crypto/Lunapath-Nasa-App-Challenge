import landingSitesRaw from './landing_sites.json'
import visibilityRaw from './visibility_data_completed.json'

/**
 * Normalized Candidate Landing Sites and Regions from verified research dataset
 * Source: Wueller et al. (2026) [DOI 10.1029/2025JE009434] & NASA (2024)
 */

export const sourcesMeta = landingSitesRaw.sources || []
export const globalNotes = landingSitesRaw.global_notes || []
export const visibilityNotes = visibilityRaw.global_notes || []
export const siteLevelNotes = visibilityRaw.site_level_notes || {}
export const visibilityRecords = visibilityRaw.records || []

// Flatten sites from regions, linking region-level metadata
export const landingSites = landingSitesRaw.regions.flatMap((region) =>
  region.sites.map((site) => ({
    id: site.site_id,
    name: region.region_name,
    full_name: `${site.site_id} — ${region.region_name}`,
    region_id: region.region_id,
    region_name: region.region_name,
    nasa_artemis_candidate: region.nasa_artemis_iii_candidate_region,
    latitude: site.latitude_deg,
    longitude: site.longitude_deg,
    coordinate_source: site.coordinate_source,
    coordinate_type: site.coordinate_type,
    crs: site.crs ?? 'Data unavailable (unverified)',
    longitude_convention: site.longitude_convention ?? 'Data unavailable (unverified)',
    site_level_terrain_statistics: site.site_level_terrain_statistics, // null
    accessible_psr_below_110k_within_2km: site.accessible_psr_below_110K_within_2km,
    site_notes: site.site_notes || [],
    terrain_statistics: region.terrain_statistics,
    scientific_advantages: region.scientific_advantages || [],
    scientific_limitations: region.scientific_limitations || [],
  }))
)

// Helper to look up visibility record for a specific site & year
export function getVisibilityRecord(siteId, year) {
  return visibilityRecords.find(
    (r) => r.site_id === siteId && Number(r.year) === Number(year)
  ) || null
}

// Format days safely: distinguishing 0 days (valid measurement) from null/undefined (Data unavailable)
export function formatDays(val) {
  if (val === null || val === undefined) return 'Data unavailable'
  return `${val} ${val === 1 ? 'day' : 'days'}`
}

// Available years strictly defined in dataset
export const AVAILABLE_YEARS = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032]
