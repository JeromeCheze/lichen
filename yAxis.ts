import DataUtils from './dataUtils'
import { YAxisOptions } from './types'

const TEXT_PADDING = 4

export default class YAxis {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  opt: YAxisOptions;
  dataUtils: DataUtils;

  constructor (
    container: HTMLElement,
    opt: YAxisOptions,
    dataUtils: DataUtils
  ) {
    this.opt = opt
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = dataUtils
    this.canvas.width = opt.enabled ? opt.width + dataUtils.width : dataUtils.width
    this.canvas.height = dataUtils.height
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, left: 0, zIndex: 0 })
    container.appendChild(this.canvas)
  }

  update () {
    const o = this.opt
    const ctx = this.ctx!
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    ctx.font = `${this.opt.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    const height = this.canvas.height
    const xPos = this.opt.enabled ? this.opt.width - 1 : 0
    const gridWidth = this.opt.enabled ? this.canvas.width - this.opt.width + 1 : this.canvas.width
    let a = this.opt.fontSize * 2 * (this.dataUtils.yMax - this.dataUtils.yMin) / height
    let pow = 0
    if (a === 0) {
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
    if (this.opt.enabled) {
      ctx.fillStyle = this.opt.textColor
      ctx.fillRect(xPos, 0, this.opt.lineWidth, height + 1)
    }
    let y = this.dataUtils.yMin - (this.dataUtils.yMin % a)
    while (y <= this.dataUtils.yMax) {
      const yPos = this.dataUtils.yPosFromValue(y)
      if (yPos - height <= 0) {
        if (this.opt.gridEnabled) {
          ctx.fillStyle = o.gridColor
          ctx.fillRect(xPos, yPos, gridWidth, 1)
        }
        if (!this.opt.enabled) {
          y += a
          continue
        }
        const tickText = (
          this.opt.powerOfTen === false
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
        ctx.fillStyle = this.opt.textColor
        ctx.fillRect(xPos - this.opt.tickLength, yPos, this.opt.tickLength, this.opt.tickWidth)
        ctx.fillText(tickText, xPos - this.opt.tickLength - TEXT_PADDING, yPos)
      }
      y += a
    }
    ctx.restore()
  }
}