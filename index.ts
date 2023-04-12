import defaultOptions from './defaultOptions.js'
import { LichenOptions } from './types.js'
import DataUtils from './dataUtils.js'
import EventUtils from './eventUtils.js'
import XAxis from './xAxis.js'
import YAxis from './yAxis.js'
import LinePlot from './linePlot.js'
import Heatmap2dPlot from './heatmap2dPlot.js'
import FrontPanel from './frontPanel.js'

export default class Lichen {

  opt: LichenOptions;
  yAxis: YAxis;
  xAxis: XAxis;
  dataUtils: DataUtils;
  eventUtils: EventUtils;
  plot: LinePlot | Heatmap2dPlot;
  frontPanel: FrontPanel;
  ready: boolean;

  constructor (container: HTMLElement, opt: LichenOptions, drawOnCreation: boolean = true) {
    this.ready = false
    this.opt = this.mergeOptions(opt)
    this.init(container)
    this.opt.synced().push(this)
    if (drawOnCreation) {
      let waitAllReady = true
      while (waitAllReady) {
        waitAllReady = false
        for (const chart of this.opt.synced()) {
          if (chart.ready === false) {
            waitAllReady = true
          }
        }
      }
      const dataRanges = this.opt.synced().map(chart => chart.dataUtils.dataRange())
      this.dataUtils.start = Math.min.apply(null, dataRanges.map(x => x[0]))
      this.dataUtils.end = Math.max.apply(null, dataRanges.map(x => x[1]))
      this.draw()
    }
  }

  mergeOptions (opt: LichenOptions): LichenOptions {
    // deepcopy default options
    const result = JSON.parse(JSON.stringify(defaultOptions))
    // overwrite default options with given options
    for (const [k, v] of Object.entries(opt)) {
      if (v instanceof Function) {
        result[k] = v
      } else if (v instanceof Object && !(v instanceof Array)) {
        Object.assign(result[k], v)
      } else {
        result[k] = v
      }
    }
    if (result.synced == null) {
      const instance = []
      result.synced = () => instance
    }
    return result
  }

  getHeight () {
    return this.opt.type === 'line'
      ? this.opt.height
      : this.opt.type === 'heatmap2d'
        ? this.opt.serieHeight * this.opt.series.length
        : this.opt.type === 'heatmap3d'
          ? this.opt.height
          : null
  }

  buildStructure (container: HTMLElement) {
    const wrapper = document.createElement('div')
    const header = document.createElement('div')
    const title = document.createElement('div')
    const canvasWrapperContainer = document.createElement('div')
    const canvasWrapper = document.createElement('div')
    Object.assign(header.style, { textAlign: 'center', userSelect: 'none' })
    Object.assign(title.style, { fontWeight: 'bold' })
    Object.assign(canvasWrapper.style, { position: 'relative', top: 0, left: 0 })
    if (this.opt.header.title != null) {
      title.innerHTML = this.opt.header.title
    }
    container.appendChild(wrapper)
    header.appendChild(title)
    wrapper.appendChild(header)
    wrapper.appendChild(canvasWrapperContainer)
    canvasWrapperContainer.appendChild(canvasWrapper)
    if (this.opt.header.position === 'left') {
      const availWidth = wrapper.getBoundingClientRect().width
      Object.assign(header.style, { display: 'inline-block', width: `${this.opt.header.width}px`, verticalAlign: 'middle' })
      Object.assign(canvasWrapperContainer.style, { display: 'inline-block', width: `${availWidth - this.opt.header.width}px`, verticalAlign: 'middle' })
    }
    const sizes = canvasWrapperContainer.getBoundingClientRect()
    const plotWidth = this.opt.yAxis.enabled ? sizes.width - this.opt.yAxis.width : sizes.width
    this.dataUtils = new DataUtils(this.opt.series, plotWidth, this.getHeight())
    this.yAxis = new YAxis(canvasWrapper, this.opt.yAxis, this.dataUtils)
    this.xAxis = new XAxis(canvasWrapper, this.opt.xAxis, this.dataUtils)
    canvasWrapper.style.height = `${this.xAxis.canvas.height}px`
    if (this.opt.type === 'line') {
      this.plot = new LinePlot(canvasWrapper, this.opt.series, this.dataUtils)
    } else if (this.opt.type === 'heatmap2d') {
      this.yAxis.categories = this.opt.series.map(x => x.name)
      this.plot = new Heatmap2dPlot(canvasWrapper, this.opt.series, this.dataUtils)
    }
    this.frontPanel = new FrontPanel(canvasWrapper, this.dataUtils)
  }

  init (container: HTMLElement) {
    this.buildStructure(container)
    this.eventUtils = new EventUtils(this.frontPanel.canvas, this.dataUtils)
    this.eventUtils
      .active((value: boolean) => {
        if (value === false) {
          for (const chart of this.opt.synced()) {
            chart.setCrosshair(null)
          }
        }
      })
      .move((value: [number, number]) => {
        for (const chart of this.opt.synced()) {
          chart.setCrosshair(value[0])
        }
      })
      .selecting((value: { x: [number | null, number | null], y: [number | null, number | null] }) => {
        for (const chart of this.opt.synced()) {
          chart.setSelection(value.x, value.y)
        }
      })
      .xRangeChange((value: [number, number]) => {
        for (const chart of this.opt.synced()) {
          chart.setXRange(value[0], value[1])
        }
      })
    this.ready = true
  }

  setXRange (x1: number, x2: number) {
    this.frontPanel.drawCrosshair(null)
    this.dataUtils.start = x1
    this.dataUtils.end = x2
    this.draw()
  }

  setSelection (x: [number | null, number | null], y: [number | null, number | null]) {
    this.frontPanel.selection(x, y)
  }

  setCrosshair(value: number | null) {
    this.frontPanel.drawCrosshair(value)
  }

  draw () {
    this.dataUtils.computeData()
    let amplitude = this.dataUtils.computed.maxValue - this.dataUtils.computed.minValue
    if (amplitude === 0) {
      amplitude = 0.1
    }
    this.dataUtils.yMin = this.dataUtils.computed.minValue - 0.1 * amplitude
    this.dataUtils.yMax = this.dataUtils.computed.maxValue + 0.1 * amplitude
    this.xAxis.update()
    this.yAxis.update()
    this.plot.update()
  }
}