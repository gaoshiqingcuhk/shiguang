import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { BoundaryBox } from '../components/BoundaryBox'
import { Card } from '../components/Card'
import { IconIllustration } from '../components/IconIllustration'
import { PageHero } from '../components/PageHero'
import { SectionHeader } from '../components/SectionHeader'

const releaseBase = 'https://github.com/gaoshiqingcuhk/shiguang/releases/download/intervention-materials-v1'

const interventionPacks = [
  {
    id: 'ran',
    title: '快速自动命名 RAN 干预材料包',
    subtitle: '命名速度与视觉-语言提取练习',
    description:
      '适合在老师或家长陪伴下，围绕数字、颜色、图片等材料进行短时、低压力的快速命名练习。材料包包含教案、课件和部分视频素材，因此文件较大。',
    path: `${releaseBase}/ran.zip`,
    filename: 'RAN快速命名干预材料.zip',
    size: '约 1.0 GB',
    icon: 'timer' as const,
    variant: 'soft' as const,
    includes: ['15 课教案', '12 课课件', '视频 / 音频素材'],
    guidance: [
      '先确认孩子理解材料名称，再开始速度练习。',
      '建议以短时多次为主，记录卡顿、漏读、自我纠正和疲劳状态。',
      '学校小组场景可按材料设计多轮练习；家庭使用时应按孩子状态适当减少频次。',
    ],
  },
  {
    id: 'phonological',
    title: '语音意识干预材料包',
    subtitle: '音节、声母韵母与音素操作',
    description:
      '用于支持孩子觉察和操作普通话语音结构，例如音节分解、声母韵母辨析、音素分割、省略与组合，适合与声韵母重组任务后的观察一起使用。',
    path: `${releaseBase}/phonological-awareness.zip`,
    filename: '语音意识干预材料.zip',
    size: '约 1.6 MB',
    icon: 'sound' as const,
    variant: 'default' as const,
    includes: ['14 个课次相关教案', '13 份课件', '音素分割等练习'],
    guidance: [
      '先从孩子能听清、能说出的音节开始，不急于追求速度。',
      '练习时可让孩子口头拆分“声母 + 韵母 + 声调”，再逐步增加省略和组合任务。',
      '如果孩子明显紧张或混淆，先回到示例和熟悉词语，不把练习做成考试。',
    ],
  },
  {
    id: 'orthographic',
    title: '正字法意识干预材料包',
    subtitle: '笔画、部件、结构与形声线索',
    description:
      '用于支持孩子观察汉字的笔画、部件位置、左右上下结构、形旁声旁和形近字差异，适合与认字、听写和错字整理结合使用。',
    path: `${releaseBase}/orthographic-awareness.zip`,
    filename: '正字法意识干预材料.zip',
    size: '约 124 MB',
    icon: 'book' as const,
    variant: 'highlight' as const,
    includes: ['15 课教案', '配套课件', 'PDF / Word 教案文件'],
    guidance: [
      '优先选择孩子经常混淆的字形或部件作为练习入口。',
      '引导孩子说出“哪里一样、哪里不同”，不要只要求反复抄写。',
      '可与学校错字本、听写反馈和课堂观察一起使用。',
    ],
  },
  {
    id: 'morpheme',
    title: '语素意识干预材料包',
    subtitle: '词义、组词与语素拆分组合',
    description:
      '用于帮助孩子把汉字、词语和意义联系起来，练习组词、词义辨析、语素拆分与组合，适合作为阅读理解和词汇支持材料。',
    path: `${releaseBase}/morpheme-awareness.zip`,
    filename: '语素意识干预材料.zip',
    size: '约 39 MB',
    icon: 'support' as const,
    variant: 'success' as const,
    includes: ['15 课教案', '配套课件', '总复习材料'],
    guidance: [
      '从孩子熟悉的词语开始，再逐步扩展到新词和近义词。',
      '鼓励孩子解释词义、举例造句，而不是只背标准答案。',
      '适合与亲子阅读、课文词语复习和老师反馈结合使用。',
    ],
  },
]

