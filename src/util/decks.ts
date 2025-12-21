// src/util/decks.ts
import { TAROT_MEANINGS } from '@/data/tarotCards'
import type { TarotCard } from '@/data/tarotTypes'

const DEFAULT_BACK_IMAGE = '/@/assets/images/tarot/tarot_back.jpg'

export function createDisplayDeck(count = TAROT_MEANINGS.length): TarotCard[] {
  const deck: TarotCard[] = TAROT_MEANINGS.map((card, index) => ({
    id: card.id,
    arcana: card.id.length <= 2 ? 'major' : 'minor', // 간단 예시
    number: index, // 필요에 따라 수정
    name: card.name,
    suit: card.id.includes('cups')
      ? 'cups'
      : card.id.includes('pentacles')
      ? 'pentacles'
      : card.id.includes('swords')
      ? 'swords'
      : card.id.includes('wands')
      ? 'wands'
      : undefined,
    image: card.id.length <= 2
      ? `/daily-tarot/src/assets/images/tarot/major/tarot_major_${String(index).padStart(2,'0')}_${card.name}.jpg`
      : `/daily-tarot/src/assets/images/tarot/minor/${card.id.includes('cups') ? 'cups' : card.id.includes('pentacles') ? 'pentacles' : card.id.includes('swords') ? 'swords' : 'wands'}/tarot_minor_${card.id.includes('cups') ? 'cups' : card.id.includes('pentacles') ? 'pent' : card.id.includes('swords') ? 'swords' : 'wands'}_${String(index % 14 + 1).padStart(2,'0')}.jpg`,
    backImage: DEFAULT_BACK_IMAGE,
    isFlipped: false,
  }))

  const shuffled = [...deck].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
