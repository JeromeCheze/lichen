import type{ ColorScaleOptions, LichenOptions, VLine } from './types.js'
import defaultOptions from './defaultOptions.js'
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

const PADDING = 10
const PLOT_MAP = {
  line: LinePlot,
  heatmap2d: Heatmap2dPlot,
  heatmap3d: Heatmap3dPlot,
  stacked: StackedPlot,
  sequence: SequencePlot,
  scatter: ScatterPlot
}

let id = 0
function getID() {
  return id++
}

export default class Lichen {

  opt: LichenOptions
  // yAxis: YAxis
  // xAxis: XAxis
  // dataUtils: DataUtils
  // eventUtils: EventUtils
  // plot: LinePlot | Heatmap2dPlot | Heatmap3dPlot | StackedPlot | SequencePlot | ScatterPlot
  // legend: Legend
  // frontPanel: FrontPanel
  id: number
  ready: boolean
  master: MasterInterface
  wrapper: HTMLElement | null
  eventUtils: EventUtils | null
  debounceResize: number | null
  
  /**
   * @param container - The HTML element container
   * @param opt - Charts options object
   * @param drawOnCreation - Wether to draw the charts immediately after creation or not.
   */
  constructor(container: HTMLElement, opt: LichenOptions, drawOnCreation: boolean = true) {
    this.id = getID()
    this.wrapper = null
    this.master = new MasterInterface()
    this.master.register('CHART', this)
    this.ready = false
    this.opt = this.mergeOptions(opt)
    this.init(container)
    if (this.opt.autoResize) {
      const resizeObserver = new ResizeObserver(() => this.handleResize())
      resizeObserver.observe(container)
    }
    this.debounceResize = null
    this.opt.synced!()[this.id] = this
    if (drawOnCreation) {
      let waitAllReady = true
      while (waitAllReady) {
        waitAllReady = false
        for (const chart of Object.values(this.opt.synced!())) {
          if (chart.ready === false) {
            waitAllReady = true
          }
        }
      }
      const dataUtils = this.master.getRegistered('DATA_UTILS')
      const xRanges = Object.values(this.opt.synced!()).map(chart => chart.master.getRegistered('PLOT').xRange())
      dataUtils.start = Math.min.apply(null, xRanges.map(x => x[0]))
      dataUtils.end = Math.max.apply(null, xRanges.map(x => x[1]))
      this.draw()
    }
  }

  /**
   * Give the requested colorscale object
   * @param name the colorscale name
   * @returns the requested colorscale object
   */
  static getColorScale(name: 'PARULA' | 'VIRIDIS' | 'PLASMA' | 'INFERNO' | 'MAGMA' | 'CIVIDIS') {
    return COLORMAPS[name]
  }

  /**
   * 
   * @param src 
   * @param dest 
   */
  deepCopy(src: any, dest: Record<string, any>={}): any {
    if (src instanceof Function) {
      return src
    } else if (src instanceof Array) {
      return src.map(item => this.deepCopy(item))
    } else if (src instanceof Object) {
      for (const [k, v] of Object.entries(src)) {
        dest[k] = this.deepCopy(v, dest[k])
        // if (v instanceof Function) {
        //   dest[k] = v
        // } else if (v instanceof Array) {
        //   dest[k] = v.map(item => this.deepCopy(item))
        // } else if (v instanceof Object) {
        //   dest[k] = this.deepCopy(v, dest[k])
        // } else if (v !== undefined){
        //   dest[k] = v
        // }
      }
      return dest
    } else {
      return src
    }
  }

  /**
   * Merge the given options with the default built-in options
   * @param opt - Lichen options
   * @returns The Lichen options merged
   */
  mergeOptions(opt: LichenOptions): LichenOptions {
    // deepcopy default options
    const result = this.deepCopy(defaultOptions) as LichenOptions
    this.deepCopy(opt, result)
    // overwrite default options with given options
    // for (const [k, v] of Object.entries(opt)) {
    //   if (v instanceof Function) {
    //     result[k] = v
    //   } else if (v instanceof Object && !(v instanceof Array)) {
    //     if (result[k] == null) {
    //       result[k] = {}
    //     }
    //     Object.assign(result[k], v)
    //   } else {
    //     result[k] = v
    //   }
    // }
    if (result.synced == null) {
      const instance: Lichen[] = []
      result.synced = () => instance
    }
    return result as LichenOptions
  }

  destroy() {
    if (this.eventUtils) {
      this.eventUtils.destroy()
    }
    delete this.opt.synced!()[this.id]
    this.wrapper!.remove()
    const frontPanel = this.master.getRegistered('FRONT_PANEL')
    if (frontPanel.tooltipDiv != null) {
      frontPanel.tooltipDiv.remove()
    }
  }

