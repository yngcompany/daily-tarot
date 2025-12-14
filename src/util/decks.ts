// src/util/decks.ts
import { TAROT_MEANINGS } from '@/data/tarotCards'
import type { TarotCardMeaning } from '@/data/tarotCards'

export function createDisplayDeck(count = 25): TarotCardMeaning[] {
  const shuffled = [...TAROT_MEANINGS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
