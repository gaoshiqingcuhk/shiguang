import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { BoundaryBox } from '../components/BoundaryBox'
import { IconIllustration } from '../components/IconIllustration'
import { useScreening } from '../context/useScreening'
import { getRiskInfo, formatTime } from '../utils/scoring'
import { CHARACTER_PAGES } from '../data/characters'
import type { CharItem } from '../types/screening'

export function ResultPage() {
  const navigate = useNavigate()
  const { getResult, reset } = useScreening()
  const result = getResult()

  const charMap = useMemo(() => {
    const map: Record<string, CharItem> = {}
    for (const page of CHARACTER_PAGES) {
      for (const item of page) {
        map[item.id] = item
      }
    }
    return map
  }, [])

  useEffect(() => {
    if (!result) navigate('/start')
  }, [result, navigate])

  if (!result) return null

  const risk = getRiskInfo(result.riskLevel)
  const date = new Date(result.completedAt).toLocaleString('zh-CN')

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="animate-fade-up text-center">
          <IconIllustration type="report" className="mx-auto h-16 w-16" />
          <h1 className="mt-4 text-3xl font-bold text-slate-900">筛查报告</h1>
          <p className="mt-2 text-slate-500">生成时间：{date}</p>
        </div>

        {/* Profile + Overall Score */}
        <Card className="mt-8">
          <div className="grid gap-4 border-b border-slate-100 pb-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="min-w-0">
              <p className="text-sm text-slate-500">筛查对象</p>
              <p className="text-xl font-bold text-slate-800">{result.profile.name || '小朋友'}</p>
              <p className="text-sm text-slate-500">
                {result.profile.age} 岁 · {result.profile.grade}
              </p>
            </div>
            <div className="w-full rounded-3xl bg-book-blue-soft px-6 py-5 text-center sm:w-auto sm:rounded-full sm:px-8 sm:py-6">
              <p className="text-sm text-slate-500">综合得分</p>
              <p className="text-4xl font-extrabold text-book-blue sm:text-5xl">
                {result.overallScore}
                <span className="text-lg font-normal text-slate-400"> / 100</span>
              </p>
            </div>
          </div>

          {/* Risk Level */}
          <div className={`mt-6 rounded-2xl border p-6 ${risk.bg} ${risk.border}`}>
            <p className={`text-lg font-bold ${risk.color}`}>风险等级：{risk.label}</p>
            <p className="mt-3 leading-relaxed text-slate-700">{risk.summary}</p>
            <p className="mt-3 text-sm font-medium text-slate-600">
              风险提示，不是诊断。
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-bold text-slate-800">如何理解这份报告？</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              综合得分只来自汉字识别和声韵母重组两个计分任务。快速自动命名只记录用时和备注，用来帮助家长观察命名速度、停顿、漏读或自我纠正等表现，不参与综合得分。
            </p>
          </div>
        </Card>

        {/* Part Results */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-slate-800">分项表现</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Part 1 */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700">第一部分：汉字识别</span>
                  <p className="text-xs text-slate-500 mt-1">
                    正确 {result.part1.totalScore} / {result.part1.maxScore} 字
                    · 用时 {formatTime(result.part1.timeSeconds)}
                  </p>
                </div>
                <span className="text-lg font-bold text-brand-600">
                  {result.part1.maxScore > 0
                    ? Math.round((result.part1.totalScore / result.part1.maxScore) * 100)
                    : '-'}{' '}
                  分
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-500 transition-all"
                  style={{
                    width: `${result.part1.maxScore > 0 ? Math.round((result.part1.totalScore / result.part1.maxScore) * 100) : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Part 2 */}
            <div className="rounded-2xl bg-blue-50/70 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700">第二部分：快速自动命名</span>
                  <p className="text-xs text-slate-500 mt-1">
                    数字 {formatTime(result.part2.digit.timeSeconds)}
                    · 图片 {formatTime(result.part2.picture.timeSeconds)}
                  </p>
                  {result.part2.digit.notes && (
                    <p className="text-xs text-slate-400 mt-1">数字备注：{result.part2.digit.notes}</p>
                  )}
                  {result.part2.picture.notes && (
                    <p className="text-xs text-slate-400 mt-1">图片备注：{result.part2.picture.notes}</p>
                  )}
                </div>
                <span className="text-sm text-book-blue">观察信息</span>
              </div>
            </div>

            {/* Part 3 */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700">第三部分：声韵母重组</span>
                  <p className="text-xs text-slate-500 mt-1">
                    正确 {result.part3.totalScore} / {result.part3.maxScore} 题
                  </p>
                </div>
                <span className="text-lg font-bold text-brand-600">
                  {result.part3.maxScore > 0
                    ? Math.round((result.part3.totalScore / result.part3.maxScore) * 100)
                    : '-'}{' '}
                  分
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-500 transition-all"
                  style={{
                    width: `${result.part3.maxScore > 0 ? Math.round((result.part3.totalScore / result.part3.maxScore) * 100) : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-slate-800">建议与下一步</h2>
          <ul className="mt-4 space-y-3">
            {risk.recommendations.map((rec, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl bg-brand-50/50 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:text-base"
              >
                <span className="font-bold text-brand-600">{i + 1}.</span>
                {rec}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="mt-8">
          <h2 className="text-xl font-bold text-slate-800">报告使用建议</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              '可截图或使用浏览器打印功能保存为 PDF',
              '记录测试当天状态，如睡眠、疲劳、情绪和环境',
              '结合学校朗读、听写、阅读理解和作业表现理解',
              '如需复测，建议间隔一段时间，不要频繁给孩子施压',
            ].map((item) => (
              <div key={item} className="rounded-xl bg-sky-50 px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </Card>

        {/* Part 1 detail - wrong chars */}
        {result.part1.scores.filter((s) => s.result === 'wrong').length > 0 && (
          <Card className="mt-8">
            <h2 className="text-xl font-bold text-rose-700">认读错误汉字</h2>
            <p className="mt-2 text-sm text-slate-500">
              以下为儿童认读错误的汉字及记录的实际读音
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {result.part1.scores
                .filter((s) => s.result === 'wrong')
                .map((s) => {
                  const char = charMap[s.itemId]
                  return (
                    <div key={s.itemId} className="rounded-xl bg-rose-50 px-3 py-2 text-sm">
                      <span className="font-bold text-rose-700">
                        {char ? `${char.char} (${char.pinyin})` : s.itemId}
                      </span>
                      {s.spokenPinyin && (
                        <span className="ml-2 text-rose-500">→ {s.spokenPinyin}</span>
                      )}
                    </div>
                  )
                })}
            </div>
          </Card>
        )}

        {/* Disclaimer */}
        <BoundaryBox title="重要声明" tone="warning">
          <p>
            本筛查工具仅供家庭早期观察参考，不能替代医疗、心理、语言治疗、教育心理或特殊教育专业评估。如孩子有持续阅读困难，请与学校老师沟通，并咨询相关专业人员。
          </p>
        </BoundaryBox>

        {/* Actions */}
        <div className="no-print mt-8 grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
          <Button
            variant="secondary"
            onClick={() => {
              reset()
              navigate('/consent')
            }}
          >
            重新筛查
          </Button>
          <Link to="/">
            <Button>返回首页</Button>
          </Link>
          <Button variant="ghost" onClick={() => window.print()}>
            使用浏览器打印
          </Button>
        </div>
      </div>
    </Layout>
  )
}
