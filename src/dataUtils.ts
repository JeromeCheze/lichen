import MasterInterface from './masterInterface'
import { DataUtilsComputedData, LineOptions, Heatmap2dOptions, Heatmap3dOptions, ColorScaleOptions, StackedOptions, SequenceOptions, StackedDataOptions, ScatterOptions } from './types'

export default class DataUtils {

  type: 'line' | 'heatmap2d' | 'heatmap3d' | 'stacked' | 'sequence' | 'scatter';
  opt: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions | StackedOptions | SequenceOptions | ScatterOptions[];
  width: number;
  height: number;
  computed: DataUtilsComputedData;
  yMin: number | null;
  yMax: number | null;
  start: number | null;
  end: number | null;
  master: MasterInterface;

  /**
   * 
   * @param master
   * @param width 
   * @param height 
   */
  constructor(
    master: MasterInterface,
    width: number,
    height: number
  ) {
    master.register('DATA_UTILS', this)
    this.master = master
    this.type = master.getRegistered('CHART').opt.type
    this.opt = master.getRegistered('CHART').opt.series
    this.width = width
    this.height = height
    this.yMin = null
    this.yMax = null
    this.start = null
    this.end = null
  }

  /**
   * Set X range to use for data processing
   * @param x1 
   * @param x2 
   */
  setXRange(x1: number, x2: number) {
    this.start = x1
    this.end = x2
  }

  /**
   * Set the Y range to use for data processing
   * @param y1 
   * @param y2 
   */
  setYRange(y1: number, y2: number) {
    this.yMin = y1
    this.yMax = y2
  }

  /**
   * Convert the given X position to the corresponding data value
   * @param xPos - the position in px
   * @returns the data value
   */
  xValueFromPos(xPos: number): null | number {
    if (this.start == null || this.end == null) {
      return null
    }
    return this.start + (xPos / this.width) * (this.end - this.start)
  }

  /**
   * Convert the given Y position to the corresponding data value
   * @param yPos - the position in px
   * @returns the data value
   */
  yValueFromPos(yPos: number): number {
    return this.yMax - (yPos / this.height) * (this.yMax - this.yMin)
  }

  /**
   * Convert the given data value to the corresponding X position
   * @param xValue - the data value
   * @returns the X position coordinate
   */
  xPosFromValue(xValue: number): null | number {
    if (this.start == null || this.end == null) {
      return null
    }
    return this.width * (xValue - this.start) / (this.end - this.start)
  }

  /**
   * Convert the given data value to the corresponding Y position
   * @param yValue - the data value
   * @returns the Y position coordinate
   */
  yPosFromValue(yValue: number | null): null | number {
    if (yValue == null || this.yMin == null || this.yMax == null) {
      return null
    }
    return this.height * (this.yMax - yValue) / (this.yMax - this.yMin)
  }

  toScientificNotation(value: number | null, precision = 2) {
    if (value == null) {
      return null
    }
    if (value === 0) {
      return '0'
    }
    let pow = 0
    if (value > 10) {
      while (value >= 10) {
        value /= 10
        pow++
      }
    } else {
      while (value < 1) {
        value *= 10
        pow--
      }
    }
    return `${value.toFixed(precision)}e${pow}`
  }

  resetComputed() {
    this.computed = {
      minValue: null,
      maxValue: null,
      series: []
    }
  }

  processData() {
    this.resetComputed()
    const dataCollection = this.master.getRegistered('PLOT').getProcessingData()
    for (const data of dataCollection) {
      let minValue: null | number = null
      let maxValue: null | number = null
      let valueSum = 0
      let valueSqSum = 0
      let valueCount = 0
      for (const v of data) {
        if (v == null) { 
          continue
        }
        minValue = minValue == null ? v : Math.min(minValue, v)
        maxValue = maxValue == null ? v : Math.max(maxValue, v)
        valueSum += v
        valueSqSum += v * v
        valueCount++
      }
      if (valueCount === 0) {
        this.computed.series.push(null)
        continue
      }
      const avgValue = valueSum / valueCount
      this.computed.minValue = this.computed.minValue == null ? minValue : Math.min(this.computed.minValue, minValue)
      this.computed.maxValue = this.computed.maxValue == null ? maxValue : Math.max(this.computed.maxValue, maxValue)
      this.computed.series.push({
        minValue: minValue,
        maxValue: maxValue,
        avgValue,
        rmsValue: Math.sqrt((valueSqSum - 2 * avgValue * valueSum + valueCount * avgValue * avgValue) / valueCount)
      })
    }
    if (this.master.getRegistered('PLOT').isDataStacked() && dataCollection.length > 0) {
      for (let i = 0; i < dataCollection[0].length; i++) {
        let currentSum = 0
        for (const data of dataCollection) {
          const v = data[i]
          currentSum = v == null ? currentSum : currentSum + v
        }
        this.computed.maxValue = Math.max(this.computed.maxValue, currentSum)
      }
    }
  }

  getRatio(v: number, min: number, max: number) {
    return (v - min) / (max - min)
  }

  toRGB(c: [number, number, number]) {
    return `rgb(${c[0]},${c[1]},${c[2]})`
  }

  toRGBA(c: [number, number, number], a: number) {
    return `rgba(${c[0]},${c[1]},${c[2]},${a})`
  }

  getColor(value: number, colorScale: ColorScaleOptions, text = true) {
    let min = colorScale.min
    let max = colorScale.max
    if (colorScale.logarithmic) {
      if (value !== 0) {
        value = Math.log2(value)
      }
      if (min !== 0) {
        min = Math.log2(min)
      }
      if (max !== 0) {
        max = Math.log2(max)
      }
    }
    const cs = colorScale.stops
    const v = this.getRatio(value, min, max)

    if (v <= cs[0][0]) {
      return text ? this.toRGB(cs[0][1]) : cs[0][1]
    } else if (v >= cs.slice(-1)[0][0]) {
      return text ? this.toRGB(cs.slice(-1)[0][1]) : cs.slice(-1)[0][1]
    }
    let i = 0
    while (cs[i][0] < v) {
      i++
    }
    const color = []
    const r = this.getRatio(v, cs[i - 1][0], cs[i][0])
    for (let j = 0; j < cs[0][1].length; j++) {
      color.push(cs[i - 1][1][j] + r * (cs[i][1][j] - cs[i - 1][1][j]))
    }
    return text ? this.toRGB(color as [number, number, number]) : color
  }
}
