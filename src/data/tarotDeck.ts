// /src/data/tarotDeck.ts
import rawDeck from '@/data/tarotDeck.json'

export interface TarotDeckCard {
  id: string
  arcana: 'major' | 'minor'
  number: number
  name: string
  name_kr: string
  image: string
}

/**
 * JSON → TarotDeckCard 로 정규화
 * (TypeScript에게 "내가 책임질게"라고 설명하는 단계)
 */
export const TAROT_DECK: TarotDeckCard[] = (rawDeck as any[])
  .filter(card =>
    card.arcana === 'major' || card.arcana === 'minor'
  )
  .map(card => ({
    id: String(card.id),
    arcana: card.arcana as 'major' | 'minor',
    number: card.number ?? card.order,   // order → number 보정
    name: card.name ?? '',
    name_kr: card.name_kr ?? '',
    image: card.image,
  }))