import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { PageHero } from '../components/PageHero'
import { SectionHeader } from '../components/SectionHeader'
import { BoundaryBox } from '../components/BoundaryBox'
import { IconIllustration } from '../components/IconIllustration'

const coveredAbilities = [
  {
    title: '汉字识别',
    desc: '观察儿童对常见汉字的认读表现，以及字形到读音的提取是否稳定。',
    icon: 'book' as const,
  },
  {
    title: '快速自动命名',
    desc: '观察儿童看到熟悉数字或图片后，快速说出名称的速度和连续性。',
    icon: 'timer' as const,
  },
  {
    title: '声韵母重组',
    desc: '观察普通话声母、韵母和声调的加工，以及重新组合音节的能力。',
    icon: 'sound' as const,
  },
]

const uncoveredAbilities = [
  '语素意识',
  '正字法意识',
  '阅读理解',
  '阅读流畅性',
  '书写错误',
  '课堂长期表现',
  '家长/教师量表',
  '专业访谈和标准化测验',
]

export function AboutPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <PageHero
          eyebrow="关于本工具"
          title="一个面向家庭的中文阅读困难早期筛查工具"
          description="识光面向 7–12 岁儿童，由家长作为施测员完成。它用于提示阅读相关风险和整理观察线索，不替代专业评估。"
          visual={<IconIllustration type="privacy" className="mx-auto h-32 w-32 text-leaf-green" />}
        >
          <Link to="/learn">
            <Button variant="secondary" size="lg">阅读知识库</Button>
          </Link>
          <Link to="/consent">
            <Button size="lg">开始筛查</Button>
          </Link>
        </PageHero>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card>
            <SectionHeader title="工具定位" />
            <p className="mt-5 leading-relaxed text-slate-600">
              本工具适用于家长在相对安静、稳定的家庭环境中进行早期观察。家长负责计时、判分和记录，报告结果用于帮助家长决定是否继续观察、与老师沟通或寻求进一步评估。
            </p>
            <p className="mt-3 leading-relaxed text-slate-600">
              本工具不是完整评估，也不能替代医疗、心理、语言治疗、教育心理或特殊教育专业人员的判断。任何结果都应结合孩子长期学习表现理解。
            </p>
          </Card>
          <Card variant="soft">
            <SectionHeader title="为什么是中文阅读筛查？" />
            <p className="mt-5 leading-relaxed text-slate-600">
              英文阅读困难材料可以作为早期识别和支持性环境的大框架参考，但中文阅读有自身文字系统特点。简体中文阅读涉及汉字形、音、义整合，普通话声母、韵母、声调加工，以及偏旁部首、部件位置、语素和正字法线索。
            </p>
          </Card>
        </section>

        <section className="mt-16">
          <SectionHeader title="当前覆盖的能力" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {coveredAbilities.map((item) => (
              <Card key={item.title}>
                <IconIllustration type={item.icon} />
                <h3 className="mt-4 font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <Card>
            <SectionHeader
              title="当前尚未覆盖的能力"
              description="阅读能力很复杂，当前版本尚未覆盖以下内容，因此不能作为完整评估。"
            />
            <div className="mt-6 flex flex-wrap gap-3">
              {uncoveredAbilities.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-book-blue-soft px-4 py-2 text-sm text-book-blue"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <Card variant="success">
            <IconIllustration type="privacy" className="text-leaf-green" />
            <h2 className="mt-4 text-xl font-bold text-ink">隐私与数据安全</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
              <li>无登录、无后端、无数据库。</li>
              <li>无上传接口，不采集音频、视频或照片。</li>
              <li>当前筛查数据只保存在浏览器临时状态中。</li>
              <li>刷新或关闭页面后，当前进度和结果会丢失。</li>
            </ul>
          </Card>
          <BoundaryBox title="重要边界" tone="warning">
            <ul className="space-y-2">
              <li>本工具仅作家庭早期筛查参考。</li>
              <li>结果不能单独作为阅读障碍诊断、排除或教育安置依据。</li>
              <li>结果不能作为教育安置或医疗决策唯一依据。</li>
              <li>如持续担心，请联系学校或相关专业人员。</li>
            </ul>
          </BoundaryBox>
        </section>

        <section className="mt-16">
          <Card>
            <SectionHeader title="参考依据与后续核查" />
            <p className="mt-5 leading-relaxed text-slate-600">
              当前页面采用保守、非诊断性表达。后续建议人工核查 DSM-5/DSM-5-TR、ICD-11、中文儿童阅读障碍流行病学研究、DCCC 量表研究、语素意识 / 正字法意识 / 快速命名相关研究、义务教育语文课程标准等资料，再补充完整参考文献。
            </p>
          </Card>
        </section>
      </div>
    </Layout>
  )
}
