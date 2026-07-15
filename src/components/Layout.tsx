import { Link } from 'react-router-dom'
import { useState, type ReactNode } from 'react'
import { BrandLogo } from './BrandLogo'

interface LayoutProps {
  children: ReactNode
  showNav?: boolean
}

type NavItem =
  | { kind: 'route'; label: string; to: string }
  | { kind: 'anchor'; label: string; href: string }

const navItems: NavItem[] = [
  { kind: 'anchor', label: '关于筛查', href: '/#about' },
  { kind: 'route', label: '知识库', to: '/learn' },
  { kind: 'route', label: '关于工具', to: '/about' },
  { kind: 'route', label: '干预材料', to: '/intervention' },
  { kind: 'anchor', label: '筛查内容', href: '/#parts' },
]

export function Layout({ children, showNav = true }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="flex min-h-screen flex-col">
      {showNav && (
        <header className="sticky top-0 z-50 border-b border-white/70 bg-cream/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
            <Link
              to="/"
              className="flex min-w-0 items-center no-underline"
              aria-label="识光｜儿童中文阅读支持"
              onClick={closeMenu}
            >
              <BrandLogo />
            </Link>

            <nav className="hidden flex-wrap items-center gap-2 text-sm font-medium text-slate-600 lg:flex">
              {navItems.map((item) =>
                item.kind === 'route' ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-full px-3 py-2 hover:bg-white/80 hover:text-book-blue"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-full px-3 py-2 hover:bg-white/80 hover:text-book-blue"
                  >
                    {item.label}
                  </a>
                ),
              )}
              <Link to="/consent" className="rounded-full bg-book-blue px-4 py-2 text-white hover:bg-brand-700">
                开始筛查
              </Link>
            </nav>

            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white/80 text-book-blue shadow-sm transition hover:bg-book-blue-soft focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-book-blue/30 lg:hidden"
              aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? '关闭导航菜单' : '打开导航菜单'}</span>
              <span className="flex h-5 w-5 flex-col justify-center gap-1.5">
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition ${
                    menuOpen ? 'translate-y-2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition ${
                    menuOpen ? '-translate-y-2 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>

          {menuOpen && (
            <div className="border-t border-blue-100/70 bg-cream/95 px-4 pb-4 shadow-[0_18px_35px_rgba(38,52,69,0.08)] lg:hidden">
              <nav className="mx-auto grid max-w-6xl gap-2 pt-3 text-base font-medium text-slate-700">
                {navItems.map((item) =>
                item.kind === 'route' ? (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={closeMenu}
                      className="rounded-2xl bg-white/70 px-4 py-3 hover:bg-book-blue-soft hover:text-book-blue"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      className="rounded-2xl bg-white/70 px-4 py-3 hover:bg-book-blue-soft hover:text-book-blue"
                    >
                      {item.label}
                    </a>
                  ),
                )}
                <Link
                  to="/consent"
                  onClick={closeMenu}
                  className="rounded-2xl bg-book-blue px-4 py-3 text-center font-semibold text-white hover:bg-brand-700"
                >
                  开始筛查
                </Link>
              </nav>
            </div>
          )}
        </header>
      )}
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/70 bg-white/55 px-4 py-8 text-center text-sm text-slate-500">
        <p className="font-medium text-slate-600">识光｜儿童中文阅读支持</p>
        <p className="mx-auto mt-2 max-w-2xl leading-relaxed">
          本工具仅作早期筛查参考，数据不上传，不能替代医疗、心理、语言治疗、教育心理或特殊教育专业评估。
        </p>
        <p className="mt-2">建议在家长陪同下完成 · 约 15-20 分钟</p>
      </footer>
    </div>
  )
}
