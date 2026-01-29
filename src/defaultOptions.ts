// import type { LichenOptions } from  './types'
const AXIS_ENABLED = true
const GRID_ENABLED = true
const LINE_WIDTH = 1
const TICK_LENGTH = 4
const TICK_WIDTH = 1
const FONT_SIZE = 10
const AXIS_TEXT_COLOR = '#888'
const GRID_COLOR = 'rgba(136, 136, 136, 0.1)'

export default {
  header: {
    position: 'top',
    width: 80
  },
  tooltip: {
    enabled: true,
    fontSize: FONT_SIZE
  },
  zoom: 'xy',
  selection: 'xy',
  xAxis: {
    enabled: AXIS_ENABLED,
    gridEnabled: GRID_ENABLED,
    fontSize: FONT_SIZE,
    textColor: AXIS_TEXT_COLOR,
    lineWidth: LINE_WIDTH,
    tickLength: TICK_LENGTH,
    tickWidth: TICK_WIDTH,
    gridColor: GRID_COLOR,
    datetime: true
  },
  yAxis: {
    enabled: AXIS_ENABLED,
    gridEnabled: GRID_ENABLED,
    fontSize: FONT_SIZE,
    textColor: AXIS_TEXT_COLOR,
    lineWidth: LINE_WIDTH,
    tickLength: TICK_LENGTH,
    tickWidth: TICK_WIDTH,
    gridColor: GRID_COLOR,
    powerOfTen: false,
    logarithmic: false,
    width: 50
  },
  legend: {
    enabled: true,
    position: 'bottom',
    width: 80,
    fontSize: 10
  },
  crosshair: {
    enabled: true,
    sticky: true,
    text: ''
  },
  hooks: {
    beforeDraw: () => true,
    beforeSelection: () => true,
    beforeResetDisplay: () => true
  },
  vLines: [],
  height: 120,
  autoResize: true,
  stacked: false,
  serieHeight: 15
}