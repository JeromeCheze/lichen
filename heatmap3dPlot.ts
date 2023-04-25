import { ColorScaleObject, SerieOptions } from './types'
import DataUtils from './dataUtils'

const MARGIN = 1

export default class Heatmap3dPlot {

  opt: SerieOptions[];
  dataUtils: DataUtils;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  colorScale: ColorScaleObject;

  constructor (container: HTMLElement, opt: SerieOptions[], dataUtils: DataUtils, colorScale: ColorScaleObject) {
    this.opt = opt
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = dataUtils
    this.canvas.width = dataUtils.width
    this.canvas.height = dataUtils.height
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 10 })
    this.colorScale = colorScale
    container.appendChild(this.canvas)
  }

  createImage () {
    const o = this.opt[0]
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = o.data.length
    canvas.height = o.data[0]
  }

  update () {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.save()
    
    ctx.restore()
  }
}