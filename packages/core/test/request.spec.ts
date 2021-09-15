import { describe, it } from 'mocha'
import { expect } from 'chai'
import { argv } from 'process'
import { GenshinKit } from '../src/index'
 
describe('Test request in request.ts', () => {
  it('should be able to get retcode 0' , async () => {
    const genshinKit = new GenshinKit()
    genshinKit.loginWithCookie(argv[4])
    let res =await  genshinKit.request(
      'get',
      'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
    )
    const user = res.data.list.find((item:any) => {
      if(item.game_biz==='hk4e_cn' ||item.game_biz==='hk4e_global' ){
        return true
      }
    })
    res =  await  genshinKit.request(
      'get', 'index', {
        role_id: user.game_uid,
        server:user.region,
      }
    )
    expect(res.retcode).to.equal(0)
  })
})