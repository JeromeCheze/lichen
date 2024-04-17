import type { ColorScaleOptions, CrosshairOptions, Heatmap2dOptions, LineOptions, SequenceOptions, VLine, TooltipHandlerResponse } from "./types"
import MasterInterface from "./masterInterface"
import DataUtils from "./dataUtils"

export default class FrontPanel {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  master: MasterInterface;
  dataUtils: DataUtils;
  selected: VLine[];
  tooltipDiv: HTMLElement;
  state: Record<string, any>;

  constructor(
    container: HTMLElement,
    master: MasterInterface
  ) {
    master.register('FRONT_PANEL', this)
    this.master = master
    const mapOpt = master.getRegistered('CHART').opt
    this.selected = []
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.dataUtils = master.getRegistered('DATA_UTILS')
    this.canvas.width = this.dataUtils.width
    this.canvas.height = this.dataUtils.height
    this.tooltipDiv = document.createElement('div')
    Object.assign(this.tooltipDiv.style, {
      display: 'none',
      padding: '10px',
      borderRadius: '4px',
      zIndex: 3000,
      background: 'white',
      color: 'black',
      fontSize: '10px'
    })
    document.body.appendChild(this.tooltipDiv)
    Object.assign(this.canvas.style, { position: 'absolute', top: 0, right: 0, zIndex: 100 })
    container.appendChild(this.canvas)
    this.state = {
      active: false,
      cursorPos: null
    }
    this.master
      .on('click', (x) => this.handleClick(x))
      .on('active', (x) => this.handleActive(x))
      .on('cursor', (x) => this.state.cursorPos = x)
  }

  get tooltip(): boolean {
    return this.master.getRegistered('CHART').opt.tooltip
  }

  get vLines(): VLine[] {
    return this.master.getRegistered('CHART').opt.vLines
  }

  get crosshair(): CrosshairOptions {
    return this.master.getRegistered('CHART').opt.crosshair
  }

  get colorScale(): ColorScaleOptions | null {
    return this.master.getRegistered('CHART').opt.colorScale
  }

  handleActive(value: boolean) {
    this.state.active = value
    if (!value) {
      this.tooltipDiv.style.display = 'none'
    }
  }

  getDataTooltipContent(value: number) {
    const result: HTMLElement[] = []
    const content = this.master.getRegistered('PLOT').tooltipHandler(value, this.ctx) as TooltipHandlerResponse
    if (content.xValue == null) {
      return result
    }
    content.yValues.sort((a, b) => {
      const aa = a.value
      const bb = b.value
      return aa < bb ? -1 : aa > bb ? 1 : 0
    })
    const xDiv = document.createElement('div')
    Object.assign(xDiv.style, { fontWeight: 'bold' })
    const xAxis = this.master.getRegistered('X_AXIS')
    let textValue = xAxis.opt.tooltipFormatter != null
      ? xAxis.opt.tooltipFormatter(content.xValue)
      : xAxis.opt.datetime
        ? new Date(content.xValue).toISOString().replace('T', ' ').replace('Z', '')
        : content.xValue
    if (xAxis.opt.datetime) {
      xDiv.innerHTML = textValue
    } else {
      xDiv.innerHTML = `${xAxis.opt.title != null ? xAxis.opt.title : 'x'}: ${textValue}`
    }
    const serieTable = document.createElement('table')
    const serieTableBody = document.createElement('tbody')
    serieTable.appendChild(serieTableBody)
    for (const serie of content.yValues) {
      const serieDot = document.createElement('tr')
      const serieRow = document.createElement('tr')
      const serieName = document.createElement('th')
      // Object.assign(serieName.style, { color: serie.color, fontWeight: 'bold' })
      Object.assign(serieName.style, { fontWeight: 'bold' })
      serieName.innerHTML = `${serie.name}:`
      const serieValue = document.createElement('td')
      serieValue.innerHTML = serie.textValue
      serieDot.innerHTML = `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background-color:${serie.color};"></span>`
      serieRow.appendChild(serieDot)
      serieRow.appendChild(serieName)
      serieRow.appendChild(serieValue)
      serieTableBody.appendChild(serieRow)
    }
    result.push(xDiv)
    result.push(serieTable)
    return result
  }

