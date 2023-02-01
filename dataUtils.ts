import { SerieOptions, DataUtilsComputedData, DataUtilsDataFromPos, DataUtilsComputedSerieData } from './types'

export default class DataUtils {

  opt: SerieOptions[];
  width: number;
  height: number;
  computed: DataUtilsComputedData;
  yMin: number | null;
  yMax: number | null;
  start: number | null;
  end: number | null;

  constructor (opt: SerieOptions[], width: number, height: number) {
    this.opt = opt
    this.width = width
    this.height = height
    this.computed = {
      minValue: null,
      maxValue: null,
      series: Array.from(opt, () => null)
    }
    this.yMin = null
    this.yMax = null
    this.start = null
    this.end = null
  }

  dataRange (): [number, number] {
    let minStart: number | null = null
    let maxEnd: number | null = null
    for (const serie of this.opt) {
      const end = serie.start + serie.data.length * serie.step
      minStart = minStart == null || serie.start < minStart ? serie.start : minStart
      maxEnd = maxEnd == null || maxEnd < end ? end : maxEnd
    }
    return [minStart, maxEnd] as [number, number]
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

  dataFromPos (xPos: number) {
    const result: (DataUtilsDataFromPos | null)[] = Array.from(this.opt, () => null)
    if (this.start == null || this.end == null) {
      return result
    }
    const xValue = this.xValueFromPos(xPos)
    if (xValue == null) {
      return result
    }
    for (const [i, serie] of this.opt.entries()) {
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

  computeData() {
    if (this.start == null || this.end == null) {
      return
    }
    const computed: (DataUtilsComputedSerieData | null)[] = []
    let globalMinValue: number | null = null
    let globalMaxValue: number | null = null
    for (const serie of this.opt) {
      const xRatio = (this.end - this.start) / (serie.step * this.width)
      let minIndex = Math.floor((this.start - serie.start) / serie.step)
      const maxIndex = Math.min((this.end - serie.start) / serie.step, serie.data.length - 1)
      let dataStart = this.start
      if (minIndex < 0) {
        dataStart = serie.start
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
}