const sharedPrinciples = [
  '一次只选一类主要困难切入，不建议把四套材料同时全部压给孩子。',
  '每次练习保持短、清楚、可完成，观察孩子是否更愿意读、更能理解任务。',
  '把表现记录下来，包括明显进步、困难点、情绪状态和需要老师协助的地方。',
  '材料只能作为支持工具，不能承诺固定效果，也不能替代专业评估或个别化教育判断。',
]

const useScenarios = [
  {
    title: '家庭使用',
    text: '家长可根据筛查报告和日常作业表现，选择最贴近孩子困难的一小部分材料。建议先从 10 分钟以内的练习开始，保持鼓励和陪伴。',
  },
  {
    title: '教师参考',
    text: '老师可把材料拆成课堂小游戏、小组练习或课后支持活动，并结合课堂朗读、听写、作业订正和阅读理解表现进行观察。',
  },
  {
    title: '跟进记录',
    text: '建议每 2-4 周回看一次练习记录，关注孩子的具体变化，而不是只看某一次练习的快慢或对错。',
  },
]

export function InterventionPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <PageHero
          eyebrow="干预资源"
          title="筛查后的支持材料"
          description="这里提供四类已整理去署名的干预材料包，供家长和老师在筛查后参考使用。材料用于日常支持和教学活动设计，不构成诊断、治疗承诺或教育安置依据。"
          visual={<IconIllustration type="support" className="mx-auto h-32 w-32 text-leaf-green" />}
        >
          <Link to="/result">
            <Button variant="secondary">查看筛查报告</Button>
          </Link>
          <Link to="/learn">
            <Button>阅读知识库</Button>
          </Link>
        </PageHero>

        <section className="mt-10">
          <SectionHeader
            eyebrow="下载材料"
            title="四种干预方式材料包"
            description="每个压缩包都包含对应方向的教案和课件，RAN 材料包还包含部分视频素材。下载后请先解压，再按课次和孩子状态选择使用。"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {interventionPacks.map((pack) => (
              <Card key={pack.id} variant={pack.variant} className="flex h-full flex-col">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white/75 p-3 text-book-blue shadow-sm">
                    <IconIllustration type={pack.icon} className="h-12 w-12" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-book-blue">{pack.subtitle}</p>
                    <h3 className="mt-1 text-xl font-bold leading-snug text-ink">{pack.title}</h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-700">{pack.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {pack.includes.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/75 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white/65 p-4">
                  <p className="text-sm font-bold text-slate-800">使用提示</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                    {pack.guidance.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-book-blue/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-5">
                  <p className="mb-3 text-xs font-medium text-slate-500">压缩包大小：{pack.size}</p>
                  <a
                    href={pack.path}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-book-blue px-5 py-3 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-book-blue/30"
                  >
                    下载 {pack.filename}
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            eyebrow="使用前先看"
            title="怎么选择和使用这些材料？"
            description="筛查报告只能提示需要关注的方向，真正使用材料时还要结合孩子平时作业、阅读、课堂反馈和家庭观察。"
          />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {useScenarios.map((scenario) => (
              <Card key={scenario.title}>
                <h3 className="text-lg font-bold text-ink">{scenario.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{scenario.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader title="共同使用原则" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {sharedPrinciples.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-blue-100 bg-white/75 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <BoundaryBox title="重要边界" tone="warning">
            <p>
              这些材料用于阅读相关能力支持和教学参考，不用于诊断阅读障碍，也不应单独作为排除阅读障碍、教育安置或干预方案选择的依据。如果孩子在阅读、书写、听说理解或学习情绪上持续明显困难，建议结合学校反馈并寻求专业评估。
            </p>
          </BoundaryBox>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/learn">
            <Button variant="secondary">了解阅读困难</Button>
          </Link>
          <Link to="/">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
