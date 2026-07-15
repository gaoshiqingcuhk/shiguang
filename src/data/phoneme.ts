import type { PhonemeQuestion } from '../types/screening'

// 16道声韵母重组题
// 规则：第一个字的声母 + 第二个字的韵母+声调 = 新读音
export const PHONEME_QUESTIONS: PhonemeQuestion[] = [
  { id: 'p1', char1: '均', char2: '请', correctAnswer: 'jǐng' },
  { id: 'p2', char1: '高', char2: '浪', correctAnswer: 'gàng' },
  { id: 'p3', char1: '书', char2: '艳', correctAnswer: 'shàn' },
  { id: 'p4', char1: '组', char2: '爆', correctAnswer: 'zào' },
  { id: 'p5', char1: '酒', char2: '住', correctAnswer: 'jù' },
  { id: 'p6', char1: '要', char2: '旅', correctAnswer: 'yǔ' },
  { id: 'p7', char1: '拿', char2: '红', correctAnswer: 'nóng' },
  { id: 'p8', char1: '特', char2: '横', correctAnswer: 'téng' },
  { id: 'p9', char1: '乐', char2: '明', correctAnswer: 'lìng' },
  { id: 'p10', char1: '虫', char2: '七', correctAnswer: 'chī' },
  { id: 'p11', char1: '怕', char2: '报', correctAnswer: 'pào' },
  { id: 'p12', char1: '刚', char2: '木', correctAnswer: 'gù' },
  { id: 'p13', char1: '右', char2: '几', correctAnswer: 'yǐ' },
  { id: 'p14', char1: '马', char2: '曹', correctAnswer: 'máo' },
  { id: 'p15', char1: '涛', char2: '荡', correctAnswer: 'tàng' },
  { id: 'p16', char1: '爸', char2: '才', correctAnswer: 'bái' },
]
