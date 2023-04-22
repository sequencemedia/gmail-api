import {
  jest
} from '@jest/globals'

import {
  getDrafts
} from '#gmail/drafts/list'

describe('`#gmail/drafts/list`', () => {
  describe('Always', () => {
    it('exports `getDrafts`', () => {
      expect(getDrafts)
        .toEqual(expect.any(Function))
    })
  })

  describe('`getDrafts()`', () => {
    describe('A maximum number is passed as a parameter', () => {
      describe('That number is 1', () => {
        let listSpy
        let returnValue

        beforeEach(async () => {
          listSpy = jest.fn()

          const gmail = { users: { drafts: { list: listSpy } } }
          const parameters = { user: 'MOCK USER ID', max: 1 }

          returnValue = await getDrafts(gmail, parameters)
        })

        it('gets 1 draft', () => {
          expect(listSpy)
            .toHaveBeenCalledWith({ userId: 'MOCK USER ID', maxResults: 1 })
        })

        it('returns the drafts', () => {
          expect(returnValue)
            .toEqual(expect.any(Array))
        })
      })

      describe('That number is less than 1', () => {
        let listSpy
        let returnValue

        beforeEach(async () => {
          listSpy = jest.fn()

          const gmail = { users: { drafts: { list: listSpy } } }
          const parameters = { user: 'MOCK USER ID', max: -1 }

          returnValue = await getDrafts(gmail, parameters)
        })

        it('does not get any drafts', () => {
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

          const gmail = { users: { drafts: { list: listSpy } } }
          const parameters = { user: 'MOCK USER ID', max: 501 }

          returnValue = await getDrafts(gmail, parameters)
        })

        it('gets 500 drafts', () => {
          expect(listSpy)
            .toHaveBeenCalledWith({ userId: 'MOCK USER ID', maxResults: 500 })
        })

        it('returns the drafts', () => {
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

        const gmail = { users: { drafts: { list: listSpy } } }
        const parameters = { user: 'MOCK USER ID' }

        returnValue = await getDrafts(gmail, parameters)
      })

      it('gets 500 drafts', () => {
        expect(listSpy)
          .toHaveBeenCalledWith({ userId: 'MOCK USER ID', maxResults: 500 })
      })

      it('returns the drafts', () => {
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

          const gmail = { users: { drafts: { list: listSpy } } }
          const parameters = { user: 'MOCK USER ID', query: 'MOCK QUERY', max: 1 }

          returnValue = await getDrafts(gmail, parameters)
        })

        it('gets 1 draft', () => {
          expect(listSpy)
            .toHaveBeenCalledWith({ userId: 'MOCK USER ID', q: 'MOCK QUERY', maxResults: 1 })
        })

        it('returns the drafts', () => {
          expect(returnValue)
            .toEqual(expect.any(Array))
        })
      })

      describe('And a maximum number is not passed as a parameter', () => {
        let listSpy
        let returnValue

        beforeEach(async () => {
          listSpy = jest.fn()

          const gmail = { users: { drafts: { list: listSpy } } }
          const parameters = { user: 'MOCK USER ID', query: 'MOCK QUERY' }

          returnValue = await getDrafts(gmail, parameters)
        })

        it('gets 500 drafts', () => {
          expect(listSpy)
            .toHaveBeenCalledWith({ userId: 'MOCK USER ID', q: 'MOCK QUERY', maxResults: 500 })
        })

        it('returns the drafts', () => {
          expect(returnValue)
            .toEqual(expect.any(Array))
        })
      })
    })
  })
})
