import { describe, it } from 'mocha'
import { expect } from 'chai'
import { GenshinKit } from '../src/index'
import { env } from 'process'

async function getUid(app: GenshinKit): Promise<number> {
  const res = await app.request(
    'get',
    'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
  )
  // 保证获取到的是原神游戏 uid
  return res.data.list.find((item: any) =>
    ['hk4e_cn', 'hk4e_global'].includes(item.game_biz)
  )?.game_uid
}

const app = new GenshinKit()
app.loginWithCookie(env.HOYOLAB_COOKIE as string)

getUid(app).then((uid) => {
  describe('GenshinKit modules', () => {
    it('getUserInfo', async () => {
      const res = await app.getUserInfo(uid)
      expect(res).to.be.an('object')
      expect(res.avatars).to.be.an('array')
    })

    it('getUserRoles', async () => {
      const res = await app.getUserRoles(uid)
      expect(res).to.be.an('array')
      expect(res[0].id).to.be.an('number')
      expect(res[0].name).to.be.an('string')
    })

    it('getAbyss', async () => {
      const res = await app.getAbyss(uid, 1)

      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1

      expect(res).to.be.an('object')
      expect(
        new Date(Number(res.start_time) * 1000)
          .toISOString()
          .startsWith(`${year}-${month}`)
      ).to.eq(true)
    })
  })

  it('getActivities', async () => {
    const res = await app.getActivities(uid)
    expect(res).to.be.an('object')
    expect(res.activities).to.be.an('array')
  })

  it('getDailyNote', async () => {
    const res = await app.getDailyNote(uid)
    expect(res).to.be.an('object')
    // 原粹树脂应该介于 0 - 160
    // 暂时不考虑月亮嗑多了的情况
    expect(res.current_resin).to.lte(160)
    expect(res.current_resin).to.gte(0)
  })
})
