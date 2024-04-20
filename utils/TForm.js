import { DateTime } from 'luxon'
let blackListed = ['_id', '__v', '']

export class TFormHelper {
  static makeDate(val) {
    return DateTime.fromISO(val).toFormat('yyyy-MM-dd')
  }
  static setupFormFields(entity, type) {
    try {
      let fields = []
      let entries = Object.entries(entity)

      entries.forEach(([name, value]) => {
        if (!blackListed.includes(name)) {
          let item = {
            name,
            value,
            type: GlobalState.entities[type][name]?.type,
          }
          fields.push(item)
        }
      })
      return fields
    } catch (error) {
      console.log({
        error,
      })
    }
  }
}
