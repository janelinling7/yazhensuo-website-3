import { useEffect, useRef, useState } from 'react';

const GOLD = '#C5A87A';
const GOLD_BORDER = 'rgba(197,168,122,0.32)';
const GLASS_BG = 'rgba(255,255,255,0.82)';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const TECHNOLOGIES = [
  { name: '皮秒激光系统', en: 'PicoSure', desc: '顶级皮秒激光技术，精准祛斑淡化色素，减少皮肤损伤，疗效显著。' },
  { name: '超声炮HIFU', en: 'HIFU Technology', desc: '高强度聚焦超声波技术，无创提升面部轮廓，刺激胶原再生。' },
  { name: 'ARTAS机器人', en: 'ARTAS Robot', desc: '智能植发机器人系统，精准提取毛囊单位，大幅降低人工误差。' },
  { name: '射频紧肤技术', en: 'RF Technology', desc: '多极射频热能作用于皮下层，促进胶原收缩与新生，改善肌肤松弛。' },
];

const EXPERTS = [
  { name: '李明华 教授', role: '首席医学顾问', spec: '眼部年轻化 · 面部抗衰', exp: '28年' },
  { name: '张雅涵 主任医师', role: '皮肤科专家', spec: '激光美肤 · 皮肤管理', exp: '20年' },
  { name: '王建国 副主任医师', role: '毛发医学专家', spec: '毛发移植 · 头皮治疗', exp: '16年' },
  { name: '陈晓琳 主治医师', role: '注射美容专家', spec: '抗衰注射 · 轮廓塑造', exp: '14年' },
];

const SERVICES = [
  { title: '专属顾问服务', desc: '一对一专属美学顾问全程陪伴，从咨询到术后跟进，保障服务体验的连贯性与温度。' },
  { title: '院前评估系统', desc: '采用AI面部分析系统与医师专业评估相结合，科学制定个性化改善方案。' },
  { title: '术后精细管理', desc: '完整的术后护理流程与定期复诊机制，确保恢复进程得到专业监护。' },
  { title: '私密空间设计', desc: '每间诊疗室均以私密性为设计核心，营造舒适安心的医疗服务环境。' },
];

const ARTICLES = [
  { tag: '项目科普', title: '眼袋形成的原因与常见误区解析', date: '2024.12', read: '4 min' },
  { tag: '护理建议', title: '激光术后修复期的皮肤管理指南', date: '2024.11', read: '5 min' },
  { tag: '品牌动态', title: '亚整所杭州旗舰店环境升级开放', date: '2024.10', read: '3 min' },
  { tag: '项目科普', title: 'FUE植发术前须知与恢复周期说明', date: '2024.09', read: '6 min' },
];

