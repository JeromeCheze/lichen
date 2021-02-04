/* LIghtweight CHart ENgine (LiChEn) */

let defaultOptions = {
  type: 'line', // || 'heatmap' || 'timing'
  area: false, // ignored in type heatmap and with multi series
  stacked: false, // ignored in type heatmap
  categories: null, // ignored in type line

  fixedMin: null, // ignored in type heatmap
  fixedMax: null, // ignored in type heatmap

  title: '',
  colorScale: [
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
  color: null,
  areaFillOpacity: 0.5,
  logarithmicColorScale: true, // ignored in type line
  drawColorScale: true, // ignored in type line

  crosshair: false, // ignored in type heatmap

  /* style */
  width: null, // optional
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
  yAxisPowerOfTen: true,
  displayDateInTooltip: true,
  categoryTooltipValues: true,
  tooltipFormatter: x => x, // ignored in type heatmap
  units: '', // ignored in type heatmap
  reverseXZoom: false,
  reverseYZoom: false,

  vLines: [], // [{ x: <xValue>, name: '<name>', color: '<color>', width: '<width>', display: true, position: 'top|middle|bottom' }, ...]

  /*  time axis */
  xStart: null,
  xStep: null,

  /* y axis */
  yStart: null,
  yEnd: null,

  /* value */
  zStart: null,
  zEnd: null,

  debounce: false,

  beforeDraw: function () { return true },
  afterDraw: function () {},

  onDblClick: function (lichenInstance, xValue) { return true },

  syncCharts: function () { return [] },

  data: [] // { <key>: { color, data }, ... } NOTE: colorScale not available with multi series
}

let vLineDefault = { name: '', color: 'black', width: 1, display: true, position: 'top' }

export default class Lichen {
  constructor (container, opt) {
    this.container = container
    this.opt = Object.assign({ vLines: [] }, defaultOptions)
    Object.assign(this.opt, opt)
    this.opt.xEnd = this.opt.xStart + this.getDataLength() * this.opt.xStep
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
    this.initCanvas()
    this.opt.vLines = this.opt.vLines.map(vLine => {
      return Object.assign(JSON.parse(JSON.stringify(vLineDefault)), vLine)
    })
    this.draw()
  }

  getDataLength () {
    let d = this.opt.data
    return (
      this.opt.type === 'timing' ? d.length
        : this.opt.type === 'line' ? (d instanceof Array ? d.length : d[Object.keys(d)[0]].data.length)
          : this.opt.categories == null ? d.length
            : d[0].length
    )
  }

  getIndexFromXValue (x) {
    return Math.round(this.getRatio(x, this.opt.xStart, this.opt.xEnd) * this.getDataLength())
  }

  getIndexFromYValue (y) {
    return Math.floor(this.getRatio(y, this.opt.yStart, this.opt.yEnd) * this.opt.data[0].length)
  }

  getXPos (x) {
    let w = this.opt.width - this.opt.yAxisWidth
    return Math.floor(this.opt.yAxisWidth + w * this.getRatio(x, this.disp.xStart, this.disp.xEnd))
  }

  getYPos (y) {
    let h = this.opt.height - this.opt.xAxisHeight
    return Math.floor(h - h * this.getRatio(y, this.disp.yStart, this.disp.yEnd))
  }

  getXPosFromIndex (i) {
    if (i < 0 || i >= this.getDataLength()) {
      return null
    }
    let xPos = this.getXPos(this.opt.xStart + this.opt.xStep * i)
    return xPos >= this.opt.yAxisWidth ? xPos : null
  }

  getXValue (xPos) {
    return this.disp.xStart + (this.disp.xEnd - this.disp.xStart) * this.getRatio(xPos, this.opt.yAxisWidth, this.opt.width)
  }

  getYValue (yPos) {
    return this.disp.yEnd - (this.disp.yEnd - this.disp.yStart) * this.getRatio(yPos, 0, this.opt.height - this.opt.xAxisHeight)
  }

  getRatio (value, min, max) {
    return (value - min) / (max - min)
  }

  toRGB (color) {
    return `rgb(${Math.floor(color[0])},${Math.floor(color[1])},${Math.floor(color[2])})`
  }

  handleMouseDown (ev) {
    if (this.action.noMouse) {
      return
    }
    let pos = this.ctx2.canvas.getBoundingClientRect()
    // let x = ev.clientX - pos.x
    // console.log(new Date(this.getXValue(x)).toISOString());
    this.action.mouse = { x: ev.clientX - pos.x, y: ev.clientY - pos.y }
    // console.log(this.action.mouse);
  }

  handleMouseMove (ev) {
    let a = this.action
    if (a.noMouse) {
      return
    }
    let pos = this.ctx2.canvas.getBoundingClientRect()
    let x2 = ev.clientX - pos.x
    let y2 = ev.clientY - pos.y

    if (a.mouse == null) { // not dragging
      this.updateCrosshairAndTooltip(x2)
      return
    }

    // dragging
    if (this.opt.crosshair) {
      // reset crosshair (and also tooltip at the same because a clearRect is used)
      this.updateCrosshairAndTooltip(null)
    }
    let x1 = a.mouse.x
    let y1 = a.mouse.y

    if (ev.shiftKey) { // selecting area
      let ctx = this.ctx2
      ctx.save()
      let xMin = Math.max(this.opt.yAxisWidth, Math.min(x1, x2))
      let xMax = Math.max(x1, x2)
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

  updateCrosshairAndTooltip (xPos) {
    let xValue = this.getXValue(xPos)
    if (this.opt.crosshair) {
      this.drawCrosshair(xValue)
      for (let chart of this.opt.syncCharts()) {
        if (chart === this) {
          continue
        }
        chart.drawCrosshair(xValue)
      }
    }
    if (this.opt.tooltip) {
      this.drawTooltip(xValue)
    }
  }

  xPanning (value) {
    let redraw = false
    if (Math.abs(value) >= 5) {
      // panning along x axis
      let xValue = this.getXValue(0) - this.getXValue(value)
      this.setDispBounds({
        xStart: Math.max(this.opt.xStart, this.disp.xStart + xValue),
        xEnd: Math.min(this.opt.xEnd, this.disp.xEnd + xValue)
      })
      redraw = true
    }
    return redraw
  }

  yPanning (value) {
    let redraw = false
    if (Math.abs(value) >= 5) {
      // panning along y axis
      let yValue = this.getYValue(0) - this.getYValue(value)
      this.setDispBounds({
        yStart: Math.max(this.opt.yStart, this.disp.yStart + yValue),
        yEnd: Math.min(this.opt.yEnd, this.disp.yEnd + yValue)
      })
      redraw = true
    }
    return redraw
  }

  handleMouseUp (ev) {
    let a = this.action
    if (a.noMouse) {
      return
    }
    if (a.mouse == null) {
      // nothing to do if not dragging
      return
    }
    let ctx = this.ctx2
    ctx.clearRect(0, 0, this.opt.width, this.opt.height)
    if (ev.shiftKey) {
      let redraw = false
      let pos = this.ctx2.canvas.getBoundingClientRect()
      let x1 = this.getXValue(a.mouse.x)
      let x2 = this.getXValue(ev.clientX - pos.x)
      let y1 = this.getYValue(a.mouse.y)
      let y2 = this.getYValue(ev.clientY - pos.y)
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
          yStart: Math.max(Math.min(y1, y2), this.opt.yStart),
          yEnd: Math.min(Math.max(y1, y2), this.opt.yEnd)
        })
      }
      if (redraw) {
        this.draw()
      }
    }
    a.mouse = null
  }

  setDispBounds (dispBounds) {
    Object.assign(this.disp, dispBounds)
    for (let chart of this.opt.syncCharts()) {
      let redraw = false
      for (let [k, v] of Object.entries(dispBounds)) {
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

  handleMouseLeave (ev) {
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

  xZoom (zoomLevel) {
    let halfSpan = (this.disp.xEnd - this.disp.xStart) / 2
    let center = this.disp.xStart + halfSpan
    let newXStart = Math.max(this.opt.xStart, center - zoomLevel * halfSpan)
    let newXEnd = Math.min(this.opt.xEnd, center + zoomLevel * halfSpan)
    if ((newXEnd - newXStart) > (10 * this.opt.xStep)) {
      this.setDispBounds({ xStart: newXStart, xEnd: newXEnd })
      this.draw()
    }
  }

  yZoom (zoomLevel) {
    let halfSpan = (this.disp.yEnd - this.disp.yStart) / 2
    let center = this.disp.yStart + halfSpan
    this.setDispBounds({
      yStart: Math.max(this.opt.yStart, center - zoomLevel * halfSpan),
      yEnd: Math.min(this.opt.yEnd, center + zoomLevel * halfSpan)
    })
    this.draw()
  }

  handleWheel (ev) {
    if (ev.shiftKey) {
      ev.preventDefault()
      let delta = (
        Math.abs(ev.deltaY) > 1 ? ev.deltaY
          : Math.abs(ev.deltaX) > 1 ? ev.deltaX
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

  handleDblClick (ev) {
    let pos = this.ctx2.canvas.getBoundingClientRect()
    let xValue = this.getXValue(ev.clientX - pos.x)
    if (this.opt.onDblClick(this, xValue)) {
      this.resetZoom()
    }
  }

  handleTouchStart (ev) {
    this.action.noMouse = true
    let pos = this.ctx2.canvas.getBoundingClientRect()
    let a = this.action
    let now = new Date().getTime()
    if ((now - a.dbl.time) > a.dbl.threshold) {
      a.dbl.time = now
      a.dbl.count = 0
    }
    a.dbl.count++
    for (let t of ev.changedTouches) {
      if (Object.keys(a.touches).length < 2) {
        a.touches[t.identifier] = { x: t.clientX - pos.x, y: t.clientY - pos.y }
      }
    }
    let toucheKeys = Object.keys(a.touches)
    if (toucheKeys.length < 2) {
      this.updateCrosshairAndTooltip(a.touches[toucheKeys[0]].x)
    }
  }

  handleTouchMove (ev) {
    let pos = this.ctx2.canvas.getBoundingClientRect()
    let a = this.action
    let toucheKeys = Object.keys(a.touches)
    if (toucheKeys.length < 2) {
      // update crosshair and tooltip
      let t = ev.changedTouches[0]
      let xPos = t.clientX - pos.x
      // let xValue = this.getXValue(xPos)
      a.touches[toucheKeys[0]] = { x: xPos, y: t.clientY - pos.y }
      this.updateCrosshairAndTooltip(xPos)
    } else {
      ev.preventDefault()
      // handle pinch and drag
      a.dbl.count = 0
      if (this.opt.crosshair) {
        this.updateCrosshairAndTooltip(null)
      }
      let tValues = Object.entries(a.touches).map(t => ({
        id: t[0],
        x1: t[1].x,
        y1: t[1].y,
        x2: t[1].x,
        y2: t[1].y
      }))
      for (let t of ev.changedTouches) {
        let tVal = tValues.find(x => x.id === t.identifier)
        tVal.x2 = t.clientX - pos.x
        tVal.y2 = t.clientY - pos.y
      }
      let pinchX = Math.abs((tValues[1].x1 - tValues[0].x1) / (tValues[1].x2 - tValues[0].x2))
      let pinchY = Math.abs((tValues[1].y1 - tValues[0].y1) / (tValues[1].y2 - tValues[0].y2))
      let panX = ((tValues[0].x2 - tValues[0].x1) + (tValues[1].x2 - tValues[1].x1)) / 2
      let panY = ((tValues[0].y2 - tValues[0].y1) + (tValues[1].y2 - tValues[1].y1)) / 2
      let overwriteTouch = { x: false, y: false }
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
      for (let t of tValues) {
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

  handleTouchEnd (ev) {
    let a = this.action
    if (a.dbl.count === 2) {
      this.handleDblClick()
    }
    for (let t of ev.changedTouches) {
      if (a.touches[t.identifier]) {
        delete a.touches[t.identifier]
      }
    }
  }

  initCanvas () {
    let o = this.opt
    if (o.width == null) {
      o.width = this.container.clientWidth - 10
    }
    if (o.categories != null) {
      let n = o.categories.length
      o.height = o.xAxisHeight + n * o.categoryHeight + (n + 1) * o.categoryMargin
    }
    this.container.innerHTML = ''
    let titleContainer = document.createElement('div')
    let canvasContainer = document.createElement('div')
    let mainCanvas = document.createElement('canvas')
    let actionCanvas = document.createElement('canvas')
    titleContainer.innerHTML = o.title
    Object.assign(this.container.style, { background: 'white' })
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
      'mousedown': { el: actionCanvas, handler: ev => this.handleMouseDown(ev) },
      'mouseup': { el: actionCanvas, handler: ev => this.handleMouseUp(ev) },
      'mousemove': { el: actionCanvas, handler: ev => this.handleMouseMove(ev) },
      'mouseleave': { el: actionCanvas, handler: ev => this.handleMouseLeave(ev) },
      'wheel': { el: actionCanvas, handler: ev => this.handleWheel(ev) },
      'dblclick': { el: actionCanvas, handler: ev => this.handleDblClick(ev) },
      'touchstart': { el: actionCanvas, handler: ev => this.handleTouchStart(ev) },
      'touchend': { el: actionCanvas, handler: ev => this.handleTouchEnd(ev) },
      'touchmove': { el: actionCanvas, handler: ev => this.handleTouchMove(ev) }
    }
    for (let [k, v] of Object.entries(this.bindEvents)) {
      v.el.addEventListener(k, v.handler)
    }
    if (o.type === 'heatmap' && o.drawColorScale) {
      let colorCanvas = document.createElement('canvas')
      Object.assign(colorCanvas, { width: o.width, height: 40 })
      this.container.appendChild(colorCanvas)
      this.ctx3 = colorCanvas.getContext('2d')
      this.drawColorScale()
    }
    if (!(o.data instanceof Array)) {
      let legendContainer = document.createElement('div')
      Object.assign(legendContainer.style, { textAlign: 'center', fontSize: `${o.legendFontSize}px` })
      for (let [k, v] of Object.entries(o.data)) {
        v.enabled = true
        let colorBox = document.createElement('span')
        Object.assign(colorBox.style, {
          border: `1px solid ${o.textColor}`, borderRadius: '4px',
          background: v.color, padding: '0 15px', margin: '5px 5px 5px 25px',
          cursor: 'pointer'
        })
        let valueLabel = document.createElement('span')
        valueLabel.innerHTML = k
        colorBox.addEventListener('click', ev => {
          v.enabled = !v.enabled
          colorBox.style.background = v.enabled ? v.color : '#ddd'
          valueLabel.style.color = v.enabled ? '#000' : '#888'
          this.draw()
        })
        legendContainer.appendChild(colorBox)
        legendContainer.appendChild(valueLabel)
      }
      this.container.appendChild(legendContainer)
    }
  }

  destroy () {
    for (let [k, v] of Object.entries(this.bindEvents)) {
      v.el.removeEventListener(k, v.handler)
    }
    this.container.innerHTML = ''
  }

  getColor (value) {
    let min = this.opt.zStart
    let max = this.opt.zEnd
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
    let cs = this.opt.colorScale
    // v = this.getRatio(v, this.opt.zStart, this.opt.zEnd)
    let v = this.getRatio(value, min, max)

    if (v <= cs[0][0]) {
      return this.toRGB(cs[0][1])
    } else if (v >= cs.slice(-1)[0][0]) {
      return this.toRGB(cs.slice(-1)[0][1])
    }
    let i = 0
    while (cs[i][0] < v) {
      i++
    }
    let color = []
    let r = this.getRatio(v, cs[i - 1][0], cs[i][0])
    for (let j = 0; j < cs[0][1].length; j++) {
      color.push(cs[i - 1][1][j] + r * (cs[i][1][j] - cs[i - 1][1][j]))
    }
    return this.toRGB(color)
  }

  getGradient () {
    let result = [
      [0, this.getColor(this.disp.yStart)]
    ]
    for (let c of this.opt.colorScale) {
      let v = this.opt.zStart + (this.opt.zEnd - this.opt.zStart) * c[0]
      if (v > this.disp.yStart && v < this.disp.yEnd) {
        result.push([this.getRatio(v, this.disp.yStart, this.disp.yEnd), this.toRGB(c[1])])
      }
    }
    result.push([1, this.getColor(this.disp.yEnd)])
    // console.log(result);
    return result
  }

  addData (data, redraw = false) {
    if (this.opt.type === 'line') {
      if (this.opt.data instanceof Array) {
        this.opt.data = this.opt.data.concat(data)
        this.opt.xEnd = this.disp.xEnd = this.opt.xStart + this.getDataLength() * this.opt.xStep
      }
    }
    if (redraw) {
      this.draw()
    }
  }

  addVLine (vline, redraw = true) {
    let vLineClone = Object.assign({}, vLineDefault)
    this.opt.vLines.push(Object.assign(vLineClone, vline))
    if (redraw) {
      this.draw()
    }
  }

  drawVLines () {
    let o = this.opt
    let ctx = this.ctx
    let pad = 4
    ctx.save()
    ctx.font = `${o.fontSize}px sans-serif`
    for (let vLine of o.vLines) {
      if (vLine.display && vLine.x >= this.disp.xStart && vLine.x <= this.disp.xEnd) {
        let pos = this.getXPos(vLine.x)
        let yPos = (
          vLine.position === 'top' ? pad
            : vLine.position === 'middle' ? (o.height - o.xAxisHeight) / 2
              : (o.height - o.xAxisHeight) - pad
        )
        let clearRectYPos = (
          vLine.position === 'top' ? yPos - pad / 2
            : vLine.position === 'middle' ? yPos - (o.fontSize + pad) / 2
              : yPos - o.fontSize - pad / 2
        )
        ctx.textBaseline = vLine.position
        ctx.strokeStyle = vLine.color
        ctx.fillStyle = vLine.color
        ctx.lineWidth = vLine.width
        ctx.beginPath()
        ctx.moveTo(pos + 0.5, 0)
        ctx.lineTo(pos + 0.5, o.height - o.xAxisHeight)
        ctx.stroke()
        let textSize = ctx.measureText(vLine.name)
        ctx.clearRect(pos + pad / 2, clearRectYPos, textSize.width + pad, o.fontSize + pad)
        ctx.fillText(vLine.name, pos + pad, yPos)
      }
    }
    ctx.restore()
  }

  drawCrosshair (xValue) {
    if (!this.opt.crosshair) {
      return
    }
    let ctx = this.ctx2
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    if (xValue != null && xValue >= this.disp.xStart) {
      let xPos = this.getXPosFromIndex(this.getIndexFromXValue(xValue))
      if (xPos != null) {
        ctx.fillStyle = this.opt.textColor
        ctx.fillRect(xPos, 0, 1, this.opt.height - this.opt.xAxisHeight)
      }
    }
  }

  drawCategoryTooltip (xValue) {
    let o = this.opt
    let ctx = this.ctx2
    let i = this.getIndexFromXValue(xValue)
    let xPos = this.getXPosFromIndex(i)
    if (xPos == null) {
      return
    }
    let [m, b, p, f] = [8, 1, 3, o.fontSize]// [margin, border, padding, fontSize]
    let txt = [
      new Date(o.xStart + o.xStep * i).toISOString().replace(/[TZ]/g, ' ')
    ]
    if (o.categoryTooltipValues) {
      for (let [index, category] of o.categories.entries()) {
        let value = o.data[index][i]
        txt.push(`${category}: ${value == null ? '' : o.tooltipFormatter(value)}`)
      }
    }
    let boxHeight = 2 * b + txt.length * (p + f) + p
    let boxY = Math.max(0, (o.height - o.xAxisHeight - boxHeight) / 2)
    ctx.save()
    ctx.font = `${o.fontSize}px sans-serif`
    let boxWidth = 2 * b + 2 * p + Math.max.apply(null, txt.map(t => ctx.measureText(t).width))
    let boxX = xPos > o.yAxisWidth + o.width / 2 ? xPos - m - boxWidth : xPos + m
    ctx.strokeStyle = o.textColor
    ctx.fillStyle = 'white'
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight)
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight)
    ctx.fillStyle = o.textColor
    let currY = boxY + p + f
    for (let t of txt) {
      ctx.fillText(t, boxX + b + p, currY)
      currY += p + f
    }
    ctx.restore()
  }

  drawTooltip (xValue) {
    let o = this.opt
    if (xValue == null || (o.type === 'heatmap' && o.categories == null)) {
      return
    }
    if (o.type === 'heatmap' && o.categories != null) {
      return this.drawCategoryTooltip(xValue)
    }
    let ctx = this.ctx2
    let i = this.getIndexFromXValue(xValue)
    let xPos = this.getXPosFromIndex(i)

    // prepare yValues and handle multi series
    let data = o.data instanceof Array ? { _: { data: o.data } } : o.data
    let yValues = {}
    let keys = Object.keys(data)
    for (let [keyIndex, k] of keys.entries()) {
      let yValue = data[k].data[i]
      let yPos = yValue != null && o.type !== 'timing' ? this.getYPos(yValue) : null
      if (yPos != null && o.stacked) {
        let yPosValue = yValue
        for (let j = keyIndex + 1; j < keys.length; j++) {
          yPosValue += data[keys[j]].data[i]
        }
        yPos = this.getYPos(yPosValue)
      }
      yValues[k] = {
        value: yValue,
        yPos,
        key: k !== '_' ? `${k} : ` : '',
        strValue: yValue != null ? `${o.tooltipFormatter(yValue)} ${o.units}` : 'null',
        color: k === '_' ? o.color : data[k].color
      }
      if (yValue !== null && o.type === 'timing') {
        yValues[k].strValue = o.categories.find(x => x.key === yValue).label
      }
    }

    // leave if there is nothing to display
    if (xPos == null || Object.values(yValues).filter(x => x.value != null).length === 0) {
      return
    }

    ctx.save()

    // draw point for all series
    for (let v of Object.values(yValues)) {
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
    let [m, b, p, f] = [8, 1, 3, o.fontSize] // [margin, border, padding, fontSize]
    let nbSeries = Object.keys(yValues).length
    let boxHeight = 2 * b + (1 + nbSeries) * f + (2 + nbSeries) * p
    let boxY
    if (o.type !== 'timing' && o.data instanceof Array) {
      let yPos = yValues._.yPos
      boxY = yPos > (o.height / 2) ? yPos - m - boxHeight : yPos + m
    } else {
      boxY = (o.height - boxHeight - o.xAxisHeight) / 2
    }
    ctx.font = `bold ${o.fontSize}px sans-serif`
    let tooltipDate = new Date(o.xStart + o.xStep * i)
    let txtTime = o.displayDateInTooltip ? tooltipDate.toISOString().replace(/[TZ]/g, ' ') : tooltipDate.toISOString().slice(11, -1)
    let boxWidth = 2 * b + 2 * p + Math.max(
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
    // let txtX = boxX + Math.floor(boxWidth / 2)
    let txtX = boxX + b + p

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
    let sortedByValues = Object.entries(yValues)
    if (!o.stacked) {
      sortedByValues.sort((a, b) => {
        a = a[1].value
        b = b[1].value
        return a < b ? 1 : a > b ? -1 : 0
      })
    }
    for (let x of sortedByValues) {
      ctx.fillStyle = x[1].color
      ctx.fillText(x[1].key, txtX, txtY)
      ctx.fillStyle = o.textColor
      ctx.fillText(x[1].strValue, txtX + ctx.measureText(x[1].key).width, txtY)
      txtY += p + f
    }
    ctx.restore()
  }

  drawColorScale () {
    let o = this.opt
    let ctx = this.ctx3
    let w = 300
    let x1 = Math.floor(o.width / 2 - w / 2)
    let minValue = o.logarithmicColorScale && o.zStart !== 0 ? Math.log2(o.zStart) : o.zStart
    let maxValue = o.logarithmicColorScale ? Math.log2(o.zEnd) : o.zEnd
    let grad = ctx.createLinearGradient(x1, 0, x1 + w, 0)
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.textAlign = 'center'
    ctx.strokeStyle = o.textColor
    ctx.fillStyle = o.textColor
    for (let [i, stop] of o.colorScale.entries()) {
      let x = Math.floor(x1 + stop[0] * w)
      let v = minValue + (maxValue - minValue) * stop[0]
      if (o.logarithmicColorScale && v !== 0) {
        v = Math.round(Math.pow(2, v))
      }
      if (stop.length === 3) {
        v = stop[2]
        let r = i / (o.colorScale.length - 1)
        x = x1 + w * r
        grad.addColorStop(r, this.toRGB(stop[1]))
      } else {
        grad.addColorStop(stop[0], this.toRGB(stop[1]))
      }
      ctx.fillRect(x, 20, 1, 4)
      ctx.fillText(v, x, 38)
    }
    ctx.fillStyle = grad
    ctx.fillRect(x1, 10, w, 10)
    ctx.strokeRect(x1 + 0.5, 9.5, w, 11)
  }

  drawXAxis () {
    let o = this.opt
    let ctx = this.ctx
    ctx.save()
    let width = o.width - o.yAxisWidth
    let yPos = o.height - o.xAxisHeight
    let scales = [
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
    let d = new Date()
    let tickInterval = 80 * (this.disp.xEnd - this.disp.xStart) / width
    while (tickInterval < scales[i]) {
      a = scales[i++]
    }
    ctx.textAlign = 'center'
    ctx.fillStyle = o.textColor
    ctx.fillRect(this.getXPos(this.disp.xStart), yPos, width, 1)
    let j = this.disp.xStart - (this.disp.xStart % a) + a
    while (j < this.disp.xEnd) {
      d.setTime(j)
      let xPos = this.getXPos(j)
      let tickText = (
        (j % 86400e3) === 0 ? d.getDate() + '/' + (d.getMonth() + 1)
          : (j % 3600e3) === 0 ? d.getUTCHours() + 'h'
            : (j % 600e3) === 0 ? d.toISOString().substr(11, 5)
              : (j % 1e3) === 0 ? d.toISOString().substr(11, 8)
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
    let o = this.opt
    let ctx = this.ctx
    ctx.save()
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    ctx.fillStyle = o.textColor
    let height = o.height - o.xAxisHeight
    let xPos = this.getXPos(this.disp.xStart) - 1
    let a = o.fontSize * 2 * (this.disp.yEnd - this.disp.yStart) / height
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
    let y = this.disp.yStart - (this.disp.yStart % a)
    ctx.fillRect(xPos, 0, 1, height + 1)
    while (y < this.disp.yEnd) {
      let yPos = this.getYPos(y)
      if (yPos - height <= 0) {
        ctx.fillStyle = o.gridColor
        ctx.fillRect(xPos, yPos, o.width - o.yAxisWidth + 1, 1)
        ctx.fillStyle = o.textColor
        ctx.fillRect(xPos - 4, yPos, 4, 1)
        let tickText = (
          o.yAxisPowerOfTen === false ? y.toFixed(2)
            : pow > 4 ? (y / 1e6).toFixed(Math.abs(6 - pow)) + 'e6'
              : pow >= 3 ? (y / 1e3).toFixed(Math.abs(3 - pow)) + 'e3'
                : y.toFixed(2)
        )
        ctx.fillText(tickText, xPos - 8, yPos)
      }
      y += a
    }
    ctx.restore()
  }

  drawHeatmap () {
    let ctx = this.ctx
    let o = this.opt
    let iStart = this.getIndexFromXValue(this.disp.xStart)
    let iEnd = this.getIndexFromXValue(this.disp.xEnd)
    let width = this.opt.width - this.opt.yAxisWidth
    let height = o.height - o.xAxisHeight
    let jStart = this.getIndexFromYValue(this.disp.yStart)
    let jEnd = this.getIndexFromYValue(this.disp.yEnd)
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
      let currGroup = []
      let xGroup = o.data.slice(i, i + xValuesPerPixel)
      let yPos = height - yStep
      for (let j = jStart; j < jEnd; j += yValuesPerPixel) {
        let sum = 0
        let count = 0
        for (let g of xGroup) {
          let yGroup = g.slice(j, j + yValuesPerPixel)
          for (let v of yGroup) {
            if (v != null) {
              sum += v
              count++
            }
          }
        }
        currGroup.push(count > 0 ? sum / count : null)
      }
      let noNull = currGroup.filter(v => v != null)
      if (noNull.length > 0) {
        // let maxValue = Math.max.apply(null, currGroup)
        for (let v of currGroup) {
          ctx.fillStyle = this.getColor(v)
          ctx.fillRect(
            Math.floor(xPos), Math.floor(yPos),
            Math.round(xStep) + 1, Math.round(yStep) + 1
          )
          yPos -= yStep
        }
      } else {
        // no data
        ctx.fillStyle = '#000'
        ctx.fillRect(Math.floor(xPos), 0, Math.round(xStep) + 1, height)
      }
    }
  }

  drawCategoryHeatmap () {
    let ctx = this.ctx
    let o = this.opt
    let iStart = Math.max(0, this.getIndexFromXValue(this.disp.xStart) - 2)
    let iEnd = Math.min(this.getDataLength() - 1, this.getIndexFromXValue(this.disp.xEnd) + 2)
    let width = this.opt.width - this.opt.yAxisWidth
    let xValuesPerPixel = (this.disp.xEnd - this.disp.xStart) / (width * this.opt.xStep)
    let xPos = o.yAxisWidth
    let xStep = 1
    if (xValuesPerPixel < 1) {
      xStep = 1 / xValuesPerPixel
      xValuesPerPixel = 1
    }
    let xStart = this.getXPos(o.xStart + o.xStep * iStart)
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    for (let [j, c] of o.categories.entries()) {
      xPos = xStart
      let yPos = j * o.categoryHeight + (j + 1) * o.categoryMargin
      ctx.fillStyle = o.textColor
      ctx.fillText(c, o.yAxisWidth - 4, yPos + o.categoryHeight / 2)
      for (let i = iStart; i < iEnd; i += xValuesPerPixel, xPos += xStep) {
        let sum = 0
        let count = 0
        let group = o.data[j].slice(i, i + xValuesPerPixel)
        for (let v of group) {
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
    let ctx = this.ctx
    let o = this.opt
    let iStart = Math.max(0, this.getIndexFromXValue(this.disp.xStart) - 2)
    let iEnd = Math.min(this.getDataLength() - 1, this.getIndexFromXValue(this.disp.xEnd) + 2)
    let width = this.opt.width - this.opt.yAxisWidth
    let height = this.opt.height - this.opt.xAxisHeight
    let xValuesPerPixel = (this.disp.xEnd - this.disp.xStart) / (width * this.opt.xStep)
    let xPos = o.yAxisWidth
    let xStep = 1
    if (xValuesPerPixel < 1) {
      xStep = 1 / xValuesPerPixel
      xValuesPerPixel = 1
    }
    let xStart = this.getXPos(o.xStart + o.xStep * iStart)
    ctx.font = `${o.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'right'
    let categoryPos = {}
    for (let [i, c] of o.categories.entries()) {
      let yPos = i * o.categoryHeight + (i + 1) * o.categoryMargin
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
    for (let i = iStart; i < iEnd; i += xValuesPerPixel, xPos += xStep) {
      let dataSliced = o.data.slice(i, i + xValuesPerPixel)
      for (let c of o.categories) {
        if (dataSliced.indexOf(c.key) >= 0) {
          ctx.fillRect(xPos, categoryPos[c.key], xStep, o.categoryHeight)
        }
      }
    }
    ctx.restore()
  }

  drawLine () {
    let ctx = this.ctx

    // process data
    let o = this.opt
    let iStart = Math.max(0, this.getIndexFromXValue(this.disp.xStart) - 2)
    let iEnd = Math.min(this.getDataLength(), this.getIndexFromXValue(this.disp.xEnd) + 2)
    let width = this.opt.width - this.opt.yAxisWidth
    let height = this.opt.height - this.opt.xAxisHeight
    let xValuesPerPixel = (this.disp.xEnd - this.disp.xStart) / (width * o.xStep)
    let xStep = 1
    if (xValuesPerPixel <= 1) {
      xStep = 1 / xValuesPerPixel
      xValuesPerPixel = 1
    }
    let minValue = null
    let maxValue = null
    let groupValue = {}
    let data = o.data instanceof Array ? { _: { data: o.data } } : o.data
    for (let i = iStart; i < iEnd; i += xValuesPerPixel) {
      for (let [k, v] of Object.entries(data)) {
        if (!v.enabled) {
          continue
        }
        if (groupValue[k] == null) {
          groupValue[k] = []
        }
        let g = v.data.slice(i, i + xValuesPerPixel).filter(x => x != null)
        if (g.length === 0) {
          groupValue[k].push(null)
          continue
        }
        let groupMin = null
        let groupMax = null
        for (let v of g) {
          groupMin = groupMin == null ? v : Math.min(groupMin, v)
          groupMax = groupMax == null ? v : Math.max(groupMax, v)
        }
        minValue = minValue == null ? groupMin : Math.min(minValue, groupMin)
        maxValue = maxValue == null ? groupMax : Math.max(maxValue, groupMax)
        groupValue[k].push([groupMin, groupMax])
      }
    }
    if (o.stacked) {
      let keys = Object.keys(groupValue)
      for (let [keyIndex, k] of keys.entries()) {
        for (let [i, g] of groupValue[k].entries()) {
          if (g != null) {
            let [stackedValueMin, stackedValueMax] = g
            for (let j = keyIndex + 1; j < keys.length; j++) {
              let currGroup = groupValue[keys[j]][i]
              stackedValueMin += currGroup[0]
              stackedValueMax += currGroup[1]
              maxValue = Math.max(maxValue, stackedValueMax)
            }
            g[0] = stackedValueMin
            g[1] = stackedValueMax
          }
        }
      }
    }
    if (o.fixedMin) {
      minValue = o.fixedMin
    }
    if (o.fixedMax) {
      maxValue = o.fixedMax
    }
    let amplitude = maxValue - minValue
    if (amplitude < 1) {
      amplitude = 1
    }
    this.disp.yStart = minValue - amplitude * 0.2
    this.disp.yEnd = maxValue + amplitude * 0.2

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
        let strokeGrad = ctx.createLinearGradient(0, height, 0, 0)
        for (let c of this.getGradient()) {
          strokeGrad.addColorStop(c[0], c[1])
        }
        ctx.strokeStyle = strokeGrad
        if (o.area) {
          let fillGrad = ctx.createLinearGradient(0, height, 0, 0)
          for (let c of this.getGradient()) {
            fillGrad.addColorStop(c[0], c[1].replace('rgb', 'rgba').replace(')', ', 0.2)'))
          }
          ctx.fillStyle = fillGrad
        }
      }
    }

    // draw area
    if (o.area) {
      for (let [k, v] of Object.entries(groupValue)) {
        if (data[k].color != null) {
          if (data[k].color.indexOf('rgb') === 0) {
            ctx.fillStyle = data[k].color.replace('rgb', 'rgba').replace(')', `, ${o.areaFillOpacity})`)
          } else {
            ctx.fillStyle = data[k].color
          }
        }
        xPos = this.getXPos(o.xStart + o.xStep * iStart)
        for (let [i, g] of v.entries()) {
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

    for (let [k, v] of Object.entries(groupValue)) {
      // set fixed color for mutil series
      if (!(o.data instanceof Array)) {
        ctx.strokeStyle = o.data[k].color
      }

      // draw line
      xPos = this.getXPos(o.xStart + o.xStep * iStart)
      ctx.beginPath()
      for (let [i, g] of v.entries()) {
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
    let d = this.debounceOpt
    let o = this.opt
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
    let ctx = this.ctx
    let [width, height] = [o.width - o.yAxisWidth, o.height - o.xAxisHeight]
    ctx.clearRect(0, 0, o.yAxisWidth, o.height)
    ctx.clearRect(0, height, o.width, o.xAxisHeight)
    let img = new Image(o.width, o.height)
    img.onload = () => {
      ctx.clearRect(0, 0, o.width, o.height)
      let [sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight] = [o.yAxisWidth, 0, width, height, o.yAxisWidth, 0, width, height]
      let xRatio = (this.disp.xEnd - this.disp.xStart) / (d.disp.xEnd - d.disp.xStart)
      let yRatio = (this.disp.yEnd - this.disp.yStart) / (d.disp.yEnd - d.disp.yStart)
      sx = Math.max(o.yAxisWidth, sx + width * this.getRatio(this.disp.xStart, d.disp.xStart, d.disp.xEnd))
      sWidth = Math.min(width, width * xRatio)
      dx = Math.max(o.yAxisWidth, dx + width * this.getRatio(d.disp.xStart, this.disp.xStart, this.disp.xEnd))
      dWidth = Math.min(width, width / xRatio)
      sy = Math.max(0, height - height * this.getRatio(this.disp.yEnd, d.disp.yStart, d.disp.yEnd))
      sHeight = Math.min(height, height * yRatio)
      dy = Math.max(0, height - height * this.getRatio(d.disp.yEnd, this.disp.yStart, this.disp.yEnd))
      dHeight = Math.min(height, height / yRatio)
      this.drawXAxis()
      this.drawYAxis()
      ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      d.disp = Object.assign({}, this.disp)
      d.locked = false
    }
    img.src = ctx.canvas.toDataURL()
  }

  draw () {
    let o = this.opt
    let d = this.debounceOpt
    if (o.debounce && d.init && !d.refresh) {
      this.debounce()
    } else {
      if (o.debounce && !d.init) {
        d.init = true
      }
      // if beforeDraw returns false the draw is not done.
      if (this.opt.beforeDraw.call(this) !== false) {
        let ctx = this.ctx
        ctx.clearRect(0, 0, o.width, o.height)
        this.drawXAxis()
        if (this.opt.categories == null && this.opt.type !== 'line') {
          // for type line, drawYAxis is called in the middle of drawLine
          this.drawYAxis()
        }
        ctx.save()
        if (this.opt.type === 'line') {
          this.drawLine()
        } else if (this.opt.type === 'heatmap') {
          if (o.categories == null) {
            this.drawHeatmap()
          } else {
            this.drawCategoryHeatmap()
          }
        } else if (this.opt.type === 'timing') {
          this.drawTimingChart()
        }
        ctx.restore()
      }
      this.opt.afterDraw.call(this)
    }
  }
}
