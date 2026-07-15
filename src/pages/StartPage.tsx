import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ChecklistCard } from '../components/ChecklistCard'
import { PageHero } from '../components/PageHero'
import { IconIllustration } from '../components/IconIllustration'
import { useScreening } from '../context/useScreening'
import { GRADES } from '../types/screening'

const preparationGroups = [
  { title: '环境准备', items: ['选择安静空间', '保持光线合适', '确认屏幕清晰'] },
  { title: '家长记录原则', items: ['只记录第一次反应', '不提示答案', '不纠正读音'] },
  { title: '儿童状态', items: ['避免疲劳时测试', '焦虑抗拒时可暂停', '不把速度变成压力'] },
  { title: '隐私和边界', items: ['结果仅供早期观察参考', '数据不上传', '刷新会丢失当前进度'] },
]

export function StartPage() {
  const navigate = useNavigate()
  const { setProfile, reset } = useScreening()
  const [age, setAge] = useState('')
  const [grade, setGrade] = useState(GRADES[3])
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const ageNum = Number(age)
    if (!ageNum || ageNum < 7 || ageNum > 12) {
      setError('请填写合理的年龄（7-12 岁）')
      return
    }
    reset()
    setProfile({ age: ageNum, grade })
    navigate('/screening/char-recognition')
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <PageHero
          eyebrow="筛查前准备"
          title="先确认环境，再开始记录"
          description="请家长在安静、稳定的环境中施测。整个过程只记录孩子的自然反应，不提示、不纠正，也不把结果当作专业评估结论。"
          visual={<IconIllustration type="privacy" className="mx-auto h-28 w-28 text-leaf-green" />}
        />

        {/* Privacy Notice */}
        <div className="mb-8 mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 backdrop-blur">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h2 className="font-bold text-emerald-800">隐私声明</h2>
              <p className="mt-2 text-sm text-emerald-700 leading-relaxed">
                本网站为本地运行的筛查工具，<strong>所有数据仅保存在您的浏览器中</strong>。
                我们<strong>不会收集、上传、存储或传输</strong>您填写的任何信息（包括年龄、年级、测试结果等）。
                筛查完成后，您可以截图保存报告，关闭页面后数据即被清除。请放心使用。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {preparationGroups.map((group) => (
            <ChecklistCard
              key={group.title}
              title={group.title}
              items={group.items}
              variant="soft"
            />
          ))}
        </div>

        <Card className="animate-fade-up">
          <h1 className="text-2xl font-bold text-slate-900">开始筛查</h1>
          <p className="mt-2 text-slate-500">
            请家长填写以下基本信息，全程约 15–20 分钟。家长作为施测员，监督儿童完成筛查。
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-slate-700">
                年龄（周岁）
              </label>
              <input
                id="age"
                type="number"
                min={7}
                max={12}
                value={age}
                onChange={(e) => { setAge(e.target.value); setError('') }}
                placeholder="7–12 岁"
                className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-lg outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              />
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-slate-700">
                当前年级
              </label>
              <select
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-lg outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {error && (
              <p className="rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-600">{error}</p>
            )}

            <div className="rounded-2xl bg-book-blue-soft p-4 text-sm text-book-blue">
              <p className="font-medium">📋 筛查须知</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-brand-700/80">
                <li>请在安静、光线充足的环境进行</li>
                <li>家长全程监督，不得提示或引导儿童答题</li>
                <li>家长根据标准答案判断并录入得分</li>
                <li>结果仅供参考，不能替代专业评估</li>
              </ul>
            </div>

            <Button type="submit" size="lg" className="w-full">
              开始筛查任务 →
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  )
}
