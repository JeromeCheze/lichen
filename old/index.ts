/* LIghtweight CHart ENgine (LiChEn) */

import { LichenHeatmapData, LichenDisplayBounds, LichenInstanceOptions, LichenMultiLineData, LichenOptions, StringIndexedObject, VLine, LichenColorScale } from './types'

export const COLORMAPS: {[name: string]: LichenColorScale} = {
  parula: [
    [0.000, [53, 42, 135]],
    [0.125, [3, 99, 224]],
    [0.250, [20, 133, 212]],
    [0.375, [6, 167, 198]],
    [0.500, [56, 185, 158]],
    [0.625, [146, 191, 115]],
    [0.750, [217, 186, 86]],
    [0.875, [252, 207, 47]],
    [1.000, [249, 251, 14]]
  ],
  viridis: [
    [0, [68, 1, 84]],
    [0.125, [71, 44, 123]],
    [0.25, [58, 82, 139]],
    [0.375, [45, 111, 142]],
    [0.5, [32, 144, 140]],
    [0.625, [39, 173, 128]],
    [0.75, [91, 200, 98]],
    [0.875, [170, 219, 50]],
    [1, [253, 231, 36]]
  ],
  plasma: [
    [0, [12, 7, 134]],
    [0.125, [76, 2, 161]],
    [0.25, [126, 3, 167]],
    [0.375, [165, 31, 151]],
    [0.5, [203, 71, 119]],
    [0.625, [229, 107, 92]],
    [0.75, [247, 147, 65]],
    [0.875, [253, 195, 40]],
    [1, [239, 248, 33]]
  ],
  inferno: [
    [0, [0, 0, 3]],
    [0.125, [32, 12, 74]],
    [0.25, [87, 15, 109]],
    [0.375, [133, 32, 106]],
    [0.5, [187, 55, 84]],
    [0.625, [227, 88, 50]],
    [0.75, [249, 140, 9]],
    [0.875, [248, 201, 49]],
    [1, [252, 254, 164]]
  ],
  magma: [
    [0, [0, 0, 3]],
    [0.125, [28, 16, 70]],
    [0.25, [80, 18, 123]],
    [0.375, [126, 36, 129]],
    [0.5, [182, 54, 121]],
    [0.625, [229, 80, 99]],
    [0.75, [251, 134, 96]],
    [0.875, [254, 194, 134]],
    [1, [251, 252, 191]]
  ],
  cividis: [
    [0, [0, 34, 77]],
    [0.125, [26, 56, 111]],
    [0.25, [67, 78, 107]],
    [0.375, [94, 98, 110]],
    [0.5, [124, 123, 120]],
    [0.625, [154, 147, 118]],
    [0.75, [186, 172, 108]],
    [0.875, [220, 200, 88]],
    [1, [253, 231, 55]]
  ]
}

const defaultOptions: LichenOptions = {
  xStart: -1,
  xStep: -1,
  type: 'line', // || 'heatmap' || 'timing'
  area: false, // ignored in type heatmap and with multi series
  stacked: false, // ignored in type heatmap
  syncScale: false, // used to sync Y scale with other charts returned by the method syncCharts

  title: '',
  colorScale: COLORMAPS.inferno,
  areaFillOpacity: 0.5,
  logarithmicColorScale: true, // ignored in type line
  drawColorScale: true, // ignored in type line

  crosshair: false, // ignored in type heatmap

  /* style */
  background: 'transparent',
  height: 200, // ignored in category mode
  xAxisHeight: 30,
  yAxisWidth: 120,
  lineWidth: 2, // ignored in type heatmap
  titleFontSize: 14,
  legendFontSize: 12,
  fontSize: 10,
  textColor: '#888',
  gridColor: 'rgba(136, 136, 136, 0.1)',
  categoryHeight: 15,
  categoryMargin: 1,

  tooltip: false, // ignored in type heatmap
  displayStats: false, // works for single serie of type line (or area)
  yAxisPowerOfTen: true,
  displayDateInTooltip: true,
  categoryTooltipValues: true,
  tooltipFormatter: (x: number) => `${x}`, // ignored in type heatmap
  units: '', // ignored in type heatmap
  reverseXZoom: false,
  reverseYZoom: false,

  vLines: [] as VLine[], // [{ x: <xValue>, name: '<name>', color: '<color>', width: '<width>', display: true, position: 'top|middle|bottom' }, ...]

  debounce: false,

  beforeDraw: function () { return true },
  afterDraw: function () {},

  onDblClick: function () { return true },

  syncCharts: function () { return [] },

  data: [] // { <key>: { color, data }, ... } NOTE: colorScale not available with multi series
}

const vLineDefault = { name: '', color: 'black', width: 1, display: true, position: 'top' }

export class Lichen {
  container: HTMLElement;
  opt: LichenInstanceOptions;
  disp: LichenDisplayBounds;
  dispStats: {
    min: number | null;
    max: number | null;
    avg: number | null;
    rms: number | null;
    container: HTMLElement | null;
  };

  groupValue: {
    [index: string]: ([number, number] | null)[];
  };

  action: {
    noMouse: boolean;
    wheelDelta: number | null;
    mouse: { x: number, y: number } | null;
    dbl: {
      threshold: number;
      time: number;
      count: number;
    },
    touches: {
      [id: number]: { x: number, y: number };
    }
  };

  debounceOpt: {
    timer: number | null,
    locked: boolean;
    refresh: boolean;
    init: boolean;
    disp: LichenDisplayBounds;
  };

  bindEvents: {
    [event: string]: { el: HTMLElement, handler: (ev: Event) => void };
  };

  ctx: CanvasRenderingContext2D | null;
  ctx2: CanvasRenderingContext2D | null;
  ctx3: CanvasRenderingContext2D | null;

  constructor (container: HTMLElement, opt: LichenOptions) {
    this.container = container
    this.opt = Object.assign({}, defaultOptions) as LichenInstanceOptions
    Object.assign(this.opt, opt)
    this.opt.xEnd = this.opt.xStart + this.getDataLength() * this.opt.xStep
    if (this.opt.categories != null && this.opt.type === 'heatmap') {
      if (this.opt.categories.length !== this.opt.data.length) {
        console.error(this.opt)
        throw new Error('[Lichen] categrories length != data length')
      }
    }
    // if (this.opt.categories == null) {
    //   this.opt.xEnd = this.opt.xStart + this.opt.data.length * this.opt.xStep
    // } else {
    //   this.opt.xEnd = this.opt.xStart + this.opt.data[0].length * this.opt.xStep
    // }
    this.disp = {
      xStart: this.opt.xStart,
      xEnd: this.opt.xEnd,
      yStart: this.opt.yStart,
      yEnd: this.opt.yEnd,
      zStart: this.opt.zStart,
      zEnd: this.opt.zEnd
    }
    this.dispStats = {
      min: null,
      max: null,
      avg: null,
      rms: null,
      container: null
    }
    this.groupValue = {}
    this.action = {
      noMouse: false,
      wheelDelta: null,
      mouse: null,
      dbl: {
        threshold: 500,
        time: new Date().getTime(),
        count: 0
      },
      touches: {}
    }
    this.debounceOpt = {
      timer: null,
      locked: false,
      refresh: false,
      init: false,
      disp: Object.assign({}, this.disp)
    }
    this.bindEvents = {}
    this.ctx = null
    this.ctx2 = null
    this.ctx3 = null
    this.initCanvas()
    this.opt.vLines = this.opt.vLines.map(vLine => {
      return Object.assign(JSON.parse(JSON.stringify(vLineDefault)), vLine)
    })
    this.draw()
  }

