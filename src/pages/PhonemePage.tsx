import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { BoundaryBox } from '../components/BoundaryBox'
import { IconIllustration } from '../components/IconIllustration'
import { useScreening } from '../context/useScreening'
import { PHONEME_QUESTIONS } from '../data/phoneme'
import type { PhonemeScore } from '../types/screening'

export function PhonemePage() {
  const navigate = useNavigate()
  const { profile, savePart3, nextPart } = useScreening()
  const [scores, setScores] = useState<Record<string, 0 | 1>>({})

  useEffect(() => {
    if (!profile) navigate('/start')
  }, [profile, navigate])

  const toggleScore = (id: string) => {
    setScores((prev) => ({
      ...prev,
      [id]: prev[id] === 1 ? 0 : 1,
    }))
  }

  const handleSubmit = () => {
    const scoreList: PhonemeScore[] = PHONEME_QUESTIONS.map((q) => ({
      questionId: q.id,
      score: scores[q.id] || 0,
    }))
    const total = scoreList.filter((s) => s.score === 1).length

    savePart3({
      scores: scoreList,
      totalScore: total,
      maxScore: PHONEME_QUESTIONS.length,
    })

    nextPart()
    navigate('/result')
  }

  const scored = Object.keys(scores).length

  if (!profile) return null

  return (
    <Layout showNav={false}>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-book-blue">第三部分 · 任务 3/3</p>
            <h1 className="text-xl font-bold text-slate-800">声韵母重组测验</h1>
          </div>
          <Link
            to="/"
            onClick={(e) => {
              if (!window.confirm('确定要退出吗？当前进度将丢失。')) e.preventDefault()
            }}
            className="text-sm text-slate-400 hover:text-slate-600 no-underline"
          >
            退出
          </Link>
        </div>

        <Card className="sm:p-10">
          <div className="mb-6 flex items-start gap-4">
            <IconIllustration type="sound" />
            <div>
              <h2 className="text-lg font-bold text-ink">测试说明</h2>
              <p className="mt-1 text-sm text-slate-500">先确认孩子理解示例，再逐题记录。</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-slate-600 leading-relaxed">
            <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4">
              <p className="font-semibold text-sky-800">这一部分观察什么？</p>
              <p className="mt-2 text-sky-700">
                主要观察孩子对普通话声母、韵母和声调的加工能力。家长先确认孩子理解示例，再让孩子独立作答；标准答案只用于家长判分，不要提前提示。
              </p>
            </div>
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
              <p className="font-semibold text-amber-800">答题规则：</p>
              <p className="mt-2 text-amber-700">
                每道题给出两个汉字，取 <strong>第一个汉字的声母</strong> + <strong>第二个汉字的韵母+声调</strong>，组合成新读音。
              </p>
            </div>
            <div className="rounded-xl bg-sky-50 border border-sky-200 p-4">
              <p className="font-semibold text-sky-800">示例：</p>
              <p className="mt-1 text-sky-700">
                称(ch<strong>eng1</strong>) + 喝(<strong>h</strong>e1) → 取"称"的声母 <strong>ch</strong> + "喝"的韵母 <strong>e1</strong> = <strong>che1</strong>
              </p>
              <p className="mt-1 text-sky-700">
                坏(h<strong>uai4</strong>) + 老(<strong>l</strong>ao3) → 取"坏"的声母 <strong>h</strong> + "老"的韵母 <strong>ao3</strong> = <strong>hao3</strong>
              </p>
            </div>
            <p>本部分<strong>无需计时</strong>。先让儿童读懂规则和示例，确认理解后再逐题作答。</p>
            <p>家长逐题核对标准答案，判断对错后录入得分。答对得 1 分，答错或未作答得 0 分。</p>
            <BoundaryBox title="记录原则" tone="danger">
              记录时请以儿童回答后的结果为准，不提示答案；如果孩子不理解规则，可停止本部分并在后续与老师或专业人员沟通。
            </BoundaryBox>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                已评 {scored} / {PHONEME_QUESTIONS.length} 题
              </p>
            </div>

            {PHONEME_QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                className={`rounded-xl border-2 p-4 transition ${
                  scores[q.id] === 1
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-600">
                      {i + 1}
                    </span>
                    <span className="text-lg font-bold text-slate-800">
                      {q.char1} / {q.char2}
                    </span>
                    <span className="w-full text-xs text-slate-400 sm:w-auto">前字声母 + 后字韵母声调</span>
                    <span className="text-sm text-slate-400">
                      答案：{q.correctAnswer}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => toggleScore(q.id)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer ${
                        scores[q.id] === 1
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      }`}
                    >
                      ✓ 对 (1分)
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleScore(q.id)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer ${
                        scores[q.id] !== 1
                          ? 'bg-rose-500 text-white'
                          : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      }`}
                    >
                      ✗ 错 (0分)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button onClick={handleSubmit} size="lg" className="w-full">
              ✅ 提交本部分 ({scored}/{PHONEME_QUESTIONS.length} 题已评) · 查看筛查报告
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
