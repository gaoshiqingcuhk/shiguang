import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Timer } from '../components/Timer'
import { Card } from '../components/Card'
import { BoundaryBox } from '../components/BoundaryBox'
import { IconIllustration } from '../components/IconIllustration'
import { useScreening } from '../context/useScreening'
import { DIGIT_SEQUENCE, PICTURE_SEQUENCE, PICTURE_LABELS } from '../data/rapidNaming'

type Phase = 'instruction' | 'digit-timing' | 'digit-scoring' | 'picture-timing' | 'picture-scoring'

export function RapidNamingPage() {
  const navigate = useNavigate()
  const { profile, savePart2, nextPart } = useScreening()

  const [phase, setPhase] = useState<Phase>('instruction')
  const [digitTime, setDigitTime] = useState(0)
  const [digitNotes, setDigitNotes] = useState('')
  const [pictureTime, setPictureTime] = useState(0)
  const [pictureNotes, setPictureNotes] = useState('')

  useEffect(() => {
    if (!profile) navigate('/start')
  }, [profile, navigate])

  const handleSubmit = () => {
    savePart2({
      digit: { timeSeconds: digitTime, notes: digitNotes },
      picture: { timeSeconds: pictureTime, notes: pictureNotes },
    })
    nextPart()
    navigate('/screening/phoneme')
  }

  if (!profile) return null

  return (
    <Layout showNav={false}>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-book-blue">第二部分 · 任务 2/3</p>
            <h1 className="text-xl font-bold text-slate-800">快速自动命名筛查</h1>
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

        {/* Instructions */}
        {phase === 'instruction' && (
          <Card className="sm:p-10">
            <div className="mb-6 flex items-start gap-4">
              <IconIllustration type="timer" />
              <div>
                <h2 className="text-lg font-bold text-ink">家长操作指南</h2>
                <p className="mt-1 text-sm text-slate-500">本任务重点记录速度、稳定性和异常情况。</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-slate-600 leading-relaxed">
              <p>此部分分为 <strong>数字命名</strong> 和 <strong>图片命名</strong> 两个子测试，分别计时。</p>
              <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4">
                <p className="font-semibold text-sky-800">这一部分观察什么？</p>
                <p className="mt-2 text-sky-700">
                  数字和图片都是熟悉材料，重点不是知识难度，而是孩子看到视觉符号后，快速说出名称的速度和稳定性。本部分目前只记录用时和备注，不参与综合得分。
                </p>
              </div>
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
                <p className="font-semibold text-amber-800">🗣 告知儿童测试规则：</p>
                <p className="mt-2 text-amber-700 italic">
                  "请你按顺序快速读出屏幕上的数字/图片名称，不要停顿、不要修改，越快越好！"
                </p>
              </div>
              <ol className="list-decimal list-inside space-y-1">
                <li>儿童准备就绪后，点击对应子测试「开始计时」</li>
                <li>监督儿童快速、连贯完成所有序列认读</li>
                <li>若出现卡顿、读错、漏读、重复读，家长精准记录异常</li>
                <li>儿童全部读完后，立即点击「结束计时」</li>
                <li>记录测试时长与异常情况</li>
              </ol>
              <BoundaryBox title="观察记录提示">
                如果出现停顿、跳行、漏读、重复读或反复自我纠正，请在备注中写清楚。家长不要为了追求速度催促孩子。
              </BoundaryBox>
            </div>
            <div className="mt-8">
              <Button onClick={() => setPhase('digit-timing')} className="w-full sm:w-auto">
                开始数字命名测试 →
              </Button>
            </div>
          </Card>
        )}

        {/* Digit Test - Timing */}
        {phase === 'digit-timing' && (
          <Card className="sm:p-10">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              🔢 数字命名测试
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              请让儿童按顺序快速朗读以下 8 行数字
            </p>
            <div className="space-y-3 mb-8">
              {DIGIT_SEQUENCE.map((row, i) => (
                <div key={i} className="grid grid-cols-[1.25rem_1fr] items-center gap-2">
                  <span className="text-xs text-slate-400">{i + 1}.</span>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-4">
                    {row.map((digit, j) => (
                      <span
                        key={j}
                        className="flex aspect-square min-w-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl font-bold text-ink sm:rounded-2xl sm:text-3xl"
                      >
                        {digit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Timer onStop={(elapsed) => { setDigitTime(elapsed); setPhase('digit-scoring') }} label="数字命名计时" />
          </Card>
        )}

        {/* Digit Test - Scoring */}
        {phase === 'digit-scoring' && (
          <Card className="sm:p-10">
            <h3 className="text-lg font-bold text-slate-800 mb-4">🔢 数字命名 - 录入结果</h3>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 mb-6">
              <p className="text-emerald-800">
                ⏱ 数字命名用时：<strong>{Math.floor(digitTime / 60)}分{digitTime % 60}秒</strong>
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                异常情况备注（卡顿、读错、漏读、重复读等）
              </label>
              <textarea
                value={digitNotes}
                onChange={(e) => setDigitNotes(e.target.value)}
                placeholder="例如：第3行读错4和6；第7行卡顿约5秒……"
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-brand-400"
              />
            </div>
            <Button onClick={() => setPhase('picture-timing')} className="w-full sm:w-auto">
              确认 · 进入图片命名测试 →
            </Button>
          </Card>
        )}

        {/* Picture Test - Timing */}
        {phase === 'picture-timing' && (
          <Card className="sm:p-10">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              🖼 图片命名测试
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              请让儿童按顺序快速朗读以下 8 行图片名称
            </p>
            <div className="space-y-3 mb-8">
              {PICTURE_SEQUENCE.map((row, i) => (
                <div key={i} className="grid grid-cols-[1.25rem_1fr] items-center gap-2">
                  <span className="text-xs text-slate-400">{i + 1}.</span>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-4">
                    {row.map((label, j) => (
                      <span
                        key={j}
                        className="flex aspect-square min-w-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl sm:rounded-2xl sm:text-3xl"
                        title={label}
                      >
                        {PICTURE_LABELS[label] || label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Timer onStop={(elapsed) => { setPictureTime(elapsed); setPhase('picture-scoring') }} label="图片命名计时" />
          </Card>
        )}

        {/* Picture Test - Scoring */}
        {phase === 'picture-scoring' && (
          <Card className="sm:p-10">
            <h3 className="text-lg font-bold text-slate-800 mb-4">🖼 图片命名 - 录入结果</h3>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 mb-6">
              <p className="text-emerald-800">
                ⏱ 图片命名用时：<strong>{Math.floor(pictureTime / 60)}分{pictureTime % 60}秒</strong>
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                异常情况备注（卡顿、读错、漏读、重复读等）
              </label>
              <textarea
                value={pictureNotes}
                onChange={(e) => setPictureNotes(e.target.value)}
                placeholder="例如：第2行把「窗」读成「门」……"
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:border-brand-400"
              />
            </div>
            <Button onClick={handleSubmit} size="lg" className="w-full sm:w-auto">
              ✅ 提交本部分 · 进入下一任务
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  )
}
