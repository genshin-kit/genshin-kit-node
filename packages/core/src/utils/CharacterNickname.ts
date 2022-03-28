import names from './defaultNames.json'
export class CharacterNickname {
  #nicknameList: NicknameList[] = names

  addNicknames(id: number, nicknames: string | string[]): this {
    if (!this.#nicknameList.find(({ id: id1 }) => id1 === id)) {
      this.#nicknameList.push({ id, nicknames: [] })
    }
    this.#nicknameList
      .find(({ id: id1 }) => id1 === id)
      ?.nicknames.push(...nicknames)
    return this
  }

  getIdByNickname(keyword: string): number | undefined {
    keyword = keyword.toLowerCase().replace(/\s+/g, '')
    return this.#nicknameList.find(({ nicknames }) =>
      nicknames.includes(keyword)
    )?.id
  }

  getNicknamesById(id: number): string[] | undefined {
    return this.#nicknameList.find(({ id: id1 }) => id1 === id)?.nicknames
  }
}

interface NicknameList {
  id: number
  nicknames: string[]
}
