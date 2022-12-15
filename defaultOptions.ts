import { LichenOptions } from  './types'

const AXIS_ENABLED = true
const GRID_ENABLED = true
const LINE_WIDTH = 1
const TICK_LENGTH = 4
const TICK_WIDTH = 1
const FONT_SIZE = 10

export default {
  crosshair: true,
  xAxis: {
    enabled: AXIS_ENABLED,
    gridEnabled: GRID_ENABLED,
    fontSize: FONT_SIZE,
    lineWidth: LINE_WIDTH,
    tickLength: TICK_LENGTH,
    tickWidth: TICK_WIDTH
  },
  yAxis: {
    enabled: AXIS_ENABLED,
    gridEnabled: GRID_ENABLED,
    fontSize: FONT_SIZE,
    lineWidth: LINE_WIDTH,
    tickLength: TICK_LENGTH,
    tickWidth: TICK_WIDTH,
    powerOfTen: false,
    width: 50
  },
  height: 120
} as LichenOptions