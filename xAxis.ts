import { XAxisOptions, Coordinates } from './types'

const TEXT_PADDING = 4

export default class XAxis {

  opt: XAxisOptions;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

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
    // draw axis
  }
}