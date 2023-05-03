import { ColorScaleOptions, Heatmap3dOptions } from './types'
import DataUtils from './dataUtils'

export default class Heatmap3dPlot {

  opt: Heatmap3dOptions;
  dataUtils: DataUtils;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  colorScale: ColorScaleOptions;
  image: HTMLImageElement;
  imageWidth: number;
  imageHeight: number;

  constructor (container: HTMLElement, opt: Heatmap3dOptions, dataUtils: DataUtils, colorScale: ColorScaleOptions) {
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
    const o = this.opt
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = o.data.length
    const firstNotNull = o.data.find(x => x != null)
    if (firstNotNull == null) {
      console.warn('Nothing to plot')
      return
    }
    canvas.height = firstNotNull.length
    const img = ctx.createImageData(canvas.width, canvas.height)
    let i = 0
    for (let y = firstNotNull.length - 1; y >= 0; y--) {
      for (let x = 0; x < o.data.length; x++) {
        if (o.data[x] != null) {
          const [r, g, b] = this.dataUtils.getColor(o.data[x][y], this.colorScale, false)
          img.data[i + 0] = r
          img.data[i + 1] = g
          img.data[i + 2] = b
          img.data[i + 3] = 255
        }
        i += 4
      }
    }
    ctx.putImageData(img, 0, 0)
    this.image = new Image()
    this.image.src = canvas.toDataURL()
    this.imageWidth = canvas.width
    this.imageHeight = canvas.height
  }

  update (forceRedraw = false) {
    // console.log(this.image)
    let delay = false
    if (this.image == null || forceRedraw) {
      delay = true
      const t1 = new Date().getTime()
      this.createImage()
      const t2 = new Date().getTime()
      console.log(t2 - t1)
    }
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.imageSmoothingEnabled = false
    // console.log(this.image)
    const [sStart, sEnd] = this.dataUtils.xRange()
    const [sYMin, sYmax] = this.dataUtils.yRange()
    const [dStart, dEnd] = [this.dataUtils.start, this.dataUtils.end]
    const [dYmin, dYmax] = [this.dataUtils.yMin, this.dataUtils.yMax]
    const sx = Math.max(0, this.dataUtils.getRatio(dStart, sStart, sEnd) * this.imageWidth)
    const dx = Math.max(0, this.dataUtils.getRatio(sStart, dStart, dEnd) * ctx.canvas.width)
    const sy = Math.max(0, this.imageHeight - this.dataUtils.getRatio(dYmax, sYMin, sYmax) * this.imageHeight)
    const dy = Math.max(0, ctx.canvas.height - this.dataUtils.getRatio(sYmax, dYmin, dYmax) * ctx.canvas.height)
    const sWidth = Math.min(this.imageWidth - sx, this.dataUtils.getRatio(dEnd, sStart, sEnd) * this.imageWidth - sx)
    const sHeight = Math.min(this.imageHeight - sy, this.imageHeight - this.dataUtils.getRatio(dYmin, sYMin, sYmax) * this.imageHeight - sy)
    const dWidth = Math.min(ctx.canvas.width - dx, this.dataUtils.getRatio(sEnd, dStart, dEnd) * ctx.canvas.width - dx)
    const dHeight = Math.min(ctx.canvas.height - dy, ctx.canvas.height - this.dataUtils.getRatio(sYMin, dYmin, dYmax) * ctx.canvas.height - dy)
    // console.log({ sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight })
    if (delay) {
      setTimeout(() => {
        ctx.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      }, 100)
    } else {
      ctx.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }
  }
}