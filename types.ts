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

export interface LineOptions {
  name?: string;
  start: number;
  step: number;
  data: (number | null)[];
  color?: string;
  area?: boolean;
  linewidth?: number;
  logarithmicColorScale?: boolean;
}

export interface Heatmap2dOptions {
  name?: string;
  start: number;
  step: number;
  data: (number | null)[];
  logarithmicColorScale?: boolean;
}

export interface Heatmap3dOptions {
  start: number;
  step: number;
  data: (number[] | null)[];
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
  logarithmicColorScale?: boolean;
}

export interface HeaderOptions {
  title?: string;
  position: 'top' | 'left';
  width?: number;
}

export interface LichenOptions {
  title?: string;
  header: HeaderOptions;
  type: 'line' | 'heatmap2d' | 'heatmap3d';
  crosshair: boolean;
  height: number;
  serieHeight: number;
  colorScale?: ColorScaleObject;
  xAxis: XAxisOptions;
  yAxis: YAxisOptions;
  series: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions;
  synced: () => Lichen[];
}

export interface DataUtilsComputedSerieData {
  dataStart: number;
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