import fs from 'fs'
import path from 'path'

const basePath = import.meta.dirname || process.cwd()

console.log('=== LUNAPATH SCIENTIFIC INTEGRITY AUDIT ===\n')

let passedTests = 0
let failedTests = 0

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`)
    passedTests++
  } else {
    console.error(`❌ FAIL: ${message}`)
    failedTests++
  }
}

// 1. Check data files exist
const landingSitesPath = path.join(basePath, 'src/data/landing_sites.json')
const visibilityPath = path.join(basePath, 'src/data/visibility_data_completed.json')

assert(fs.existsSync(landingSitesPath), 'landing_sites.json exists')
assert(fs.existsSync(visibilityPath), 'visibility_data_completed.json exists')

const landingSitesData = JSON.parse(fs.readFileSync(landingSitesPath, 'utf8'))
const visibilityData = JSON.parse(fs.readFileSync(visibilityPath, 'utf8'))

// 2. Verify Regions & Sites
assert(landingSitesData.regions.length === 3, 'Exactly 3 candidate regions present')

const regionsMap = {}
landingSitesData.regions.forEach(r => { regionsMap[r.region_id] = r })

assert(regionsMap['SP'] && regionsMap['SP'].region_name === 'Slater Plain', 'Region SP is Slater Plain')
assert(regionsMap['NR2'] && regionsMap['NR2'].region_name === 'Nobile Rim 2', 'Region NR2 is Nobile Rim 2')
assert(regionsMap['HW'] && regionsMap['HW'].region_name === 'Haworth', 'Region HW is Haworth')

// 3. Verify Coordinates (Wueller 2026 Table A1)
const spSite = regionsMap['SP'].sites[0]
const nrSite = regionsMap['NR2'].sites[0]
const hwSite = regionsMap['HW'].sites[0]

assert(spSite.site_id === 'SP11' && spSite.latitude_deg === -86.95 && spSite.longitude_deg === 126.675, 'SP11 coordinates: -86.950°, 126.675°')
assert(nrSite.site_id === 'NR2_K2023' && nrSite.latitude_deg === -84.074 && nrSite.longitude_deg === 59.197, 'NR2_K2023 coordinates: -84.074°, 59.197°')
assert(hwSite.site_id === 'HW10' && hwSite.latitude_deg === -86.527 && hwSite.longitude_deg === -14.876, 'HW10 coordinates: -86.527°, -14.876°')

// 4. Verify Terrain Statistics (Table 1)
assert(regionsMap['SP'].terrain_statistics.area_meeting_hls_requirements_km2 === 77.0 && regionsMap['SP'].terrain_statistics.fraction_of_region_percent === 19.3, 'Slater Plain: 77.0 km² (19.3%)')
assert(regionsMap['NR2'].terrain_statistics.area_meeting_hls_requirements_km2 === 56.9 && regionsMap['NR2'].terrain_statistics.fraction_of_region_percent === 14.0, 'Nobile Rim 2: 56.9 km² (14.0%)')
assert(regionsMap['HW'].terrain_statistics.area_meeting_hls_requirements_km2 === 77.3 && regionsMap['HW'].terrain_statistics.fraction_of_region_percent === 8.7, 'Haworth: 77.3 km² (8.7%)')

// 5. Verify Visibility Records (Table A2)
assert(Array.isArray(visibilityData.records) && visibilityData.records.length === 24, '24 visibility records (3 sites x 8 years)')

const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032]
const siteIds = ['SP11', 'NR2_K2023', 'HW10']

for (const sId of siteIds) {
  for (const yr of years) {
    const rec = visibilityData.records.find(r => r.site_id === sId && r.year === yr)
    assert(rec !== undefined, `Record exists for ${sId} in ${yr}`)
    assert(rec.max_consecutive_sun_and_earth_days <= rec.max_consecutive_sun_days, `${sId} in ${yr}: Sun+Earth (${rec.max_consecutive_sun_and_earth_days}) <= Sun (${rec.max_consecutive_sun_days})`)
  }
}

// Check key verified values
const sp2026 = visibilityData.records.find(r => r.site_id === 'SP11' && r.year === 2026)
assert(sp2026.max_consecutive_sun_days === 18 && sp2026.max_consecutive_sun_and_earth_days === 18, 'SP11 2026 has 18 Sun days and 18 Sun+Earth days (was incorrectly 6.1 / 3.5)')

const sp2030 = visibilityData.records.find(r => r.site_id === 'SP11' && r.year === 2030)
assert(sp2030.max_consecutive_sun_days === 18 && sp2030.max_consecutive_sun_and_earth_days === 17, 'SP11 2030 has 18 Sun days and 17 Sun+Earth days')

const nr2031 = visibilityData.records.find(r => r.site_id === 'NR2_K2023' && r.year === 2031)
assert(nr2031.max_consecutive_sun_days === 0 && nr2031.max_consecutive_sun_and_earth_days === 0, 'NR2_K2023 2031 has 0 Sun days and 0 Sun+Earth days (valid zero, not null)')

// 6. Check Logo Asset exists
const logoPath = path.join(basePath, 'public/lunapath-logo.png')
assert(fs.existsSync(logoPath) && fs.statSync(logoPath).size > 10000, 'Custom LunaPath logo exists in public/ and is non-empty')

// 7. Verify no hardcoded obsolete coordinates in component code
function getAllFiles(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  for (const file of list) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath))
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(fullPath)
    }
  }
  return results
}

const componentsDir = path.join(basePath, 'src/components')
const compFiles = getAllFiles(componentsDir)

let foundStaleData = false
for (const fullPath of compFiles) {
  const content = fs.readFileSync(fullPath, 'utf8')
  if (content.includes('-85.34') || content.includes('3.56') || content.includes('6.1 days') || content.includes('3.5 days')) {
    console.error(`❌ STALE DATA FOUND IN ${fullPath}`)
    foundStaleData = true
  }
}
assert(!foundStaleData, 'Zero stale hardcoded scientific values found in components')

console.log(`\nAUDIT COMPLETE: ${passedTests} passed, ${failedTests} failed.`)
if (failedTests > 0) process.exit(1)
