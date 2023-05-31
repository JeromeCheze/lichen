import defaultOptions from './defaultOptions.js'
import { ColorScaleOptions, Heatmap2dOptions, Heatmap3dOptions, LegendOptions, LichenOptions, LineOptions, StackedOptions } from './types.js'
import DataUtils from './dataUtils.js'
import EventUtils from './eventUtils.js'
import XAxis from './xAxis.js'
import YAxis from './yAxis.js'
import LinePlot from './linePlot.js'
import Heatmap2dPlot from './heatmap2dPlot.js'
import Heatmap3dPlot from './heatmap3dPlot.js'
import StackedPlot from './stackedPlot.js'
import FrontPanel from './frontPanel.js'
import Legend from './legend.js'
import * as COLORMAPS from './colormaps.js'

export { COLORMAPS }

const PADDING = 10

export class Lichen {

  opt: LichenOptions;
  yAxis: YAxis;
  xAxis: XAxis;
  dataUtils: DataUtils;
  eventUtils: EventUtils;
  plot: LinePlot | Heatmap2dPlot | Heatmap3dPlot | StackedPlot;
  legend: Legend;
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
      const xRanges = this.opt.synced().map(chart => chart.dataUtils.xRange())
      this.dataUtils.start = Math.min.apply(null, xRanges.map(x => x[0]))
      this.dataUtils.end = Math.max.apply(null, xRanges.map(x => x[1]))
      if (this.opt.type === 'heatmap3d') {
        const [yMin, yMax] = this.dataUtils.yRange()
        this.dataUtils.yMin = yMin
        this.dataUtils.yMax = yMax
      }
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
        if (result[k] == null) {
          result[k] = {}
        }
        Object.assign(result[k], v)
      } else {
        result[k] = v
      }
    }
    if (result.synced == null) {
      const instance = []
      result.synced = () => instance
    }
    if (result.type === 'heatmap2d' && result.zoom === 'xy') {
      result.zoom = 'x'
    }
    if (result.type === 'line') {
      for (const serie of result.series) {
        serie.enabled = true
      }
    }
    return result
  }

  getHeight () {
    if (this.opt.type === 'line') {
      return this.opt.height
    } else if (this.opt.type === 'heatmap2d') {
      const series = this.opt.series as Heatmap2dOptions[]
      return this.opt.serieHeight * series.length
    } else if (this.opt.type === 'heatmap3d') {
      return this.opt.height
    } else if (this.opt.type === 'stacked') {
      return this.opt.height
    }
  }

  buildStructure (container: HTMLElement) {
    const wrapper = document.createElement('div')
    const header = document.createElement('div')
    const title = document.createElement('div')
    const legend = document.createElement('div')
    const canvasWrapperContainer = document.createElement('div')
    const canvasWrapper = document.createElement('div')
    Object.assign(header.style, { textAlign: 'center', userSelect: 'none', padding: `${PADDING}px` })
    Object.assign(title.style, { fontWeight: 'bold' })
    // Object.assign(legend.style, { padding: `${PADDING}px` })
    Object.assign(canvasWrapper.style, { position: 'relative', top: 0, left: 0 })
    if (this.opt.header.title != null) {
      title.innerHTML = this.opt.header.title
    }
    container.appendChild(wrapper)
    header.appendChild(title)
    wrapper.appendChild(header)
    wrapper.appendChild(canvasWrapperContainer)
    wrapper.appendChild(legend)
    canvasWrapperContainer.appendChild(canvasWrapper)
    let canvasWrapperContainerWidth = wrapper.getBoundingClientRect().width - 20
    if (this.opt.header.position === 'left') {
      canvasWrapperContainerWidth -= this.opt.header.width + 2 * PADDING
      Object.assign(header.style, { display: 'inline-block', width: `${this.opt.header.width}px`, verticalAlign: 'middle' })
    }
    if (this.opt.legend.position === 'right') {
      canvasWrapperContainerWidth -= this.opt.legend.width + 2 * PADDING
      Object.assign(legend.style, { display: 'inline-block', width: `${this.opt.legend.width}px`, verticalAlign: 'top' })
    }
    Object.assign(canvasWrapperContainer.style, { display: 'inline-block', width: `${canvasWrapperContainerWidth}px`, verticalAlign: 'middle' })
    const sizes = canvasWrapperContainer.getBoundingClientRect()
    const plotWidth = this.opt.yAxis.enabled ? sizes.width - this.opt.yAxis.width : sizes.width
    this.dataUtils = new DataUtils(this.opt.type, this.opt.series, plotWidth, this.getHeight())
    this.yAxis = new YAxis(canvasWrapper, this.opt.yAxis, this.dataUtils)
    this.xAxis = new XAxis(canvasWrapper, this.opt.xAxis, this.dataUtils)
    canvasWrapper.style.height = `${this.xAxis.canvas.height}px`
    if (this.opt.type === 'line') {
      this.plot = new LinePlot(canvasWrapper, this.opt.series as LineOptions[], this.dataUtils, this.opt.colorScale)
    } else if (this.opt.type === 'stacked') {
      this.plot = new StackedPlot(canvasWrapper, this.opt.series as StackedOptions, this.dataUtils, this.opt.colorScale)
    } else if (this.opt.type === 'heatmap2d') {
      const series = this.opt.series as Heatmap2dOptions[]
      this.yAxis.categories = series.map(x => x.name)
      this.plot = new Heatmap2dPlot(canvasWrapper, series, this.dataUtils, this.opt.colorScale)
    } else if (this.opt.type === 'heatmap3d') {
      const series = this.opt.series as Heatmap3dOptions
      this.plot = new Heatmap3dPlot(canvasWrapper, series, this.dataUtils, this.opt.colorScale)
    }
    this.frontPanel = new FrontPanel(canvasWrapper, this.dataUtils)
    this.legend = new Legend(legend, this.opt.legend, this.opt.type, this.opt.height, this.opt.colorScale, this.opt.series)
    this.legend.update()
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
      .yRangeChange((value: [number, number]) => {
        for (const chart of this.opt.synced()) {
          chart.setYRange(value[0], value[1])
        }
      })
      .resetDisplay(() => {
        for (const chart of this.opt.synced()) {
          let [yMin, yMax] = [null, null]
          if (chart.opt.type === 'heatmap3d') {
            [yMin, yMax] = chart.dataUtils.yRange()
          }
          const [xMin, xMax] = chart.dataUtils.xRange()
          chart.setYRange(yMin, yMax, false)
          chart.setXRange(xMin, xMax)
        }
      })
    this.ready = true
  }

  setColorScale (colorScale: ColorScaleOptions) {
    Object.assign(this.opt.colorScale, colorScale)
    this.plot.update(true)
    this.legend.update()
  }

  setXRange (x1: number, x2: number, draw = true) {
    this.frontPanel.drawCrosshair(null)
    this.dataUtils.start = x1
    this.dataUtils.end = x2
    if (draw) {
      this.draw()
    }
  }

  setYRange (y1: number, y2: number, draw = true) {
    this.dataUtils.yMin = y1
    this.dataUtils.yMax = y2
    if (draw) {
      this.draw()
    }
  }

  setSelection (x: [number | null, number | null], y: [number | null, number | null]) {
    if (this.opt.zoom != null) {
      if (this.opt.zoom.indexOf('x') < 0) {
        x = [null, null]
      }
      if (this.opt.zoom.indexOf('y') < 0) {
        y = [null, null]
      }
    }
    this.frontPanel.selection(x, y)
  }

  setCrosshair (value: number | null) {
    this.frontPanel.drawCrosshair(value)
  }

  draw () {
    if (this.opt.type === 'line' || this.opt.type === 'heatmap2d' || this.opt.type === 'stacked') {
      this.dataUtils.computeData()
      if (this.dataUtils.yMin == null || this.dataUtils.yMax == null || this.opt.zoom.indexOf('y') < 0) {
        let [yMin, yMax] = this.dataUtils.yRange()
        let amplitude = yMax - yMin
        if (amplitude === 0) {
          amplitude = 0.1
        }
        this.dataUtils.yMin = this.opt.yAxis.min != null ? this.opt.yAxis.min : yMin - 0.1 * amplitude
        this.dataUtils.yMax = this.opt.yAxis.max != null ? this.opt.yAxis.max : yMax + 0.1 * amplitude
      }
    }
    this.xAxis.update()
    this.yAxis.update()
    this.plot.update()
  }
}