export function AariPage() {
  const techReveal = useScrollReveal();
  const expertReveal = useScrollReveal();
  const serviceReveal = useScrollReveal();
  const envReveal = useScrollReveal();
  const articleReveal = useScrollReveal();

  return (
    <div style={{ paddingTop: 76, background: '#FDFBF7' }}>
      {/* Hero */}
      <section style={{ background: '#fff', padding: '80px 0 60px', borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>AARI Clinic</div>
          <h1 style={{ fontSize: 44, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4, marginBottom: 20 }}>亚整所</h1>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 28px' }} />
          <p style={{ fontSize: 15, color: '#777', lineHeight: 2, maxWidth: 720, margin: '0 auto' }}>
            亚整所以专业医疗能力为核心，以精细化服务为体验，以空间美学为氛围，打造高端医疗美容的完整服务闭环。
          </p>
        </div>
      </section>

      {/* Professional Technology */}
      <section ref={techReveal.ref} style={{ padding: '100px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Technology</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>专业技术</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {TECHNOLOGIES.map((tech, i) => (
              <div
                key={i}
                style={{
                  background: GLASS_BG,
                  border: `1px solid ${GOLD_BORDER}`,
                  backdropFilter: 'blur(12px)',
                  padding: '36px 36px',
                  display: 'flex',
                  gap: 28,
                  opacity: techReveal.visible ? 1 : 0,
                  transform: techReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                  cursor: 'default',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = GOLD; el.style.boxShadow = '0 12px 36px rgba(197,168,122,0.1)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = GOLD_BORDER; el.style.boxShadow = 'none'; }}
              >
                <div style={{ minWidth: 56, height: 56, border: `1px solid ${GOLD_BORDER}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: GOLD, letterSpacing: 1, textAlign: 'center', lineHeight: 1.3, padding: '0 8px' }}>
                    {tech.en.split(' ')[0]}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 400, color: '#2C2C2C', marginBottom: 6, letterSpacing: 1 }}>{tech.name}</h3>
                  <div style={{ fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>{tech.en}</div>
                  <p style={{ fontSize: 13, color: '#777', lineHeight: 1.9 }}>{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section ref={expertReveal.ref} style={{ padding: '100px 0', background: '#fff', borderTop: `1px solid ${GOLD_BORDER}`, borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Expert Team</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>专家团队</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {EXPERTS.map((exp, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  opacity: expertReveal.visible ? 1 : 0,
                  transform: expertReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                }}
              >
                {/* Avatar placeholder */}
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f5f0e8 0%, #ede6d8 100%)',
                  border: `2px solid ${GOLD_BORDER}`,
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  color: GOLD,
                }}>
                  <span style={{ fontFamily: "'Playfair Display', serif" }}>M</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 500, color: '#2C2C2C', marginBottom: 6 }}>{exp.name}</h3>
                <div style={{ fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 8 }}>{exp.role}</div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>{exp.spec}</div>
                <div style={{ display: 'inline-block', fontSize: 11, color: '#aaa', border: `1px solid ${GOLD_BORDER}`, padding: '3px 12px' }}>
                  从业 {exp.exp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Experience */}
      <section ref={serviceReveal.ref} style={{ padding: '100px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Service</div>
              <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4, marginBottom: 24 }}>贴心服务体验</h2>
              <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 36 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {SERVICES.map((svc, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 20,
                      opacity: serviceReveal.visible ? 1 : 0,
                      transform: serviceReveal.visible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                    }}
                  >
                    <div style={{ minWidth: 32, height: 32, borderRadius: '50%', background: 'rgba(197,168,122,0.12)', border: `1px solid ${GOLD_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, color: GOLD, fontFamily: "'Playfair Display', serif" }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 500, color: '#2C2C2C', marginBottom: 6 }}>{svc.title}</h4>
                      <p style={{ fontSize: 13, color: '#777', lineHeight: 1.9 }}>{svc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1648775507324-b48dd3791fa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="亚整所服务环境"
                style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(253,251,247,0.15), transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Store Environment */}
      <section ref={envReveal.ref} style={{ padding: '100px 0', background: '#fff', borderTop: `1px solid ${GOLD_BORDER}`, borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Environment</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>门店环境</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '240px 240px', gap: 16 }}>
            {[
              { src: 'https://images.unsplash.com/photo-1565452171067-f2b1384f958d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', span: 'row', label: '前台接待区' },
              { src: 'https://images.unsplash.com/photo-1600947871775-082dd97e2d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', span: '', label: '休息等候区' },
              { src: 'https://images.unsplash.com/photo-1648775507324-b48dd3791fa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', span: '', label: '医疗诊疗室' },
              { src: 'https://images.unsplash.com/photo-1739980737820-b6bb1a9b8456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', span: '', label: '术后恢复室' },
              { src: 'https://images.unsplash.com/photo-1767953802241-0c4876b84c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', span: '', label: '产品展示区' },
            ].map((img, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  gridRow: i === 0 ? 'span 2' : '',
                  opacity: envReveal.visible ? 1 : 0,
                  transform: envReveal.visible ? 'scale(1)' : 'scale(0.97)',
                  transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1.06)'; }}
                onMouseLeave={(e) => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1)'; }}
              >
                <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 13, color: '#fff', letterSpacing: 1 }}>{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beauty Articles */}
      <section ref={articleReveal.ref} style={{ padding: '100px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Insights</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>美容资讯</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {ARTICLES.map((art, i) => (
              <div
                key={i}
                style={{
                  background: GLASS_BG,
                  border: `1px solid ${GOLD_BORDER}`,
                  backdropFilter: 'blur(12px)',
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: articleReveal.visible ? 1 : 0,
                  transform: articleReveal.visible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = GOLD; el.style.transform = 'translateX(4px)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = GOLD_BORDER; el.style.transform = 'translateX(0)'; }}
              >
                <div style={{ textAlign: 'center', minWidth: 56 }}>
                  <div style={{ fontSize: 11, color: GOLD, letterSpacing: 1, marginBottom: 4 }}>{art.tag}</div>
                  <div style={{ fontSize: 11, color: '#bbb' }}>{art.date}</div>
                </div>
                <div style={{ width: 1, height: 40, background: GOLD_BORDER, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 400, color: '#2C2C2C', lineHeight: 1.5 }}>{art.title}</h4>
                  <div style={{ fontSize: 11, color: '#aaa', marginTop: 8 }}>阅读约 {art.read}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
