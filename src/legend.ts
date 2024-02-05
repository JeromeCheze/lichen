import MasterInterface from './masterInterface'
import { ColorScaleOptions, Heatmap2dOptions, Heatmap3dOptions, LegendItem, LegendOptions, LineOptions, SequenceOptions, StackedOptions, ScatterOptions } from './types'

export default class Legend {
  
  master: MasterInterface
  container: HTMLElement

  constructor (
    container: HTMLElement,
    master: MasterInterface
  ) {
    master.register('LEGEND', this)
    this.master = master
    this.container = container
  }

  get opt(): LegendOptions {
    return this.master.getRegistered('CHART').opt.legend
  }

  get type(): 'line' | 'heatmap2d' | 'heatmap3d' | 'stacked' | 'sequence' | 'scatter' {
    return this.master.getRegistered('CHART').opt.type
  }

  get colorScale(): null | ColorScaleOptions {
    return this.master.getRegistered('CHART').opt.colorScale
  }

  get series(): LineOptions[] | Heatmap2dOptions[] | Heatmap3dOptions | StackedOptions | SequenceOptions | ScatterOptions[] {
    return this.master.getRegistered('CHART').opt.series
  }

  get height(): number {
    return this.master.getRegistered('CHART').opt.height
  }

  drawHeatmap3dLegend () {
    this.container.innerHTML = ''
    const canvas = document.createElement('canvas')
    this.container.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    ctx.save()
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
      ctx.font = `${this.opt.fontSize}px sans-serif`
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
      ctx.font = `${this.opt.fontSize}px sans-serif`
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
    ctx.restore()
  }

  drawLineLegend (items: LegendItem[]) {
    this.container.innerHTML = ''
    Object.assign(this.container.style, {
      textAlign: this.opt.position === 'bottom' ? 'center' : 'left',
      verticalAlign: this.opt.position === 'bottom' ? 'top' : 'middle'
    })
    for (const item of items) {
      const div = document.createElement('div')
      Object.assign(div.style, {
        fontSize: '10px',
        color: '#888',
        margin: '3px 10px',
        display: this.opt.position === 'bottom' ? 'inline-block' : 'block'
      })
      const box = document.createElement('span')
      Object.assign(box.style, {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '20px',
        height: '10px',
        border: '1px solid #888',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
        background: item.enabled ? item.color : '#666',
      })
      box.addEventListener('click', () => {
        item.enabled = !item.enabled
        this.master.send('redraw', null)
      })
      const text = document.createElement('span')
      Object.assign(text.style, { display: 'inline-block', verticalAlign: 'middle' })
      text.innerHTML = item.name
      div.appendChild(box)
      div.appendChild(text)
      this.container.appendChild(div)
    }
  }

  update () {
    if (!this.opt.enabled) {
      return
    }
    if (this.type === 'line') {
      const series = this.series as LineOptions[]
      this.drawLineLegend(series as LegendItem[])
    } else if (this.type === 'stacked') {
      const series = this.series as StackedOptions
      this.drawLineLegend(series.data as LegendItem[])
    } else if (this.type === 'heatmap3d') {
      this.drawHeatmap3dLegend()
    }
  }
}