  /**
   * Create all the structure and instantiate all charts components
   * @param container - The HTML element container 
   */
  buildStructure(container: HTMLElement, reuseWrapper=false) {
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
    if (!reuseWrapper) {
      this.wrapper = document.createElement('div')
      container.appendChild(this.wrapper)
    }
    header.appendChild(title)
    this.wrapper!.appendChild(header)
    this.wrapper!.appendChild(canvasWrapperContainer)
    this.wrapper!.appendChild(legend)
    canvasWrapperContainer.appendChild(canvasWrapper)
    let canvasWrapperContainerWidth = this.opt.width != null ? this.opt.width : this.wrapper!.getBoundingClientRect().width - 20
    if (this.opt.header.position === 'left') {
      canvasWrapperContainerWidth -= this.opt.header.width! + 2 * PADDING
      Object.assign(header.style, { display: 'inline-block', width: `${this.opt.header.width}px`, verticalAlign: 'middle', padding: `0 ${PADDING}px` })
    }
    if (this.opt.legend!.position! === 'right') {
      canvasWrapperContainerWidth -= this.opt.legend!.width! + 2 * PADDING
      Object.assign(legend.style, { display: 'inline-block', width: `${this.opt.legend!.width!}px`, verticalAlign: 'top' })
    }
    Object.assign(canvasWrapperContainer.style, { display: 'inline-block', width: `${canvasWrapperContainerWidth}px`, verticalAlign: 'middle' })
    const sizes = canvasWrapperContainer.getBoundingClientRect()
    const plotWidth = this.opt.yAxis!.enabled ? sizes.width - this.opt.yAxis!.width! : sizes.width
    const PlotClass = PLOT_MAP[this.opt.type]
    new DataUtils(this.master, plotWidth, PlotClass.getHeight(this.master))
    new YAxis(canvasWrapper, this.master)
    const xAxis = new XAxis(canvasWrapper, this.master)
    canvasWrapper.style.height = `${xAxis.canvas.height}px`
    new PlotClass(canvasWrapper, this.master)
    new FrontPanel(canvasWrapper, this.master)
    new Legend(legend, this.master).update()
  }

  /**
   * Initialize the chart construction
   * @param container - The HTML element container 
   */
  init(container: HTMLElement, reuseWrapper=false) {
    this.buildStructure(container, reuseWrapper)
    this.eventUtils = new EventUtils(this.master, this.master.getRegistered('FRONT_PANEL').canvas)
    this.master
      .on('active', (value: boolean) => {
        if (value === false) {
          for (const chart of Object.values(this.opt.synced!())) {
            const chartFrontPanel = chart.master.getRegistered('FRONT_PANEL')
            chartFrontPanel.update(null)
          }
        }
      })
      .on('move', (value: [number, number]) => {
        if (this.opt.hooks!.onCursorMove != null) {
          this.opt.hooks!.onCursorMove(value[0], value[1])
        }
        for (const chart of Object.values(this.opt.synced!())) {
          const chartFrontPanel = chart.master.getRegistered('FRONT_PANEL')
          chartFrontPanel.update(value[0])
        }
      })
      .on('selecting', (value: { x: [number | null, number | null], y: [number | null, number | null] }) => {
        for (const chart of Object.values(this.opt.synced!())) {
          const chartFrontPanel = chart.master.getRegistered('FRONT_PANEL')
          chartFrontPanel.update(null)
          chart.setSelection(value.x, value.y)
        }
      })
      .on('vlineSelection', (value: VLine[]) => {
        if (this.opt.hooks!.onVlineSelection != null) {
          this.opt.hooks!.onVlineSelection(value)
        }
      })
      .on('xRangeChange', (value: [number, number]) => {
        const dataUtils = this.master.getRegistered('DATA_UTILS')
        const t1Diff = dataUtils.start! - value[0]
        const t2Diff = dataUtils.end! - value[1]
        for (const chart of Object.values(this.opt.synced!())) {
          const chartDataUtils = chart.master.getRegistered('DATA_UTILS')
          chart.setXRange(chartDataUtils.start! - t1Diff, chartDataUtils.end! - t2Diff)
          // chart.setXRange(value[0], value[1])
        }
      })
      .on('yRangeChange', (value: [number, number]) => {
        const dataUtils = this.master.getRegistered('DATA_UTILS')
        const ratio = (value[1] - value[0]) / (dataUtils.yMax! - dataUtils.yMin!)
        const newMid = (value[0] + value[1]) / 2
        const prevMid = (dataUtils.yMin! + dataUtils.yMax!) / 2
        const deltaY = newMid - prevMid
        for (const chart of Object.values(this.opt.synced!())) {
          const chartDataUtils = chart.master.getRegistered('DATA_UTILS')
          const delta = chartDataUtils.yMax! - chartDataUtils.yMin!
          const mid = deltaY + (chartDataUtils.yMax! + chartDataUtils.yMin!) / 2
          const halfAmp = delta * ratio / 2
          chart.setYRange(mid - halfAmp, mid + halfAmp)
        }
      })
      .on('resetDisplay', () => {
        for (const chart of Object.values(this.opt.synced!())) {
          chart.resetDisplay()
        }
      })
      .on('redraw', () => {
        this.draw()
        this.master.getRegistered('LEGEND').update()
      })
      .on('dblclick', (x: number) => {
        if (this.opt.hooks!.onDblClick != null) {
          this.opt.hooks!.onDblClick(x)
        }
      })
      .on('active', (value: boolean) => {
        if (value === true && this.opt.hooks!.onActive != null) {
          this.opt.hooks!.onActive(this)
        }
      })
      .on('click', () => {
        if (this.opt.hooks!.onClick != null) {
          this.opt.hooks!.onClick(this)
        }
      })
    this.ready = true
  }

