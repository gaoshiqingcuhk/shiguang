import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { BoundaryBox } from '../components/BoundaryBox'
import { PageHero } from '../components/PageHero'
import { IconIllustration } from '../components/IconIllustration'

export function ConsentPage() {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <PageHero
          eyebrow="开始前请阅读"
          title="知情同意与隐私声明"
          description="请家长确认本工具的隐私方式、使用边界和免责声明，再进入基本信息填写。"
          visual={<IconIllustration type="privacy" className="mx-auto h-28 w-28 text-leaf-green" />}
        />

        {/* Privacy Statement */}
        <Card className="mt-8 sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <span>🛡️</span> 隐私与数据安全声明
          </h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              本筛查工具（以下简称"本工具"）为本地运行的 Web 应用程序，严格遵守个人信息保护相关法律法规。在您使用本工具之前，请仔细阅读以下隐私与数据安全条款：
            </p>

            <h3 className="font-semibold text-slate-800">一、数据本地化原则</h3>
            <p>
              本工具所有代码均运行在您的本地浏览器环境中。您填写的所有信息——包括但不限于儿童年龄、年级、测试作答结果、计时数据以及最终筛查报告——<strong>均仅存储于您当前设备的浏览器临时内存中</strong>。本工具<strong>不包含任何后台服务器、云端数据库或第三方数据接收端点</strong>，不会通过网络将您的数据发送至任何远程位置。
            </p>

            <h3 className="font-semibold text-slate-800">二、数据不收集、不传输、不保留</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>不收集：</strong>本工具不具备用户注册、登录或账号体系，不要求您提供姓名、联系方式、电子邮箱或其他可识别个人身份的信息。</li>
              <li><strong>不传输：</strong>本工具不含任何数据上报、遥测、统计分析或第三方 SDK 嵌入，不会将任何测试数据发送至开发者或任何第三方。</li>
              <li><strong>不保留：</strong>关闭或刷新浏览器页面后，所有测试数据即被自动清除，不会在您的设备上留下持久化记录。</li>
            </ul>

            <h3 className="font-semibold text-slate-800">三、家长/监护人的责任</h3>
            <p>
              作为施测者，您应当在私人、安全的设备上使用本工具。如需保存筛查报告，建议使用截图或打印功能自行留存。请勿在公共电脑或他人设备上进行测试，以免数据被他人查看。
            </p>

            <h3 className="font-semibold text-slate-800">四、儿童信息保护</h3>
            <p>
              本工具不采集儿童的姓名、照片、音频、视频或其他生物识别信息。测试过程中，所有作答判断均由家长在本地完成，儿童的语音或书写内容不会被录制或传输。
            </p>
          </div>
        </Card>

        {/* Medical Disclaimer */}
        <BoundaryBox title="医学免责声明" tone="warning">
          <div className="mt-4 space-y-3 text-sm text-amber-800 leading-relaxed">
            <p>
              在使用本工具之前，请您务必理解并确认以下事项：
            </p>

            <h3 className="font-semibold text-amber-900">一、筛查 ≠ 诊断</h3>
            <p>
              本工具的设计依据为阅读困难相关公开研究中的筛查维度，<strong>其本质为早期风险筛查工具，而非临床评估工具</strong>。筛查结果仅反映儿童在特定任务中的表现，不能等同于专业评估结论。
            </p>

            <h3 className="font-semibold text-amber-900">二、假阳性与假阴性的可能性</h3>
            <p>
              任何筛查工具都存在一定局限：筛查结果为"高风险"的儿童，经过专业评估后可能并不符合阅读障碍相关判断；筛查结果为"低风险"的儿童，也可能存在未被本工具覆盖的阅读困难。因此，<strong>本工具的结果不应作为任何教育安置、医疗决策或干预方案选择的唯一依据</strong>。
            </p>

            <h3 className="font-semibold text-amber-900">三、专业评估不可替代</h3>
            <p>
              阅读相关困难需要由具备资质的专业人士——包括但不限于儿童临床心理、言语语言、教育心理、特殊教育等方向的专业人员——结合标准化测验、长期观察和综合评估后理解。如您对孩子的阅读发展有任何疑虑，<strong>请咨询具备资质的专业机构或专业人员</strong>，切勿仅凭本筛查结果自行做出重要决定。
            </p>

            <h3 className="font-semibold text-amber-900">四、开发者免责</h3>
            <p>
              本工具按"现状"提供，开发者不对筛查结果的准确性、完整性或适用性作任何明示或默示的保证。在适用法律允许的最大范围内，开发者对于因使用或依赖本工具筛查结果而产生的任何直接或间接损失或损害，不承担法律责任。
            </p>
          </div>
        </BoundaryBox>

        {/* Agreement Checkbox */}
        <Card className="mt-8 sm:p-8">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-slate-700 leading-relaxed">
              我已仔细阅读并充分理解上述<b>隐私与数据安全声明</b>及<b>医学免责声明</b>的全部内容。我知晓本工具仅为早期筛查参考，不构成医疗诊断；我知晓所有数据仅保存于本地浏览器，不会被上传或传输。我同意在上述前提下使用本工具，并为使用结果自行承担责任。
            </span>
          </label>

          <div className="mt-6">
            <Button
              size="lg"
              className="w-full"
              disabled={!agreed}
              onClick={() => navigate('/start')}
            >
              {agreed ? '✅ 我已知晓并同意 · 进入基本信息填写' : '请先阅读并勾选同意上述声明'}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 no-underline">
              ← 返回首页
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
