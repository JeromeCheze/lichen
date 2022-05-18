import { Lichen } from ".."

export type StringIndexedObject = {
  [key: string]: any;
}

export type VLine = {
  x: number;
  name?: string;
  color?: string;
  width?: number;
  display?: boolean;
  position: 'top' | 'middle' | 'bottom'
}
  
export type LichenSingleLineData = (number | null)[]
export type LichenTimingData = (string | null)[]
export type LichenHeatmapData = (number | null)[][]
export type LichenMultiLineData = {
  [variable: string]: {
    data: LichenSingleLineData | LichenTimingData;
    color?: string;
    enabled?: boolean | undefined;
    title?: string | undefined;
  };
}
  
export interface LichenDisplayBounds extends StringIndexedObject {
  xStart: number;
  xEnd: number;
  yStart?: number | undefined;
  yEnd?: number | undefined;
  zStart?: number | undefined;
  zEnd?: number | undefined;
}

export type LichenStyleOptions = {
  width?: number;
  background: string;
  height: number;
  xAxisHeight: number;
  yAxisWidth: number;
  lineWidth: number;
  titleFontSize: number;
  legendFontSize: number;
  fontSize: number;
  textColor: string;
  gridColor: string;
  categoryHeight: number;
  categoryMargin: number;
}

export type LichenTooltipOptions = {
  tooltip: boolean;
  displayDateInTooltip: boolean;
  categoryTooltipValues: boolean;
  tooltipFormatter: (value: number) => string;
  units: string;
}

export type LichenColorScale = [number, [number, number, number], (string | number)?][]

export type LichenDisplayOptions = {
  title: string;
  colorScale: LichenColorScale;
  color: string;
  areaFillOpacity: number;
  logarithmicColorScale: boolean;
  drawColorScale: boolean;
  crosshair: boolean;
  displayStats: boolean;
  yAxisPowerOfTen: boolean;
  vLines: VLine[];
  syncScale: boolean;
  fixedMin: number;
  fixedMax: number;
}

export type LichenInteractionOptions = {
  reverseXZoom: boolean;
  reverseYZoom: boolean;
  debounce: boolean;
}

export type LichenCallbackOptions = {
  beforeDraw: (this: Lichen) => boolean;
  afterDraw: (this: Lichen) => void;
  onDblClick: (instance: Lichen, x: number) => boolean;
  syncCharts: () => Lichen[];
}

export interface LichenAdvancedOptions extends
  LichenStyleOptions,
  LichenDisplayOptions,
  LichenInteractionOptions,
  LichenCallbackOptions,
  LichenTooltipOptions {}

export interface LichenLineOptions extends Partial<LichenAdvancedOptions> {
  type: 'line';
  stacked?: boolean;
  area?: boolean;
  xStart: number;
  xStep: number;
  data: LichenSingleLineData | LichenMultiLineData;
}

export interface LichenHeatmapOptions extends Partial<LichenAdvancedOptions> {
  type: 'heatmap';
  xStart: number;
  xStep: number;
  yStart: number;
  yEnd: number;
  zStart: number;
  zEnd: number;
  data: LichenHeatmapData;
}

export interface LichenCategoryHeatmapOptions extends Partial<LichenAdvancedOptions> {
  type: 'heatmap';
  categories: string[];
  xStart: number;
  xStep: number;
  zStart: number;
  zEnd: number;
  data: LichenHeatmapData;
}

export interface LichenTimingOptions extends Partial<LichenAdvancedOptions> {
  type: 'timing';
  categories: { key: string, label: string }[];
  xStart: number;
  xStep: number;
  data: LichenTimingData;
}

export type LichenOptions = LichenLineOptions | LichenCategoryHeatmapOptions | LichenHeatmapOptions | LichenTimingOptions;

export interface LichenInstanceOptions extends LichenAdvancedOptions {
  type: 'line' | 'heatmap' | 'timing';
  categories?: string[] | { key: string, label: string }[];
  stacked?: boolean;
  area?: boolean;
  width: number;
  xStart: number;
  xStep: number;
  xEnd: number;
  yStart?: number;
  yEnd?: number;
  zStart?: number;
  zEnd?: number;
  data: LichenSingleLineData | LichenMultiLineData | LichenHeatmapData | LichenTimingData;
}
