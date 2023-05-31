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
}

export interface XAxisOptions extends GlobalAxisOptions {}

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
  name?: string;
  start: number;
  step: number;
  data: (number | null)[];
  color?: string;
  area?: boolean;
  linewidth?: number;
  enabled?: boolean;
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

export interface Heatmap2dOptions {
  name?: string;
  start: number;
  step: number;
  data: (number | null)[];
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
}

export interface LichenOptions {
  title?: string;
  header: HeaderOptions;
  type: 'line' | 'heatmap2d' | 'heatmap3d' | 'stacked';
  legend: LegendOptions;
  crosshair: boolean;
  height: number;
  stacked: boolean;
  serieHeight: number;
  zoom: null | 'x' | 'y' | 'xy';
  colorScale?: ColorScaleOptions;
  xAxis: XAxisOptions;
  yAxis: YAxisOptions;
  series: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions | StackedOptions;
  synced: () => Lichen[];
}

export interface DataUtilsComputedSerieData {
  dataStart: number;
  dataEnd: number;
  xRatio: number;
  minIndex: number;
  maxIndex: number;
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

export interface DataUtilsDataFromPos {
  index: number;
  xDataValue: number;
  xDataValuePos: number;
  yDataValue: number | null;
}


export interface EvenUtilsEventHandlerMap {
  [eventName: string]: {
    el: HTMLElement;
    callback: (e: any) => void;
  }
}