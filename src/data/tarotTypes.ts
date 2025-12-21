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
}