  getDataLength () {
    const o = this.opt
    const d = o.data
    return (o.type === 'timing'
      ? d.length
      : o.type === 'line'
        ? d instanceof Array
          ? d.length
          : d instanceof Object && d[Object.keys(d)[0]].data.length
        : o.categories != null
          ? d instanceof Array && d[0]! instanceof Array && d[0].length
          : d.length) as number
    // return (
    //   this.opt.type === 'timing' ? d.length
    //     : this.opt.type === 'line' ? (d instanceof Array ? d.length : d[Object.keys(d)[0]].data.length)
    //       : this.opt.categories == null ? d.length
    //         : d[0].length
    // )
  }

  getIndexFromXValue (x: number) {
    return Math.round(this.getRatio(x, this.opt.xStart, this.opt.xEnd!) * this.getDataLength())
  }

  getIndexFromYValue (y: number) {
    const d = this.opt.data as (number | null)[][]
    return Math.floor(this.getRatio(y, this.opt.yStart!, this.opt.yEnd!) * d[0].length)
  }

  getXPos (x: number) {
    const w = this.opt.width - this.opt.yAxisWidth
    return Math.floor(this.opt.yAxisWidth + w * this.getRatio(x, this.disp.xStart, this.disp.xEnd))
  }

  getYPos (y: number) {
    const h = this.opt.height - this.opt.xAxisHeight
    return Math.floor(h - h * this.getRatio(y, this.disp.yStart!, this.disp.yEnd!))
  }

  getXPosFromIndex (i: number) {
    if (i < 0 || i >= this.getDataLength()) {
      return null
    }
    const xPos = this.getXPos(this.opt.xStart + this.opt.xStep * i)
    return xPos >= this.opt.yAxisWidth ? xPos : null
  }

  getXValue (xPos: number) {
    return this.disp.xStart + (this.disp.xEnd - this.disp.xStart) * this.getRatio(xPos, this.opt.yAxisWidth, this.opt.width)
  }

  getYValue (yPos: number) {
    return this.disp.yEnd! - (this.disp.yEnd! - this.disp.yStart!) * this.getRatio(yPos, 0, this.opt.height - this.opt.xAxisHeight)
  }

  getRatio (value: number, min: number, max: number) {
    return (value - min) / (max - min)
  }

  toRGB (color: [number, number, number]) {
    return `rgb(${Math.floor(color[0])},${Math.floor(color[1])},${Math.floor(color[2])})`
  }

  handleMouseDown (ev: MouseEvent) {
    if (this.action.noMouse) {
      return
    }
    const pos = this.ctx2!.canvas.getBoundingClientRect()
    // const x = ev.clientX - pos.x
    // console.log(new Date(this.getXValue(x)).toISOString());
    this.action.mouse = { x: ev.clientX - pos.x, y: ev.clientY - pos.y }
    // console.log(this.action.mouse);
  }

  handleMouseMove (ev: MouseEvent) {
    const a = this.action
    if (a.noMouse) {
      return
    }
    const pos = this.ctx2!.canvas.getBoundingClientRect()
    const x2 = ev.clientX - pos.x
    const y2 = ev.clientY - pos.y

    if (a.mouse == null) { // not dragging
      this.updateCrosshairAndTooltip(x2)
      return
    }

    // dragging
    if (this.opt.crosshair) {
      // reset crosshair (and also tooltip at the same because a clearRect is used)
      this.updateCrosshairAndTooltip(null)
    }
    const x1 = a.mouse.x
    const y1 = a.mouse.y

    if (ev.shiftKey) { // selecting area
      const ctx = this.ctx2!
      ctx.save()
      const xMin = Math.max(this.opt.yAxisWidth, Math.min(x1, x2))
      const xMax = Math.max(x1, x2)
      ctx.clearRect(0, 0, this.opt.width, this.opt.height)
      if (this.opt.type === 'timing' || this.opt.type === 'line' || (this.opt.type === 'heatmap' && this.opt.categories != null)) {
        ctx.fillStyle = 'rgba(0, 171, 255, 0.2)'
        ctx.fillRect(xMin, 0, xMax - xMin, this.opt.height - this.opt.xAxisHeight)
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.fillRect(xMin, Math.min(y1, y2), xMax - xMin, Math.abs(y2 - y1))
      }
      ctx.restore()
      // console.log(ev.clientX - this.pos.x, ev.clientY - this.pos.y);
      return
    }

    // panning
    let redraw = false
    if (this.xPanning(x2 - x1)) {
      redraw = true
      a.mouse.x = x2
    }
    if (this.yPanning(y2 - y1)) {
      redraw = true
      a.mouse.y = y2
    }
    if (redraw) {
      this.draw()
    }
  }

  updateCrosshairAndTooltip (xPos: (number | null)) {
    const xValue = xPos != null ? this.getXValue(xPos) : null
    if (this.opt.crosshair) {
      this.drawCrosshair(xValue)
      for (const chart of this.opt.syncCharts()) {
        if (chart === this) {
          continue
        }
        chart.drawCrosshair(xValue)
      }
    }
    if (this.opt.tooltip && xPos != null) {
      this.drawTooltip(xValue)
    }
  }

  xPanning (value: number) {
    let redraw = false
    if (Math.abs(value) >= 5) {
      // panning along x axis
      const xValue = this.getXValue(0) - this.getXValue(value)
      this.setDispBounds({
        xStart: Math.max(this.opt.xStart, this.disp.xStart + xValue),
        xEnd: Math.min(this.opt.xEnd, this.disp.xEnd + xValue)
      })
      redraw = true
    }
    return redraw
  }

  yPanning (value: number) {
    let redraw = false
    if (Math.abs(value) >= 5) {
      // panning along y axis
      const yValue = this.getYValue(0) - this.getYValue(value)
      this.setDispBounds({
        yStart: Math.max(this.opt.yStart!, this.disp.yStart! + yValue),
        yEnd: Math.min(this.opt.yEnd!, this.disp.yEnd! + yValue)
      })
      redraw = true
    }
    return redraw
  }

  handleMouseUp (ev: MouseEvent) {
    const a = this.action
    if (a.noMouse) {
      return
    }
    if (a.mouse == null) {
      // nothing to do if not dragging
      return
    }
    const ctx = this.ctx2!
    ctx.clearRect(0, 0, this.opt.width, this.opt.height)
    if (ev.shiftKey) {
      let redraw = false
      const pos = ctx.canvas.getBoundingClientRect()
      const x1 = this.getXValue(a.mouse.x)
      const x2 = this.getXValue(ev.clientX - pos.x)
      const y1 = this.getYValue(a.mouse.y)
      const y2 = this.getYValue(ev.clientY - pos.y)
      if ((Math.abs(x1 - x2) / this.opt.xStep) > 10) {
        redraw = true
        this.setDispBounds({
          xStart: Math.max(Math.min(x1, x2), this.opt.xStart),
          xEnd: Math.min(Math.max(x1, x2), this.opt.xEnd)
        })
      }
      if (this.opt.type === 'heatmap' && Math.abs(y1 - y2) > 0) {
        redraw = true
        this.setDispBounds({
          yStart: Math.max(Math.min(y1, y2), this.opt.yStart!),
          yEnd: Math.min(Math.max(y1, y2), this.opt.yEnd!)
        })
      }
      if (redraw) {
        this.draw()
      }
    }
    a.mouse = null
  }

