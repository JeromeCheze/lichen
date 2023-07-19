import { Lichen, COLORMAPS } from '../dist/index.js'
import heatmap3dData from './heatmap3d_data.js'
import heatmap2dData from './heatmap2d_data.js'
import lineData from './line_data.js'
import stackedData from './stacked_data.js'
import sequenceData from './sequence_data.js'

let container = document.querySelector('#chart')

window.COLORMAPS = COLORMAPS
/*
 * TEST LINE
 */
window.synced = []
window.chart0 = new Lichen(container, {
  header: {
    title: 'test line',
    position: 'left'
  },
  type: 'line',
  xAxis: {
    enabled: true
  },
  colorScale: {
    min: 9,
    max: 12,
    stops: [
      [0, [255, 0, 0]],
      [0.333, [215, 130, 30]],
      [1, [39, 200, 19]]
    ]
  },
  zoom: 'x',
  series: [{
    name: 'power supply',
    start: lineData.timestamp * 1e3,
    step: lineData.step * 1e3,
    data: lineData.data,
    linewidth: 2,
    // color: 'rgb(0,0,255)',
    area: true
  }],
  synced: () => window.synced
})

/*
 * TEST HEATMAP2D
 */
window.chart1 = new Lichen(container, {
  header: {
    title: 'test heatmap2d'
  },
  type: 'heatmap2d',
  xAxis: {
    enabled: true
  },
  yAxis: {
    width: 150
  },
  colorScale: {
    min: 0,
    max: 5184000,
    stops: [
      [0, [119, 255, 119], '0s'], // green
      [300 / 5184000, [255, 242, 0], '5m'], // yellow
      [3600 / 5184000, [255, 170, 0], '1h'], // orange
      [86400 / 5184000, [255, 0, 0], '1j'], // red
      [604800 / 5184000, [134, 72, 249], '7j'], // purple
      [2592000 / 5184000, [0, 131, 255], '30j'], // blue
      [1, [0, 0, 0], '60j'] // black
    ]
  },
  series: heatmap2dData
})


/*
 * TEST HEATMAP3D
 */
const processSampledist = (minValues, maxValues, sampledistValues) => {
  const result = []
  let minDelta = null
  let nbSamples = null
  let minValue = null
  let maxValue = null
  let maxSd = null
  const maxSdList = []
  for (let i = 0; i < minValues.length; i++) {
    const currentMin = minValues[i]
    const currentMax = maxValues[i]
    if (currentMin == null || currentMax == null) {
      continue
    }
    const delta = currentMax - currentMin
    if (minDelta == null || delta < minDelta) {
      minDelta = delta
      nbSamples = sampledistValues[i].length
    }
    if (minValue == null || currentMin < minValue) {
      minValue = currentMin
    }
    if (maxValue == null || currentMax > maxValue) {
      maxValue = currentMax
    }
  }
  const yStep = minDelta / nbSamples
  for (let i = 0; i < minValues.length; i++) {
    const currentMin = minValues[i]
    const currentMax = maxValues[i]
    const sd = sampledistValues[i]
    if (currentMin == null || currentMax == null || sd == null) {
      result.push(null)
      continue
    }
    const dataStep = (currentMax - currentMin) / sd.length
    const currentSd = []
    let y = minValue
    while (y < currentMin) {
      currentSd.push(0)
      y += yStep
    }
    maxSdList.push(Math.max.apply(null, sd))
    for (let j = 0; j < sd.length; j++) {
      if (maxSd == null || sd[j] > maxSd) {
        maxSd = sd[j]
      }
      const nextYData = currentMin + (j + 1)  * dataStep
      while (y < nextYData) {
        currentSd.push(sd[j])
        y += yStep
      }
    }
    while ( y <= maxValue) {
      currentSd.push(0)
      y += yStep
    }
    result.push(currentSd)
  }
  return [minValue, maxValue, maxSd, result]
}

const [yMin, yMax, zMax, processed] = processSampledist(
  heatmap3dData['min_FR_SMPL_00_HHZ'].data,
  heatmap3dData['max_FR_SMPL_00_HHZ'].data,
  heatmap3dData['sampledist_FR_SMPL_00_HHZ'].data,
)
// console.log(zMax)
// console.log(processed)
// console.log(heatmap3dData)
window.chart2 = new Lichen(container, {
  header: {
    title: 'test heatmap3d'
  },
  type: 'heatmap3d',
  yAxis: {
    powerOfTen: true
  },
  height: 200,
  colorScale: {
    min: 0,
    max: zMax,
    stops: COLORMAPS.MAGMA,
    logarithmic: true
  },
  legend: {
    position: 'right'
  },
  series: {
    start: heatmap3dData['min_FR_SMPL_00_HHZ'].timestamp * 1e3,
    step: heatmap3dData['min_FR_SMPL_00_HHZ'].step * 1e3,
    data: processed,
    yMin,
    yMax,
    zMin: 0,
    zMax
  }
})

window.chart3 = new Lichen(container, {
  header: {
    title: 'test stacked'
  },
  type: 'stacked',
  yAxis: {
    powerOfTen: true,
    min: 0
  },
  legend: {
    position: 'right'
  },
  zoom: 'x',
  height: 200,
  series: {
    start: stackedData.data['memory.free'].timestamp * 1e3,
    step: stackedData.data['memory.free'].step * 1e3,
    area: true,
    linewidth: 2,
    data: [
      { color: '#fc8c3b', name: 'buffer', data: stackedData.data['memory.buffers'].data },
      { color: '#fb4f2d', name: 'slab', data: stackedData.data['memory.slab'].data },
      { color: '#e21a1d', name: 'shared', data: stackedData.data['memory.shared'].data },
      { color: '#bd0028', name: 'cached', data: stackedData.data['memory.cached'].data },
      { color: '#810127', name: 'free', data: stackedData.data['memory.free'].data }
    ]
  }
})

window.chart4 = new Lichen(container, {
  header: {
    title: 'test sequence'
  },
  yAxis: {
    width: 70
  },
  type: 'sequence',
  zoom: 'x',
  series: {
    start: sequenceData.data['TBOX_Current_Mode'].timestamp * 1e3,
    step: sequenceData.data['TBOX_Current_Mode'].step * 1e3,
    data: sequenceData.data['TBOX_Current_Mode'].data,
    color: 'rgb(38, 139, 210)',
    valueMap: [
      { value: 0, name: 'No mode' },
      { value: 1, name: 'Croisière' },
      { value: 2, name: 'Batterie' },
      { value: 3, name: 'Test batteries' },
      { value: 4, name: 'Ecoute' },
      { value: 5, name: 'Eco' },
      { value: 6, name: 'Sauvegarde' }
    ]
  }
})