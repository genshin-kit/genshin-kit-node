import { describe, it } from 'mocha'
import { expect } from 'chai'
import { env } from 'process'
import { CnQuerier } from '../src/Querier'

describe('cn query', () => {
  const query = new CnQuerier()
  query.cookie = env.HOYOLAB_COOKIE || ''

  it('Get user game role by cookie', async () => {
    let res = await query.send(
      'GET',
      'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
    )
    const user = res.data.list.find((item: any) =>
      ['hk4e_cn', 'hk4e_global'].includes(item.game_biz)
    )
    res = await query.send('GET', 'index', {
      params: {
        role_id: user.game_uid,
        server: user.region,
      },
    })
    console.log(res)
    expect(res.retcode).to.equal(0)
  })
})
