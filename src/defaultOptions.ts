import { LichenOptions } from  './types'

const AXIS_ENABLED = true
const GRID_ENABLED = true
const LINE_WIDTH = 1
const TICK_LENGTH = 4
const TICK_WIDTH = 1
const FONT_SIZE = 10
const AXIS_TEXT_COLOR = '#888'
const GRID_COLOR = 'rgba(136, 136, 136, 0.1)'

export default {
  tooltip: true,
  header: {
    position: 'top',
    width: 80
  },
  zoom: 'xy',
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
  vLines: [],
  height: 120,
  stacked: false,
  serieHeight: 15
} as LichenOptions