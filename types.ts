import { Lichen } from './index'

export interface Coordinates {
  x: number;
  y: number;
}

export interface GlobalAxisOptions {
  enabled: boolean;
  gridEnabled: boolean;
  fontSize: number;
  textColor: string;
  lineWidth: number;
  tickLength: number;
  tickWidth: number;
  gridColor: string;
  title?: string;
}

export interface XAxisOptions extends GlobalAxisOptions {
  datetime: boolean;
}

export interface YAxisOptions extends GlobalAxisOptions {
  min?: number;
  max?: number;
  powerOfTen: boolean;
  width: number;
}

export type ColorScaleObject  = [
  number,
  [number, number, number],
  string?
][];

export interface ColorScaleOptions {
  stops: ColorScaleObject;
  min: number;
  max: number;
  logarithmic: boolean
}

export interface LineOptions {
  name: string;
  start: number;
  step: number;
  data: (number | null)[];
  color?: string;
  area?: boolean;
  linewidth?: number;
  enabled?: boolean;
  tooltipFormatter?: (x: number) => string;
}

export interface SequenceOptions {
  start: number;
  step: number;
  color: string;
  valueMap: { value: number; name: string }[];
  data: (number | null)[];
  tooltipFormatter?: (x: number) => string;
}

export interface StackedDataOptions {
  name: string;
  color: string;
  enabled?: boolean;
  data: (number | null)[];
}

export interface StackedOptions {
  start: number;
  step: number;
  area?: boolean;
  linewidth?: number;
  data: StackedDataOptions[];
}

export interface ScatterOptions {
  name: string;
  color: string;
  shape: 'circle' | 'diamond';
  data: {
    x: number;
    y: number;
    name: string;
    color?: string;
  }[];
  tooltipFormatter?: (x: number) => string;
}

export interface Heatmap2dOptions {
  name?: string;
  start: number;
  step: number;
  data: (number | null)[];
  tooltipFormatter?: (x: number) => string;
}

export interface Heatmap3dOptions {
  start: number;
  step: number;
  data: (number[] | null)[];
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
}

export interface HeaderOptions {
  title?: string;
  position: 'top' | 'left';
  width?: number;
}

export interface LegendOptions {
  enabled: boolean;
  position: 'bottom' | 'right';
  width: number;
  fontSize: number;
}

export interface LegendItem {
  name: string;
  color: string;
  enabled?: boolean;
}

export interface CrosshairOptions {
  enabled: boolean;
  sticky: boolean;
  text: string;
}

export interface VLine {
  x: number;
  color: string;
  text: string;
  position: 'top' | 'bottom';
  range?: [number, number];
  selectable?: boolean;
  arrow?: 'top' | 'bottom';
}

export interface EventChannelSubscription {
  [name: string]: ((data?: any) => void)[];
}

export interface TooltipHandlerResponse {
  xValue: number;
  yValues: {
    color: string;
    value: number;
    name: string;
    textValue: string;
  }[];
}

export interface LichenOptions {
  title?: string;
  header: HeaderOptions;
  type: 'line' | 'heatmap2d' | 'heatmap3d' | 'stacked' | 'sequence' | 'scatter';
  legend: LegendOptions;
  crosshair: CrosshairOptions;
  vLines: VLine[];
  tooltip: boolean;
  height: number;
  stacked: boolean;
  serieHeight: number;
  zoom: null | 'x' | 'y' | 'xy';
  colorScale?: ColorScaleOptions;
  xAxis: XAxisOptions;
  yAxis: YAxisOptions;
  series: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions | StackedOptions | SequenceOptions | ScatterOptions[];
  synced: () => Lichen[];
}

// export interface DataUtilsComputedSerieData {
//   dataStart: number;
//   dataEnd: number;
//   xRatio: number;
//   minIndex: number;
//   maxIndex: number;
//   minValue: number;
//   maxValue: number;
//   avgValue: number;
//   rmsValue: number;
// }

export interface DataUtilsComputedSerieData {
  minValue: number;
  maxValue: number;
  avgValue: number;
  rmsValue: number;
}

export interface DataUtilsComputedData {
  minValue: number | null;
  maxValue: number | null;
  series: (DataUtilsComputedSerieData | null)[];
}

export interface DataFromPos {
  index: number | null;
  xDataValue: number;
  xDataValuePos: number;
  yDataValue: number | null;
  yDataValuePos: number;
}


export interface EvenUtilsEventHandlerMap {
  [eventName: string]: {
    el: HTMLElement;
    callback: (e: any) => void;
  }
}