import DataUtils from './dataUtils'
import { YAxisOptions } from './types'

const TEXT_PADDING = 4

export default class YAxis {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  opt: YAxisOptions;
  dataUtils: DataUtils;
  categories: null | string[];

  constructor (
    container: HTMLElement,
    opt: YAxisOptions,
    dataUtils: DataUtils,
  ) {
    this.opt = opt
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = dataUtils
    this.canvas.width = opt.enabled ? opt.width + dataUtils.width : dataUtils.width
    this.canvas.height = dataUtils.height + 1
    this.categories = null
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, left: 0, zIndex: 0 })
    container.appendChild(this.canvas)
  }

  drawLinearAxis () {
    const o = this.opt
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    const height = this.dataUtils.height
    const xPos = o.enabled ? o.width - 1 : 0
    const gridWidth = o.enabled ? this.canvas.width - o.width + 1 : this.canvas.width
    if (this.dataUtils.yMax == null || this.dataUtils.yMin == null) {
      ctx.restore()
      return
    }
    let a = o.fontSize * 2 * (this.dataUtils.yMax - this.dataUtils.yMin) / height
    let pow = 0
    if (a === 0) {
      ctx.restore()
      return
    }
    if (a > 10) {
      while (a >= 10) {
        a /= 10
        pow++
      }
    } else {
      while (a < 1) {
        a *= 10
        pow--
      }
    }
    a = Math.round(a) * Math.pow(10, pow)
    if (o.enabled) {
      ctx.fillStyle = o.textColor
      ctx.fillRect(xPos, 0, o.lineWidth, height + 1)
    }
    let y = this.dataUtils.yMin - (this.dataUtils.yMin % a)
    while (y <= this.dataUtils.yMax) {
      const yPos = this.dataUtils.yPosFromValue(y)
      if (yPos - height <= 0) {
        if (o.gridEnabled) {
          ctx.fillStyle = o.gridColor
          ctx.fillRect(xPos, yPos, gridWidth, 1)
        }
        if (!o.enabled) {
          y += a
          continue
        }
        const tickText = (
          o.powerOfTen === false
            ? y.toFixed(2)
            : pow >= 9
              ? (y / 1e9).toFixed(0) + 'e9'
              : pow >= 6
                ? (y / 1e6).toFixed(0) + 'e6'
                : pow >= 3
                  ? (y / 1e3).toFixed(0) + 'e3'
                  : pow <= -9
                    ? (y * 1e9).toFixed(0) + 'e-9'
                    : pow <= -6
                      ? (y * 1e6).toFixed(0) + 'e-6'
                      : pow <= -3
                        ? (y * 1e3).toFixed(0) + 'e-3'
                        : y.toFixed(2)
        )
        ctx.fillStyle = o.textColor
        ctx.fillRect(xPos - o.tickLength, yPos, o.tickLength, o.tickWidth)
        ctx.fillText(tickText, xPos - o.tickLength - TEXT_PADDING, yPos)
      }
      y += a
    }
    ctx.restore()
  }

  drawCategories () {
    const o = this.opt
    const ctx = this.ctx
    const serieHeight = this.dataUtils.height / this.categories.length
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    ctx.fillStyle = o.textColor
    ctx.font = `${o.fontSize}px sans-serif`
    let yPos = 1 + serieHeight / 2
    for (const name of this.categories) {
      ctx.fillText(name, o.width - o.tickLength, yPos)
      yPos += serieHeight
    }
    ctx.fillRect(o.width - 1, 0, o.lineWidth, this.dataUtils.height + 1)
    ctx.restore()
  }

  update () {
    if (this.categories == null) {
      this.drawLinearAxis()
    } else {
      this.drawCategories()
    }
  }
}