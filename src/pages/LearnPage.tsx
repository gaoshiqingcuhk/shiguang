import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { SectionHeader } from '../components/SectionHeader'
import { PageHero } from '../components/PageHero'
import { ChecklistCard } from '../components/ChecklistCard'
import { IconIllustration } from '../components/IconIllustration'

const commonSigns = [
  { title: '识字表现', items: ['认字速度慢', '生字记了又忘', '形近字混淆', '同音字容易用错'] },
  { title: '拼音和声韵调表现', items: ['声母韵母分辨吃力', '声调不稳定', '拼读组合困难', '听到音节后反应慢'] },
  { title: '朗读表现', items: ['跳字、漏字、添字', '读得很慢', '靠猜读完成', '读错后反复自我修正'] },
  { title: '阅读理解表现', items: ['读完抓不住主要内容', '题目看懂很慢', '需要反复读', '长文章容易疲劳'] },
  { title: '书写和听写表现', items: ['听写错误多', '错别字类型反复', '部件位置写错', '书面表达弱于口头表达'] },
  { title: '情绪与行为表现', items: ['回避阅读任务', '写语文作业耗时很长', '容易挫败', '害怕当众朗读'] },
]

const faqs = [
  ['这个测试能判断孩子就是阅读障碍吗？', '不能。本工具只提供家庭早期风险提示，不能替代医疗、心理、语言治疗、教育心理或特殊教育专业评估。'],
  ['孩子分数低是不是说明智力有问题？', '不是。阅读困难不等于智力低。需要关注的是孩子在识字、朗读、声韵调加工、阅读理解等具体任务中的持续困难。'],
  ['测试数据会上传吗？', '不会。当前工具没有后端、数据库或上传接口，数据只保存在当前浏览器页面的临时状态中。'],
  ['为什么刷新页面后结果没了？', '这是当前隐私设计的一部分。工具不做本地持久保存，刷新或关闭页面会清除当前筛查进度。'],
  ['家长可以提示孩子吗？', '不可以。家长应记录孩子第一次反应，不提示、不纠正、不引导，避免影响筛查结果。'],
  ['孩子紧张、不配合怎么办？', '可以暂停或改天再做。孩子疲劳、焦虑或抗拒时，结果可能不能反映平时状态。'],
  ['多久可以重新筛查一次？', '建议结合学校表现和家庭观察，不要频繁施压。若进行一段时间支持后仍担心，可间隔一段时间再筛查。'],
  ['快速自动命名为什么不参与综合得分？', '当前版本只把它作为观察信息，记录用时和异常备注，暂不设置风险阈值，也不纳入综合得分。'],
  ['如果结果提示“建议进一步评估”，下一步可以找谁？', '建议保存报告和日常作业样本，与语文老师沟通，并咨询教育心理、语言治疗、儿童发展或特殊教育专业人员。'],
  ['中文阅读障碍和英文 dyslexia 一样吗？', '它们都属于阅读学习困难的大框架，但中文有汉字形、音、义整合和声韵调加工等特点，不能直接照搬英文拼读材料。'],
]

export function LearnPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <PageHero
          eyebrow="家长知识库"
          title="先理解困难，再温和地支持孩子"
          description="阅读困难不是简单的“不努力”。家长可以从具体表现入手，持续观察孩子在识字、朗读、声韵调、阅读理解和书写中的状态，再决定是否需要进一步沟通或评估。"
          visual={<IconIllustration type="book" className="mx-auto h-32 w-32 text-book-blue" />}
        >
          <Link to="/consent">
            <Button size="lg">开始筛查</Button>
          </Link>
          <Link to="/about">
            <Button variant="secondary" size="lg">了解工具边界</Button>
          </Link>
        </PageHero>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card>
            <IconIllustration type="support" className="text-leaf-green" />
            <h2 className="mt-4 text-xl font-bold text-ink">阅读障碍不是孩子懒</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              有些孩子很想学好，但在文字加工、语音加工、快速命名、语素或正字法线索使用上更吃力。与其贴标签，不如把困难拆成可观察、可支持的小问题。
            </p>
          </Card>
          <Card variant="soft">
            <IconIllustration type="sound" />
            <h2 className="mt-4 text-xl font-bold text-ink">中文阅读有自己的特点</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              汉字不是拼音文字。中文阅读需要整合字形、读音和意义，也会用到偏旁部首、部件位置、形旁声旁、语素意义，以及普通话声母、韵母和声调。
            </p>
          </Card>
        </section>

        <section className="mt-16">
          <SectionHeader
            title="常见表现"
            description="下面是家长和老师可以留意的表现。它们只是观察线索，不代表孩子一定存在阅读障碍。"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {commonSigns.map((group) => (
              <ChecklistCard key={group.title} title={group.title} items={group.items} />
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <ChecklistCard
            title="家长可以怎么观察？"
            variant="soft"
            items={[
              '连续观察一段时间，不只看一次测试表现',
              '记录具体错误，例如形近字、同音字、跳读、漏读',
              '留意孩子当天状态，例如疲劳、焦虑、身体不适',
              '保存作业、听写、朗读表现样本，便于和老师沟通',
            ]}
          />
          <ChecklistCard
            title="老师可以怎么观察？"
            variant="highlight"
            items={[
              '朗读速度、准确性和是否跳字漏字',
              '听写错误是否多且类型反复',
              '阅读理解题是否明显吃力',
              '口头表达尚可但书面表现明显偏弱的情况',
            ]}
          />
        </section>

        <section className="mt-16">
          <SectionHeader title="筛查后怎么办？" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card variant="success">
              <p className="font-bold text-emerald-700">低风险</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                继续保持轻松阅读，结合平时作业、朗读和老师反馈观察。
              </p>
            </Card>
            <Card variant="warning">
              <p className="font-bold text-orange-700">需关注</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                记录具体困难，与语文老师沟通，尝试短时间、低压力支持。
              </p>
            </Card>
            <Card variant="danger">
              <p className="font-bold text-rose-700">建议进一步评估</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                保存报告和学习样本，联系学校或相关专业人员进一步了解。
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader title="FAQ" description="把家长最常问的问题放在一起，便于筛查前后快速查阅。" />
          <div className="mt-8 space-y-4">
            {faqs.map(([q, a]) => (
              <details
                key={q}
                className="group rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                  {q}
                  <span className="rounded-full bg-book-blue-soft px-2 py-1 text-xs text-book-blue group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
