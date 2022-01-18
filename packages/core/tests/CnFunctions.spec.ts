import { describe, it } from 'mocha'
import { expect } from 'chai'
import { GenshinKit } from '../src/index'
import { CnQuery } from '../src/Query'
import { env } from 'process'

const app = new GenshinKit()
const query = new CnQuery()
app.cookie = env.HOYOLAB_COOKIE ?? ''
query.cookie = env.HOYOLAB_COOKIE ?? ''

async function getUid(): Promise<number> {
  const res = await query.get(
    'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie'
  )
  // 保证获取到的是原神游戏 uid
  return res.data.list.find((item: any) =>
    ['hk4e_cn', 'hk4e_global'].includes(item.game_biz)
  )?.game_uid
}

getUid().then((uid) => {
  describe('GenshinKit functions', () => {
    it('selfBindingRoles', async () => {
      const res = await app.selfBindingRoles()
      expect(res).to.be.an('array')
      expect(['hk4e_cn', 'hk4e_global']).to.be.includes(res[0].game_biz)
    })

    it('userInfo', async () => {
      const res = await app.userInfo(uid)
      expect(res).to.be.an('object')
      expect(res.avatars).to.be.an('array')
    })

    it('userRoles', async () => {
      const res = await app.userRoles(uid)
      expect(res).to.be.an('array')
      expect(res[0].id).to.be.an('number')
      expect(res[0].name).to.be.an('string')
    })

    it('abyss', async () => {
      const res = await app.abyss(uid, 1)
      const cur = await app.currentAbyss(uid)

      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1

      expect(res).to.be.an('object')
      expect(res.start_time).to.eq(cur.start_time)
      expect(
        // 北京时间
        new Date(Number(res.start_time) * 1000 + 8 * 60 * 60 * 1000)
          .toISOString()
          .startsWith(`${year}-${month}`)
      ).to.eq(true)
    })

    it('activities', async () => {
      const res = await app.activities(uid)
      expect(res).to.be.an('object')
      expect(res.activities).to.be.an('array')
    })

    it('dailyNote', async () => {
      const res = await app.dailyNote(uid)
      expect(res).to.be.an('object')
      // 原粹树脂应该介于 0 - 160
      // 暂时不考虑月亮嗑多了的情况
      expect(res.current_resin).to.lte(160)
      expect(res.current_resin).to.gte(0)
    })
  })
})
