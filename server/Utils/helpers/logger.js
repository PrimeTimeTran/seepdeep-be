import pino from 'pino'
import pretty from 'pino-pretty'
import colorize from '@pinojs/json-colorizer'

import data from './data.json' with { type: "json" };

const stream = pretty({
  levelFirst: true,
  ignore: 'time, hostname, pid',
})

const formatters = {
  log(obj) {
    return obj
  }
}

// trace, debug, info, warn, error, fatal
export const logger = pino({
  level: 'trace',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  formatters: formatters,
  stream
})

export const print = (obj) => {
  console.log(colorize(obj, { pretty: true }))
}
