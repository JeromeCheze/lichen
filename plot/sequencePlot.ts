import { DataFromPos, SequenceOptions, TooltipHandlerResponse } from '../types'
import MasterInterface from '../masterInterface'
import AbstractPlot from './abstractPlot.js'

const MARGIN = 1

export default class SequencePlot extends AbstractPlot {

  opt: SequenceOptions;

  constructor(container: HTMLElement, master: MasterInterface) {
    super(container, master)
    this.opt = this.master.getRegistered('CHART').opt.series
    this.master.getRegistered('Y_AXIS').categories = this.opt.valueMap.map(x => x.name)
    this.master.getRegistered('CHART').opt.zoom = 'x'
  }

  tooltipHandler(x: number, ctx: CanvasRenderingContext2D): TooltipHandlerResponse {
    const xPos = this.dataUtils.xPosFromValue(x)
    const data = this.dataFromXPos(xPos)
    if (data[0] == null) {
      return { xValue: null, yValues: null }
    }
    return {
      xValue: data[0].xDataValue,
      yValues: [{
        color: this.opt.color,
        value: data[0].yDataValue,
        name: 'value',
        textValue: this.opt.valueMap.find(v => v.value === data[0].yDataValue).name
      }]
    }
  }

  dataFromXPos(xPos: number): DataFromPos[] {
    const xValue = this.dataUtils.xValueFromPos(xPos)
    if (xValue == null) {
      return [null]
    }
    const index = Math.round(this.opt.data.length * (xValue - this.opt.start) / (this.opt.data.length * this.opt.step))
    const xDataValue = this.opt.start + index * this.opt.step
    const yDataValue = this.opt.data[index]
    if (yDataValue == null) {
      return [null]
    }
    return [{
      index,
      xDataValue,
      xDataValuePos: this.dataUtils.xPosFromValue(xDataValue)!,
      yDataValuePos: this.dataUtils.yPosFromValue(yDataValue),
      yDataValue: yDataValue
    }]
  }

  static getHeight(master: MasterInterface) {
    return master.getRegistered('CHART').opt.serieHeight * master.getRegistered('CHART').opt.series.valueMap.length
  }

  xRange() {
    return [this.opt.start, this.opt.start + this.opt.data.length * this.opt.step] as [number, number]
  }

  getXRangeIndex() {
    return [
      Math.max(0, Math.floor((this.dataUtils.start - this.opt.start) / this.opt.step)),
      Math.min(1 + Math.floor((this.dataUtils.end - this.opt.start) / this.opt.step), this.opt.data.length)
    ]
  }

  getProcessingData() {
    return [this.opt.data]
  }

  update() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.fillStyle = this.opt.color
    const serieHeight = this.canvas.height / this.opt.valueMap.length
    const heightMap = {}
    let height = 0
    for (const item of this.opt.valueMap) {
      heightMap[item.value] = height
      height += serieHeight
    }
    const [i1, i2] = this.getXRangeIndex()
    let x0 = this.opt.start + this.opt.step * i1
    let xPos = this.dataUtils.xPosFromValue(x0) as number
    const xRatio = (this.dataUtils.end - this.dataUtils.start) / (this.opt.step * this.dataUtils.width)
    const xStep = 1 / xRatio
    for (let i = i1; i < i2; i++) {
      const value = this.opt.data[i]
      if (value != null) {
        const yPos = heightMap[value]
        ctx.fillRect(Math.floor(xPos), yPos + MARGIN, Math.floor(xStep) + 1, serieHeight - 2 * MARGIN)
      }
      xPos += xStep
    }
    ctx.restore()
  }
}