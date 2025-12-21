export type Arcana = 'major' | 'minor'
export type MinorSuit = 'cups' | 'pentacles' | 'swords' | 'wands'

export interface TarotCard {
  id: string              // 고유값 (셔플용)
  arcana: Arcana
  number: number          // 0~21 / 1~14
  name: string            // Fool, Ace of Cups ...
  suit?: MinorSuit        // minor 전용
  image: string           // 앞면
  backImage: string       // tarot_back.jpg
  isFlipped: boolean

  meaning?: string          // 카드별 의미
  short?: string            // 카드 요약
  kname?: string            // 한국어 이름
  categoryHints?: Record<string, string>
}