  setDispBounds (dispBounds: {
    'xStart'?: number;
    'xEnd'?: number;
    'yStart'?: number;
    'yEnd'?: number;
    'zStart'?: number;
    'zEnd'?: number;
  }) {
    Object.assign(this.disp, dispBounds)
    for (const chart of this.opt.syncCharts()) {
      let redraw = false
      for (const [k, v] of Object.entries(dispBounds)) {
        if (chart.disp[k] !== v) {
          if (['xStart', 'xEnd'].indexOf(k) >= 0) {
            // do not share yStart and yEnd when chart type is line to prevent issues when syncing with heatmap
            chart.disp[k] = v
          }
          redraw = true
        }
      }
      if (redraw) {
        chart.draw()
      }
    }
  }

  handleMouseLeave (ev: MouseEvent) {
    if (this.action.noMouse) {
      return
    }
    if (this.action.mouse == null) {
      if (this.opt.crosshair) {
        this.updateCrosshairAndTooltip(null)
      }
    } else {
      this.handleMouseUp(ev)
    }
  }

  xZoom (zoomLevel: number) {
    const halfSpan = (this.disp.xEnd - this.disp.xStart) / 2
    const center = this.disp.xStart + halfSpan
    const newXStart = Math.max(this.opt.xStart, center - zoomLevel * halfSpan)
    const newXEnd = Math.min(this.opt.xEnd, center + zoomLevel * halfSpan)
    if ((newXEnd - newXStart) > (10 * this.opt.xStep)) {
      this.setDispBounds({ xStart: newXStart, xEnd: newXEnd })
      this.draw()
    }
  }

  yZoom (zoomLevel: number) {
    const halfSpan = (this.disp.yEnd! - this.disp.yStart!) / 2
    const center = this.disp.yStart! + halfSpan
    this.setDispBounds({
      yStart: Math.max(this.opt.yStart!, center - zoomLevel * halfSpan),
      yEnd: Math.min(this.opt.yEnd!, center + zoomLevel * halfSpan)
    })
    this.draw()
  }

  handleWheel (ev: WheelEvent) {
    if (ev.shiftKey) {
      ev.preventDefault()
      let delta = (
        Math.abs(ev.deltaY) > 1
          ? ev.deltaY
          : Math.abs(ev.deltaX) > 1
            ? ev.deltaX
            : 0
      )
      if (this.action.wheelDelta == null) {
        this.action.wheelDelta = 0
      }
      this.action.wheelDelta += delta
      if (Math.abs(this.action.wheelDelta) < 5) {
        return
      }
      delta = this.action.wheelDelta
      this.action.wheelDelta = 0
      if (ev.ctrlKey || ev.metaKey) {
        Math.sign(delta) > 0 ? this.yZoom(this.opt.reverseYZoom ? 1.2 : 0.8) : this.yZoom(this.opt.reverseYZoom ? 0.8 : 1.2)
      } else {
        Math.sign(delta) > 0 ? this.xZoom(this.opt.reverseXZoom ? 1.2 : 0.8) : this.xZoom(this.opt.reverseXZoom ? 0.8 : 1.2)
      }
    }
  }

  resetZoom () {
    this.setDispBounds({
      xStart: this.opt.xStart,
      xEnd: this.opt.xEnd,
      yStart: this.opt.yStart,
      yEnd: this.opt.yEnd
    })
    this.draw()
  }

  handleDblClick (ev: MouseEvent | Touch) {
    const pos = this.ctx2!.canvas.getBoundingClientRect()
    const xValue = this.getXValue(ev.clientX - pos.x)
    if (this.opt.onDblClick(this, xValue)) {
      this.resetZoom()
    }
  }

  handleTouchStart (ev: TouchEvent) {
    this.action.noMouse = true
    const pos = this.ctx2!.canvas.getBoundingClientRect()
    const a = this.action
    const now = new Date().getTime()
    if ((now - a.dbl.time) > a.dbl.threshold) {
      a.dbl.time = now
      a.dbl.count = 0
    }
    a.dbl.count++
    for (const t of ev.changedTouches) {
      if (Object.keys(a.touches).length < 2) {
        a.touches[t.identifier] = { x: t.clientX - pos.x, y: t.clientY - pos.y }
      }
    }
    const toucheKeys = Object.keys(a.touches).map(x => parseInt(x))
    if (toucheKeys.length < 2) {
      this.updateCrosshairAndTooltip(a.touches[toucheKeys[0]].x)
    }
  }

  handleTouchMove (ev: TouchEvent) {
    const pos = this.ctx2!.canvas.getBoundingClientRect()
    const a = this.action
    const toucheKeys = Object.keys(a.touches).map(x => parseInt(x))
    if (toucheKeys.length < 2) {
      // update crosshair and tooltip
      const t = ev.changedTouches[0]
      const xPos = t.clientX - pos.x
      // const xValue = this.getXValue(xPos)
      a.touches[toucheKeys[0]] = { x: xPos, y: t.clientY - pos.y }
      this.updateCrosshairAndTooltip(xPos)
    } else {
      ev.preventDefault()
      // handle pinch and drag
      a.dbl.count = 0
      if (this.opt.crosshair) {
        this.updateCrosshairAndTooltip(null)
      }
      const tValues = Object.entries(a.touches).map(t => ({
        id: parseInt(t[0]),
        x1: t[1].x,
        y1: t[1].y,
        x2: t[1].x,
        y2: t[1].y
      }))
      for (const t of ev.changedTouches) {
        const tVal = tValues.find(x => x.id === t.identifier)
        tVal!.x2 = t.clientX - pos.x
        tVal!.y2 = t.clientY - pos.y
      }
      const pinchX = Math.abs((tValues[1].x1 - tValues[0].x1) / (tValues[1].x2 - tValues[0].x2))
      const pinchY = Math.abs((tValues[1].y1 - tValues[0].y1) / (tValues[1].y2 - tValues[0].y2))
      const panX = ((tValues[0].x2 - tValues[0].x1) + (tValues[1].x2 - tValues[1].x1)) / 2
      const panY = ((tValues[0].y2 - tValues[0].y1) + (tValues[1].y2 - tValues[1].y1)) / 2
      const overwriteTouch = { x: false, y: false }
      let redraw = false
      if (Math.abs(pinchX - 1) > 0.2) {
        overwriteTouch.x = true
        this.xZoom(pinchX)
      }
      if (Math.abs(pinchY - 1) > 0.2) {
        overwriteTouch.y = true
        this.yZoom(pinchY)
      }
      if (this.xPanning(panX)) {
        overwriteTouch.x = true
        redraw = true
      }
      if (this.yPanning(panY)) {
        overwriteTouch.y = true
        redraw = true
      }
      for (const t of tValues) {
        if (overwriteTouch.x) {
          a.touches[t.id].x = t.x2
        }
        if (overwriteTouch.y) {
          a.touches[t.id].y = t.y2
        }
      }
      if (redraw) {
        this.draw()
      }
    }
  }

  handleTouchEnd (ev: TouchEvent) {
    const a = this.action
    if (a.dbl.count === 2) {
      this.handleDblClick(ev.touches[0])
    }
    for (const t of ev.changedTouches) {
      if (a.touches[t.identifier]) {
        delete a.touches[t.identifier]
      }
    }
  }

