import MasterInterface from './masterInterface';
import { type XAxisOptions } from './types'
import DataUtils from './dataUtils'

const TEXT_PADDING = 4

export default class XAxis {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dataUtils: DataUtils;
  master: MasterInterface;

  constructor(
    container: HTMLElement,
    master: MasterInterface
  ) {
    master.register('X_AXIS', this)
    this.master = master
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = master.getRegistered('DATA_UTILS')
    this.canvas.width = this.dataUtils.width
    this.canvas.height = this.dataUtils.height
    if (this.opt.enabled) {
      this.canvas.height += this.opt.tickLength! + 2 * TEXT_PADDING + this.opt.fontSize!
    }
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 0 })
    container.appendChild(this.canvas)
  }

  get opt(): XAxisOptions {
    return this.master.getRegistered('CHART').opt.xAxis
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

  getDatetimeTickPositions(min: number, max: number, tickInterval: number) {
    const multiples = [
      31536000e3, 15768000e3, // >/= 6 months
      4838400e3, 2419200e3, 604800e3, // >/= 7days
      172800e3, 86400e3, // >/= 1 day
      43200e3, 21600e3, 14400e3, 7200e3, 3600e3, // >/= 1 hour
      1800e3, 600e3, 300e3, 120e3, 60e3, // >/= 1 minute
      30e3, 10e3, 5e3, 2e3, 1e3, // >/= 1 seconde
      500, 200, 100 // < 1 seconde
    ]
    let interval = multiples[0]
    for (const mult of multiples) {
      if (tickInterval > mult) {
        break
      }
      interval = mult
    }
    const roundedMin = DataUtils.correctFloat(Math.floor(min / interval) * interval)
    const roundedMax = DataUtils.correctFloat(Math.ceil(max / interval) * interval)
    let pos = roundedMin
    const tickPos: number[] = []
    while(pos <= roundedMax) {
      const lastPos = pos
      tickPos.push(pos)
      pos += interval
      if (pos === lastPos) {
        break
      }
    }
    return tickPos
  }

  formatLinearTick(v: number) {
    return Math.abs(v) > 1e3 ? v.toExponential() : `${v}`
  }

  formatDatetimeTick(v: number) {
    const d = new Date(v)
    return (v % 86400e3) === 0
      ? d.getDate() + '/' + (d.getMonth() + 1)
      : (v % 3600e3) === 0
        ? d.getUTCHours() + 'h'
        : (v % 600e3) === 0
          ? d.toISOString().slice(11, 16)
          : (v % 1e3) === 0
            ? d.toISOString().slice(11, 19)
            : (v % 100) === 0 ? d.toISOString().slice(11, 21) : ''
  }

  drawTickPositions(tickPos: number[]) {
    const ctx = this.ctx
    const yPos = this.dataUtils.height
    for (const pos of tickPos) {
      const xPos = this.dataUtils.xPosFromValue(pos) as number
      if (this.opt.gridEnabled) {
        ctx.fillStyle = this.opt.gridColor as string
        ctx.fillRect(xPos, yPos, 1, yPos)
      }
      if (!this.opt.enabled) {
        continue
      }
      const tickText = this.opt.datetime ? this.formatDatetimeTick(pos) : this.formatLinearTick(pos)
      ctx.fillStyle = this.opt.textColor as string
      ctx.fillRect(xPos, yPos, this.opt.tickWidth!, this.opt.tickLength!)
      ctx.fillText(tickText, xPos, yPos + this.opt.tickLength! + TEXT_PADDING)
    }
  }

  drawAxis() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.dataUtils.yMin == null || this.dataUtils.yMax == null) {
      return
    }
    ctx.save()
    ctx.font = `${this.opt.fontSize}px sans-serif`
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    const min = this.dataUtils.start!
    const max = this.dataUtils.end!
    const range = max - min
    const yPos = this.dataUtils.height
    const axisLength = this.canvas.width
    if (this.opt.enabled) {
      ctx.fillStyle = this.opt.textColor as string
      ctx.fillRect(0, yPos, axisLength, this.opt.lineWidth!)
    }
    const tickAmount = axisLength / 80
    const tickInterval = range === 0 ? 1 : range / tickAmount
    const getTickPositions = this.opt.datetime
      ? this.getDatetimeTickPositions
      : this.getLinearTickPositions
    const tickPos = getTickPositions.call(this, min, max, tickInterval)
    this.drawTickPositions(tickPos)
    ctx.restore()
  }

  update() {
    this.drawAxis()
  }
}

