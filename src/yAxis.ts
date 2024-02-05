import DataUtils from './dataUtils'
import MasterInterface from './masterInterface';
import { YAxisOptions } from './types'

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
    this.canvas.width = this.opt.enabled ? this.opt.width + this.dataUtils.width : this.dataUtils.width
    this.canvas.height = this.dataUtils.height + 1
    this.categories = null
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, left: 0, zIndex: 0 })
    container.appendChild(this.canvas)
  }

  get opt(): YAxisOptions {
    return this.master.getRegistered('CHART').opt.yAxis
  }

  drawLinearAxis() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.font = `${this.opt.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    const delta = this.dataUtils.yMax - this.dataUtils.yMin
    const xPos = this.opt.enabled ? this.opt.width - 1 : 0
    const gridWidth = this.opt.enabled ? this.canvas.width - this.opt.width + 1 : this.canvas.width
    const height = this.canvas.height
    const minTick = height / 30
    const scales = [100, 50, 25, 20, 10]
    if (this.opt.enabled) {
      ctx.fillStyle = this.opt.textColor
      ctx.fillRect(xPos, 0, this.opt.lineWidth, height + 1)
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
    const start = this.dataUtils.yMin / Math.pow(10, pow)
    const end = this.dataUtils.yMax / Math.pow(10, pow)
    let y = start - (start % step)
    while (y < end) {
      const yPos = this.dataUtils.yPosFromValue(y * Math.pow(10, pow))
      if (this.opt.gridEnabled) {
        ctx.fillStyle = this.opt.gridColor
        if (y === 0) {
          ctx.fillRect(xPos, yPos - 1, gridWidth, 3)
        } else {
          ctx.fillRect(xPos, yPos, gridWidth, 1)
        }
      }
      if (!this.opt.enabled) {
        y += step
        continue
      }
      ctx.fillStyle = this.opt.textColor
      ctx.fillRect(xPos - this.opt.tickLength, yPos, this.opt.tickLength, this.opt.tickWidth)
      const tickText = y === 0
        ? '0'
        : Math.abs(pow) > 3
          ? `${y}e${pow}`
          : pow < 0
            ? `${y / Math.pow(10, -1 * pow)}`
            : `${y * Math.pow(10, pow)}`
      ctx.fillText(tickText, xPos - this.opt.tickLength - TEXT_PADDING, yPos)
      y += step
    }
    ctx.restore()
  }

  drawCategories() {
    const ctx = this.ctx
    const serieHeight = this.dataUtils.height / this.categories.length
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    ctx.fillStyle = this.opt.textColor
    ctx.font = `${this.opt.fontSize}px sans-serif`
    let yPos = 1 + serieHeight / 2
    for (const name of this.categories) {
      ctx.fillText(name, this.opt.width - this.opt.tickLength, yPos)
      yPos += serieHeight
    }
    ctx.fillRect(this.opt.width - 1, 0, this.opt.lineWidth, this.dataUtils.height + 1)
    ctx.restore()
  }

  update() {
    if (this.categories == null) {
      this.drawLinearAxis()
    } else {
      this.drawCategories()
    }
  }
}