import { describe, it } from 'mocha'
import { expect } from 'chai'
import { util } from '../lib'

describe('Get official gacha pool', () => {
  it('Get index', (done) => {
    util
      .getGachaIndex()
      .then((i) => {
        expect(i.length > 0).to.be.true
        const [a] = i
        expect(a).to.has.ownProperty('gacha_type')
        done()
      })
      .catch((e) => {
        done(e)
      })
  })

  it('Get 常驻 pool', (done) => {
    util.getOfficialGachaPool(200).then(() => done())
  })
})
