import { Phone, Mail, MapPin } from 'lucide-react';

const GOLD = '#C5A87A';
const GOLD_BORDER = 'rgba(197,168,122,0.28)';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const navLinks = [
    { label: '关于我们', id: 'about' },
    { label: '亚整所', id: 'aari' },
    { label: '核心项目', id: 'projects' },
    { label: '全国门店', id: 'stores' },
    { label: '专利', id: 'patents' },
    { label: '联系我们', id: 'contact' },
    { label: '招聘', id: 'recruit' },
  ];

  const socialLinks = [
    { label: '百家号', icon: '百' },
    { label: '抖言号', icon: '抖' },
    { label: '视频号', icon: '视' },
  ];

  const linkStyle: React.CSSProperties = {
    fontSize: 13,
    color: '#888',
    cursor: 'pointer',
    transition: 'color 0.2s',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
    padding: 0,
    textAlign: 'left',
    display: 'block',
  };

  return (
    <footer style={{
      background: '#fff',
      borderTop: `1px solid ${GOLD_BORDER}`,
      paddingTop: 72,
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        {/* Top section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: '#2C2C2C', letterSpacing: 2 }}>AARI</span>
              <span style={{ display: 'inline-block', width: 1, height: 18, background: GOLD_BORDER, margin: '0 10px', verticalAlign: 'middle' }} />
              <span style={{ fontSize: 16, color: '#555', letterSpacing: 4 }}>亚整所</span>
            </div>
            <p style={{ fontSize: 13, color: '#888', lineHeight: 2, marginBottom: 24, maxWidth: 300 }}>
              以克制美学与专业医疗，为成熟肌肤提供长期年轻化管理。东方审美与国际医美技术的高端融合。
            </p>
            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MapPin size={14} color={GOLD} strokeWidth={1.5} />
                <span style={{ fontSize: 13, color: '#777' }}>中国·杭州·钱江新城</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Phone size={14} color={GOLD} strokeWidth={1.5} />
                <span style={{ fontSize: 13, color: '#777' }}>400-880-8838</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Mail size={14} color={GOLD} strokeWidth={1.5} />
                <span style={{ fontSize: 13, color: '#777' }}>service@aari-clinic.com</span>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#333', letterSpacing: 2, marginBottom: 24, paddingBottom: 12, borderBottom: `1px solid ${GOLD_BORDER}` }}>
              快速导航
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  style={linkStyle}
                  onClick={() => { onNavigate(link.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core Projects */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#333', letterSpacing: 2, marginBottom: 24, paddingBottom: 12, borderBottom: `1px solid ${GOLD_BORDER}` }}>
              核心项目
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['眼袋年轻化', '面部抗衰', '皮肤管理', 'FUE植发', '双眼皮精雕', '腋下管理'].map((item) => (
                <button
                  key={item}
                  style={linkStyle}
                  onClick={() => { onNavigate('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Social & Follow */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#333', letterSpacing: 2, marginBottom: 24, paddingBottom: 12, borderBottom: `1px solid ${GOLD_BORDER}` }}>
              关注我们
            </h4>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              {socialLinks.map((social) => (
                <div
                  key={social.label}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: `1px solid ${GOLD_BORDER}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    fontSize: 12,
                    color: '#888',
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = GOLD;
                    (e.currentTarget as HTMLDivElement).style.color = '#fff';
                    (e.currentTarget as HTMLDivElement).style.borderColor = GOLD;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                    (e.currentTarget as HTMLDivElement).style.color = '#888';
                    (e.currentTarget as HTMLDivElement).style.borderColor = GOLD_BORDER;
                  }}
                  title={social.label}
                >
                  {social.icon}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#aaa', lineHeight: 1.8 }}>
              百家号 · 抖言号 · 视频号<br />
              关注亚整所官方账号<br />
              获取专业医美资讯
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD_BORDER}, transparent)`, marginBottom: 28 }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 28,
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div style={{ fontSize: 12, color: '#bbb', letterSpacing: 0.5 }}>
            © 2024 亚整所 AARI Medical Aesthetics. All Rights Reserved.
          </div>
          <div style={{ fontSize: 12, color: '#bbb', letterSpacing: 0.5, textAlign: 'center' }}>
            浙ICP备XXXXXXXX号-1 ｜ 医疗广告审查证明文号占位 ｜ 浙卫健广审字（2024）
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['隐私政策', '服务条款', '免责声明'].map((item) => (
              <span key={item} style={{ fontSize: 12, color: '#bbb', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#bbb')}
              >{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
