import { DataFromPos, Heatmap2dOptions, TooltipHandlerResponse } from '../types'
import MasterInterface from '../masterInterface'
import AbstractPlot from './abstractPlot.js'
import DataUtils from '../dataUtils.js'

const MARGIN = 1

export default class Heatmap2dPlot extends AbstractPlot {

  constructor (container: HTMLElement, master: MasterInterface) {
    super(container, master)
    this.master.getRegistered('Y_AXIS').categories = this.opt.map(x => x.name)
    this.master.getRegistered('CHART').opt.zoom = 'x'
  }

  get opt(): Heatmap2dOptions[] {
    return this.master.getRegistered('CHART').opt.series
  }

  tooltipHandler(x: number, ctx: CanvasRenderingContext2D): TooltipHandlerResponse {
    const xPos = this.dataUtils.xPosFromValue(x)
    const data = this.dataFromXPos(xPos)
    let xValue = null
    const yValues = []
    for (const [i, s] of this.opt.entries()) {
      if (data[i] == null) {
        continue
      }
      xValue = data[i].xDataValue
      const value = data[i].yDataValue
      yValues.push({
        // color: 'black',
        color: DataUtils.getColor(value, this.colorScale),
        value,
        name: s.name,
        textValue: s.tooltipFormatter != null ? s.tooltipFormatter(value) : `${value}`
      })
    }
    return { xValue, yValues }
  }

  dataFromXPos(xPos: number): (DataFromPos | null)[] {
    const result: (DataFromPos | null)[] = Array.from({ length: this.opt.length }, () => null)
    if (this.dataUtils.start == null || this.dataUtils.end == null) {
      return result
    }
    const xValue = this.dataUtils.xValueFromPos(xPos)
    if (xValue == null) {
      return result
    }
    for (const [i, serie] of this.opt.entries()) {
      const c = this.dataUtils.computed.series[i]
      if (c == null) {
        continue
      }
      const index = Math.round(serie.data.length * (xValue - serie.start) / (serie.data.length * serie.step))
      if (index >= 0 && index < serie.data.length) {
        const xDataValue = serie.start + index * serie.step
        const yDataValue = serie.data[index]
        if (yDataValue != null) {
          result[i] = {
            index,
            xDataValue,
            xDataValuePos: this.dataUtils.xPosFromValue(xDataValue)!,
            yDataValuePos: this.dataUtils.yPosFromValue(yDataValue),
            yDataValue
          }
        }
      }
    }
    return result
  }

  static getHeight(master: MasterInterface) {
    return master.getRegistered('CHART').opt.serieHeight * master.getRegistered('CHART').opt.series.length
  }

  xRange () {
    let minStart: number | null = null
    let maxEnd: number | null = null
    for (const serie of this.opt) {
      const end = serie.start + serie.data.length * serie.step
      minStart = minStart == null ? serie.start : Math.min(serie.start, minStart)
      maxEnd = maxEnd == null ? end : Math.max(end, maxEnd)
    }
    return [minStart, maxEnd] as [number, number]
  }

  getXRangeIndex (serie: Heatmap2dOptions) {
    return [
      Math.max(0, Math.floor((this.dataUtils.start - serie.start) / serie.step)),
      Math.min(1 + Math.floor((this.dataUtils.end - serie.start) / serie.step), serie.data.length)
    ]
  }

  getProcessingData () {
    const result = []
    for (const serie of this.opt) { 
      const [i1, i2] = this.getXRangeIndex(serie)
      result.push(serie.data.slice(i1, i2))
    }
    return result
  }

  update () {
    const ctx = this.ctx
    const serieHeight = this.canvas.height / this.opt.length
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    let yPos = 0
    for (const [serieIndex, computed] of this.dataUtils.computed.series.entries()) {
      if (computed == null) {
        console.log(`no draw for serie #${serieIndex}`)
        continue
      }
      const serie = this.opt[serieIndex]
      const [i1, i2] = this.getXRangeIndex(serie)
      let x0 = serie.start + serie.step * i1
      let xPos = this.dataUtils.xPosFromValue(x0)
      const xRatio = (this.dataUtils.end - this.dataUtils.start) / (serie.step * this.dataUtils.width)
      let xStep = 1
      let indexStep = xRatio
      if (xRatio <= 1) {
        xStep = 1 / xRatio
        indexStep = 1
      }
      for (let i = i1; i < i2; i += indexStep) {
        const group = serie.data.slice(i, i + indexStep).filter(x => x != null)
        if (group.length > 0) {
          ctx.fillStyle = DataUtils.getColor(Math.max.apply(null, group), this.colorScale) as string
          ctx.fillRect(Math.floor(xPos), yPos + MARGIN, Math.floor(xStep) + 1, serieHeight - 2 * MARGIN)
        }
        xPos += xStep
      }
      yPos += serieHeight
    }
    ctx.restore()
  }
}