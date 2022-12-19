import { SerieOptions, DataUtilsDrawData } from './types'

const DATA_DISPLAY_PADDING = 0.1
const MIN_AMPLITUDE = 0.1

export default class DataUtils {

  opt: SerieOptions[];
  width: number;
  height: number;
  drawData: (null | DataUtilsDrawData)[];

  constructor (opt: SerieOptions[], width: number, height: number) {
    this.opt = opt
    this.width = width
    this.height = height
    this.drawData = Array.from(opt, x => null)
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

  computeDrawData(t1: number, t2: number) {
    const drawData: (null | DataUtilsDrawData)[] = []
    for (const serie of this.opt) {
      const xRatio = (t2 - t1) / (serie.step * this.width)
      const minIndex = (t1 - serie.start) / serie.step
      const maxIndex = (t2 - serie.start) / serie.step
      if (minIndex >= serie.data.length || maxIndex <= 0) {
        drawData.push(null)
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
        drawData.push(null)
        continue
      }
      const avgValue = valueSum / valueCount
      let amplitude = maxValue! - minValue!
      if (amplitude === 0) {
        amplitude = MIN_AMPLITUDE
      }
      const displayMin = minValue! - DATA_DISPLAY_PADDING * amplitude
      const displayMax = maxValue! + DATA_DISPLAY_PADDING * amplitude
      drawData.push({
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
    this.drawData = drawData
  }
}