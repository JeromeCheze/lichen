import Lichen from '../dist/index.js'

import heatmap3dData from './heatmap3d_data.js'
import heatmap2dData from './heatmap2d_data.js'
import lineData from './line_data.js'

let container = document.querySelector('#chart')


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
  colorScale: [
    [9, [255, 0, 0]],
    [10, [215, 130, 30]],
    [12, [39, 200, 19]]
  ],
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
  colorScale: [
    [0, [119, 255, 119], '0s'], // green
    [300, [255, 242, 0], '5m'], // yellow
    [3600, [255, 170, 0], '1h'], // orange
    [86400, [255, 0, 0], '1j'], // red
    [604800, [134, 72, 249], '7j'], // purple
    [2592000, [0, 131, 255], '30j'], // blue
    [5184000, [0, 0, 0], '60j'] // black
  ],
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
  return [maxSd, result]
}

const [maxValue, processed] = processSampledist(
  heatmap3dData['min_FR_SMPL_00_HHZ'].data,
  heatmap3dData['max_FR_SMPL_00_HHZ'].data,
  heatmap3dData['sampledist_FR_SMPL_00_HHZ'].data,
)
console.log(maxValue)
console.log(processed)
console.log(heatmap3dData)