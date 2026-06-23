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

const TIMELINE = [
  { year: '2009', title: '品牌创立', desc: '亚整所在杭州创立，以专注医疗美容服务为使命，开启东方审美与医疗技术融合的探索。' },
  { year: '2013', title: '技术突破', desc: '引进国际先进光电设备，眼周年轻化项目获得行业认可，服务客户突破10,000例。' },
  { year: '2016', title: '全国布局', desc: '品牌正式开启全国化扩张，上海、北京分别开设直营门店，建立标准化服务体系。' },
  { year: '2018', title: '专利认证', desc: '获得多项医疗美容技术专利，成为行业内具有自主创新能力的专业医美机构。' },
  { year: '2020', title: '国际合作', desc: '与韩国、日本顶级医疗美容机构建立战略合作，引进ARTAS机器人植发系统。' },
  { year: '2022', title: '深度发展', desc: '全国门店突破20家，建立完整的医师培训体系，品牌满意度持续保持高水准。' },
  { year: '2024', title: '迈向新篇', desc: '品牌全面升级服务体系，以更专业的团队与更精细的技术，持续为客户提供高质量美学管理。' },
];

const VALUES = [
  { title: '专业可信', en: 'Professional', desc: '以医疗为本，以专业为准则，规范操作流程，严格把控质量标准。' },
  { title: '克制美学', en: 'Refined', desc: '尊重自然美学规律，拒绝过度干预，追求与个人气质相符的改善效果。' },
  { title: '安全优先', en: 'Safety First', desc: '建立完善的医疗安全管理体系，以客户安全为首要原则，风险管控贯穿全程。' },
  { title: '长期陪伴', en: 'Long-term Care', desc: '不止于单次服务，建立长期管理方案，持续跟进客户状态与恢复情况。' },
];

const SOCIAL = [
  { title: '公益救助', icon: '❤', items: ['面部修复救助计划', '农村医疗援助项目', '公益健康科普'] },
  { title: '医疗援助', icon: '🏥', items: ['先天性面部问题援助', '烧烫伤修复公益项目', '医美知识公益讲堂'] },
  { title: '政府合作', icon: '🏛', items: ['行业标准制定参与', '医美监管协作机制', '职业技能培训合作'] },
];

export function AboutPage() {
  const heroReveal = useScrollReveal();
  const valuesReveal = useScrollReveal();
  const timelineReveal = useScrollReveal();
  const socialReveal = useScrollReveal();

  return (
    <div style={{ paddingTop: 76, background: '#FDFBF7' }}>
      {/* Hero */}
      <section style={{ background: '#fff', padding: '80px 0', borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div ref={heroReveal.ref} style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease' }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 16, textTransform: 'uppercase' }}>About AARI</div>
              <h1 style={{ fontSize: 44, fontWeight: 300, color: '#2C2C2C', letterSpacing: 3, lineHeight: 1.3, marginBottom: 24 }}>关于<br />亚整所 AARI</h1>
              <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 28 }} />
              <p style={{ fontSize: 15, color: '#666', lineHeight: 2, marginBottom: 24 }}>
                亚整所 AARI 成立于2009年，是一家专注于高端医疗美容服务的专业品牌机构。我们以东方审美哲学为基础，融合国际先进医疗技术，为35至60岁成熟客群提供专业、安全、长期的年轻化管理方案。
              </p>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 2 }}>
                经过十余年的专注发展，亚整所已在全国主要城市建立了品质一致的直营服务网络，积累了超过10万余个服务案例，并持续获得行业认可与客户信赖。
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="亚整所空间"
                style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: -24, left: -24, background: GLASS_BG, border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(12px)', padding: '24px 32px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: GOLD }}>15+</div>
                <div style={{ fontSize: 13, color: '#666', letterSpacing: 1, marginTop: 4 }}>年品牌沉淀</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section ref={valuesReveal.ref} style={{ padding: '100px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Brand Values</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>品牌价值观</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {VALUES.map((val, i) => (
              <div
                key={i}
                style={{
                  background: GLASS_BG,
                  border: `1px solid ${GOLD_BORDER}`,
                  backdropFilter: 'blur(12px)',
                  padding: '40px 28px',
                  textAlign: 'center',
                  transition: 'all 0.4s ease',
                  cursor: 'default',
                  opacity: valuesReveal.visible ? 1 : 0,
                  transform: valuesReveal.visible ? 'translateY(0)' : 'translateY(28px)',
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(197,168,122,0.12)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD_BORDER; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: GOLD, letterSpacing: 3, marginBottom: 12, textTransform: 'uppercase' }}>{val.en}</div>
                <h3 style={{ fontSize: 22, fontWeight: 400, color: '#2C2C2C', marginBottom: 16, letterSpacing: 1 }}>{val.title}</h3>
                <div style={{ width: 30, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 20px' }} />
                <p style={{ fontSize: 13, color: '#777', lineHeight: 1.9 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineReveal.ref} style={{ padding: '100px 0', background: '#fff', borderTop: `1px solid ${GOLD_BORDER}`, borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Our Journey</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>发展历程</h2>
          </div>
          {/* Horizontal scrollable timeline */}
          <div style={{ position: 'relative', overflowX: 'auto', paddingBottom: 16 }}>
            <div style={{ display: 'flex', gap: 0, minWidth: 'max-content', position: 'relative' }}>
              {/* Line */}
              <div style={{ position: 'absolute', top: 28, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD_BORDER}, ${GOLD_BORDER}, transparent)` }} />
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  style={{
                    width: 220,
                    paddingTop: 64,
                    paddingRight: 24,
                    position: 'relative',
                    opacity: timelineReveal.visible ? 1 : 0,
                    transform: timelineReveal.visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
                  }}
                >
                  {/* Dot */}
                  <div style={{ position: 'absolute', top: 20, left: 0, width: 16, height: 16, borderRadius: '50%', background: '#fff', border: `2px solid ${GOLD}`, transform: 'translateY(-50%)', boxShadow: `0 0 0 4px rgba(197,168,122,0.15)` }} />
                  <div style={{ fontSize: 12, color: GOLD, letterSpacing: 2, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>{item.year}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2C', marginBottom: 10 }}>{item.title}</h4>
                  <p style={{ fontSize: 12, color: '#888', lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Responsibility */}
      <section ref={socialReveal.ref} style={{ padding: '100px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Social Responsibility</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>社会责任</h2>
            <p style={{ fontSize: 14, color: '#888', marginTop: 16, letterSpacing: 1 }}>超越商业价值，回馈社会，承担医疗机构的温度与责任</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {SOCIAL.map((s, i) => (
              <div
                key={i}
                style={{
                  background: GLASS_BG,
                  border: `1px solid ${GOLD_BORDER}`,
                  backdropFilter: 'blur(12px)',
                  padding: '40px 32px',
                  opacity: socialReveal.visible ? 1 : 0,
                  transform: socialReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 400, color: '#2C2C2C', marginBottom: 20, letterSpacing: 1 }}>{s.title}</h3>
                <div style={{ width: 40, height: 1, background: GOLD, marginBottom: 20 }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {s.items.map((item) => (
                    <li key={item} style={{ fontSize: 14, color: '#666', lineHeight: 2, paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: GOLD }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
