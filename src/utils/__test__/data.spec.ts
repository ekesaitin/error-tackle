import { getDateTime } from 'src/utils'

describe('utils-date', () => {
  test('data', () => {
    // YYYY-MM-DD hh:mm:ss
    expect(getDateTime()).toMatch(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/)
  })
})
