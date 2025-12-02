import type { DataFromPos, Heatmap3dOptions, TooltipHandlerResponse } from '../types'
import MasterInterface from '../masterInterface'
import AbstractPlot from './abstractPlot.js'
import DataUtils from '../dataUtils.js'

export default class Heatmap3dPlot extends AbstractPlot {

  image: HTMLImageElement | null
  imageWidth: number | null
  imageHeight: number | null

  constructor(container: HTMLElement, master: MasterInterface) {
    super(container, master)
    const yAxis = this.master.getRegistered('Y_AXIS')
    const [yMin, yMax] = this.yRange()
    if (yAxis.opt.min != null) {
      this.dataUtils.yMin = yAxis.opt.min
    } else {
      this.dataUtils.yMin = yMin
      yAxis.opt.min = yMin
    }
    if (yAxis.opt.max != null) {
      this.dataUtils.yMax = yAxis.opt.max
    } else {
      this.dataUtils.yMax = yMax
      yAxis.opt.max = yMax
    }
    this.image = null
    this.imageWidth = null
    this.imageHeight = null
  }

  get opt(): Heatmap3dOptions {
    return this.master.getRegistered('CHART').opt.series
  }

  tooltipHandler(x: number, ctx: CanvasRenderingContext2D): TooltipHandlerResponse {
    return { xValue: x, yValues: [] }
  }

  dataFromXPos(xPos: number): (DataFromPos | null)[] {
    return []
  }

  xRange() {
    return [this.opt.start, this.opt.start + this.opt.data.length * this.opt.step] as [number, number]
  }

  step() {
    return this.opt.step
  }

  yRange(): [number, number] {
    return [this.opt.yMin, this.opt.yMax]
  }

  getProcessingData() {
    return []
  }

  createImage() {
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
          const value = o.data[x]![y]
          if (value != null) {
            const [r, g, b] = DataUtils.getColor(value, this.colorScale, false) as [number, number, number]
            img.data[i + 0] = r
            img.data[i + 1] = g
            img.data[i + 2] = b
            img.data[i + 3] = 255
          }
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

  update(forceRedraw = false) {
    // console.log(this.image)
    let delay = false
    if (this.image == null || forceRedraw) {
      delay = true
      const t1 = new Date().getTime()
      this.createImage()
      const t2 = new Date().getTime()
      // console.log(t2 - t1)
    }
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.imageSmoothingEnabled = this.opt.smoothing != null ? this.opt.smoothing : false
    // console.log(this.image)
    const [sStart, sEnd] = this.xRange()
    const [sYMin, sYmax] = this.yRange()
    const [dStart, dEnd] = [this.dataUtils.start!, this.dataUtils.end!]
    const [dYmin, dYmax] = [this.dataUtils.yMin!, this.dataUtils.yMax!]
    const sx = Math.max(0, DataUtils.getRatio(dStart, sStart, sEnd) * this.imageWidth!)
    const dx = Math.max(0, DataUtils.getRatio(sStart, dStart, dEnd) * ctx.canvas.width)
    const sy = Math.max(0, this.imageHeight! - DataUtils.getRatio(dYmax, sYMin, sYmax) * this.imageHeight!)
    const dy = Math.max(0, ctx.canvas.height - DataUtils.getRatio(sYmax, dYmin, dYmax) * ctx.canvas.height)
    const sWidth = Math.min(this.imageWidth! - sx, DataUtils.getRatio(dEnd, sStart, sEnd) * this.imageWidth! - sx)
    const sHeight = Math.min(this.imageHeight! - sy, this.imageHeight! - DataUtils.getRatio(dYmin, sYMin, sYmax) * this.imageHeight! - sy)
    const dWidth = Math.min(ctx.canvas.width - dx, DataUtils.getRatio(sEnd, dStart, dEnd) * ctx.canvas.width - dx)
    const dHeight = Math.min(ctx.canvas.height - dy, ctx.canvas.height - DataUtils.getRatio(sYMin, dYmin, dYmax) * ctx.canvas.height - dy)
    // console.log({ sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight })
    if (delay) {
      setTimeout(() => {
        ctx.drawImage(this.image!, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      }, 100)
    } else {
      ctx.drawImage(this.image!, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }
  }
}