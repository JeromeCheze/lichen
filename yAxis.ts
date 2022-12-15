import { YAxisOptions } from './types'

export default class YAxis {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor (
    container: HTMLElement,
    plotWidth: number,
    plotHeight: number,
    opt: YAxisOptions
  ) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = opt.width + plotWidth
    this.canvas.height = plotHeight
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, left: 0 })
    container.appendChild(this.canvas)
  }

  update (minValue: number, maxValue: number) {
    // draw axis
  }
}