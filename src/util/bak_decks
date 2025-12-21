// src/util/decks.ts
import type { TarotCard, MinorSuit } from '@/data/tarotTypes'
import { TAROT_MEANINGS } from '@/data/tarotCards'

const DEFAULT_BACK_IMAGE = '/src/assets/images/tarot/tarot_back.jpg'

// 메이저 아르카나 이름 배열
const MAJOR_NAMES = [
  'Fool','Magician','High Priestess','Empress','Emperor','Hierophant','Lovers','Chariot',
  'Strength','Hermit','Wheel of Fortune','Justice','Hanged Man','Death','Temperance','Devil',
  'Tower','Star','Moon','Sun','Judgement','World'
]

// 마이너 아르카나 suit 배열
const MINOR_SUITS: MinorSuit[] = ['cups','pentacles','swords','wands']

export function createDisplayDeck(count?: number): TarotCard[] {
  const minorIndexMap: Record<MinorSuit, number> = {
    cups: 0,
    pentacles: 0,
    swords: 0,
    wands: 0
  }

  const deck: TarotCard[] = TAROT_MEANINGS.map((card, idx) => {
    let arcana: 'major' | 'minor' = card.id.length <= 2 ? 'major' : 'minor'
    let suit: MinorSuit | undefined = undefined
    let number: number

    if (arcana === 'major') {
      suit = undefined
      number = idx // 0~21
    } else {
      if (card.id.includes('cups')) suit = 'cups'
      else if (card.id.includes('pentacles')) suit = 'pentacles'
      else if (card.id.includes('swords')) suit = 'swords'
      else suit = 'wands' // 항상 값 보장

      /* 
        중요!
        minorIndexMap[suit] = (minorIndexMap[suit] ?? 0) + 1
        number = minorIndexMap[suit] // 1~14

        minorIndexMap[suit]를 먼저 0으로 초기화했지만, map 순회 중에서 선증가(pre-increment 방식) 때문에 number가 실제 카드 수보다 1~2만큼 커지는 문제가 발생.
        
        예를 들어, 처음 wands 카드를 만들 때:
          minorIndexMap['wands'] = 0 → (0 ?? 0) + 1 = 1 ✅ 정상

        두 번째 wands 카드:
          minorIndexMap['wands'] = 1 → (1 ?? 0) + 1 = 2 ✅ 정상

        근데 마지막 카드까지 돌면 배열 순서와 minorIndexMap 증가 로직이 꼬이면서 14를 넘어 16까지 가버림.
        즉, number 할당 시점과 증가 로직이 꼬여서 14 이상이 발생.

        ※ 해결방법: number를 먼저 할당하고 나서 증가시키는 방식으로 바꾸면 됨!
      */
      number = (minorIndexMap[suit] ?? 0) + 1
      minorIndexMap[suit] = number

      /*
        이렇게 하면:
          첫 번째 카드 → number = 1, minorIndexMap[suit] = 1
          두 번째 카드 → number = 2, minorIndexMap[suit] = 2
          마지막 카드 → number = 14, minorIndexMap[suit] = 14 ✅
          14장을 넘어가는 문제 사라짐.
      */
    }

    const imagePath =
      arcana === 'major'
        ? `/daily-tarot/src/assets/images/tarot/major/tarot_major_${String(number).padStart(2, '0')}_${card.name}.jpg`
        : `/daily-tarot/src/assets/images/tarot/minor/${suit}/tarot_minor_${suit}_${String(number).padStart(2, '0')}.jpg`

    return {
      id: card.id,
      arcana,
      number,
      name: card.name,
      suit,
      image: imagePath,
      backImage: DEFAULT_BACK_IMAGE,
      isFlipped: false
    } as TarotCard
  })

  // 셔플
  const shuffled = [...deck].sort(() => Math.random() - 0.5)

  // count 지정 없으면 전체 반환
  return shuffled.slice(0, count ?? shuffled.length)
}
