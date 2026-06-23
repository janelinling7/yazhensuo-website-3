import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const GOLD = '#C5A87A';
const GOLD_BORDER = 'rgba(197,168,122,0.32)';
const GLASS_BG = 'rgba(255,255,255,0.88)';

type NavItem = {
  id: string;
  label: string;
  columns: { title: string; items: string[] }[];
};

const NAV_DATA: NavItem[] = [
  {
    id: 'home',
    label: '首页',
    columns: [
      { title: '品牌形象', items: ['亚整所简介', '品牌故事'] },
      { title: '推荐项目', items: ['眼袋项目', '抗衰项目', '植发项目'] },
      { title: '预约入口', items: ['在线预约', '门店咨询'] },
    ],
  },
  {
    id: 'about',
    label: '关于我们',
    columns: [
      { title: '品牌介绍', items: ['品牌理念', '品牌文化'] },
      { title: '发展历程', items: ['里程碑', '荣誉资质'] },
      { title: '社会责任', items: ['公益项目', '医疗救助', '政府合作'] },
    ],
  },
  {
    id: 'aari',
    label: '亚整所',
    columns: [
      { title: '专业技术', items: ['核心技术', '医疗资质'] },
      { title: '专家团队', items: ['首席专家', '医师团队'] },
      { title: '服务体验', items: ['贴心服务', '门店环境', '医美产品'] },
      { title: '美容资讯', items: ['项目科普', '护理建议', '品牌动态'] },
    ],
  },
  {
    id: 'projects',
    label: '核心项目',
    columns: [
      { title: '眼部年轻化', items: ['微创眼袋祛除术', '激光眼袋紧致术', '眼袋术后修复'] },
      { title: '抗衰管理', items: ['时光逆流注射术', '射频紧肤与超声炮', '颈部抗衰套餐'] },
      { title: '皮肤管理', items: ['皮秒激光祛斑', '超皮秒联合中胚层', '激光术后修复'] },
      { title: '眼部精雕', items: ['埋线双眼皮', '切开双眼皮', '双眼皮修复', '内眼角开大'] },
      { title: '毛发医学', items: ['FUE无痕植发', 'ARTAS机器人植发', '非手术生发治疗'] },
      { title: '腋下管理', items: ['微创腋臭根治术', '微波腋臭治疗', '腋下脱毛', '腋下美白嫩肤'] },
    ],
  },
  {
    id: 'stores',
    label: '全国门店',
    columns: [
      { title: '城市门店', items: ['杭州旗舰店', '上海门店', '北京门店'] },
      { title: '门店服务', items: ['到店预约', '地址导航', '营业时间', '门店环境'] },
    ],
  },
  {
    id: 'patents',
    label: '专利',
    columns: [
      { title: '专利技术', items: ['核心专利介绍', '技术优势'] },
      { title: '专利证书', items: ['证书展示', '专业认证'] },
    ],
  },
  {
    id: 'contact',
    label: '联系我们',
    columns: [
      { title: '联系方式', items: ['总部地址', '企业热线', '客服邮箱'] },
      { title: '在线咨询', items: ['预约咨询', '意见反馈'] },
      { title: '隐私政策', items: ['隐私声明', '信息保护'] },
    ],
  },
  {
    id: 'recruit',
    label: '招聘',
    columns: [
      { title: '人才理念', items: ['我们的文化', '成长空间'] },
      { title: '招聘岗位', items: ['医疗岗位', '运营岗位', '技术岗位'] },
      { title: '员工发展', items: ['培训体系', '晋升通道', '福利待遇'] },
    ],
  },
];

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
    setActiveMenu(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          background: GLASS_BG,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${GOLD_BORDER}`,
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76, padding: '0 40px' }}>
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: '#2C2C2C', letterSpacing: 2 }}>
              AARI
            </span>
            <span style={{ width: 1, height: 20, background: GOLD_BORDER, margin: '0 4px' }} />
            <span style={{ fontSize: 16, fontWeight: 400, color: '#444', letterSpacing: 4 }}>亚整所</span>
          </button>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', height: '100%' }} className="hidden-mobile">
            {NAV_DATA.map((item) => (
              <div
                key={item.id}
                style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleNav(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 16px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 14,
                    letterSpacing: 1,
                    color: currentPage === item.id ? GOLD : '#333',
                    transition: 'color 0.25s',
                    fontFamily: 'inherit',
                    position: 'relative',
                  }}
                >
                  {item.label}
                  <ChevronDown size={12} style={{ opacity: 0.5, transition: 'transform 0.25s', transform: activeMenu === item.id ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  {/* Active underline */}
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 16,
                    right: 16,
                    height: 2,
                    background: GOLD,
                    transform: currentPage === item.id ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                    transformOrigin: 'left',
                  }} />
                </button>

                {/* Mega Menu */}
                {item.columns.length > 0 && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 76,
                      left: 0,
                      width: '100%',
                      background: 'rgba(253,251,247,0.96)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderTop: `1px solid ${GOLD_BORDER}`,
                      borderBottom: `1px solid ${GOLD_BORDER}`,
                      boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                      opacity: activeMenu === item.id ? 1 : 0,
                      visibility: activeMenu === item.id ? 'visible' : 'hidden',
                      transform: activeMenu === item.id ? 'translateY(0)' : 'translateY(-8px)',
                      transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s',
                      padding: '36px 0',
                      zIndex: 999,
                    }}
                  >
                    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', display: 'flex', gap: 60 }}>
                      {item.columns.map((col) => (
                        <div key={col.title} style={{ minWidth: 130 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18, paddingBottom: 10, borderBottom: `1px solid ${GOLD_BORDER}` }}>
                            {col.title}
                          </div>
                          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {col.items.map((sub) => (
                              <li key={sub} style={{ marginBottom: 10 }}>
                                <button
                                  onClick={() => handleNav(item.id)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: 13,
                                    color: '#555',
                                    fontFamily: 'inherit',
                                    padding: 0,
                                    transition: 'color 0.2s, padding-left 0.2s',
                                    textAlign: 'left',
                                  }}
                                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = GOLD; (e.currentTarget as HTMLButtonElement).style.paddingLeft = '5px'; }}
                                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#555'; (e.currentTarget as HTMLButtonElement).style.paddingLeft = '0'; }}
                                >
                                  {sub}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => handleNav('contact')}
            className="hidden-mobile"
            style={{
              padding: '10px 28px',
              fontSize: 13,
              letterSpacing: 1.5,
              color: '#fff',
              background: `linear-gradient(135deg, #D4B896 0%, ${GOLD} 100%)`,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(197,168,122,0.3)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(197,168,122,0.4)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(197,168,122,0.3)'; }}
          >
            立即预约
          </button>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
          >
            {mobileOpen ? <X size={24} color="#333" /> : <Menu size={24} color="#333" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            background: 'rgba(253,251,247,0.98)',
            backdropFilter: 'blur(16px)',
            borderTop: `1px solid ${GOLD_BORDER}`,
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '16px 0 32px',
          }}>
            {NAV_DATA.map((item) => (
              <div key={item.id}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
                  <button
                    onClick={() => handleNav(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: currentPage === item.id ? GOLD : '#333', fontFamily: 'inherit', letterSpacing: 1 }}
                  >
                    {item.label}
                  </button>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                  >
                    <ChevronDown size={14} color={GOLD} style={{ transform: mobileExpanded === item.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </button>
                </div>
                {mobileExpanded === item.id && (
                  <div style={{ padding: '0 24px 16px 40px', borderBottom: `1px solid ${GOLD_BORDER}` }}>
                    {item.columns.map((col) => (
                      <div key={col.title} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>{col.title}</div>
                        {col.items.map((sub) => (
                          <div key={sub} style={{ fontSize: 13, color: '#666', padding: '4px 0', paddingLeft: 12 }}>{sub}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ padding: '20px 24px 0' }}>
              <button
                onClick={() => handleNav('contact')}
                style={{ width: '100%', padding: '14px', fontSize: 14, color: '#fff', background: `linear-gradient(135deg, #D4B896 0%, ${GOLD} 100%)`, border: 'none', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 2 }}
              >
                立即预约
              </button>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
