import { defineEventHandler } from 'h3'

let closure = () => {}

export function captureEvent(val) {
  let event = val
  closure = function () {
    const user = {
      id: event?.user?._id || '1',
      firstName: event?.user?.firstName || 'cleverprogrammer',
      email: event?.user?.email || 'primetimetran@gmail.com',
    }
    return user
  }
  return closure
}

export { closure }

export default defineEventHandler(async (e) => {
  try {
    captureEvent(e)
  } catch (error) {
    logger.fatal({ error: error.message, msg: 'Auditing Error' })
  }
})
