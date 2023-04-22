import {
  SCOPES,
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN
} from '#constants'

describe('`#constants`', () => {
  describe('Always', () => {
    it('exports `SCOPES`', () => {
      expect(SCOPES)
        .toEqual(expect.any(Array))
    })

    it('exports `ENOENT_CREDENTIALS`', () => {
      expect(ENOENT_CREDENTIALS)
        .toEqual(expect.any(String))
    })

    it('exports `ENOENT_CREDENTIALS_TOKEN`', () => {
      expect(ENOENT_CREDENTIALS_TOKEN)
        .toEqual(expect.any(String))
    })
  })
})
