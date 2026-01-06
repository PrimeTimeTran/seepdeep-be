import { describe, it, expect } from 'vitest'
import handler from '../../../server/api/index.get.ts'

describe('GET /api', () => {
  it('should return a list of wizards', async () => {
    const mockEvent = {}
    const response = await handler(mockEvent)
    expect(response).toEqual({
      wizards: ['Harry', 'Hermione', 'Ron', 'Draco', 'Neville'],
    })
  })
})
