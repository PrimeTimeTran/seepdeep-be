// https://github.com/moment/luxon/blob/master/docs/formatting.md
import { DateTime } from 'luxon'

export function parseTime(time) {
  const dateTime = DateTime.fromISO(time)
  const formattedDate = dateTime.toFormat('ff')
  return formattedDate
}
export function parseDate(time) {
  const dateTime = DateTime.fromISO(time)

  const formattedDate = dateTime.toFormat('D')
  return formattedDate
}
