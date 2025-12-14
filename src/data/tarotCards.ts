// src/data/tarotCards.ts

/* ===============================
   1. 카드 의미 인터페이스
================================ */
export interface TarotCardMeaning {
  id: string
  name: string        // 영문 카드명
  kname: string       // 한글 카드명
  core: string        // 핵심 키워드
  short: string       // 한 줄 해석
  categoryHints: {
    love: string
    money: string
    career: string
    health: string
  }
}

/* ===============================
   2. 메이저 아르카나 (22장)
================================ */
export const MAJOR_ARCANA: TarotCardMeaning[] = [
  {
    id: 'fool',
    name: 'Fool',
    kname: '바보',
    core: '시작, 자유, 순수',
    short: '새로운 여정이 시작됩니다.',
    categoryHints: {
      love: '새로운 인연에 마음을 열어보세요.',
      money: '모험적인 선택이 기회가 됩니다.',
      career: '새로운 출발에 좋은 시기입니다.',
      health: '기분과 활력이 좋아집니다.'
    }
  },
  {
    id: 'magician',
    name: 'Magician',
    kname: '마법사',
    core: '능력, 의지, 창조',
    short: '원하는 것을 이룰 힘이 있습니다.',
    categoryHints: {
      love: '주도적인 태도가 관계를 이끕니다.',
      money: '기획력이 수익으로 이어집니다.',
      career: '능력을 인정받을 기회입니다.',
      health: '컨디션이 빠르게 회복됩니다.'
    }
  },

  // ⚠️ 나머지 메이저 20장도 여기 계속 추가
  
]

/* ===============================
   3. 마이너 아르카나 정의
================================ */

// 4개의 슈트
const MINOR_SUITS = [
  { key: 'wands', name: 'Wands', kname: '완드' },
  { key: 'cups', name: 'Cups', kname: '컵' },
  { key: 'swords', name: 'Swords', kname: '소드' },
  { key: 'pentacles', name: 'Pentacles', kname: '펜타클' }
] as const

// 14개의 랭크
const MINOR_RANKS = [
  { key: 'ace', name: 'Ace', kname: '에이스' },
  { key: 'two', name: 'Two', kname: '2' },
  { key: 'three', name: 'Three', kname: '3' },
  { key: 'four', name: 'Four', kname: '4' },
  { key: 'five', name: 'Five', kname: '5' },
  { key: 'six', name: 'Six', kname: '6' },
  { key: 'seven', name: 'Seven', kname: '7' },
  { key: 'eight', name: 'Eight', kname: '8' },
  { key: 'nine', name: 'Nine', kname: '9' },
  { key: 'ten', name: 'Ten', kname: '10' },
  { key: 'page', name: 'Page', kname: '시종' },
  { key: 'knight', name: 'Knight', kname: '기사' },
  { key: 'queen', name: 'Queen', kname: '여왕' },
  { key: 'king', name: 'King', kname: '왕' }
] as const

/* ===============================
   4. 마이너 아르카나 생성 (56장)
================================ */
function createMinorArcana(): TarotCardMeaning[] {
  const cards: TarotCardMeaning[] = []

  for (const suit of MINOR_SUITS) {
    for (const rank of MINOR_RANKS) {
      cards.push({
        id: `${rank.key}_${suit.key}`,
        name: `${rank.name} of ${suit.name}`,
        kname: `${suit.kname} ${rank.kname}`,
        core: '일상, 현실, 경험',
        short: `${suit.kname} ${rank.kname}의 흐름이 나타납니다.`,
        categoryHints: {
          love: '관계의 흐름을 점검하세요.',
          money: '현실적인 판단이 필요합니다.',
          career: '일상의 노력이 중요합니다.',
          health: '균형을 유지하세요.'
        }
      })
    }
  }

  return cards
}

export const MINOR_ARCANA = createMinorArcana()

/* ===============================
   5. 전체 78장 의미 데이터
================================ */
export const TAROT_MEANINGS: TarotCardMeaning[] = [
  ...MAJOR_ARCANA,
  ...MINOR_ARCANA
]

/* ===============================
   6. 검증 로그
================================ */
console.log('Major:', MAJOR_ARCANA.length)   // 22
console.log('Minor:', MINOR_ARCANA.length)   // 56
console.log('Total:', TAROT_MEANINGS.length) // 78
