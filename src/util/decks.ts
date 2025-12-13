import { TAROT_CARDS } from '@/data/tarotCards'
import type { TarotCard } from '@/data/tarotCards'

export function createDisplayDeck(count = 25): TarotCard[] {
  const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}