  getVLineTooltipContent(value: number) {
    const result: HTMLElement[] = []
    const xPos = this.dataUtils.xPosFromValue(value)!
    for (const vline of this.vLines) {
      if (vline.tooltip != null) {
        const vlinePos = this.dataUtils.xPosFromValue(vline.x)!
        if (Math.abs(vlinePos - xPos) < 5) {
          const el = document.createElement('div')
          el.innerHTML = vline.tooltip
          result.push(el)
        }
      }
    }
    return result
  }

  drawTooltip(value: number) {
    const dataContent = this.tooltip ? this.getDataTooltipContent(value) : []
    const vlineContent = this.getVLineTooltipContent(value)
    if (dataContent.length === 0 && vlineContent.length === 0) {
      this.tooltipDiv.style.display = 'none'
      return
    }
    this.tooltipDiv.innerHTML = ''
    if (this.state.cursorPos.pageX > (document.body.clientWidth / 2)) {
      this.tooltipDiv.style.right = `${document.body.clientWidth - this.state.cursorPos.pageX + 50}px`
      this.tooltipDiv.style.left = 'auto'
    } else {
      this.tooltipDiv.style.left = `${this.state.cursorPos.pageX + 40}px`
      this.tooltipDiv.style.right = 'auto'
    }
    for (const el of dataContent) {
      this.tooltipDiv.appendChild(el)
    }
    for (const el of vlineContent) {
      this.tooltipDiv.appendChild(el)
    }
    Object.assign(this.tooltipDiv.style, {
      display: 'block',
      position: 'absolute',
      top: `${this.state.cursorPos.pageY + 20 - this.tooltipDiv.getBoundingClientRect().height / 2}px`,
      color: 'black'
    })
  }

  drawVLines() {
    const ctx = this.ctx
    ctx.save()
    for (const vline of this.vLines) {
      if (vline.range) {
        ctx.fillStyle = `rgba(${vline.color.slice(4, -1)}, 0.2)`
        const x0 = this.dataUtils.xPosFromValue(vline.x - vline.range[0])!
        const x1 = this.dataUtils.xPosFromValue(vline.x + vline.range[1])!
        ctx.fillRect(x0, 0, x1 - x0, this.canvas.height)
      }
      ctx.fillStyle = vline.color
      const xPos = Math.floor(this.dataUtils.xPosFromValue(vline.x)!)
      ctx.fillRect(xPos - 0.5, 0, 1, this.canvas.height)
      if (vline.arrow != null) {
        ctx.beginPath()
        if (vline.arrow === 'top') { 
          ctx.moveTo(xPos, 0)
          ctx.lineTo(xPos + 4.5, 10)
          ctx.lineTo(xPos - 4.5, 10)
        } else {
          ctx.moveTo(xPos, this.canvas.height)
          ctx.lineTo(xPos + 4.5, this.canvas.height - 10)
          ctx.lineTo(xPos - 4.5, this.canvas.height - 10)
        }
        ctx.closePath()
        ctx.fill()
      }
      if (this.selected.indexOf(vline) >= 0) {
        ctx.setLineDash([4, 1])
        ctx.strokeStyle = '#888'
        ctx.lineWidth = 1
        ctx.strokeRect(xPos - 3.5, -1, 7, this.canvas.height + 2)
      }
      if (vline.text != null) {
        ctx.font = '10px sans-serif'
        ctx.textBaseline = vline.position === 'top' ? 'top' : 'bottom'
        ctx.textAlign = 'left'
        const yPos = vline.position == null || vline.position === 'top' ? 5 : this.canvas.height - 5
        ctx.fillText(vline.text, this.dataUtils.xPosFromValue(vline.x)! + 10, yPos)
      }
    }
    ctx.restore()
  }

