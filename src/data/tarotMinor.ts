import type { TarotCard, MinorSuit } from './tarotTypes'

const BACK = '/src/assets/images/tarot/tarot_back.jpg'

const SUITS: MinorSuit[] = ['cups', 'pentacles', 'swords', 'wands']

const RANKS = [
  { num: 1, name: 'Ace' },
  { num: 2, name: 'Two' },
  { num: 3, name: 'Three' },
  { num: 4, name: 'Four' },
  { num: 5, name: 'Five' },
  { num: 6, name: 'Six' },
  { num: 7, name: 'Seven' },
  { num: 8, name: 'Eight' },
  { num: 9, name: 'Nine' },
  { num: 10, name: 'Ten' },
  { num: 11, name: 'Page' },
  { num: 12, name: 'Knight' },
  { num: 13, name: 'Queen' },
  { num: 14, name: 'King' },
]

export const MINOR_ARCANA: TarotCard[] = SUITS.flatMap((suit) =>
  RANKS.map(({ num, name }) => ({
    id: `minor-${suit}-${num}`,
    arcana: 'minor',
    suit,
    number: num,
    name: `${name} of ${suit}`,
    image: `/src/assets/images/tarot/minor/${suit}/tarot_minor_${suit}_${String(num).padStart(2, '0')}.jpg`,
    backImage: BACK,
  }))
)
