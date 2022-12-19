import { SerieOptions, DataUtilsComputedData, DataUtilsDataFromPos } from './types'

const DATA_DISPLAY_PADDING = 0.1
const MIN_AMPLITUDE = 0.1

export default class DataUtils {

  opt: SerieOptions[];
  width: number;
  height: number;
  computed: (null | DataUtilsComputedData)[];
  start: number | null;
  end: number | null;

  constructor (opt: SerieOptions[], width: number, height: number) {
    this.opt = opt
    this.width = width
    this.height = height
    this.computed = Array.from(opt, () => null)
    this.start = null
    this.end = null
  }

  dataRange (): [number, number] {
    let minStart: number | null = null
    let maxEnd: number | null = null
    for (const serie of this.opt) {
      const end = serie.data.length * serie.step
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

  xPosFromValue (xValue: number): null | number {
    if (this.start == null || this.end == null) {
      return null
    }
    return this.width * (xValue - this.start) / (this.end - this.start)
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
      const c = this.computed[i]
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
    const computed: (null | DataUtilsComputedData)[] = []
    for (const serie of this.opt) {
      const xRatio = (this.end - this.start) / (serie.step * this.width)
      const minIndex = (this.start - serie.start) / serie.step
      const maxIndex = (this.end - serie.start) / serie.step
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
      let amplitude = maxValue! - minValue!
      if (amplitude === 0) {
        amplitude = MIN_AMPLITUDE
      }
      const displayMin = minValue! - DATA_DISPLAY_PADDING * amplitude
      const displayMax = maxValue! + DATA_DISPLAY_PADDING * amplitude
      computed.push({
        displayMin,
        displayMax,
        xRatio,
        yRatio: (displayMax! - displayMin!) / this.height,
        minIndex,
        maxIndex,
        minValue: minValue!,
        maxValue: maxValue!,
        avgValue,
        rmsValue: Math.sqrt((valueSqSum - 2 * avgValue * valueSum + valueCount * avgValue * avgValue) / valueCount)
      })
    }
    this.computed = computed
  }
}
