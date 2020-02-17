import Lichen from '../lichen.js'

let container = document.querySelector('#chart')

// const NB_CAT = 10
// const STEP = 300e3
//
// let categories = []
// for (let i = 0; i < NB_CAT; i++) {
//   categories.push({ key: i, label: `Cat ${i}` })
// }
// let data = []
// while (data.length < 1000) {
//   let value = Math.floor(Math.random() * NB_CAT)
//   let consecutive = Math.floor(Math.random() * 15)
//   for (let i = 0; i < consecutive; i++) {
//     data.push(value)
//   }
// }
//
// window.chart = new Lichen(container, {
//   title: 'Test timing chart',
//   type: 'timing',
//   crosshair: true,
//   tooltip: true,
//   color: 'rgb(43, 126, 201)',
//   xStart: new Date().getTime() - data.length * STEP,
//   xStep: STEP,
//   categories,
//   data
// })

let data = []
const STEP = 5

window.chart = new Lichen(container, {
  title: 'test',
  type: 'line',
  crosshair: true,
  tooltip: true,
  color: 'rgb(43, 126, 201)',
  displayDateInTooltip: false,
  yAxisPowerOfTen: false,
  xStart: 0,
  xStep: STEP,
  data: data,
  onDblClick: function (xValue) {
    let i = this.getIndexFromXValue(xValue)
    let xPos = this.getXPosFromIndex(i)
    let x = this.getXValue(xPos)
    this.addVLine({ x, name: 'PROUT' })
    return true
  }
})

let animation = setInterval (() => {
  window.chart.addData([Math.floor(Math.random() * 1e8 * Math.random())*10], false)
}, STEP)

window.STOP = false
let t1 = new Date ().getTime()
let refresh = () => {
  let t2 = new Date ().getTime()
  if ((t2-t1) > 50) {
    window.chart.draw()
    t1 = new Date ().getTime()
  }
  if (window.STOP) {
    clearInterval(animation)
  } else {
    requestAnimationFrame (refresh)
  }
}
requestAnimationFrame (refresh)