  handleClick(data: { xPos: number; yPos: number; x: number; y: number }) {
    this.selected = []
    for (const vline of this.vLines) {
      const vlinePos = this.dataUtils.xPosFromValue(vline.x)!
      if (vline.selectable === true && Math.abs(vlinePos - data.xPos) < 5) {
        this.selected.push(vline)
      }
    }
    this.master.send('vlineSelection', this.selected)
    this.update(data.x)
  }

  drawCrosshair(value: number) {
    const ctx = this.ctx
    let xPos = this.dataUtils.xPosFromValue(value)!
    const chart = this.master.getRegistered('CHART')
    if (chart.opt.crosshair.sticky) {
      const data = this.master.getRegistered('PLOT').dataFromXPos(xPos)
      for (const d of data) {
        if (d == null) {
          continue
        }
        xPos = d.xDataValuePos
        break
      }
    }
    ctx.save()
    ctx.fillStyle = 'grey'
    ctx.fillRect(xPos, 0, 1, this.canvas.height)
    if (this.crosshair.text !== '') {
      ctx.font = '10px sans-serif'
      ctx.textBaseline = 'top'
      ctx.textAlign = 'left'
      ctx.fillText(this.crosshair.text!, xPos + 4, 4)
    }
    ctx.restore()
  }

  selection(x: [number | null, number | null], y: [number | null, number | null]) {
    const selectionOpt = this.master.getRegistered('CHART').opt.selection
    if (selectionOpt == null) {
      return
    }
    // this.drawCrosshair(null)
    const ctx = this.ctx
    ctx.save()
    ctx.fillStyle = 'rgba(127,127,127,0.5)'
    ctx.strokeStyle = 'grey'
    if (selectionOpt === 'xy' && x[0] != null && x[1] != null && y[0] != null && y[1] != null) {
      let [x1, x2] = [this.dataUtils.xPosFromValue(x[0])!, this.dataUtils.xPosFromValue(x[1])!]
      let [y1, y2] = [this.dataUtils.yPosFromValue(y[0])!, this.dataUtils.yPosFromValue(y[1])!]
      if (x1 > x2) {
        [x1, x2] = [x2, x1]
      }
      if (y2 > y1) {
        [y1, y2] = [y2, y1]
      }
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      ctx.clearRect(x1, y2, x2 - x1, y1 - y2)
      ctx.strokeRect(x1, y2, x2 - x1, y1 - y2)
    } else if (selectionOpt.indexOf('x') >= 0 && x[0] != null && x[1] != null) {
      const [x1, x2] = [this.dataUtils.xPosFromValue(x[0])!, this.dataUtils.xPosFromValue(x[1])!]
      ctx.fillRect(0, 0, x1, this.canvas.height)
      ctx.fillRect(x2, 0, this.canvas.width - x2, this.canvas.height)
      ctx.fillStyle = 'grey'
      ctx.fillRect(x1, 0, 1, this.canvas.height)
      ctx.fillRect(x2, 0, 1, this.canvas.height)
    } else if (selectionOpt.indexOf('y') >= 0 && y[0] != null && y[1] != null) {
      const [y1, y2] = [this.dataUtils.yPosFromValue(y[0])!, this.dataUtils.yPosFromValue(y[1])!]
      ctx.fillRect(0, 0, this.canvas.width, y2)
      ctx.fillRect(0, y1, this.canvas.width, this.canvas.height - y1)
    }
    ctx.restore()
  }

  update(value: number | null) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawVLines()
    if (value != null) {
      if (this.crosshair.enabled) {
        this.drawCrosshair(value)
      }
      if (this.state.active) {
        this.drawTooltip(value)
      }
    } else {
      if (this.tooltip) {
        this.tooltipDiv.style.display = 'none'
      }
    }
  }

}