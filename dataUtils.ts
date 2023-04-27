import { DataUtilsComputedData, DataUtilsDataFromPos, DataUtilsComputedSerieData, LineOptions, Heatmap2dOptions, Heatmap3dOptions, ColorScaleOptions } from './types'

export default class DataUtils {

  type: string;
  opt: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions;
  width: number;
  height: number;
  computed: DataUtilsComputedData;
  yMin: number | null;
  yMax: number | null;
  start: number | null;
  end: number | null;

  constructor (
    type: string,
    opt: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions,
    width: number,
    height: number
  ) {
    this.type = type
    this.opt = opt
    this.width = width
    this.height = height
    this.yMin = null
    this.yMax = null
    this.start = null
    this.end = null
  }

  xRange (): [number, number] {
    if (this.type === 'line' || this.type === 'heatmap2d') {
      let minStart: number | null = null
      let maxEnd: number | null = null
      const opt = this.opt as LineOptions[] | Heatmap2dOptions[]
      for (const serie of opt) {
        const end = serie.start + serie.data.length * serie.step
        minStart = minStart == null || serie.start < minStart ? serie.start : minStart
        maxEnd = maxEnd == null || maxEnd < end ? end : maxEnd
      }
      return [minStart, maxEnd]
    } else if (this.type === 'heatmap3d') {
      const opt = this.opt as Heatmap3dOptions
      return [opt.start, opt.start + opt.data.length * opt.step]
    }
  }

  yRange (): [number, number] {
    if (this.type === 'line' || this.type === 'heatmap2d') {
      return [this.computed.minValue, this.computed.maxValue]
    } else if (this.type === 'heatmap3d') {
      const opt = this.opt as Heatmap3dOptions
      return [opt.yMin, opt.yMax]
    }
  }

  xValueFromPos (xPos: number): null | number {
    if (this.start == null || this.end == null) {
      return null
    }
    return this.start + (xPos / this.width) * (this.end - this.start)
  }

  yValueFromPos (yPos: number): number {
    return this.yMax - (yPos / this.height) * (this.yMax - this.yMin)
  }

  xPosFromValue (xValue: number): null | number {
    if (this.start == null || this.end == null) {
      return null
    }
    return this.width * (xValue - this.start) / (this.end - this.start)
  }

  yPosFromValue (yValue: number): null | number {
    if (this.yMin == null || this.yMax == null) {
      return null
    }
    return this.height * (this.yMax - yValue) / (this.yMax - this.yMin)
  }

  dataFromXPos (xPos: number) {
    const opt = this.opt as LineOptions[]
    const result: (DataUtilsDataFromPos | null)[] = Array.from(opt, () => null)
    if (this.start == null || this.end == null) {
      return result
    }
    const xValue = this.xValueFromPos(xPos)
    if (xValue == null) {
      return result
    }
    for (const [i, serie] of opt.entries()) {
      const c = this.computed.series[i]
      if (c == null) {
        result.push(null)
        continue
      }
      const index = Math.round(serie.data.length * (serie.start - xValue) / (serie.start + serie.data.length * serie.step))
      const xDataValue = serie.start + index * serie.step
      result[i] = {
        index,
        xDataValue,
        xDataValuePos: this.xPosFromValue(xDataValue)!,
        yDataValue: serie.data[index]
      }
    }
    return result
  }

  computeData () {
    if (this.start == null || this.end == null) {
      return
    }
    const opt  = this.opt as LineOptions[] | Heatmap2dOptions[]
    this.computed = {
      minValue: null,
      maxValue: null,
      series: Array.from(opt, () => null)
    }
    const computed: (DataUtilsComputedSerieData | null)[] = []
    let globalMinValue: number | null = null
    let globalMaxValue: number | null = null
    for (const serie of opt) {
      const xRatio = (this.end - this.start) / (serie.step * this.width)
      let minIndex = Math.floor((this.start - serie.start) / serie.step)
      const maxIndex = Math.min(1 + (this.end - serie.start) / serie.step, serie.data.length - 1)
      const dataStart = minIndex < 0 ? serie.start : serie.start + minIndex * serie.step
      if (minIndex < 0) {
        minIndex = 0
      }
      if (minIndex >= serie.data.length || maxIndex <= 0) {
        computed.push(null)
        continue
      }
      let minValue: null | number = null
      let maxValue: null | number = null
      let valueSum = 0
      let valueSqSum = 0
      let valueCount = 0
      for (let i = minIndex; i < maxIndex; i++) {
        const v = serie.data[i]
        if (v == null) {
          continue
        }
        minValue = minValue == null || v < minValue ? v : minValue
        maxValue = maxValue == null || maxValue < v ? v : maxValue
        valueSum += v
        valueSqSum += v * v
        valueCount++
      }
      if (valueCount === 0) {
        computed.push(null)
        continue
      }
      const avgValue = valueSum / valueCount
      globalMinValue = globalMinValue == null || minValue! < globalMinValue ? minValue : globalMinValue
      globalMaxValue = globalMaxValue == null || globalMaxValue < maxValue! ? maxValue : globalMaxValue
      computed.push({
        dataStart,
        xRatio,
        minIndex,
        maxIndex,
        minValue: minValue!,
        maxValue: maxValue!,
        avgValue,
        rmsValue: Math.sqrt((valueSqSum - 2 * avgValue * valueSum + valueCount * avgValue * avgValue) / valueCount)
      })
    }

    this.computed = {
      minValue: globalMinValue,
      maxValue: globalMaxValue,
      series: computed
    }
  }

  getRatio (v: number, min: number, max: number) {
    return (v - min) / (max - min)
  }

  toRGB (c: [number, number, number]) {
    return `rgb(${c[0]},${c[1]},${c[2]})`
  }

  toRGBA (c: [number, number, number], a: number) {
    return `rgba(${c[0]},${c[1]},${c[2]},${a})`
  }

  getColor (value: number, colorScale: ColorScaleOptions) {
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
      return this.toRGB(cs[0][1])
    } else if (v >= cs.slice(-1)[0][0]) {
      return this.toRGB(cs.slice(-1)[0][1])
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
    return this.toRGB(color as [number, number, number])
  }
}
