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

// 예시: 카드별 의미 / categoryHints
const MAJOR_MEANINGS = [
  '무지, 새로운 시작', '마법, 창조력', '비밀, 직관', '풍요, 모성', '권력, 통제', '전통, 교훈',
  '사랑, 관계', '승리, 의지', '용기, 힘', '고독, 탐구', '운명, 변화', '정의, 균형',
  '희생, 시련', '종말, 변화', '조화, 균형', '속박, 유혹', '붕괴, 충격', '희망, 영감', 
  '환상, 감정', '성취, 만족', '판단, 결단', '완성, 성취'
]

const MINOR_SHORT = (suit: MinorSuit, num: number) => `${suit} ${num} 카드 요약`
const MINOR_MEANING = (suit: MinorSuit, num: number) => `${suit} ${num} 카드 의미`

export function createFullDeck(): TarotCard[] {
  const deck: TarotCard[] = []

  // 1️⃣ 메이저 아르카나 22장
  MAJOR_NAMES.forEach((name, idx) => {
    deck.push({
      id: `major_${idx}`,
      arcana: 'major',
      number: idx,
      name,
      kname: name,                  // 한국어 이름 예시, 필요시 변경
      short: MAJOR_MEANINGS[idx],   // 카드 짧은 요약
      meaning: MAJOR_MEANINGS[idx], // 카드 의미
     categoryHints: { general: MAJOR_MEANINGS[idx] || '' },
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
        kname: `마이너 ${suit} ${num}`,  // 한국어 이름 예시
        suit,
        short: MINOR_SHORT(suit, num),
        meaning: MINOR_MEANING(suit, num),
        categoryHints: { general: MINOR_MEANING(suit, num) || '' },
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
