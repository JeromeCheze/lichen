import defaultOptions from './defaultOptions.js'
import { ColorScaleOptions, LichenOptions } from './types.js'
import DataUtils from './dataUtils.js'
import EventUtils from './eventUtils.js'
import XAxis from './xAxis.js'
import YAxis from './yAxis.js'
import LinePlot from './plot/linePlot.js'
import Heatmap2dPlot from './plot/heatmap2dPlot.js'
import Heatmap3dPlot from './plot/heatmap3dPlot.js'
import StackedPlot from './plot/stackedPlot.js'
import SequencePlot from './plot/sequencePlot.js'
import ScatterPlot from './plot/scatterPlot.js'
import FrontPanel from './frontPanel.js'
import Legend from './legend.js'
import MasterInterface from './masterInterface.js'
import * as COLORMAPS from './colormaps.js'

export { COLORMAPS }

const PADDING = 10
const PLOT_MAP = {
  line: LinePlot,
  heatmap2d: Heatmap2dPlot,
  heatmap3d: Heatmap3dPlot,
  stacked: StackedPlot,
  sequence: SequencePlot,
  scatter: ScatterPlot
}

export class Lichen {

  opt: LichenOptions;
  yAxis: YAxis;
  xAxis: XAxis;
  dataUtils: DataUtils;
  eventUtils: EventUtils;
  plot: LinePlot | Heatmap2dPlot | Heatmap3dPlot | StackedPlot | SequencePlot | ScatterPlot;
  legend: Legend;
  frontPanel: FrontPanel;
  ready: boolean;
  master: MasterInterface;

  constructor(container: HTMLElement, opt: LichenOptions, drawOnCreation: boolean = true) {
    this.master = new MasterInterface()
    this.master.register('CHART', this)
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
      const xRanges = this.opt.synced().map(chart => chart.master.getRegistered('PLOT').xRange())
      this.dataUtils.start = Math.min.apply(null, xRanges.map(x => x[0]))
      this.dataUtils.end = Math.max.apply(null, xRanges.map(x => x[1]))
      this.draw()
    }
  }

  mergeOptions(opt: LichenOptions): LichenOptions {
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
    return result
  }

  buildStructure(container: HTMLElement) {
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
    const PlotClass = PLOT_MAP[this.opt.type]
    this.dataUtils = new DataUtils(this.master, plotWidth, PlotClass.getHeight(this.master))
    this.yAxis = new YAxis(canvasWrapper, this.master)
    this.xAxis = new XAxis(canvasWrapper, this.master)
    canvasWrapper.style.height = `${this.xAxis.canvas.height}px`
    this.plot = new PlotClass(canvasWrapper, this.master)
    this.frontPanel = new FrontPanel(canvasWrapper, this.master)
    this.legend = new Legend(legend, this.master)
    this.legend.update()
  }

  init(container: HTMLElement) {
    this.buildStructure(container)
    this.eventUtils = new EventUtils(this.master, this.master.getRegistered('FRONT_PANEL').canvas)
    this.master
      .on('active', (value: boolean) => {
        if (value === false) {
          for (const chart of this.opt.synced()) {
            chart.frontPanel.update(null)
          }
        }
      })
      .on('move', (value: [number, number]) => {
        for (const chart of this.opt.synced()) {
          chart.frontPanel.update(value[0])
        }
      })
      .on('selecting', (value: { x: [number | null, number | null], y: [number | null, number | null] }) => {
        for (const chart of this.opt.synced()) {
          chart.frontPanel.update(null)
          chart.setSelection(value.x, value.y)
        }
      })
      .on('xRangeChange', (value: [number, number]) => {
        for (const chart of this.opt.synced()) {
          chart.setXRange(value[0], value[1])
        }
      })
      .on('yRangeChange', (value: [number, number]) => {
        for (const chart of this.opt.synced()) {
          chart.setYRange(value[0], value[1])
        }
      })
      .on('resetDisplay', () => {
        for (const chart of this.opt.synced()) {
          const dataUtils = chart.master.getRegistered('DATA_UTILS')
          const plot = chart.master.getRegistered('PLOT')
          const [xMin, xMax] = plot.xRange()
          // const [yMin, yMax] = plot.yRange()
          dataUtils.resetComputed()
          dataUtils.setXRange(xMin, xMax)
          dataUtils.setYRange(null, null)
          chart.draw()
        }
      })
      .on('redraw', () => {
        this.draw()
        this.legend.update()
      })
    this.ready = true
  }

  setColorScale(colorScale: ColorScaleOptions) {
    Object.assign(this.opt.colorScale, colorScale)
    this.plot.update(true)
    this.legend.update()
  }

  setXRange(x1: number, x2: number, draw = true) {
    this.frontPanel.update(null)
    this.dataUtils.start = x1
    this.dataUtils.end = x2
    if (draw) {
      this.draw()
    }
  }

  setYRange(y1: number, y2: number, draw = true) {
    this.dataUtils.yMin = y1
    this.dataUtils.yMax = y2
    if (draw) {
      this.draw()
    }
  }

  setSelection(x: [number | null, number | null], y: [number | null, number | null]) {
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

  draw() {
    this.dataUtils.processData()
    if (this.dataUtils.yMin == null || this.dataUtils.yMax == null || this.opt.zoom.indexOf('y') < 0) {
      const [yMin, yMax] = this.master.getRegistered('PLOT').yRange()
      let amplitude = yMax - yMin
      if (amplitude === 0) {
        amplitude = 0.1
      }
      this.dataUtils.yMin = this.opt.yAxis.min != null ? this.opt.yAxis.min : yMin - 0.1 * amplitude
      this.dataUtils.yMax = this.opt.yAxis.max != null ? this.opt.yAxis.max : yMax + 0.1 * amplitude
    }
    this.xAxis.update()
    this.yAxis.update()
    this.plot.update()
    this.frontPanel.update(null)
  }
}