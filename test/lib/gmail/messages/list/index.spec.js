const {
  getMessages
} = require('@sequencemedia/gmail-api/lib/gmail/messages/list')

describe('`@sequencemedia/gmail-api/lib/gmail/messages/list`', () => {
  describe('Always', () => {
    it('exports `getMessages`', () => {
      expect(getMessages)
        .toEqual(expect.any(Function))
    })
  })

  describe('`getMessages()`', () => {
    describe('A maximum number is passed as a parameter', () => {
      describe('That number is 1', () => {
        let listSpy
        let returnValue

        beforeEach(async () => {
          listSpy = jest.fn()

          returnValue = await getMessages({ users: { messages: { list: listSpy } } }, { user: 'MOCK USER ID', max: 1 })
        })

        it('gets 1 message', () => {
          expect(listSpy)
            .toHaveBeenCalledWith({ userId: 'MOCK USER ID', maxResults: 1 })
        })

        it('returns the messages', () => {
          expect(returnValue)
            .toEqual(expect.any(Array))
        })
      })

      describe('That number is less than 1', () => {
        let listSpy
        let returnValue

        beforeEach(async () => {
          listSpy = jest.fn()

          returnValue = await getMessages({ users: { messages: { list: listSpy } } }, { user: 'MOCK USER ID', max: -1 })
        })

        it('does not get any messages', () => {
          expect(listSpy)
            .not.toHaveBeenCalled()
        })

        it('returns an array', () => {
          expect(returnValue)
            .toEqual(expect.any(Array))
        })
      })

      describe('That number is more than 500', () => {
        let listSpy
        let returnValue

        beforeEach(async () => {
          listSpy = jest.fn()

          returnValue = await getMessages({ users: { messages: { list: listSpy } } }, { user: 'MOCK USER ID', max: 501 })
        })

        it('gets 500 messages', () => {
          expect(listSpy)
            .toHaveBeenCalledWith({ userId: 'MOCK USER ID', maxResults: 500 })
        })

        it('returns the messages', () => {
          expect(returnValue)
            .toEqual(expect.any(Array))
        })
      })
    })

    describe('A maximum number is not passed as a parameter', () => {
      let listSpy
      let returnValue

      beforeEach(async () => {
        listSpy = jest.fn()

        returnValue = await getMessages({ users: { messages: { list: listSpy } } }, { user: 'MOCK USER ID' })
      })

      it('gets 500 messages', () => {
        expect(listSpy)
          .toHaveBeenCalledWith({ userId: 'MOCK USER ID', maxResults: 500 })
      })

      it('returns the messages', () => {
        expect(returnValue)
          .toEqual(expect.any(Array))
      })
    })

    describe('A query is passed as a parameter', () => {
      describe('And a maximum number is passed as a parameter', () => {
        let listSpy
        let returnValue

        beforeEach(async () => {
          listSpy = jest.fn()

          returnValue = await getMessages({ users: { messages: { list: listSpy } } }, { user: 'MOCK USER ID', query: 'MOCK QUERY', max: 1 })
        })

        it('gets 1 message', () => {
          expect(listSpy)
            .toHaveBeenCalledWith({ userId: 'MOCK USER ID', q: 'MOCK QUERY', maxResults: 1 })
        })

        it('returns the messages', () => {
          expect(returnValue)
            .toEqual(expect.any(Array))
        })
      })

      describe('And a maximum number is not passed as a parameter', () => {
        let listSpy
        let returnValue

        beforeEach(async () => {
          listSpy = jest.fn()

          returnValue = await getMessages({ users: { messages: { list: listSpy } } }, { user: 'MOCK USER ID', query: 'MOCK QUERY' })
        })

        it('gets 500 messages', () => {
          expect(listSpy)
            .toHaveBeenCalledWith({ userId: 'MOCK USER ID', q: 'MOCK QUERY', maxResults: 500 })
        })

        it('returns the messages', () => {
          expect(returnValue)
            .toEqual(expect.any(Array))
        })
      })
    })
  })
})
