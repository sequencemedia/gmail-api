const {
  getDraftFormatFull,
  getDraftFormatMinimal,
  getDraftFormatRaw,
  getDraftFormatMetadata,
  getDraft
} = require('@sequencemedia/gmail-api/lib/gmail/drafts')

describe('`@sequencemedia/gmail-api/lib/gmail/drafts`', () => {
  describe('Always', () => {
    it('exports `getDraftFormatFull`', () => {
      expect(getDraftFormatFull)
        .toEqual(expect.any(Function))
    })

    it('exports `getDraftFormatMinimal`', () => {
      expect(getDraftFormatMinimal)
        .toEqual(expect.any(Function))
    })

    it('exports `getDraftFormatRaw`', () => {
      expect(getDraftFormatRaw)
        .toEqual(expect.any(Function))
    })

    it('exports `getDraftFormatMetadata`', () => {
      expect(getDraftFormatMetadata)
        .toEqual(expect.any(Function))
    })

    it('exports `getDraft`', () => {
      expect(getDraft)
        .toEqual(expect.any(Function))
    })
  })

  describe('`getDraftFormatFull()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK DRAFT')

      const gmail = { users: { drafts: { get: getSpy } } }

      returnValue = await getDraftFormatFull(gmail, { user: 'MOCK USER ID', id: 'MOCK DRAFT ID' })
    })

    it('gets the draft', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK DRAFT ID', format: 'full' })
    })

    it('returns the draft', () => {
      expect(returnValue)
        .toBe('MOCK DRAFT')
    })
  })

  describe('`getDraftFormatMinimal()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK DRAFT')

      const gmail = { users: { drafts: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK DRAFT ID' }

      returnValue = await getDraftFormatMinimal(gmail, parameters)
    })

    it('gets the draft', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK DRAFT ID', format: 'minimal' })
    })

    it('returns the draft', () => {
      expect(returnValue)
        .toBe('MOCK DRAFT')
    })
  })

  describe('`getDraftFormatRaw()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK DRAFT')

      const gmail = { users: { drafts: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK DRAFT ID' }

      returnValue = await getDraftFormatRaw(gmail, parameters)
    })

    it('gets the draft', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK DRAFT ID', format: 'raw' })
    })

    it('returns the draft', () => {
      expect(returnValue)
        .toBe('MOCK DRAFT')
    })
  })

  describe('`getDraftFormatMetadata()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK DRAFT')

      const gmail = { users: { drafts: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK DRAFT ID' }

      returnValue = await getDraftFormatMetadata(gmail, parameters)
    })

    it('gets the draft', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK DRAFT ID', format: 'metadata', metadataHeaders: [] })
    })

    it('returns the draft', () => {
      expect(returnValue)
        .toBe('MOCK DRAFT')
    })
  })

  describe('`getDraft()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK DRAFT')

      const gmail = { users: { drafts: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK DRAFT ID' }

      returnValue = await getDraft(gmail, parameters)
    })

    it('gets the draft', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK DRAFT ID' })
    })

    it('returns the draft', () => {
      expect(returnValue)
        .toBe('MOCK DRAFT')
    })
  })
})
