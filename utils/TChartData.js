import 'chartjs-adapter-luxon'
import { DateTime } from 'luxon'
import colorLib from '@kurkle/color'
import { faker } from '@faker-js/faker'
import { valueOrDefault } from 'chart.js/helpers'

var _seed = Date.now()

export class Utils {
  static srand(seed) {
    _seed = seed
  }
  static rand(min, max) {
    min = valueOrDefault(min, 0)
    max = valueOrDefault(max, 0)
    _seed = (_seed * 9301 + 49297) % 233280
    return min + (_seed / 233280) * (max - min)
  }
  static numbers(config) {
    var cfg = config || {}
    var min = valueOrDefault(cfg.min, 0)
    var max = valueOrDefault(cfg.max, 100)
    var from = valueOrDefault(cfg.from, [])
    var count = valueOrDefault(cfg.count, 8)
    var decimals = valueOrDefault(cfg.decimals, 8)
    var continuity = valueOrDefault(cfg.continuity, 1)
    var dfactor = Math.pow(10, decimals) || 0
    var data = []
    var i, value

    for (i = 0; i < count; ++i) {
      value = (from[i] || 0) + this.rand(min, max)
      if (this.rand() <= continuity) {
        data.push(Math.round(dfactor * value) / dfactor)
      } else {
        data.push(null)
      }
    }

    return data
  }
  static points(config) {
    const xs = this.numbers(config)
    const ys = this.numbers(config)
    return xs.map((x, i) => ({ x, y: ys[i] }))
  }
  static bubbles(config) {
    return this.points(config).map((pt) => {
      pt.r = this.rand(config.rmin, config.rmax)
      return pt
    })
  }
  static labels(config) {
    var cfg = config || {}
    var min = cfg.min || 0
    var max = cfg.max || 100
    var count = cfg.count || 8
    var step = (max - min) / count
    var decimals = cfg.decimals || 8
    var dfactor = Math.pow(10, decimals) || 0
    var prefix = cfg.prefix || ''
    var values = []
    var i

    for (i = min; i < max; i += step) {
      values.push(prefix + Math.round(dfactor * i) / dfactor)
    }

    return values
  }
  static MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  static months(config) {
    var cfg = config || {}
    var count = cfg.count || 12
    var section = cfg.section
    var values = []
    var i, value
    for (i = 0; i < count; ++i) {
      value = this.MONTHS[Math.ceil(i) % 12]
      values.push(value.substring(0, section))
    }
    return values
  }
  static COLORS = ['#f53794', '#4dc9f6', '#f67019', '#537bc4', '#acc236', '#166a8f', '#00a950', '#58595b', '#8549ba']
  static color(index) {
    return COLORS[index % COLORS.length]
  }
  static transparentize(value, opacity) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity
    return colorLib(value).alpha(alpha).rgbString()
  }
  static CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
  }
  static NAMED_COLORS = [
    this.CHART_COLORS.red,
    this.CHART_COLORS.orange,
    this.CHART_COLORS.yellow,
    this.CHART_COLORS.green,
    this.CHART_COLORS.blue,
    this.CHART_COLORS.purple,
    this.CHART_COLORS.grey,
  ]
  static namedColor(index) {
    return this.NAMED_COLORS[index % this.NAMED_COLORS.length]
  }
  static newDate(days) {
    return DateTime.now().plus({ days }).toJSDate()
  }
  static newDateString(days) {
    return DateTime.now().plus({ days }).toISO()
  }
  static parseISODate(str) {
    return DateTime.fromISO(str)
  }
  static bubbles(config) {
    return this.points(config).map((pt) => {
      pt.r = this.rand(config.rmin, config.rmax)
      return pt
    })
  }
  static colorize(opaque) {
    return (ctx) => {
      const v = ctx.parsed.y
      const c = v < -50 ? '#D60000' : v < 0 ? '#F46300' : v < 50 ? '#0358B6' : '#44DE28'

      return opaque ? c : Utils.transparentize(c, 1 - Math.abs(v / 150))
    }
  }
  static generateData() {
    return Utils.numbers({
      count: 12,
      min: -100,
      max: 100,
    })
  }
}

const datasets = [
  {
    label: 'Muggles',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
  },
  {
    label: 'Wizards',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)',
    borderWidth: 1,
  },
]

let count = 0
const linesData = []
let lineCount = faker.number.int({ min: 3, max: 7 })
while (count < lineCount) {
  count++
  linesData.push({
    fill: false,
    tension: 0.1,
    label: 'Line ' + count,
    borderColor: Utils.NAMED_COLORS[count],
    data: faker.helpers.multiple(faker.number.int, { count: 7, min: 25, max: 250 }),
  })
}

const bar2 = {
  type: 'bar',
  data: {
    labels: Utils.months({ count: 12 }),
    datasets: [
      {
        data: Utils.generateData(),
      },
    ],
  },
  options: {
    plugins: {
      legend: false,
    },
    elements: {
      bar: {
        borderWidth: 2,
        borderColor: Utils.colorize(true),
        backgroundColor: Utils.colorize(false),
      },
    },
  },
}

