import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { BoundaryBox } from '../components/BoundaryBox'
import { IconIllustration } from '../components/IconIllustration'
import { useScreening } from '../context/useScreening'
import { CHARACTER_PAGES, TOTAL_CHAR_PAGES, TOTAL_CHARS } from '../data/characters'
import type { CharScore, CharResult } from '../types/screening'

export function CharRecognitionPage() {
  const navigate = useNavigate()
  const { profile, savePart1, nextPart } = useScreening()

  const [phase, setPhase] = useState<'instruction' | 'testing' | 'review'>('instruction')
  const [page, setPage] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [scores, setScores] = useState<Record<string, CharResult>>({})
  const [spokenPinyins, setSpokenPinyins] = useState<Record<string, string>>({})
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!profile) navigate('/start')
  }, [profile, navigate])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleStart = () => {
    // Initialize all scores as unmarked
    const init: Record<string, CharResult> = {}
    for (const pageChars of CHARACTER_PAGES) {
      for (const item of pageChars) {
        init[item.id] = 'skipped'
      }
    }
    setScores(init)
    setElapsed(0)
    setPage(0)
    setPhase('testing')

    // Start timer
    intervalRef.current = setInterval(() => {
      setElapsed((e) => e + 1)
    }, 1000)
  }

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setPhase('review')
  }

  const setResult = (id: string, result: CharResult) => {
    setScores((prev) => ({ ...prev, [id]: result }))
  }

  const handleSubmit = () => {
    const scoreList: CharScore[] = CHARACTER_PAGES.flat().map((item) => ({
      itemId: item.id,
      result: scores[item.id] || 'skipped',
      spokenPinyin: scores[item.id] === 'wrong' ? spokenPinyins[item.id] : undefined,
    }))
    const correct = scoreList.filter((s) => s.result === 'correct').length

    savePart1({
      scores: scoreList,
      timeSeconds: elapsed,
      totalScore: correct,
      maxScore: TOTAL_CHARS,
    })

    nextPart()
    navigate('/screening/rapid-naming')
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const currentPageChars = CHARACTER_PAGES[page]
  const scoredInPage = currentPageChars.filter(
    (c) => scores[c.id] && scores[c.id] !== 'skipped',
  ).length
  const totalScored = Object.values(scores).filter(
    (r) => r && r !== 'skipped',
  ).length

  if (!profile) return null

  return (
    <Layout showNav={false}>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-book-blue">第一部分 · 任务 1/3</p>
            <h1 className="text-xl font-bold text-slate-800">汉字识别任务</h1>
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

        {/* ===== Phase: Instruction ===== */}
        {phase === 'instruction' && (
          <Card className="sm:p-10">
            <div className="mb-6 flex items-start gap-4">
              <IconIllustration type="book" />
              <div>
                <h2 className="text-lg font-bold text-ink">家长操作指南</h2>
                <p className="mt-1 text-sm text-slate-500">请先确认规则，再让孩子开始认读。</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-slate-600 leading-relaxed">
              <p>
                此部分测试儿童汉字认读能力，包含 <strong>150 个汉字</strong>，分 5 页展示。
              </p>
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <p className="font-semibold text-sky-800">这一部分观察什么？</p>
                <p className="mt-2 text-sky-700">
                  主要观察孩子看到常见汉字后，能否稳定地提取读音。家长只记录第一次读出的结果，不提示读音、不纠正答案，也不要求孩子反复尝试。
                </p>
              </div>
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
                <p className="font-semibold text-amber-800">
                  🗣 统一指导语（请向儿童宣读）：
                </p>
                <p className="mt-2 text-amber-700 italic">
                  "你看，这里有很多字，请你用手指着、把你认识的字从前往后、一个一个地读给我听，好吗？如果不认识，也没有关系，这里有很多字你都没学过，你告诉我你认识的字的读音就可以了。"
                </p>
              </div>
              <ol className="list-decimal list-inside space-y-1">
                <li>点击下方「开始计时」按钮，屏幕上会出现第 1 页汉字</li>
                <li>监督儿童按顺序逐行、逐字认读，不允许跳读、复读、猜测拖延</li>
                <li>儿童每读一个字，家长即时点击 ✓对 / ✗错 / N跳过</li>
                <li>本页读完后翻到下一页，直到 5 页全部读完</li>
                <li>全部读完后点击「结束计时」</li>
              </ol>
              <BoundaryBox title="施测边界" tone="danger">
                如果孩子明显焦虑、疲劳或抗拒，可以停止本次筛查。对、错、跳过都可以在提交前复核修改。
              </BoundaryBox>
            </div>
            <div className="mt-8">
              <Button onClick={handleStart} size="lg" className="w-full sm:w-auto">
                ▶ 开始计时 · 显示汉字
              </Button>
            </div>
          </Card>
        )}

        {/* ===== Phase: Testing & Review (both show characters) ===== */}
        {(phase === 'testing' || phase === 'review') && (
          <>
            {/* Timer bar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                {phase === 'testing' ? (
                  <>
                    <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-2xl font-bold tabular-nums text-brand-600">
                      {formatTime(elapsed)}
                    </span>
                    <span className="text-sm text-slate-500">计时中……</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl font-bold tabular-nums text-emerald-600">
                      ✅ {formatTime(elapsed)}
                    </span>
                    <span className="text-sm text-slate-500">计时已结束</span>
                  </>
                )}
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <span className="text-sm text-slate-500">
                  已评 {totalScored} / {TOTAL_CHARS} 字
                </span>
                {phase === 'testing' && (
                  <Button variant="secondary" onClick={handleStop} className="w-full sm:w-auto">
                    ⏹ 结束计时
                  </Button>
                )}
                {phase === 'review' && (
                  <Button onClick={handleSubmit} className="w-full sm:w-auto">
                    ✅ 确认提交 · 进入下一任务
                  </Button>
                )}
              </div>
            </div>

            {/* Page navigation */}
            <div className="mb-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {Array.from({ length: TOTAL_CHAR_PAGES }, (_, i) => {
                const pageChars = CHARACTER_PAGES[i]
                const pageScored = pageChars.filter(
                  (c) => scores[c.id] && scores[c.id] !== 'skipped',
                ).length
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    className={`rounded-xl px-3 py-2 text-sm font-medium transition cursor-pointer sm:px-4 ${
                      page === i
                        ? 'bg-book-blue text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-book-blue-soft border border-slate-200'
                    }`}
                  >
                    第{i + 1}页
                    {pageScored > 0 && (
                      <span className="ml-1 text-xs opacity-70">
                        ({pageScored}/{pageChars.length})
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Character grid */}
            <div className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-8">
              <p className="mb-4 text-sm text-slate-500">
                第 {page + 1} 页 · 已评 {scoredInPage} / {currentPageChars.length} 字
              </p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3 lg:grid-cols-6">
                {currentPageChars.map((item) => {
                  const result = scores[item.id]
                  let borderColor = 'border-slate-200'
                  let bgColor = 'bg-white'
                  if (result === 'correct') {
                    borderColor = 'border-emerald-300'
                    bgColor = 'bg-emerald-50/90'
                  } else if (result === 'wrong') {
                    borderColor = 'border-rose-300'
                    bgColor = 'bg-rose-50/90'
                  } else if (result === 'skipped') {
                    borderColor = 'border-slate-200'
                    bgColor = 'bg-slate-50'
                  }

                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl border-2 ${borderColor} ${bgColor} p-2 text-center transition sm:p-3`}
                    >
                      <p className="text-2xl font-bold text-slate-800 sm:text-4xl">
                        {item.char}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{item.pinyin}</p>
                      {/* Only show scoring buttons during testing or review */}
                      <div className="mt-2 grid grid-cols-3 gap-1">
                        <button
                          type="button"
                          onClick={() => setResult(item.id, 'correct')}
                          className={`rounded-lg px-1.5 py-1 text-xs font-medium transition cursor-pointer ${
                            result === 'correct'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          }`}
                        >
                          ✓ 对
                        </button>
                        <button
                          type="button"
                          onClick={() => setResult(item.id, 'wrong')}
                          className={`rounded-lg px-1.5 py-1 text-xs font-medium transition cursor-pointer ${
                            result === 'wrong'
                              ? 'bg-rose-500 text-white shadow-sm'
                              : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                          }`}
                        >
                          ✗ 错
                        </button>
                        <button
                          type="button"
                          onClick={() => setResult(item.id, 'skipped')}
                          className={`rounded-lg px-1.5 py-1 text-xs font-medium transition cursor-pointer ${
                            result === 'skipped'
                              ? 'bg-slate-400 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          N
                        </button>
                      </div>
                      {result === 'wrong' && (
                        <input
                          type="text"
                          placeholder="记录读音"
                          value={spokenPinyins[item.id] || ''}
                          onChange={(e) =>
                            setSpokenPinyins((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          className="mt-1 w-full rounded-md border border-rose-200 px-2 py-1 text-xs text-slate-600 placeholder-slate-300 outline-none"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom submit for review phase */}
            {phase === 'review' && (
              <div className="mt-6 text-center">
                <Button onClick={handleSubmit} size="lg" className="w-full sm:w-auto">
                  ✅ 确认提交 ({totalScored}/{TOTAL_CHARS} 字已评) · 进入下一任务
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
