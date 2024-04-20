import pino from 'pino'
import pretty from 'pino-pretty'

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: 'time,hostname,pid',
})

// trace, debug, info, warn, error, fatal
export const logger = pino({
  level: 'trace',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      messageKey: 'message',
    },
  },
  stream,
})
