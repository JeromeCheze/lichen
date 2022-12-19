import { XAxisOptions, Coordinates } from './types'

const TEXT_PADDING = 4

export default class XAxis {

  opt: XAxisOptions;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  plotHeight: number;

  constructor (
    container: HTMLElement,
    xPos: number,
    plotWidth: number,
    plotHeight: number,
    opt: XAxisOptions
  ) {
    this.opt = opt
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.plotHeight = plotHeight
    this.canvas.width = plotWidth
    this.canvas.height = this.computeHeight(plotHeight)
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, left: xPos })
    container.appendChild(this.canvas)
  }

  computeHeight (plotHeight: number): number {
    return plotHeight
      + this.opt.lineWidth
      + this.opt.tickLength
      + TEXT_PADDING
      + this.opt.fontSize
      + TEXT_PADDING
  }

  update (minValue: number, maxValue: number) {
    const ctx = this.ctx
    ctx.save()
    const width = this.canvas.width
    const yPos = this.plotHeight
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
    const tickInterval = 60 * (maxValue - minValue) / width
    while (tickInterval < scales[i]) {
      a = scales[i++]
    }
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    if (this.opt.enabled) {
      ctx.fillStyle = this.opt.textColor
      ctx.fillRect(0, yPos, width, this.opt.lineWidth)
    }
    let j = minValue - (minValue % a) + a
    while (j < maxValue) {
      d.setTime(j)
      const xPos = width * (j - minValue) / (maxValue - minValue)
      if (this.opt.gridEnabled) {
        ctx.fillStyle = this.opt.gridColor
        ctx.fillRect(xPos, 0, 1, yPos)
      }
      if (!this.opt.enabled) {
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
}