import Lichen from './index'

export interface Coordinates {
  x: number
  y: number
}

export interface GlobalAxisOptions {
  enabled?: boolean
  gridEnabled?: boolean
  textColor?: string
  fontSize?: number
  lineWidth?: number
  tickLength?: number
  tickWidth?: number
  gridColor?: string
  title?: string
  min?: number
  max?: number
}

export interface TooltipOptions {
  enabled?: boolean
  fontSize?: number
}

export interface XAxisOptions extends GlobalAxisOptions {
  tooltipFormatter?: (x: number) => string
  datetime?: boolean
}

export interface YAxisOptions extends GlobalAxisOptions {
  powerOfTen?: boolean
  logarithmic?: boolean
  width?: number
}

export type ColorScaleObject = [
  number,
  [number, number, number],
  string?
][]

export interface ColorScaleOptions {
  stops: ColorScaleObject
  min: number | null
  max: number | null
  logarithmic: boolean
  category: boolean
}

export interface LineOptions {
  name?: string
  start: number
  step: number
  data: (number | null)[]
  color?: string
  area?: boolean
  linewidth?: number
  enabled?: boolean
  tooltipFormatter?: (x: number) => string
}

export interface SequenceOptions {
  start: number
  step: number
  color: string
  valueMap: { value: number; name: string }[]
  data: (number | null)[]
  tooltipFormatter?: (x: number) => string
}

export interface StackedDataOptions {
  name: string
  color: string
  enabled?: boolean
  data: (number | null)[]
}

export interface StackedOptions {
  start: number
  step: number
  area?: boolean
  linewidth?: number
  data: StackedDataOptions[]
  tooltipFormatter?: (x: number) => string
}

export interface ScatterPoint {
  x: number
  y: number
  name: string
  color?: string
  extra?: any
}

export interface ScatterOptions {
  name: string
  color: string
  shape: 'circle' | 'diamond'
  enabled?: boolean
  data: ScatterPoint[]
  tooltipFormatter?: (x: ScatterPoint) => string
}

export interface Heatmap2dOptions {
  name?: string
  start: number
  step: number
  data: (number | null)[]
  aggregation: 'max' | 'min' | 'avg'
  tooltipFormatter?: (x: number) => string
}

export interface Heatmap3dOptions {
  start: number
  step: number
  data: (number[] | null)[]
  yMin: number
  yMax: number
  zMin: number
  zMax: number
  smoothing?: boolean
}

export interface HeaderOptions {
  title?: string
  position: 'top' | 'left'
  width?: number
}

export interface LegendOptions {
  enabled?: boolean
  position?: 'bottom' | 'right'
  width?: number
  fontSize?: number
}

export interface LegendItem {
  name: string
  color: string
  enabled?: boolean
}

export interface CrosshairOptions {
  enabled?: boolean
  sticky?: boolean
  text?: string
}

export interface VLine {
  x: number
  color: string
  text?: string
  position?: 'top' | 'bottom'
  range?: [number, number]
  selectable?: boolean
  arrow?: 'top' | 'bottom'
  data?: any
  tooltip?: string
  width?: number
}

export interface EventChannelSubscription {
  [name: string]: ((data?: any) => void)[]
}

export interface TooltipHandlerResponse {
  xValue: number
  yValues: {
    color: string
    value: number
    name: string
    textValue: string
  }[]
}

export interface HooksOptions {
  beforeSelection?: (x: [number | null, number | null], y: [number | null, number | null]) => boolean
  beforeDraw?: (chart: Lichen) => boolean
  beforeResetDisplay?: () => boolean
  onVlineSelection?: (vlines: VLine[]) => void
  onCursorMove?: (x: number, y: number) => void
  onDblClick?: (x: number) => void
  onActive?: (chart: Lichen) => void
  onClick?: (chart: Lichen) => void
}

export interface LichenOptions {
  header: HeaderOptions
  type: 'line' | 'heatmap2d' | 'heatmap3d' | 'stacked' | 'sequence' | 'scatter'
  tooltip?: TooltipOptions
  legend?: LegendOptions
  crosshair?: CrosshairOptions
  vLines?: VLine[]
  height?: number
  width?: number
  fontSize?: number
  autoResize?: boolean
  stacked?: boolean
  serieHeight?: number
  zoom?: null | 'x' | 'y' | 'xy'
  selection?: null | 'x' | 'y' | 'xy'
  colorScale?: ColorScaleOptions
  xAxis?: XAxisOptions
  yAxis?: YAxisOptions
  series: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions | StackedOptions | SequenceOptions | ScatterOptions[]
  hooks?: HooksOptions
  synced?: () => Record<number, Lichen>
}

// export interface DataUtilsComputedSerieData {
//   dataStart: number
//   dataEnd: number
//   xRatio: number
//   minIndex: number
//   maxIndex: number
//   minValue: number
//   maxValue: number
//   avgValue: number
//   rmsValue: number
// }

export interface DataUtilsComputedSerieData {
  minValue: number
  maxValue: number
  avgValue: number
  rmsValue: number
  // median: number
  quarterLeftAvg: number
}

export interface DataUtilsComputedData {
  minValue: number | null
  maxValue: number | null
  series: (DataUtilsComputedSerieData | null)[]
}

export interface DataFromPos {
  index: number | null
  xDataValue: number
  xDataValuePos: number
  yDataValue: number | null
  yDataValuePos: number
}


export interface EvenUtilsEventHandlerMap {
  [eventName: string]: {
    el: HTMLElement
    callback: (e: any) => void
    passive?: boolean
  }
}