import { describe, it } from 'mocha'
import { expect } from 'chai'
import { argv } from 'process'
import { GenshinKit } from '../src/index'
import { playerList } from'./test-data.json'
 
describe('Test request in request.ts', () => {
  it('should be able to get retcode 0' , async () => {
    const genshinKit = new GenshinKit()
    genshinKit.loginWithCookie(argv[4])
    const res =  await  genshinKit.request(
      'get', 'index', {
        role_id: playerList[0].role_id,
        server:playerList[0].server,
      }
    )
    expect(res.retcode).to.equal(0)
  })
})