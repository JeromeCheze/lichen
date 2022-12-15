import Lichen from '../dist/index.js'

let container = document.querySelector('#chart')

let data = []
while (data.length < 1000) {
  let value = Math.floor(Math.random() * NB_CAT)
  let consecutive = Math.floor(Math.random() * 15)
  for (let i = 0; i < consecutive; i++) {
    data.push(value)
  }
}

const STEP = 10

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
    this.addVLine({ x, name: 'PROUT', position: 'top' })
    return true
  },
  vLines: [
    { x: 2000, position: 'top', name: 'TOP' },
    { x: 4000, position: 'middle', name: 'MIDDLE' },
    { x: 6000, position: 'bottom', name: 'BOTTOM' }
  ]
})

// let animation = setInterval(() => {
//   window.chart.addData([Math.floor(Math.random() * 1e8 * Math.random()) * 10], false)
// }, STEP)

// window.STOP = false
// let t1 = new Date().getTime()
// let refresh = () => {
//   let t2 = new Date().getTime()
//   if ((t2 - t1) > 50) {
//     window.chart.draw()
//     t1 = new Date().getTime()
//   }
//   if (window.STOP) {
//     clearInterval(animation)
//   } else {
//     requestAnimationFrame(refresh)
//   }
// }
// requestAnimationFrame(refresh)

// Test stacking
/*window.chart = new Lichen(container, {
  title: 'test',
  type: 'line',
  stacked: true,
  area: true,
  crosshair: true,
  tooltip: true,
  yAxisPowerOfTen: false,
  areaFillOpacity: 1,
  xStart: 0,
  xStep: 1e3,
  data: {
    test1: {
      color: 'rgb(129, 1, 39)',
      data: [1,4,7,2,7,9,4,2,7]
    },
    test2: {
      color: 'rgb(189, 0, 40)',
      data: [4,7,8,4,8,7,3,7,8]
    },
    test3: {
      color: 'rgb(226, 26, 29)',
      data: [8,4,7,3,7,8,3,3,7]
    }
  }
})*/
// console.log(data)

// window.chart = new Lichen(container, data)

