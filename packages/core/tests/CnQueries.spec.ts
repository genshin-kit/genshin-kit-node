import { describe, it } from 'mocha'
import { expect } from 'chai'
import { env } from 'process'
import { CnQuery } from '../src/Query'

describe('cn query', () => {
  const query = new CnQuery()
  query.cookie = env.HOYOLAB_COOKIE ?? ''

  it('Get user game role by cookie', async () => {
    let res = await query.get(
      'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
    )
    const user = res.data.list.find((item: any) =>
      ['hk4e_cn', 'hk4e_global'].includes(item.game_biz)
    )
    res = await query.get('index', {
      params: {
        role_id: user.game_uid,
        server: user.region,
      },
    })
    console.log(res)
    expect(res.retcode).to.equal(0)
  })
})