  initCanvas () {
    const o = this.opt
    if (o.width == null) {
      o.width = this.container.clientWidth - 10
    }
    if (o.categories != null) {
      const n = o.categories.length
      o.height = o.xAxisHeight + n * o.categoryHeight + (n + 1) * o.categoryMargin
    }
    this.container.innerHTML = ''
    const titleContainer = document.createElement('div')
    const statsContainer = document.createElement('span')
    this.dispStats.container = statsContainer
    const canvasContainer = document.createElement('div')
    const mainCanvas = document.createElement('canvas')
    const actionCanvas = document.createElement('canvas')
    titleContainer.innerHTML = o.title
    titleContainer.appendChild(statsContainer)
    Object.assign(statsContainer.style, { float: 'right', fontSize: '10px' })
    Object.assign(this.container.style, { background: o.background })
    Object.assign(titleContainer.style, { padding: '10px', textAlign: 'center', fontSize: `${o.titleFontSize}px` })
    Object.assign(canvasContainer.style, { position: 'relative', width: `${o.width}px`, height: `${o.height}px` })
    Object.assign(mainCanvas.style, { position: 'absolute', top: 0, left: 0 })
    Object.assign(actionCanvas.style, { position: 'absolute', top: 0, left: 0, userSelect: 'none' })
    Object.assign(mainCanvas, { width: o.width, height: o.height })
    Object.assign(actionCanvas, { width: o.width, height: o.height })
    canvasContainer.appendChild(mainCanvas)
    canvasContainer.appendChild(actionCanvas)
    this.container.appendChild(titleContainer)
    this.container.appendChild(canvasContainer)
    this.ctx = mainCanvas.getContext('2d')
    this.ctx2 = actionCanvas.getContext('2d')
    this.bindEvents = {
      mousedown: { el: actionCanvas, handler: (ev) => this.handleMouseDown(ev as MouseEvent) },
      mouseup: { el: actionCanvas, handler: ev => this.handleMouseUp(ev as MouseEvent) },
      mousemove: { el: actionCanvas, handler: ev => this.handleMouseMove(ev as MouseEvent) },
      mouseleave: { el: actionCanvas, handler: ev => this.handleMouseLeave(ev as MouseEvent) },
      wheel: { el: actionCanvas, handler: ev => this.handleWheel(ev as WheelEvent) },
      dblclick: { el: actionCanvas, handler: ev => this.handleDblClick(ev as MouseEvent) },
      touchstart: { el: actionCanvas, handler: ev => this.handleTouchStart(ev as TouchEvent) },
      touchend: { el: actionCanvas, handler: ev => this.handleTouchEnd(ev as TouchEvent) },
      touchmove: { el: actionCanvas, handler: ev => this.handleTouchMove(ev as TouchEvent) }
    }
    for (const [k, v] of Object.entries(this.bindEvents)) {
      v.el.addEventListener(k, v.handler)
    }
    if (o.type === 'heatmap' && o.drawColorScale) {
      const colorCanvas = document.createElement('canvas')
      Object.assign(colorCanvas, { width: o.width, height: 40 })
      this.container.appendChild(colorCanvas)
      this.ctx3 = colorCanvas.getContext('2d')
      this.drawColorScale()
    }
    if (!(o.data instanceof Array)) {
      const legendContainer = document.createElement('div')
      Object.assign(legendContainer.style, { display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', fontSize: `${o.legendFontSize}px` })
      for (const [k, v] of Object.entries(o.data)) {
        v.enabled = true
        const valueContainer = document.createElement('div')
        const colorBox = document.createElement('span')
        Object.assign(colorBox.style, {
          border: `1px solid ${o.textColor}`,
          borderRadius: '4px',
          background: v.color,
          padding: '0 15px',
          margin: '5px 5px 5px 25px',
          cursor: 'pointer'
        })
        const valueLabel = document.createElement('span')
        Object.assign(valueLabel.style, { cursor: 'pointer' })
        valueLabel.innerHTML = k
        if (v.title != null) {
          valueLabel.title = v.title
        }
        const toggleSerieHandler = () => {
          v.enabled = !v.enabled
          colorBox.style.background = v.enabled ? v.color! : '#ddd'
          valueLabel.style.color = v.enabled ? 'inherit' : '#888'
          this.draw()
        }
        colorBox.addEventListener('click', toggleSerieHandler)
        valueLabel.addEventListener('click', toggleSerieHandler)

        valueContainer.appendChild(colorBox)
        valueContainer.appendChild(valueLabel)
        legendContainer.appendChild(valueContainer)
      }
      this.container.appendChild(legendContainer)
    }
  }

  destroy () {
    const syncCharts = this.opt.syncCharts()
    const syncIndex = syncCharts.indexOf(this)
    if (syncIndex >= 0) {
      syncCharts.splice(syncIndex, 1)
    }
    for (const [k, v] of Object.entries(this.bindEvents)) {
      v.el.removeEventListener(k, v.handler)
    }
    this.container.innerHTML = ''
  }

  getColor (value: number) {
    let min = this.opt.zStart!
    let max = this.opt.zEnd!
    if (this.opt.logarithmicColorScale) {
      if (value !== 0) {
        value = Math.log2(value)
      }
      if (min !== 0) {
        min = Math.log2(min)
      }
      if (max !== 0) {
        max = Math.log2(max)
      }
    }
    const cs = this.opt.colorScale!
    // v = this.getRatio(v, this.opt.zStart, this.opt.zEnd)
    const v = this.getRatio(value, min, max)

    if (v <= cs[0][0]) {
      return this.toRGB(cs[0][1])
    } else if (v >= cs.slice(-1)[0][0]) {
      return this.toRGB(cs.slice(-1)[0][1])
    }
    let i = 0
    while (cs[i][0] < v) {
      i++
    }
    const color = []
    const r = this.getRatio(v, cs[i - 1][0], cs[i][0])
    for (let j = 0; j < cs[0][1].length; j++) {
      color.push(cs[i - 1][1][j] + r * (cs[i][1][j] - cs[i - 1][1][j]))
    }
    return this.toRGB(color as [number, number, number])
  }

  getGradient () {
    const result: [number, string][] = [
      [0, this.getColor(this.disp.yStart!)]
    ]
    for (const c of this.opt.colorScale!) {
      const v = this.opt.zStart! + (this.opt.zEnd! - this.opt.zStart!) * c[0]
      if (v > this.disp.yStart! && v < this.disp.yEnd!) {
        result.push([this.getRatio(v, this.disp.yStart!, this.disp.yEnd!), this.toRGB(c[1])])
      }
    }
    result.push([1, this.getColor(this.disp.yEnd!)])
    // console.log(result);
    return result
  }

  addData (data: (number | null)[], redraw = false) {
    if (this.opt.type === 'line') {
      if (this.opt.data instanceof Array) {
        const currData = this.opt.data as (number | null)[]
        this.opt.data = currData.concat(data)
        this.opt.xEnd = this.disp.xEnd = this.opt.xStart + this.getDataLength() * this.opt.xStep
      }
    }
    if (redraw) {
      this.draw()
    }
  }

  addVLine (vline: VLine, redraw = true) {
    const vLineClone = Object.assign({}, vLineDefault)
    this.opt.vLines.push(Object.assign(vLineClone, vline))
    if (redraw) {
      this.draw()
    }
  }

  drawVLines () {
    const o = this.opt
    const ctx = this.ctx!
    const pad = 4
    ctx.save()
    ctx.font = `${o.fontSize}px sans-serif`
    for (const vLine of o.vLines) {
      if (vLine.display && vLine.x >= this.disp.xStart && vLine.x <= this.disp.xEnd) {
        const pos = this.getXPos(vLine.x)
        const yPos = (
          vLine.position === 'top'
            ? pad
            : vLine.position === 'middle'
              ? (o.height - o.xAxisHeight) / 2
              : (o.height - o.xAxisHeight) - pad
        )
        const clearRectYPos = (
          vLine.position === 'top'
            ? yPos - pad / 2
            : vLine.position === 'middle'
              ? yPos - (o.fontSize + pad) / 2
              : yPos - o.fontSize - pad / 2
        )
        ctx.textBaseline = vLine.position
        ctx.strokeStyle = vLine.color!
        ctx.fillStyle = vLine.color!
        ctx.lineWidth = vLine.width!
        ctx.beginPath()
        ctx.moveTo(pos + 0.5, 0)
        ctx.lineTo(pos + 0.5, o.height! - o.xAxisHeight!)
        ctx.stroke()
        const textSize = ctx.measureText(vLine.name!)
        ctx.clearRect(pos + pad / 2, clearRectYPos, textSize.width + pad, o.fontSize! + pad)
        ctx.fillText(vLine.name!, pos + pad, yPos)
      }
    }
    ctx.restore()
  }

  drawCrosshair (xValue: number | null) {
    if (!this.opt.crosshair) {
      return
    }
    const ctx = this.ctx2!
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    if (xValue != null && xValue >= this.disp.xStart) {
      const xPos = this.getXPosFromIndex(this.getIndexFromXValue(xValue))
      if (xPos != null) {
        ctx.fillStyle = this.opt.textColor
        ctx.fillRect(xPos, 0, 1, this.opt.height - this.opt.xAxisHeight)
      }
    }
  }

  drawCategoryTooltip (xValue: number) {
    const o = this.opt
    const ctx = this.ctx2!
    const i = this.getIndexFromXValue(xValue)
    const xPos = this.getXPosFromIndex(i)
    if (xPos == null) {
      return
    }
    const [m, b, p, f] = [8, 1, 3, o.fontSize]// [margin, border, padding, fontSize]
    const txt = [
      new Date(o.xStart + o.xStep * i).toISOString().replace(/[TZ]/g, ' ')
    ]
    if (o.categoryTooltipValues) {
      const data = o.data as (number | null)[][]
      for (const [index, category] of o.categories!.entries()) {
        const value = data[index][i]
        txt.push(`${category}: ${value == null ? '' : o.tooltipFormatter!(value)}`)
      }
    }
    const boxHeight = 2 * b + txt.length * (p + f) + p
    const boxY = Math.max(0, (o.height - o.xAxisHeight - boxHeight) / 2)
    ctx.save()
    ctx.font = `${o.fontSize}px sans-serif`
    const boxWidth = 2 * b + 2 * p + Math.max.apply(null, txt.map(t => ctx.measureText(t).width))
    const boxX = xPos > o.yAxisWidth + o.width / 2 ? xPos - m - boxWidth : xPos + m
    ctx.strokeStyle = o.textColor
    ctx.fillStyle = 'white'
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight)
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight)
    ctx.fillStyle = o.textColor
    let currY = boxY + p + f
    for (const t of txt) {
      ctx.fillText(t, boxX + b + p, currY)
      currY += p + f
    }
    ctx.restore()
  }

