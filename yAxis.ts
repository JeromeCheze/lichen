import { YAxisOptions } from './types'

const TEXT_PADDING = 4

export default class YAxis {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  opt: YAxisOptions;

  constructor (
    container: HTMLElement,
    plotWidth: number,
    plotHeight: number,
    opt: YAxisOptions
  ) {
    this.opt = opt
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = opt.width + plotWidth
    this.canvas.height = plotHeight
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, left: 0 })
    container.appendChild(this.canvas)
  }

  update (minValue: number, maxValue: number) {
    const o = this.opt
    const ctx = this.ctx!
    ctx.save()
    ctx.font = `${this.opt.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    const height = this.canvas.height
    const xPos = this.opt.width - 1
    let a = this.opt.fontSize * 2 * (maxValue - minValue) / height
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
    let y = minValue - (minValue % a)
    while (y < maxValue) {
      const yPos = maxValue - (maxValue - y) / (maxValue - minValue)
      if (yPos - height <= 0) {
        if (this.opt.gridEnabled) {
          ctx.fillStyle = o.gridColor
          ctx.fillRect(xPos, yPos, this.canvas.width - this.opt.width + 1, 1)
        }
        if (!this.opt.enabled) {
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