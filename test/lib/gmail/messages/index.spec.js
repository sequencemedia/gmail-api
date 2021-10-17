const {
  getMessageFormatFull,
  getMessageFormatMinimal,
  getMessageFormatRaw,
  getMessageFormatMetadata,
  getMessage
} = require('@sequencemedia/gmail-api/lib/gmail/messages')

describe('`@sequencemedia/gmail-api/lib/gmail/messages`', () => {
  describe('Always', () => {
    it('exports `getMessageFormatFull`', () => {
      expect(getMessageFormatFull)
        .toEqual(expect.any(Function))
    })

    it('exports `getMessageFormatMinimal`', () => {
      expect(getMessageFormatMinimal)
        .toEqual(expect.any(Function))
    })

    it('exports `getMessageFormatRaw`', () => {
      expect(getMessageFormatRaw)
        .toEqual(expect.any(Function))
    })

    it('exports `getMessageFormatMetadata`', () => {
      expect(getMessageFormatMetadata)
        .toEqual(expect.any(Function))
    })

    it('exports `getMessage`', () => {
      expect(getMessage)
        .toEqual(expect.any(Function))
    })
  })

  describe('`getMessageFormatFull()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK MESSAGE')

      const gmail = { users: { messages: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK MESSAGE ID' }

      returnValue = await getMessageFormatFull(gmail, parameters)
    })

    it('gets the message', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK MESSAGE ID', format: 'full' })
    })

    it('returns the message', () => {
      expect(returnValue)
        .toBe('MOCK MESSAGE')
    })
  })

  describe('`getMessageFormatMinimal()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK MESSAGE')

      const gmail = { users: { messages: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK MESSAGE ID' }

      returnValue = await getMessageFormatMinimal(gmail, parameters)
    })

    it('gets the message', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK MESSAGE ID', format: 'minimal' })
    })

    it('returns the message', () => {
      expect(returnValue)
        .toBe('MOCK MESSAGE')
    })
  })

  describe('`getMessageFormatRaw()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK MESSAGE')

      const gmail = { users: { messages: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK MESSAGE ID' }

      returnValue = await getMessageFormatRaw(gmail, parameters)
    })

    it('gets the message', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK MESSAGE ID', format: 'raw' })
    })

    it('returns the message', () => {
      expect(returnValue)
        .toBe('MOCK MESSAGE')
    })
  })

  describe('`getMessageFormatMetadata()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK MESSAGE')

      const gmail = { users: { messages: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK MESSAGE ID' }

      returnValue = await getMessageFormatMetadata(gmail, parameters)
    })

    it('gets the message', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK MESSAGE ID', format: 'metadata', metadataHeaders: [] })
    })

    it('returns the message', () => {
      expect(returnValue)
        .toBe('MOCK MESSAGE')
    })
  })

  describe('`getMessage()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK MESSAGE')

      const gmail = { users: { messages: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK MESSAGE ID' }

      returnValue = await getMessage(gmail, parameters)
    })

    it('gets the message', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK MESSAGE ID' })
    })

    it('returns the message', () => {
      expect(returnValue)
        .toBe('MOCK MESSAGE')
    })
  })
})
