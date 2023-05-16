import { ColorScaleOptions, Heatmap2dOptions, Heatmap3dOptions, LegendOptions, LineOptions, StackedOptions } from './types'

export default class Legend {

  container: HTMLElement;
  opt: LegendOptions;
  type: 'line' | 'heatmap2d' | 'heatmap3d' | 'stacked';
  colorScale: null | ColorScaleOptions;
  height: number;
  series: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions | StackedOptions

  constructor (
    container: HTMLElement,
    opt: LegendOptions,
    type: 'line' | 'heatmap2d' | 'heatmap3d' | 'stacked',
    height: number,
    colorScale: null | ColorScaleOptions,
    series: LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions | StackedOptions
  ) {
    this.container = container
    this.opt = opt
    this.type = type
    this.colorScale = colorScale
    this.series = series
    this.height = height
  }

  drawHeatmap3dLegend () {
    this.container.innerHTML = ''
    const canvas = document.createElement('canvas')
    this.container.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const min = this.colorScale.logarithmic && this.colorScale.min != 0 ? Math.log2(this.colorScale.min) : this.colorScale.min
    const max = this.colorScale.logarithmic && this.colorScale.max != 0 ? Math.log2(this.colorScale.max) : this.colorScale.max
    if (this.opt.position === 'bottom') {
      Object.assign(this.container.style, { paddingTop: '10px' })
      Object.assign(canvas.style, { display: 'block', margin: 'auto' })
      canvas.width = Math.min(400, this.container.getBoundingClientRect().width)
      canvas.height = 40
      const grad = ctx.createLinearGradient(20, 0, canvas.width - 20, 0)
      for (const stop of this.colorScale.stops) {
        grad.addColorStop(stop[0], `rgb(${stop[1][0]},${stop[1][1]},${stop[1][2]})`)
      }
      ctx.fillStyle = grad
      ctx.fillRect(20, 1, canvas.width - 40, 10)
      ctx.strokeStyle = 'gray'
      ctx.strokeRect(20.5, 1.5, canvas.width - 40, 10)
      ctx.fillStyle = 'gray'
      ctx.font = '10px sans-serif'
      ctx.textBaseline = 'top'
      ctx.textAlign = 'center'
      for (const stop of this.colorScale.stops) {
        const x = 20 + (canvas.width - 40) * stop[0]
        const v = this.colorScale.logarithmic ? Math.pow(2, stop[0] * max - min) : stop[0] * (max - min)
        ctx.fillRect(x, 11, 1, 4)
        ctx.fillText(`${Math.round(v)}`, x, 18)
      }
    } else {
      Object.assign(this.container.style, { paddingLeft: '10px' })
      canvas.width = this.opt.width
      canvas.height = this.height
      const grad = ctx.createLinearGradient(0, canvas.height, 0, 0)
      for (const stop of this.colorScale.stops) {
        grad.addColorStop(stop[0], `rgb(${stop[1][0]},${stop[1][1]},${stop[1][2]})`)
      }
      ctx.fillStyle = grad
      ctx.fillRect(0, 10, 10, canvas.height - 20)
      ctx.strokeStyle = 'gray'
      ctx.strokeRect(0.5, 10.5, 10, canvas.height - 21)
      ctx.fillStyle = 'gray'
      ctx.font = '10px sans-serif'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'left'
      const drawHeight = canvas.height - 21
      for (const stop of this.colorScale.stops) {
        const y =  11 + drawHeight - drawHeight * stop[0]
        const v = this.colorScale.logarithmic ? Math.pow(2, stop[0] * max - min) : stop[0] * (max - min)
        ctx.fillRect(11, Math.floor(y - 1), 4, 1)
        ctx.fillText(`${Math.round(v)}`, 19, y)
      }
    }
  }

  update () {
    if (!this.opt.enabled) {
      return
    }
    if (this.type === 'line') {

    } else if (this.type === 'heatmap3d') {
      this.drawHeatmap3dLegend()
    }
  }
}