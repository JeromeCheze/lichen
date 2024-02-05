import { XAxisOptions } from './types'
import DataUtils from './dataUtils'
import MasterInterface from './masterInterface';

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
      this.canvas.height += this.opt.tickLength + 2 * TEXT_PADDING + this.opt.fontSize
    }
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 0 })
    container.appendChild(this.canvas)
  }

  get opt(): XAxisOptions {
    return this.master.getRegistered('CHART').opt.xAxis
  }

  drawLinearAxis() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.font = `${this.opt.fontSize}px sans-serif`
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    const delta = this.dataUtils.end - this.dataUtils.start
    const yPos = this.dataUtils.height
    const width = this.canvas.width
    const minTick = width / 80
    const scales = [100, 50, 25, 20, 10]
    if (this.opt.enabled) {
      ctx.fillStyle = this.opt.textColor
      ctx.fillRect(0, yPos, width, this.opt.lineWidth)
    }
    if (delta == 0) {
      ctx.restore()
      return
    }
    let pow = 0
    if (delta > scales[0]) {
      while (delta > scales[0] * Math.pow(10, pow)) {
        pow++
      }
    }
    if (delta < scales[0]) {
      while (delta < scales[0] * Math.pow(10, pow)) {
        pow--
      }
    }
    scales.reverse()
    let step = null
    for (let s of scales) {
      step = s
      if (delta / (s * Math.pow(10, pow)) < minTick) {
        break
      }
    }
    const start = this.dataUtils.start / Math.pow(10, pow)
    const end = this.dataUtils.end / Math.pow(10, pow)
    let x = start - (start % step)
    while (x < end) {
      const xPos = this.dataUtils.xPosFromValue(x * Math.pow(10, pow))
      if (this.opt.gridEnabled) {
        ctx.fillStyle = this.opt.gridColor
        ctx.fillRect(xPos, 0, 1, yPos)
      }
      if (!this.opt.enabled) {
        x += step
        continue
      }
      ctx.fillStyle = this.opt.textColor
      ctx.fillRect(xPos, yPos, this.opt.tickWidth, this.opt.tickLength)
      const tickText = x === 0
        ? '0'
        : Math.abs(pow) > 3
          ? `${x}e${pow}`
          : pow < 0
            ? `${x / Math.pow(10, -1 * pow)}`
            : `${x * Math.pow(10, pow)}`
      ctx.fillText(tickText, xPos, yPos + this.opt.tickLength + TEXT_PADDING)
      x += step
    }
    ctx.restore()
  }

  drawDatetimeAxis() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    const width = this.canvas.width
    const yPos = this.dataUtils.height
    const scales = [
      31536000e3, 15768000e3, // >/= 6 months
      4838400e3, 2419200e3, 604800e3, // >/= 7days
      172800e3, 86400e3, // >/= 1 day
      43200e3, 21600e3, 14400e3, 7200e3, 3600e3, // >/= 1 hour
      1800e3, 600e3, 300e3, 120e3, 60e3, // >/= 1 minute
      30e3, 10e3, 5e3, 2e3, 1e3, // >/= 1 seconde
      500, 200, 100 // < 1 seconde
    ]
    let i = 0
    let a = scales[0]
    const d = new Date()
    const tickInterval = 60 * (this.dataUtils.end - this.dataUtils.start) / width
    while (tickInterval < scales[i]) {
      a = scales[i++]
    }
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    if (this.opt.enabled) {
      ctx.fillStyle = this.opt.textColor
      ctx.fillRect(0, yPos, width, this.opt.lineWidth)
    }
    let j = this.dataUtils.start - (this.dataUtils.start % a)
    while (j < this.dataUtils.end) {
      d.setTime(j)
      const xPos = this.dataUtils.xPosFromValue(j)
      if (this.opt.gridEnabled) {
        ctx.fillStyle = this.opt.gridColor
        ctx.fillRect(xPos, 0, 1, yPos)
      }
      if (!this.opt.enabled) {
        j += a
        continue
      }
      if ((j % 86400e3) === 0) {
        ctx.font = `bold ${this.opt.fontSize + 2}px sans-serif`
      } else {
        ctx.font = `${this.opt.fontSize}px sans-serif`
      }
      const tickText = (
        (j % 86400e3) === 0
          ? d.getDate() + '/' + (d.getMonth() + 1)
          : (j % 3600e3) === 0
              ? d.getUTCHours() + 'h'
              : (j % 600e3) === 0
                  ? d.toISOString().slice(11, 16)
                  : (j % 1e3) === 0
                      ? d.toISOString().slice(11, 19)
                      : (j % 100) === 0 ? d.toISOString().slice(11, 21) : ''
      )
      ctx.fillStyle = this.opt.textColor
      ctx.fillRect(xPos, yPos, this.opt.tickWidth, this.opt.tickLength)
      ctx.fillText(tickText, xPos, yPos + this.opt.tickLength + TEXT_PADDING)
      j += a
    }
    ctx.restore()
  }

  update() {
    if (this.opt.datetime) {
      this.drawDatetimeAxis()
    } else {
      this.drawLinearAxis()
    }
  }
}

