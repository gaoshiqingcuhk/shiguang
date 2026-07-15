import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { SectionHeader } from '../components/SectionHeader'
import { PageHero } from '../components/PageHero'
import { BoundaryBox } from '../components/BoundaryBox'
import { IconIllustration } from '../components/IconIllustration'

const parts = [
  {
    icon: 'book' as const,
    title: '第一部分：汉字识别',
    desc: '儿童逐字认读 150 个汉字，家长计时并记录正确、错误或跳过，观察常见汉字认读表现。',
  },
  {
    icon: 'timer' as const,
    title: '第二部分：快速自动命名',
    desc: '数字命名和图片命名分别计时，观察看到熟悉符号后快速说出名称的速度和稳定性。',
  },
  {
    icon: 'sound' as const,
    title: '第三部分：声韵母重组',
    desc: '取前字声母和后字韵母声调组成新音，观察普通话声母、韵母和声调加工。',
  },
]

const steps = [
  { num: '01', title: '阅读说明', desc: '家长确认隐私和免责声明' },
  { num: '02', title: '完成任务', desc: '儿童完成 3 项任务，家长计时记录' },
  { num: '03', title: '查看报告', desc: '获得风险提示和下一步建议' },
]

const misconceptions = [
  ['阅读困难就是不努力吗？', '不一定。有些孩子很努力，但在文字加工、声音加工或快速提取名称时更吃力。'],
  ['阅读障碍等于智力低吗？', '不是。阅读困难需要看具体读写表现，不能简单等同于智力或态度问题。'],
  ['孩子长大一定会好吗？', '有些困难会随经验改善，有些需要更有结构的支持和持续观察。'],
  ['一次筛查能下结论吗？', '不能。一次筛查只能提供风险线索，需要结合长期表现和专业评估理解。'],
]

const timingSigns = [
  {
    title: '低年级可关注',
    items: ['学拼音困难', '认字慢', '形近字混淆', '听写困难', '朗读跳字、漏字、猜字', '记生字很吃力'],
  },
  {
    title: '中高年级可关注',
    items: ['阅读速度明显慢', '读完抓不住主要内容', '语文作业耗时很长', '书面表达弱于口头表达', '长期逃避阅读任务'],
  },
]

function ReadingObservationMock() {
  const rows = [
    ['汉字识别', '150 字认读', '观察'],
    ['快速命名', '数字 / 图片计时', '记录'],
    ['声韵重组', '声母 + 韵母声调', '判分'],
  ]

  return (
    <Card className="mx-auto max-w-sm bg-white/95">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm font-semibold text-book-blue">今日观察</p>
          <h3 className="mt-1 text-xl font-bold text-ink">阅读观察卡</h3>
        </div>
        <IconIllustration type="report" className="h-11 w-11 text-leaf-green" />
      </div>
      <div className="mt-5 space-y-3">
        {rows.map(([name, detail, state]) => (
          <div key={name} className="rounded-2xl bg-paper px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">{name}</p>
                <p className="mt-1 text-xs text-slate-500">{detail}</p>
              </div>
              <span className="rounded-full bg-book-blue-soft px-3 py-1 text-xs font-medium text-book-blue">
                {state}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-leaf-soft p-3 text-sm text-leaf-green">
          本地临时保存
        </div>
        <div className="rounded-2xl bg-yellow-50 p-3 text-sm text-amber-700">
          风险提示而非诊断
        </div>
      </div>
    </Card>
  )
}

export function HomePage() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <PageHero
          eyebrow="简体中文 / 普通话语境 · 7–12 岁儿童"
          title="温和看见孩子的阅读困难风险"
          description="识光围绕汉字认读、快速自动命名、普通话声韵调加工三类任务设计，由家长施测和记录。结果仅作家庭早期观察参考，不上传数据，也不能替代专业评估。"
          visual={<ReadingObservationMock />}
        >
          <Link to="/consent">
            <Button size="lg">开始筛查 →</Button>
          </Link>
          <Link to="/learn">
            <Button variant="secondary" size="lg">了解阅读困难</Button>
          </Link>
        </PageHero>

        <section id="about" className="mt-16">
          <SectionHeader
            align="center"
            title="为什么有些孩子阅读特别吃力？"
            description="它不是孩子懒，也不等于智力低。部分儿童可能长期表现出识字、朗读、拼音或声韵调加工、阅读速度、阅读理解等方面的困难。理解这些表现，需要结合日常学习、家庭观察、学校反馈和专业评估。"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.num} variant="soft">
                <p className="text-sm font-bold text-book-blue">{step.num}</p>
                <h3 className="mt-3 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <SectionHeader title="为什么中文阅读需要中文语境下的筛查？" />
            <p className="mt-5 leading-relaxed text-slate-600">
              中文阅读不只是把字母和声音对应起来。儿童需要整合汉字的字形、读音和意义，也会用到偏旁部首、部件位置、形旁声旁、语素意义，以及普通话声母、韵母和声调。
            </p>
            <p className="mt-3 leading-relaxed text-slate-600">
              英文 dyslexia 材料可以作为早期识别和支持性环境的大框架参考，但不能直接照搬英文 phonics、spelling 或字母反转任务来理解中文儿童。
            </p>
            <p className="mt-3 leading-relaxed text-slate-600">
              本工具只覆盖其中一部分早期观察任务，不能代表完整中文阅读能力评估。
            </p>
          </Card>

          <BoundaryBox title="重要边界" tone="warning">
            <ul className="space-y-2">
              <li>本工具仅作早期筛查参考，不能替代专业评估。</li>
              <li>结果提示的是风险和观察方向，不是结论。</li>
              <li>工具没有后端和上传接口，数据只在当前页面临时保存。</li>
              <li>刷新或关闭页面后，当前筛查进度和结果会丢失。</li>
            </ul>
          </BoundaryBox>
        </section>

        <section className="mt-16">
          <SectionHeader align="center" title="常见误解" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {misconceptions.map(([title, desc]) => (
              <Card key={title} className="p-5">
                <h3 className="font-bold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader align="center" title="什么时候建议做一次家庭筛查？" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {timingSigns.map((group) => (
              <Card key={group.title} variant="soft">
                <h3 className="text-xl font-bold text-ink">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/85 px-3 py-1.5 text-sm text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="parts" className="mt-16">
          <SectionHeader
            align="center"
            title="筛查包含 3 大板块"
            description="每项任务观察不同的阅读相关能力，由家长全程施测和记录。"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {parts.map((part) => (
              <Card key={part.title}>
                <IconIllustration type={part.icon} />
                <h3 className="mt-4 text-lg font-bold text-ink">{part.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{part.desc}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/consent">
              <Button size="lg">立即开始筛查 →</Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}
