import Lichen from '../lichen.js'

let container = document.querySelector('#chart')

const NB_CAT = 10
const STEP = 300e3

let categories = []
for (let i = 0; i < NB_CAT; i++) {
  categories.push({ key: i, label: `Cat ${i}` })
}
let data = []
while (data.length < 1000) {
  let value = Math.floor(Math.random() * NB_CAT)
  let consecutive = Math.floor(Math.random() * 15)
  for (let i = 0; i < consecutive; i++) {
    data.push(value)
  }
}

window.chart = new Lichen(container, {
  title: 'Test timing chart',
  type: 'timing',
  crosshair: true,
  tooltip: true,
  color: 'rgb(43, 126, 201)',
  xStart: new Date().getTime() - data.length * STEP,
  xStep: STEP,
  categories,
  data
})