  drawTooltip (xValue: number | null) {
    const o = this.opt
    if (xValue == null || (o.type === 'heatmap' && o.categories == null)) {
      return
    }
    if (o.type === 'heatmap' && o.categories != null) {
      return this.drawCategoryTooltip(xValue)
    }
    const ctx = this.ctx2!
    const i = this.getIndexFromXValue(xValue)
    if (i < 0) {
      return
    }
    const xPos = this.getXPosFromIndex(i)

    // prepare yValues and handle multi series
    const data = (o.data instanceof Array ? { _: { data: o.data, enabled: true } } : o.data) as LichenMultiLineData
    const yValues: StringIndexedObject = {}
    const keys = Object.keys(data)
    for (const [keyIndex, k] of keys.entries()) {
      if (!data[k].enabled) {
        continue
      }
      const yValue = data[k].data[i]
      let yPos = yValue != null && o.type !== 'timing' ? this.getYPos(yValue as number) : null
      if (yPos != null && o.stacked) {
        let yPosValue = yValue as number
        for (let j = keyIndex + 1; j < keys.length; j++) {
          if (data[keys[j]].enabled) {
            yPosValue += data[keys[j]].data[i] as number
          }
        }
        yPos = this.getYPos(yPosValue)
      }
      yValues[k] = {
        value: yValue,
        yPos,
        key: k !== '_' ? `${k} : ` : '',
        strValue: yValue != null ? `${o.tooltipFormatter!(yValue as number)} ${o.units}` : 'null',
        color: k === '_' ? o.color : data[k].color
      }
      if (yValue !== null && o.type === 'timing') {
        const cat = o.categories as { key: string; label: string; }[]
        yValues[k].strValue = cat.find(x => x.key === yValue)!.label as string
      }
    }

    // leave if there is nothing to display
    if (xPos == null || Object.values(yValues).filter(x => x.value != null).length === 0) {
      return
    }

    ctx.save()

    // draw point for all series
    for (const v of Object.values(yValues)) {
      ctx.lineWidth = 2
      ctx.strokeStyle = v.color != null ? v.color : this.getColor(v.value)
      ctx.fillStyle = 'white'
      if (v.yPos == null) {
        continue
      }
      ctx.beginPath()
      ctx.ellipse(xPos, v.yPos, 3, 3, 0, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
    }

    // compute box position and size
    const [m, b, p, f] = [8, 1, 3, o.fontSize] // [margin, border, padding, fontSize]
    const nbSeries = Object.keys(yValues).length
    const boxHeight = 2 * b + (1 + nbSeries) * f + (2 + nbSeries) * p
    let boxY
    if (o.type !== 'timing' && o.data instanceof Array) {
      const yPos = yValues._.yPos
      boxY = yPos > (o.height / 2) ? yPos - m - boxHeight : yPos + m
    } else {
      boxY = (o.height - boxHeight - o.xAxisHeight) / 2
    }
    ctx.font = `bold ${o.fontSize}px sans-serif`
    const tooltipDate = new Date(o.xStart + o.xStep * i)
    const txtTime = o.displayDateInTooltip ? tooltipDate.toISOString().replace(/[TZ]/g, ' ') : tooltipDate.toISOString().slice(11, -1)
    const boxWidth = 2 * b + 2 * p + Math.max(
      ctx.measureText(txtTime).width,
      Math.max.apply(null, Object.values(yValues).map(x => ctx.measureText(`${x.key}${x.strValue}`).width))
    )
    let boxX
    if (o.type !== 'timing' && o.data instanceof Array) {
      boxX = xPos - Math.floor(boxWidth / 2)
      if (boxX < o.yAxisWidth) {
        boxX = o.yAxisWidth
      } else if (boxX + boxWidth > o.width) {
        boxX = o.width - boxWidth - 1
      }
    } else {
      boxX = xPos < o.width / 2 ? xPos + m : xPos - m - boxWidth
    }
    // const txtX = boxX + Math.floor(boxWidth / 2)
    const txtX = boxX + b + p

    // draw tooltip
    ctx.lineWidth = b
    ctx.beginPath()
    ctx.rect(boxX, boxY, boxWidth, boxHeight)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = o.textColor
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.fillText(txtTime, txtX, boxY + b + p + f)
    ctx.font = `bold ${o.fontSize}px sans-serif`
    let txtY = boxY + b + 2 * p + 2 * f
    const sortedByValues = Object.entries(yValues)
    if (!o.stacked) {
      sortedByValues.sort((a, b) => {
        a = a[1].value
        b = b[1].value
        return a < b ? 1 : a > b ? -1 : 0
      })
    }
    for (const x of sortedByValues) {
      ctx.fillStyle = x[1].color
      ctx.fillText(x[1].key, txtX, txtY)
      ctx.fillStyle = o.textColor
      ctx.fillText(x[1].strValue, txtX + ctx.measureText(x[1].key).width, txtY)
      txtY += p + f
    }
    ctx.restore()
  }

  drawColorScale () {
    const o = this.opt
    const ctx = this.ctx3!
    const w = 300
    const x1 = Math.floor(o.width / 2 - w / 2)
    const minValue = o.logarithmicColorScale && o.zStart !== 0 ? Math.log2(o.zStart!) : o.zStart!
    const maxValue = o.logarithmicColorScale ? Math.log2(o.zEnd!) : o.zEnd!
    const grad = ctx.createLinearGradient(x1, 0, x1 + w, 0)
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.textAlign = 'center'
    ctx.strokeStyle = o.textColor
    ctx.fillStyle = o.textColor
    for (const [i, stop] of o.colorScale!.entries()) {
      let x = Math.floor(x1 + stop[0] * w)
      let v: (number | string) = minValue + (maxValue - minValue) * stop[0]
      if (o.logarithmicColorScale && v !== 0) {
        v = Math.round(Math.pow(2, v))
      }
      if (stop.length === 3) {
        v = stop[2] as (number | string)
        const r = i / (o.colorScale!.length - 1)
        x = x1 + w * r
        grad.addColorStop(r, this.toRGB(stop[1]))
      } else {
        grad.addColorStop(stop[0], this.toRGB(stop[1]))
      }
      ctx.fillRect(x, 20, 1, 4)
      ctx.fillText(`${v}`, x, 38)
    }
    ctx.fillStyle = grad
    ctx.fillRect(x1, 10, w, 10)
    ctx.strokeRect(x1 + 0.5, 9.5, w, 11)
  }

  drawXAxis () {
    const o = this.opt
    const ctx = this.ctx!
    ctx.save()
    const width = o.width - o.yAxisWidth
    const yPos = o.height - o.xAxisHeight
    const scales = [
      31536000e3, 15768000e3, // >/= 6 months
      4838400e3, 2419200e3, 604800e3, // >/= 7days
      172800e3, 86400e3, // >/= 1 day
      43200e3, 21600e3, 14400e3, 7200e3, 3600e3, // >/= 1 hour
      1800e3, 600e3, 300e3, 120e3, 60e3, // >/= 1 minute
      30e3, 10e3, 5e3, 2e3, 1e3, // >/= 1 seconde
      500, 200, 100 // < 1 seconde
    ]
    let i = 0
    let a = scales[0]
    const d = new Date()
    const tickInterval = 60 * (this.disp.xEnd - this.disp.xStart) / width
    while (tickInterval < scales[i]) {
      a = scales[i++]
    }
    ctx.textAlign = 'center'
    ctx.fillStyle = o.textColor
    ctx.fillRect(this.getXPos(this.disp.xStart), yPos, width, 1)
    let j = this.disp.xStart - (this.disp.xStart % a) + a
    while (j < this.disp.xEnd) {
      d.setTime(j)
      const xPos = this.getXPos(j)
      const tickText = (
        (j % 86400e3) === 0
          ? d.getDate() + '/' + (d.getMonth() + 1)
          : (j % 3600e3) === 0
              ? d.getUTCHours() + 'h'
              : (j % 600e3) === 0
                  ? d.toISOString().substr(11, 5)
                  : (j % 1e3) === 0
                      ? d.toISOString().substr(11, 8)
                      : (j % 100) === 0 ? d.toISOString().substr(11, 10) : ''
      )
      if ((j % 86400e3) === 0) {
        ctx.font = `bold ${o.fontSize + 2}px sans-serif`
      } else {
        ctx.font = `${o.fontSize}px sans-serif`
      }
      ctx.fillStyle = o.gridColor
      ctx.fillRect(xPos, 0, 1, yPos)
      ctx.fillStyle = o.textColor
      ctx.fillRect(xPos, yPos, 1, 4)
      ctx.fillText(tickText, xPos, yPos + o.fontSize + o.fontSize)
      j += a
    }
    ctx.restore()
  }

  drawYAxis () {
    const o = this.opt
    const ctx = this.ctx!
    ctx.save()
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    ctx.fillStyle = o.textColor
    const height = o.height - o.xAxisHeight
    const xPos = this.getXPos(this.disp.xStart) - 1
    let a = o.fontSize * 2 * (this.disp.yEnd! - this.disp.yStart!) / height
    let pow = 0
    if (a === 0) {
      return
    }
    if (a > 10) {
      while (a >= 10) {
        a /= 10
        pow++
      }
    } else {
      while (a < 1) {
        a *= 10
        pow--
      }
    }
    a = Math.round(a) * Math.pow(10, pow)
    let y = this.disp.yStart! - (this.disp.yStart! % a)
    ctx.fillRect(xPos, 0, 1, height + 1)
    while (y < this.disp.yEnd!) {
      const yPos = this.getYPos(y)
      if (yPos - height <= 0) {
        ctx.fillStyle = o.gridColor
        ctx.fillRect(xPos, yPos, o.width - o.yAxisWidth + 1, 1)
        ctx.fillStyle = o.textColor
        ctx.fillRect(xPos - 4, yPos, 4, 1)
        const tickText = (
          o.yAxisPowerOfTen === false
            ? y.toFixed(2)
            : pow >= 9
              ? (y / 1e9).toFixed(0) + 'e9'
              : pow >= 6
                ? (y / 1e6).toFixed(0) + 'e6'
                : pow >= 3
                  ? (y / 1e3).toFixed(0) + 'e3'
                  : pow <= -9
                    ? (y * 1e9).toFixed(0) + 'e-9'
                    : pow <= -6
                      ? (y * 1e6).toFixed(0) + 'e-6'
                      : pow <= -3
                        ? (y * 1e3).toFixed(0) + 'e-3'
                        : y.toFixed(2)
        )
        ctx.fillText(tickText, xPos - 8, yPos)
      }
      y += a
    }
    ctx.restore()
  }

  drawHeatmap () {
    const ctx = this.ctx!
    const o = this.opt
    const iStart = this.getIndexFromXValue(this.disp.xStart)
    const iEnd = this.getIndexFromXValue(this.disp.xEnd)
    const width = this.opt.width - this.opt.yAxisWidth
    const height = o.height - o.xAxisHeight
    const jStart = this.getIndexFromYValue(this.disp.yStart!)
    const jEnd = this.getIndexFromYValue(this.disp.yEnd!)
    let xValuesPerPixel = (this.disp.xEnd - this.disp.xStart) / (width * o.xStep)
    let xPos = o.yAxisWidth
    let xStep = 1
    if (xValuesPerPixel < 1) {
      xStep = 1 / xValuesPerPixel
      xValuesPerPixel = 1
    }
    let yValuesPerPixel = (jEnd - jStart) / height
    let yStep = 1
    if (yValuesPerPixel < 1) {
      yStep = 1 / yValuesPerPixel
      yValuesPerPixel = 1
    }
    for (let i = iStart; i < iEnd; i += xValuesPerPixel, xPos += xStep) {
      const currGroup: (number | null)[] = []
      const data = o.data as LichenHeatmapData
      const xGroup = data.slice(i, i + xValuesPerPixel)
      let yPos = height - yStep
      for (let j = jStart; j < jEnd; j += yValuesPerPixel) {
        let sum = 0
        let count = 0
        for (const g of xGroup) {
          const yGroup = g.slice(j, j + yValuesPerPixel)
          for (const v of yGroup) {
            if (v != null) {
              sum += v
              count++
            }
          }
        }
        currGroup.push(count > 0 ? sum / count : null)
      }
      const noNull = currGroup.filter(v => v != null) as number[]
      if (noNull.length > 0) {
        // const maxValue = Math.max.apply(null, currGroup)
        // for (const v of currGroup) {
        for (const v of noNull) {
          ctx.fillStyle = this.getColor(v)
          ctx.fillRect(
            Math.floor(xPos), Math.floor(yPos),
            Math.round(xStep) + 1, Math.round(yStep) + 1
          )
          yPos -= yStep
        }
      } else {
        // no data
        // ctx.fillStyle = '#000'
        ctx.fillStyle = 'rgba(0,0,0,0)'
        ctx.fillRect(Math.floor(xPos), 0, Math.round(xStep) + 1, height)
      }
    }
  }

  drawCategoryHeatmap () {
    const ctx = this.ctx!
    const o = this.opt
    const iStart = Math.max(0, this.getIndexFromXValue(this.disp.xStart) - 2)
    const iEnd = Math.min(this.getDataLength() - 1, this.getIndexFromXValue(this.disp.xEnd) + 2)
    const width = this.opt.width - this.opt.yAxisWidth
    let xValuesPerPixel = (this.disp.xEnd - this.disp.xStart) / (width * this.opt.xStep)
    let xPos = o.yAxisWidth
    let xStep = 1
    if (xValuesPerPixel < 1) {
      xStep = 1 / xValuesPerPixel
      xValuesPerPixel = 1
    }
    const xStart = this.getXPos(o.xStart + o.xStep * iStart)
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    const cat = o.categories as string[]
    const data = o.data as (number | null)[][]
    for (const [j, c] of cat.entries()) {
      xPos = xStart
      const yPos = j * o.categoryHeight + (j + 1) * o.categoryMargin
      ctx.fillStyle = o.textColor
      ctx.fillText(c, o.yAxisWidth - 4, yPos + o.categoryHeight / 2)
      for (let i = iStart; i < iEnd; i += xValuesPerPixel, xPos += xStep) {
        let sum = 0
        let count = 0
        const group = data[j].slice(i, i + xValuesPerPixel)
        for (const v of group) {
          if (v != null) {
            sum += v
            count++
          }
        }
        if (count > 0) {
          ctx.fillStyle = this.getColor(sum / count)
          ctx.fillRect(
            Math.max(o.yAxisWidth, Math.floor(xPos)), yPos,
            Math.round(xStep) + 1, o.categoryHeight
          )
        }
      }
    }
  }

  drawTimingChart () {
    const ctx = this.ctx!
    const o = this.opt
    const iStart = Math.max(0, this.getIndexFromXValue(this.disp.xStart) - 2)
    const iEnd = Math.min(this.getDataLength() - 1, this.getIndexFromXValue(this.disp.xEnd) + 2)
    const width = this.opt.width - this.opt.yAxisWidth
    const height = this.opt.height - this.opt.xAxisHeight
    let xValuesPerPixel = (this.disp.xEnd - this.disp.xStart) / (width * this.opt.xStep)
    let xPos = o.yAxisWidth
    let xStep = 1
    if (xValuesPerPixel < 1) {
      xStep = 1 / xValuesPerPixel
      xValuesPerPixel = 1
    }
    const xStart = this.getXPos(o.xStart + o.xStep * iStart)
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    const categoryPos: StringIndexedObject = {}
    const cat = o.categories as { key: string; label: string; }[]
    for (const [i, c] of cat.entries()) {
      const yPos = i * o.categoryHeight + (i + 1) * o.categoryMargin
      categoryPos[c.key] = yPos
      ctx.fillStyle = o.textColor
      ctx.fillText(c.label, o.yAxisWidth - 4, yPos + o.categoryHeight / 2)
    }
    ctx.fillStyle = o.color
    xPos = xStart
    ctx.save()
    ctx.beginPath()
    ctx.rect(o.yAxisWidth, 0, width, height)
    ctx.closePath()
    ctx.clip()
    const data = o.data as string[]
    for (let i = iStart; i < iEnd; i += xValuesPerPixel, xPos += xStep) {
      const dataSliced = data.slice(i, i + xValuesPerPixel)
      for (const c of cat) {
        if (dataSliced.indexOf(c.key) >= 0) {
          ctx.fillRect(xPos, categoryPos[c.key], xStep, o.categoryHeight)
        }
      }
    }
    ctx.restore()
  }

  drawLine (skipDataPreparation = false) {
    const ctx = this.ctx!
    const o = this.opt
    const iStart = Math.max(0, this.getIndexFromXValue(this.disp.xStart) - 2)
    const iEnd = Math.min(this.getDataLength(), this.getIndexFromXValue(this.disp.xEnd) + 2)
    const width = o.width - o.yAxisWidth
    const height = this.opt.height - this.opt.xAxisHeight
    let xValuesPerPixel = (this.disp.xEnd - this.disp.xStart) / (width * o.xStep)
    const data = (o.data instanceof Array ? { _: { data: o.data, enabled: true } } : o.data) as { [index: string]: { data: (number | null)[]; enabled: boolean; color?: string; } }
    let xStep = 1
    if (xValuesPerPixel <= 1) {
      xStep = 1 / xValuesPerPixel
      xValuesPerPixel = 1
    }
    if (!skipDataPreparation) {
      // process data
      let minValue = null
      let maxValue = null
      const groupValue: { [index: string]: ([number, number] | null)[] } = {}
      let count = 0
      let sum = 0
      let sqSum = 0
      for (let i = iStart; i < iEnd; i += xValuesPerPixel) {
        for (const [k, v] of Object.entries(data)) {
          if (!v.enabled) {
            continue
          }
          if (groupValue[k] == null) {
            groupValue[k] = []
          }
          const g = v.data.slice(i, i + xValuesPerPixel).filter((x: (number | null)) => x != null) as number[]
          if (g.length === 0) {
            groupValue[k].push(null)
            continue
          }
          let groupMin = null
          let groupMax = null
          for (const v of g) {
            groupMin = groupMin == null ? v : Math.min(groupMin, v)
            groupMax = groupMax == null ? v : Math.max(groupMax, v)
            sqSum += v * v
            sum += v
            count++
          }
          minValue = minValue == null ? groupMin : Math.min(minValue, groupMin!)
          maxValue = maxValue == null ? groupMax : Math.max(maxValue, groupMax!)
          groupValue[k].push([groupMin!, groupMax!])
        }
      }

      const avg = sum / count
      if (Object.keys(data).length === 1) {
        this.dispStats.min = minValue
        this.dispStats.max = maxValue
        this.dispStats.avg = avg
        this.dispStats.rms = Math.sqrt((sqSum - 2 * avg * sum + count * avg * avg) / count)
      }

      if (o.stacked) {
        const keys = Object.keys(groupValue)
        for (const [keyIndex, k] of keys.entries()) {
          for (const [i, g] of groupValue[k].entries()) {
            if (g != null) {
              let [stackedValueMin, stackedValueMax] = g
              for (let j = keyIndex + 1; j < keys.length; j++) {
                const currGroup = groupValue[keys[j]][i]
                stackedValueMin += currGroup![0]
                stackedValueMax += currGroup![1]
                maxValue = Math.max(maxValue!, stackedValueMax)
              }
              g[0] = stackedValueMin
              g[1] = stackedValueMax
            }
          }
        }
      }
      if (o.fixedMin != null) {
        minValue = o.fixedMin
      }
      if (o.fixedMax != null) {
        maxValue = o.fixedMax
      }
      let amplitude = maxValue! - minValue!
      if (amplitude === 0) {
        amplitude = 0.1
      }
      this.disp.yStart = o.fixedMin != null ? minValue! : minValue! - amplitude * 0.1
      this.disp.yEnd = o.fixedMax != null ? maxValue! : maxValue! + amplitude * 0.1
      this.groupValue = groupValue
    }
    if (o.syncScale) {
      let maxAmp = this.dispStats.max! - this.dispStats.min!
      let wait = false
      // check that all charts are ready
      for (const chart of o.syncCharts()) {
        if (chart === this) {
          continue
        }
        if (chart.dispStats.min == null || chart.dispStats.max == null) {
          wait = true
          break
        }
        maxAmp = Math.max(maxAmp, chart.dispStats.max - chart.dispStats.min)
      }
      if (wait) {
        console.log(o.title, 'Not all charts are ready, waiting 50 ms...')
        setTimeout(() => {
          this.drawLine(true)
        }, 50)
        return
      }
      const mid = (this.dispStats.min! + this.dispStats.max!) / 2
      this.disp.yStart = mid - maxAmp / 2 - maxAmp * 0.1
      this.disp.yEnd = mid + maxAmp / 2 + maxAmp * 0.1
    }

    this.drawYAxis()

    ctx.lineWidth = this.opt.lineWidth
    ctx.lineCap = 'round'

    ctx.save()
    ctx.beginPath()
    ctx.rect(o.yAxisWidth, 0, width, height)
    ctx.closePath()
    ctx.clip()

    let xPos = this.getXPos(o.xStart + o.xStep * iStart)

    if (o.data instanceof Array) { // in single serie only
      // compute gradient or set fixed color for area and line
      if (o.color != null) {
        ctx.strokeStyle = o.color
        if (o.area) {
          ctx.fillStyle = o.color.replace('rgb', 'rgba').replace(')', ', 0.2)')
        }
      } else {
        const strokeGrad = ctx.createLinearGradient(0, height, 0, 0)
        for (const c of this.getGradient()) {
          strokeGrad.addColorStop(c[0], c[1])
        }
        ctx.strokeStyle = strokeGrad
        if (o.area) {
          const fillGrad = ctx.createLinearGradient(0, height, 0, 0)
          for (const c of this.getGradient()) {
            fillGrad.addColorStop(c[0], c[1].replace('rgb', 'rgba').replace(')', ', 0.2)'))
          }
          ctx.fillStyle = fillGrad
        }
      }
    }

    // draw area
    if (o.area) {
      for (const [k, v] of Object.entries(this.groupValue)) {
        if (data[k].color != null) {
          if (data[k].color!.indexOf('rgb') === 0) {
            ctx.fillStyle = data[k].color!.replace('rgb', 'rgba').replace(')', `, ${o.areaFillOpacity})`)
          } else {
            ctx.fillStyle = data[k].color!
          }
        }
        xPos = this.getXPos(o.xStart + o.xStep * iStart)
        for (const [i, g] of v.entries()) {
          if (g != null) {
            if (i === 0 || v[i - 1] == null) {
              ctx.beginPath()
              ctx.moveTo(xPos, Math.min(height, this.getYPos(0)))
              ctx.lineTo(xPos, this.getYPos(g[0]))
            } else {
              ctx.lineTo(xPos, this.getYPos(g[0]))
            }
            if (xValuesPerPixel > 1) {
              ctx.lineTo(xPos, this.getYPos(g[1]))
            }
          } else {
            if (v[i - 1] != null) {
              ctx.lineTo(xPos - xStep, Math.min(height, this.getYPos(0)))
              ctx.closePath()
              ctx.fill()
            }
          }
          xPos += xStep
        }
        if (v.slice(-1)[0] != null) {
          ctx.lineTo(xPos - xStep, Math.min(height, this.getYPos(0)))
          ctx.closePath()
          ctx.fill()
        }
      }
    }

    for (const [k, v] of Object.entries(this.groupValue)) {
      // set fixed color for multi series
      if (!(o.data instanceof Array)) {
        ctx.strokeStyle = o.data[k].color!
      }

      // draw line
      xPos = this.getXPos(o.xStart + o.xStep * iStart)
      ctx.beginPath()
      for (const [i, g] of v.entries()) {
        if (g != null) {
          if (i === 0 || v[i - 1] == null) {
            ctx.moveTo(xPos, this.getYPos(g[0]))
          } else {
            ctx.lineTo(xPos, this.getYPos(g[0]))
          }
          if (xValuesPerPixel > 1) {
            ctx.lineTo(xPos, this.getYPos(g[1]))
          }
        }
        xPos += xStep
      }
      ctx.stroke()
    }
    ctx.restore()
    this.drawVLines()
  }

  debounce () {
    const d = this.debounceOpt
    const o = this.opt
    if (d.locked) {
      return
    }
    d.locked = true
    if (d.timer != null) {
      clearTimeout(d.timer)
    }
    d.timer = setTimeout(() => {
      d.refresh = true
      this.draw()
      d.refresh = false
    }, 500)
    const ctx = this.ctx!
    const [width, height] = [o.width - o.yAxisWidth, o.height - o.xAxisHeight]
    ctx.clearRect(0, 0, o.yAxisWidth, o.height)
    ctx.clearRect(0, height, o.width, o.xAxisHeight)
    const img = new Image(o.width, o.height)
    img.onload = () => {
      ctx.clearRect(0, 0, o.width, o.height)
      let [sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight] = [o.yAxisWidth, 0, width, height, o.yAxisWidth, 0, width, height]
      const xRatio = (this.disp.xEnd - this.disp.xStart) / (d.disp.xEnd - d.disp.xStart)
      const yRatio = (this.disp.yEnd! - this.disp.yStart!) / (d.disp.yEnd! - d.disp.yStart!)
      sx = Math.max(o.yAxisWidth, sx + width * this.getRatio(this.disp.xStart, d.disp.xStart, d.disp.xEnd))
      sWidth = Math.min(width, width * xRatio)
      dx = Math.max(o.yAxisWidth, dx + width * this.getRatio(d.disp.xStart, this.disp.xStart, this.disp.xEnd))
      dWidth = Math.min(width, width / xRatio)
      sy = Math.max(0, height - height * this.getRatio(this.disp.yEnd!, d.disp.yStart!, d.disp.yEnd!))
      sHeight = Math.min(height, height * yRatio)
      dy = Math.max(0, height - height * this.getRatio(d.disp.yEnd!, this.disp.yStart!, this.disp.yEnd!))
      dHeight = Math.min(height, height / yRatio)
      this.drawXAxis()
      this.drawYAxis()
      ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      d.disp = Object.assign({}, this.disp)
      d.locked = false
    }
    img.src = ctx.canvas.toDataURL()
  }

  displayStats () {
    const s = this.dispStats
    s.container!.innerHTML = `MAX: ${s.max!.toExponential(3)} | MIN: ${s.min!.toExponential(3)} | AVG: ${s.avg!.toExponential(3)} | RMS: ${s.rms!.toExponential(3)}`
  }

  draw () {
    const o = this.opt
    const d = this.debounceOpt
    if (o.debounce && d.init && !d.refresh) {
      this.debounce()
    } else {
      if (o.debounce && !d.init) {
        d.init = true
      }
      // if beforeDraw returns false the draw is not done.
      if (o.beforeDraw.call(this) !== false) {
        const ctx = this.ctx!
        ctx.clearRect(0, 0, o.width, o.height)
        this.drawXAxis()
        if (o.categories == null && o.type !== 'line') {
          // for type line, drawYAxis is called in the middle of drawLine
          this.drawYAxis()
        }
        ctx.save()
        if (o.type === 'line') {
          this.drawLine()
          if (o.displayStats && this.dispStats.avg != null) {
            this.displayStats()
          }
        } else if (o.type === 'heatmap') {
          if (o.categories == null) {
            this.drawHeatmap()
          } else {
            this.drawCategoryHeatmap()
          }
        } else if (o.type === 'timing') {
          this.drawTimingChart()
        }
        ctx.restore()
      }
      o.afterDraw.call(this)
    }
  }
}
