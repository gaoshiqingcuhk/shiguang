// ===== 儿童基本信息 =====
export interface ChildProfile {
  name?: string
  age: number
  grade: string
}

export const GRADES = [
  '小学一年级',
  '小学二年级',
  '小学三年级',
  '小学四年级',
  '小学五年级',
  '小学六年级',
]

// ===== 第一部分：汉字识别 =====
export interface CharItem {
  id: string
  char: string
  pinyin: string
}

export type CharResult = 'correct' | 'wrong' | 'skipped'

export interface CharScore {
  itemId: string
  result: CharResult
  spokenPinyin?: string
}

export interface CharRecognitionData {
  scores: CharScore[]
  timeSeconds: number
  totalScore: number
  maxScore: number
}

// ===== 第二部分：快速自动命名 =====
export interface RapidNamingSubtestData {
  timeSeconds: number
  notes: string
}

export interface RapidNamingData {
  digit: RapidNamingSubtestData
  picture: RapidNamingSubtestData
}

// ===== 第三部分：声韵母重组 =====
export interface PhonemeQuestion {
  id: string
  char1: string
  char2: string
  correctAnswer: string
}

export interface PhonemeScore {
  questionId: string
  score: 0 | 1
}

export interface PhonemeData {
  scores: PhonemeScore[]
  totalScore: number
  maxScore: number
}

// ===== 综合结果 =====
export type RiskLevel = 'low' | 'medium' | 'high'

export interface PartResult {
  part: number
  name: string
  score: number
  maxScore: number
  timeSeconds?: number
}

export interface ScreeningResult {
  profile: ChildProfile
  part1: CharRecognitionData
  part2: RapidNamingData
  part3: PhonemeData
  partResults: PartResult[]
  overallScore: number
  riskLevel: RiskLevel
  completedAt: string
}
