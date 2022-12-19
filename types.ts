export interface Coordinates {
  x: number;
  y: number;
}

export interface GlobalAxisOptions {
  enabled: boolean;
  gridEnabled: boolean;
  fontSize: number;
  lineWidth: number;
  tickLength: number;
  tickWidth: number;
}

export interface XAxisOptions extends GlobalAxisOptions {}

export interface YAxisOptions extends GlobalAxisOptions {
  min?: number;
  max?: number;
  powerOfTen: boolean;
  width: number;
}

export interface SerieOptions {
  name?: string;
  start: number;
  step: number;
  data: (number | null)[];
}

export interface LichenOptions {
  title?: string;
  type: 'line';
  crosshair: boolean;
  height: number;
  xAxis: XAxisOptions;
  yAxis: YAxisOptions;
  series: SerieOptions[];
}

export interface DataUtilsDrawData {
  displayMin: number;
  displayMax: number;
  xRatio: number;
  yRatio: number;
  minIndex: number;
  maxIndex: number;
  minValue: number;
  maxValue: number;
  avgValue: number;
  rmsValue: number;
}