import MasterInterface from './masterInterface';
import { type YAxisOptions } from './types'
import DataUtils from './dataUtils'

const TEXT_PADDING = 4

export default class YAxis {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dataUtils: DataUtils;
  categories: null | string[];
  master: MasterInterface;

  constructor(
    container: HTMLElement,
    master: MasterInterface,

  ) {
    this.master = master
    master.register('Y_AXIS', this)
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = master.getRegistered('DATA_UTILS')
    this.canvas.width = this.opt.enabled ? this.opt.width! + this.dataUtils.width : this.dataUtils.width
    this.canvas.height = this.dataUtils.height + 1
    this.categories = null
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, left: 0, zIndex: 0 })
    container.appendChild(this.canvas)
  }

  get opt(): YAxisOptions {
    return this.master.getRegistered('CHART').opt.yAxis
  }

  drawTickPositions(tickPos: number[]) {
    const ctx = this.ctx
    const gridWidth = this.opt.enabled ? this.canvas.width - this.opt.width! + 1 : this.canvas.width
    const xPos = this.opt.enabled ? this.opt.width! - 1 : 0
    for (const pos of tickPos) {
      const yPos = this.dataUtils.yPosFromValue(pos) as number
      if (this.opt.gridEnabled) {
        ctx.fillStyle = this.opt.gridColor as string
        if (pos === 0) {
          ctx.fillRect(xPos, yPos - 1, gridWidth, 3)
        } else {
          ctx.fillRect(xPos, yPos, gridWidth, 1)
        }
      }
      if (!this.opt.enabled) {
        continue
      }
      ctx.fillStyle = this.opt.textColor as string
      ctx.fillRect(xPos - this.opt.tickLength!, yPos, this.opt.tickLength!, this.opt.tickWidth!)
      const tickText = Math.abs(pos) > 1e3 ? pos.toExponential() : `${pos}`
      ctx.fillText(tickText, xPos - this.opt.tickLength! - TEXT_PADDING, yPos)
    }
  }

  getLinearTickPositions(min:number, max: number, tickInterval: number) {
    const magnitude = Math.pow(10, Math.floor(Math.log10(tickInterval)))
    const multiples = [1, 2, 5, 10]
    let interval = 0
    for (const mult of multiples) {
      interval = mult
      if (mult * magnitude >= tickInterval) {
        break
      }
    }
    interval = interval * magnitude
    const roundedMin = DataUtils.correctFloat(Math.floor(min / interval) * interval)
    const roundedMax = DataUtils.correctFloat(Math.ceil(max / interval) * interval)
    let pos = roundedMin
    const tickPos: number[] = []
    while(pos <= roundedMax) {
      const lastPos = pos
      tickPos.push(pos)
      pos = DataUtils.correctFloat(pos + interval)
      if (pos === lastPos) {
        break
      }
    }
    return tickPos
  }

  getLogTickPositions(min: number, max:number, tickInterval: number) {
    if (tickInterval >= 0.5) {
      return this.getLinearTickPositions(min, max, Math.round(tickInterval))
    }
    const tickPos: number[] = []
    const roundedMin = Math.floor(min)
    const intermediate = tickInterval > 0.3
      ? [1, 2, 4]
      : tickInterval > 0.15
        ? [1, 2, 4, 6, 8]
        : [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = roundedMin; i < max + 1; i++) {
      for (const mult of intermediate) {
        const pos = Math.pow(10, i) * mult
        tickPos.push(pos)
      }
    }
    return tickPos
  }

  drawAxis() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.dataUtils.yMin == null || this.dataUtils.yMax == null) {
      return
    }
    ctx.save()
    ctx.font = `${this.opt.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    let min = this.dataUtils.yMin!
    let max = this.dataUtils.yMax!
    if (this.opt.logarithmic) {
      min = DataUtils.correctFloat(Math.log10(min))
      max = DataUtils.correctFloat(Math.log10(max))
    }
    const range = max - min
    const xPos = this.opt.enabled ? this.opt.width! - 1 : 0
    const axisLength = this.canvas.height
    if (this.opt.enabled) {
      ctx.fillStyle = this.opt.textColor as string
      ctx.fillRect(xPos, 0, this.opt.lineWidth!, axisLength + 1)
    }
    const tickAmount = axisLength / 30
    const tickInterval = range === 0 ? 1 : range / tickAmount
    const getTickPositions = this.opt.logarithmic
      ? this.getLogTickPositions
      : this.getLinearTickPositions
    const tickPos = getTickPositions.call(this, min, max, tickInterval)
    this.drawTickPositions(tickPos)
    ctx.restore()
  }

  drawCategories() {
    const ctx = this.ctx
    const serieHeight = this.dataUtils.height / this.categories!.length
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    ctx.fillStyle = this.opt.textColor as string
    ctx.font = `${this.opt.fontSize}px sans-serif`
    let yPos = 1 + serieHeight / 2
    for (const name of this.categories!) {
      ctx.fillText(name, this.opt.width! - this.opt.tickLength!, yPos)
      yPos += serieHeight
    }
    ctx.fillRect(this.opt.width! - 1, 0, this.opt.lineWidth!, this.dataUtils.height + 1)
    ctx.restore()
  }

  update() {
    if (this.categories == null) {
      this.drawAxis()
    } else {
      this.drawCategories()
    }
  }
}