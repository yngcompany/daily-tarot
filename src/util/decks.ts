// /src/util/decks.ts
import type { TarotCard, MinorSuit } from '@/data/tarotTypes'

const DEFAULT_BACK_IMAGE = '/src/assets/images/tarot/tarot_back.jpg'

// 메이저 아르카나 이름 배열
const MAJOR_NAMES = [
  'Fool','Magician','High Priestess','Empress','Emperor','Hierophant','Lovers','Chariot',
  'Strength','Hermit','Wheel of Fortune','Justice','Hanged Man','Death','Temperance','Devil',
  'Tower','Star','Moon','Sun','Judgement','World'
]

// 마이너 아르카나 suit 배열
const MINOR_SUITS: MinorSuit[] = ['cups','pentacles','swords','wands']

export function createFullDeck(): TarotCard[] {
  const deck: TarotCard[] = []

  // 1️⃣ 메이저 아르카나 22장
  MAJOR_NAMES.forEach((name, idx) => {
    deck.push({
      id: `major_${idx}`,
      arcana: 'major',
      number: idx,
      name,
      image: `/daily-tarot/src/assets/images/tarot/major/tarot_major_${String(idx).padStart(2,'0')}_${name.replace(/\s/g,'_')}.jpg`,
      backImage: DEFAULT_BACK_IMAGE,
      isFlipped: false
    })
  })

  // 2️⃣ 마이너 아르카나 56장 (4 suits x 14장)
  MINOR_SUITS.forEach(suit => {
    for (let num = 1; num <= 14; num++) {
      deck.push({
        id: `minor_${suit}_${num}`,
        arcana: 'minor',
        number: num,
        name: `Minor ${suit} ${num}`,
        suit,
        image: `/daily-tarot/src/assets/images/tarot/minor/${suit}/tarot_minor_${suit}_${String(num).padStart(2,'0')}.jpg`,
        backImage: DEFAULT_BACK_IMAGE,
        isFlipped: false
      })
    }
  })

  return deck
}

// 선택된 수 만큼 랜덤으로 셔플
export function createDisplayDeck(count = 78): TarotCard[] {
  const fullDeck = createFullDeck()
  const shuffled = [...fullDeck].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