export const chartData = {
  radar: {
    type: 'radar',
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets,
    },
  },
  scatter: {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Slytherin',
          data: [
            {
              x: 73.72513717,
              y: 42.73919753,
              r: 1,
            },
            {
              x: 17.35853909,
              y: -71.85785322,
              r: 1,
            },
            {
              x: 74.36642661,
              y: -11.35202332,
              r: 1,
            },
            {
              x: 69.44015775,
              y: 85.9850823,
              r: 1,
            },
            {
              x: 42.08590535,
              y: -81.08110425,
              r: 1,
            },
            {
              x: -64.48645405,
              y: 45.47410837,
              r: 1,
            },
            {
              x: 18.85888203,
              y: 38.49022634,
              r: 1,
            },
            {
              x: 24.69821674,
              y: -81.15397805,
              r: 1,
            },
            {
              x: 55.58384774,
              y: 47.77692044,
              r: 1,
            },
          ],
          borderColor: 'rgb(0, 255, 0)',
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Gryffindor',
          data: [
            {
              x: -69.55761317,
              y: 4.49759945,
              r: 1,
            },
            {
              x: -62.24108368,
              y: -21.72496571,
              r: 1,
            },
            {
              x: 68.32647462,
              y: -48.15329218,
              r: 1,
            },
            {
              x: 72.76234568,
              y: 1.7558299,
              r: 1,
            },
            {
              x: 72.05418381,
              y: -69.52846365,
              r: 1,
            },
            {
              x: -20.21776406,
              y: 21.94444444,
              r: 1,
            },
            {
              x: 57.67489712,
              y: -69.50445816,
              r: 1,
            },
            {
              x: 72.95353224,
              y: -46.37602881,
              r: 1,
            },
            {
              x: -1.97359396,
              y: 89.0877915,
              r: 1,
            },
          ],
          borderColor: '#B50000',
          backgroundColor: '#7A0000',

          yAxisID: 'y2',
        },
        {
          label: 'Hufflepuff',
          borderColor: '#FF6BEE',
          backgroundColor: '#B800A2',
          data: [
            {
              x: -21.53377915,
              y: 67.43912894,
              r: 1,
            },
            {
              x: 33.4164952,
              y: 39.46759259,
              r: 1,
            },
            {
              x: -8.13528807,
              y: -38.09242112,
              r: 1,
            },
            {
              x: -47.42369684,
              y: 81.67266804,
              r: 1,
            },
            {
              x: 73.57596022,
              y: -6.17541152,
              r: 1,
            },
            {
              x: -72.2968107,
              y: -69.53789438,
              r: 1,
            },
            {
              x: -8.49879973,
              y: -17.05675583,
              r: 1,
            },
            {
              x: -0.44753086,
              y: 72.91838134,
              r: 1,
            },
            {
              x: -89.21210562,
              y: 92.07561728,
              r: 1,
            },
          ],
        },
        {
          label: 'Ravenclaw',
          backgroundColor: '#4A2768',
          borderColor: '#8549ba',
          data: [
            {
              x: 81.37688615,
              y: 65.51440329,
              r: 1,
            },
            {
              x: -83.94032922,
              y: -83.95919067,
              r: 1,
            },
            {
              x: 93.74657064,
              y: 15.7441701,
              r: 1,
            },
            {
              x: 16.90672154,
              y: 70.7973251,
              r: 1,
            },
            {
              x: -30.50925926,
              y: 91.07681756,
              r: 1,
            },
            {
              x: 5.81961591,
              y: 12.3851166,
              r: 1,
            },
            {
              x: -27.1930727,
              y: 52.00617284,
              r: 1,
            },
            {
              x: -24.51731824,
              y: 40.30949931,
              r: 1,
            },
            {
              x: -5.51440329,
              y: 27.72805213,
              r: 1,
            },
          ],
        },
        {
          label: 'Unknown',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          data: [
            {
              x: -37.98611111,
              y: -19.17781207,
              r: 1,
            },
            {
              x: 12.23165295,
              y: 49.35270919,
              r: 1,
            },
            {
              x: -73.55881344,
              y: -30.47067901,
              r: 1,
            },
            {
              x: 99.70421811,
              y: -70.99365569,
              r: 1,
            },
            {
              x: -35.88048697,
              y: -91.96930727,
              r: 1,
            },
            {
              x: 11.04509602,
              y: 34.99742798,
              r: 1,
            },
            {
              x: -53.34619342,
              y: 75.33864883,
              r: 1,
            },
            {
              x: -13.45336077,
              y: -76.91872428,
              r: 1,
            },
            {
              x: -91.00394376,
              y: 81.84756516,
              r: 1,
            },
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'ChartJS Hogwarts overview',
        },
      },
      scales: {
        y: {
          type: 'linear',
          position: 'left',
          ticks: {
            color: Utils.CHART_COLORS.red,
          },
        },
        y2: {
          type: 'linear',
          position: 'right',
          reverse: true,
          ticks: {
            color: Utils.CHART_COLORS.blue,
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
  },
  line: {
    type: 'line',
    data: {
      labels: Utils.months({ count: 7 }),
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
  },
  line1: {
    type: 'line',
    data: {
      labels: Utils.months({ count: 7 }),
      datasets: [
        {
          label: 'Line 1',
          data: faker.helpers.multiple(faker.number.int, { count: 7, min: 25, max: 250 }),
          fill: false,
          borderColor: Utils.COLORS[0],
          tension: 0.1,
        },
      ],
    },
  },
  line2: {
    type: 'line',
    data: {
      labels: Utils.months({ count: 7 }),
      datasets: linesData,
    },
  },
  doughnut: {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4,
        },
      ],
    },
  },
  doughnut2: {
    type: 'doughnut',
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets,
    },
  },
  bar: {
    type: 'bar',
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets,
    },
  },
  bar2,
  bar3: {
    type: 'bar',
    data: {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    },
  },
}
