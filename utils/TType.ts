export class Type {
  static protected = ['_id']
  static sortableTypes = ['string', 'decimal', 'integer']
  static opts: string[] = [
    'boolean',
    'string',
    'text',
    'integer',
    'decimal',
    'date',
    'dateTime',
    'array',
    'map',
    'enumerator',
    'enumeratorMulti',
    'relation',
    'otm',
    'mto',
    'oto',
    'mtm',
  ]
  static floats: Array<string> = ['decimal']
  static relationTypes = ['otm', 'mto', 'oto', 'mtm']
  static dates: Array<string> = ['date', 'dateTime']
  static enums: Array<string> = ['enumerator', 'enumeratorMulti', 'enumerator-multi']
  static labeled = {
    boolean: {
      value: 'boolean',
      label: 'boolean',
    },
    string: {
      value: 'string',
      label: 'string',
    },
    text: {
      value: 'text',
      label: 'text',
    },
    integer: {
      value: 'integer',
      label: 'integer',
    },
    decimal: {
      value: 'decimal',
      label: 'decimal',
    },
    date: {
      value: 'date',
      label: 'date',
    },
    dateTime: {
      value: 'dateTime',
      label: 'date-time',
    },
    array: {
      value: 'array',
      label: 'array',
    },
    map: {
      value: 'map',
      label: 'map',
    },
    enumerator: {
      value: 'enumerator',
      label: 'enumerator',
    },
    enumeratorMulti: {
      value: 'enumeratorMulti',
      label: 'enumerator-multi',
    },
    otm: {
      value: 'otm',
      label: 'one-to-many',
    },
    relation: {
      value: 'relation',
      label: 'Relation',
    },
    mto: {
      value: 'mto',
      label: 'many-to-one',
    },
    oto: {
      value: 'oto',
      label: 'one-to-one',
    },
    mtm: {
      value: 'mtm',
      label: 'many-to-many',
    },
  }

  static sortOnType(objects: { type: string }[]) {
    return objects.sort((a, b) => {
      const typeAIndex = Type.opts.indexOf(a.type)
      const typeBIndex = Type.opts.indexOf(b.type)
      return typeAIndex - typeBIndex
    })
  }
}