  rebuild() {
    const dataUtils = this.master.getRegistered('DATA_UTILS')
    this.master.getRegistered('FRONT_PANEL').tooltipDiv?.remove()
    this.master = new MasterInterface()
    this.master.register('CHART', this)
    const saveBounds = {
      start: dataUtils.start,
      end: dataUtils.end,
      yMin: dataUtils.yMin,
      yMax: dataUtils.yMax
    }
    const container = this.wrapper!.parentElement as HTMLElement
    this.wrapper!.innerHTML = ''
    this.init(container, true)
    this.setYRange(saveBounds.yMin, saveBounds.yMax, false)
    this.setXRange(saveBounds.start!, saveBounds.end!)
    // this.draw()
  }

  handleResize() {
    if (this.debounceResize != null) {
      window.clearTimeout(this.debounceResize)
    }
    this.debounceResize = window.setTimeout(() => {
      this.rebuild()
    }, 300)
  }

  resetDisplay() {
    if (this.opt.hooks!.beforeResetDisplay!() === true) {
      const dataUtils = this.master.getRegistered('DATA_UTILS')
      const xRanges = Object.values(this.opt.synced!()).map(chart => chart.master.getRegistered('PLOT').xRange())
      const xMin = Math.min.apply(null, xRanges.map(x => x[0]))
      const xMax = Math.max.apply(null, xRanges.map(x => x[1]))
      dataUtils.resetComputed()
      dataUtils.setXRange(xMin, xMax)
      dataUtils.setYRange(null, null)
      this.draw()
    }
  }

  /**
   * Set the given color scale object to use and updates the plot and the legend
   * @param colorScale
   */
  setColorScale(colorScale: ColorScaleOptions) {
    Object.assign(this.opt.colorScale!, colorScale)
    this.master.getRegistered('PLOT').update(true)
    this.master.getRegistered('LEGEND').update()
  }

  /**
   * Set the X range for next draw
   * @param x1 - the start range
   * @param x2 - the end range
   * @param draw - call the {@link Lichen.draw} method if `true`
   */
  setXRange(x1: number, x2: number, draw = true) {
    this.master.getRegistered('FRONT_PANEL').update(null)
    const dataUtils = this.master.getRegistered('DATA_UTILS')
    if (dataUtils.start != x1 || dataUtils.end != x2) {
      dataUtils.start = x1
      dataUtils.end = x2
      if (draw) {
        this.draw()
      }
    }
  }

  /**
   * Set the X range for next draw
   * @param y1 - the start range
   * @param y2 - the end range
   * @param draw - call the {@link Lichen.draw} method if `true`
   */
  setYRange(y1: number | null, y2: number | null, draw = true) {
    const dataUtils = this.master.getRegistered('DATA_UTILS')
    dataUtils.yMin = y1
    dataUtils.yMax = y2
    if (draw) {
      this.draw()
    }
  }

  /**
   * Set the selection to draw on front panel
   * @param x - the X range
   * @param y - the Y range
   */
  setSelection(x: [number | null, number | null], y: [number | null, number | null]) {
    if (this.opt.zoom != null) {
      if (this.opt.zoom.indexOf('x') < 0) {
        x = [null, null]
      }
      if (this.opt.zoom.indexOf('y') < 0) {
        y = [null, null]
      }
    }
    this.master.getRegistered('FRONT_PANEL').selection(x, y)
  }

  /**
   * The main draw method of Lichen
   */
  draw() {
    const dataUtils = this.master.getRegistered('DATA_UTILS')
    dataUtils.processData()
    if (dataUtils.yMin == null || dataUtils.yMax == null || (this.opt.zoom != null && this.opt.zoom.indexOf('y') < 0)) {
      const [yMin, yMax] = this.master.getRegistered('PLOT').yRange()
      let amplitude = yMax - yMin
      if (amplitude === 0) {
        amplitude = 0.1
      }
      dataUtils.yMin = this.opt.yAxis!.min != null ? this.opt.yAxis!.min : yMin - 0.1 * amplitude
      dataUtils.yMax = this.opt.yAxis!.max != null ? this.opt.yAxis!.max : yMax + 0.1 * amplitude
    }
    if (this.opt.hooks!.beforeUpdate!(this) === true) {
      this.master.getRegistered('X_AXIS').update()
      this.master.getRegistered('Y_AXIS').update()
      this.master.getRegistered('PLOT').update()
      this.master.getRegistered('FRONT_PANEL').update(null)
    }
  }
}
