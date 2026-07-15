import type { RiskLevel, PartResult } from '../types/screening'

export function calculateOverallScore(partResults: PartResult[]): number {
  if (partResults.length === 0) return 0
  const totalMax = partResults.reduce((s, p) => s + p.maxScore, 0)
  const totalScore = partResults.reduce((s, p) => s + p.score, 0)
  if (totalMax === 0) return 0
  return Math.round((totalScore / totalMax) * 100)
}

export function determineRiskLevel(overallScore: number): RiskLevel {
  if (overallScore >= 80) return 'low'
  if (overallScore >= 60) return 'medium'
  return 'high'
}

export interface RiskInfo {
  label: string
  color: string
  bg: string
  border: string
  summary: string
  recommendations: string[]
}

export function getRiskInfo(level: RiskLevel): RiskInfo {
  switch (level) {
    case 'low':
      return {
        label: '低风险',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        summary:
          '本次筛查整体表现较稳定，当前任务中未提示明显阅读相关风险。仍建议结合平时阅读、作业、朗读和老师反馈继续观察。',
        recommendations: [
          '继续保持轻松的亲子阅读和日常朗读，不把阅读变成压力任务',
          '关注孩子在学校语文学习、听写、朗读和阅读理解中的长期表现',
          '如果家长或老师仍发现持续困难，可以继续记录具体表现并沟通',
        ],
      }
    case 'medium':
      return {
        label: '需关注',
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        summary:
          '本次筛查提示部分阅读相关能力可能需要关注。建议结合识字、朗读、听写、阅读理解等日常表现，持续观察一段时间。',
        recommendations: [
          '记录孩子具体困难，例如形近字混淆、朗读跳字、听写错误类型',
          '与语文老师沟通，了解课堂朗读、听写和阅读理解表现是否一致',
          '尝试短时间、高频率、低压力的阅读支持，避免与其他孩子比较',
          '如果困难持续存在或明显影响学习，建议咨询相关专业人员',
        ],
      }
    case 'high':
      return {
        label: '建议进一步评估',
        color: 'text-rose-700',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        summary:
          '本次筛查提示可能存在较明显的阅读相关困难。这个结果不代表专业结论，建议尽快结合学校表现和专业人员意见进一步了解。',
        recommendations: [
          '保存本次报告、近期作业、听写和朗读表现样本',
          '尽快与语文老师沟通，了解孩子在课堂中的长期表现',
          '咨询教育心理、语言治疗、儿童发展或特殊教育专业人员',
          '不要仅凭本工具结果做教育安置、医疗或干预方案决定',
        ],
      }
  }
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}分${s}秒`
}
