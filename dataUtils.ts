import { DataUtilsComputedData, DataUtilsDataFromPos, DataUtilsComputedSerieData, LineOptions, Heatmap2dOptions, Heatmap3dOptions, ColorScaleOptions, StackedOptions, SequenceOptions } from './types'

export default class DataUtils {

  type: string;
  opt: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions | StackedOptions | SequenceOptions;
  width: number;
  height: number;
  computed: DataUtilsComputedData;
  yMin: number | null;
  yMax: number | null;
  start: number | null;
  end: number | null;

  constructor (
    type: string,
    opt: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions | StackedOptions | SequenceOptions,
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
    } else if (this.type === 'stacked') {
      const opt = this.opt as StackedOptions
      return [opt.start, opt.start + opt.data[0].data.length * opt.step]
    } else if (this.type === 'sequence') {
      const opt = this.opt as SequenceOptions
      return [opt.start, opt.start + opt.data.length * opt.step]
    }
  }

  yRange (): [number, number] {
    if (this.type === 'line' || this.type === 'heatmap2d' || this.type === 'stacked' || this.type === 'sequence') {
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

  yPosFromStackedValues(index: number, serieIndex: number) {
    if (this.yMin == null || this.yMax == null) {
      return null
    }
    let value = 0
    const series = this.getSeries()
    for (let s = series.length - 1; s >= serieIndex; s--) {
      value += series[s][index]
    }
    return this.yPosFromValue(value)
  }

  dataFromXPos (xPos: number) {
    const series = this.getSeries()
    const result: (DataUtilsDataFromPos | null)[] = Array.from({ length: series.length }, () => null)
    if (this.start == null || this.end == null) {
      return result
    }
    const xValue = this.xValueFromPos(xPos)
    if (xValue == null) {
      return result
    }
    for (const [i, serie] of series.entries()) {
      const c = this.computed.series[i]
      if (c == null) {
        result.push(null)
        continue
      }
      const [start, step] = this.getSerieStartAndStep(i)
      const index = Math.round(serie.data.length * (start - xValue) / (start + serie.data.length * step))
      const xDataValue = start + index * step
      result[i] = {
        index,
        xDataValue,
        xDataValuePos: this.xPosFromValue(xDataValue)!,
        yDataValue: serie.data[index]
      }
    }
    return result
  }

  getSeries () {
    if (this.type === 'stacked') {
      const opt = this.opt as StackedOptions
      return opt.data
    } else if (this.type === 'line') {
      const opt = this.opt as LineOptions[]
      return opt
    } else if (this.type === 'heatmap2d') {
      const opt = this.opt as Heatmap2dOptions[]
      return opt
    } else if (this.type === 'sequence') {
      const opt = this.opt as SequenceOptions
      return [opt]
    }
  }

  getSerieStartAndStep (index: number) {
    if (this.type === 'stacked') {
      const series = this.opt as StackedOptions
      return [series.start, series.step]
    } else if (this.type === 'heatmap2d') {
      const series = this.getSeries() as Heatmap2dOptions[]
      return [series[index].start, series[index].step]
    } else if (this.type === 'line') {
      const series = this.getSeries() as LineOptions[]
      return [series[index].start, series[index].step]
    } else if (this.type === 'sequence') {
      const series = this.getSeries() as SequenceOptions[]
      return [series[0].start, series[0].step]
    }
  }

  computeData () {
    if (this.start == null || this.end == null) {
      return
    }
    const series = this.getSeries()
    this.computed = {
      minValue: null,
      maxValue: null,
      series: Array.from({ length: series.length }, () => null)
    }
    const computed: (DataUtilsComputedSerieData | null)[] = []
    let globalMinValue: number | null = null
    let globalMaxValue: number | null = null
    for (const [index, serie] of series.entries()) {
      const [start, step] = this.getSerieStartAndStep(index)
      const xRatio = (this.end - this.start) / (step * this.width)
      let minIndex = Math.floor((this.start - start) / step)
      const maxIndex = Math.min(1 + (this.end - start) / step, serie.data.length - 1)
      const dataStart = minIndex < 0 ? start : start + minIndex * step
      const dataEnd = dataStart + maxIndex * step
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
        dataEnd,
        xRatio,
        minIndex,
        maxIndex,
        minValue: minValue!,
        maxValue: maxValue!,
        avgValue,
        rmsValue: Math.sqrt((valueSqSum - 2 * avgValue * valueSum + valueCount * avgValue * avgValue) / valueCount)
      })
    }

    let maxStacked = null
    if (this.type === 'stacked' && computed[0] != null) {
      for (let i = computed[0].minIndex; i < computed[0].maxIndex; i++) {
        let currentSum = null
        for (const serie of series) {
          if (serie.data[i] == null) {
            break
          } else if (currentSum == null) {
            currentSum = serie.data[i]
          } else {
            currentSum += serie.data[i]
          }
        }
        if (maxStacked == null) {
          maxStacked = currentSum
        } else if (currentSum != null) {
          maxStacked = Math.max(maxStacked, currentSum)
        }
      }
    }

    this.computed = {
      minValue: globalMinValue,
      maxValue: this.type === 'stacked' ? maxStacked : globalMaxValue,
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

  getColor (value: number, colorScale: ColorScaleOptions, text = true) {
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
