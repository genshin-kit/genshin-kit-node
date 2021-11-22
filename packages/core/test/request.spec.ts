import { describe, it } from 'mocha'
import { expect } from 'chai'
import { GenshinKit } from '../src/index'
import { env } from 'process'

describe('request.ts', () => {
  const app = new GenshinKit()
  app.loginWithCookie(env.HOYOLAB_COOKIE as string)

  it('Get user game role by cookie', async () => {
    let res = await app.request(
      'get',
      'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
    )
    const user = res.data.list.find((item: any) =>
      ['hk4e_cn', 'hk4e_global'].includes(item.game_biz)
    )
    res = await app.request('get', 'index', {
      role_id: user.game_uid,
      server: user.region,
    })
    expect(res.retcode).to.equal(0)
  })
})
