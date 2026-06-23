import { useEffect, useRef, useState } from 'react';
import { Award, Shield, CheckCircle } from 'lucide-react';

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
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const PATENTS = [
  { no: 'ZL 202X XXXXXXXX.X', name: '一种微创眼袋祛除辅助定位装置', year: '2022', type: '实用新型', status: '有效' },
  { no: 'ZL 202X XXXXXXXX.X', name: '毛囊单位精准提取与植入系统', year: '2021', type: '发明专利', status: '有效' },
  { no: 'ZL 202X XXXXXXXX.X', name: '激光术后皮肤修复评估方法', year: '2021', type: '发明专利', status: '有效' },
  { no: 'ZL 202X XXXXXXXX.X', name: '低能量射频紧肤能量传导装置', year: '2020', type: '实用新型', status: '有效' },
  { no: 'ZL 202X XXXXXXXX.X', name: '面部轮廓三维评估数字化系统', year: '2023', type: '软件著作权', status: '有效' },
  { no: 'ZL 202X XXXXXXXX.X', name: '植发术前发际线设计辅助工具', year: '2022', type: '外观设计', status: '有效' },
];

const ADVANTAGES = [
  { icon: Shield, title: '安全合规', desc: '所有技术经过国家药监局审批认证，严格遵守医疗操作规范，安全可靠。' },
  { icon: Award, title: '独立知识产权', desc: '持有多项自主研发专利，在关键技术环节具备核心竞争力。' },
  { icon: CheckCircle, title: '临床验证', desc: '专利技术均经过系统性临床验证，实际应用案例数据支撑效果可信度。' },
];

const CERTS = [
  { name: '医疗机构执业许可证', no: '浙医机证 XXXXXXXX 号', year: '年审有效' },
  { name: '医疗广告审查证明', no: '浙卫健广审字（2024）', year: '年审有效' },
  { name: 'ISO 9001 质量管理认证', no: 'CN-XXXXX-QMS', year: '2024 有效期内' },
  { name: 'AAA 级医疗服务机构', no: '中国整形美容协会认证', year: '2023 有效期内' },
  { name: '国家卫健委互联网诊疗许可', no: '浙互联网诊 XXXX 号', year: '年审有效' },
  { name: '高新技术企业认定证书', no: 'GR2XXXXXXXXXXXXX', year: '2024–2027' },
];

export function PatentsPage() {
  const patentsReveal = useScrollReveal();
  const certsReveal = useScrollReveal();
  const advReveal = useScrollReveal();

  return (
    <div style={{ paddingTop: 76, background: '#FDFBF7' }}>
      {/* Hero */}
      <section style={{ background: '#fff', padding: '80px 0 60px', borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Patents & Certifications</div>
          <h1 style={{ fontSize: 44, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4, marginBottom: 20 }}>专利资质</h1>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 28px' }} />
          <p style={{ fontSize: 15, color: '#777', lineHeight: 2, maxWidth: 680, margin: '0 auto' }}>
            亚整所以科技创新为驱动，持有多项自主研发专利，并获得国内外权威医疗机构认证，以实力佐证专业。
          </p>
        </div>
      </section>

      {/* Tech Advantages */}
      <section ref={advReveal.ref} style={{ padding: '100px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Technology</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>专利技术</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 80 }}>
            {ADVANTAGES.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: GLASS_BG,
                    border: `1px solid ${GOLD_BORDER}`,
                    backdropFilter: 'blur(12px)',
                    padding: '44px 36px',
                    textAlign: 'center',
                    opacity: advReveal.visible ? 1 : 0,
                    transform: advReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD_BORDER; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: '50%', border: `1px solid ${GOLD_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Icon size={24} color={GOLD} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 400, color: '#2C2C2C', marginBottom: 16, letterSpacing: 1 }}>{adv.title}</h3>
                  <p style={{ fontSize: 13, color: '#777', lineHeight: 1.9 }}>{adv.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Patents table */}
          <div ref={patentsReveal.ref}>
            <h3 style={{ fontSize: 22, fontWeight: 300, color: '#2C2C2C', letterSpacing: 3, marginBottom: 32 }}>专利列表</h3>
            <div style={{ border: `1px solid ${GOLD_BORDER}`, overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: 'rgba(197,168,122,0.08)', padding: '14px 24px', borderBottom: `1px solid ${GOLD_BORDER}` }}>
                {['专利名称', '专利号', '授权年份', '专利类型'].map((h) => (
                  <div key={h} style={{ fontSize: 12, color: GOLD, letterSpacing: 1, fontWeight: 500 }}>{h}</div>
                ))}
              </div>
              {PATENTS.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    padding: '18px 24px',
                    borderBottom: i < PATENTS.length - 1 ? `1px solid ${GOLD_BORDER}` : 'none',
                    background: i % 2 === 0 ? '#fff' : 'rgba(253,251,247,0.6)',
                    opacity: patentsReveal.visible ? 1 : 0,
                    transform: patentsReveal.visible ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                  }}
                >
                  <div style={{ fontSize: 14, color: '#2C2C2C' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace' }}>{p.no}</div>
                  <div style={{ fontSize: 13, color: '#666' }}>{p.year}</div>
                  <div>
                    <span style={{ fontSize: 11, color: GOLD, border: `1px solid ${GOLD_BORDER}`, padding: '2px 10px' }}>{p.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section ref={certsReveal.ref} style={{ padding: '100px 0', background: '#fff', borderTop: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Certifications</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>资质证书</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 60 }}>
            {CERTS.map((cert, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${GOLD_BORDER}`,
                  padding: '28px 24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  opacity: certsReveal.visible ? 1 : 0,
                  transform: certsReveal.visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD; (e.currentTarget as HTMLDivElement).style.background = 'rgba(197,168,122,0.03)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD_BORDER; (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              >
                <div style={{ width: 44, height: 56, background: 'linear-gradient(135deg, #f5f0e8, #ede6d8)', border: `1px solid ${GOLD_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={20} color={GOLD} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2C', marginBottom: 6 }}>{cert.name}</h4>
                  <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>{cert.no}</div>
                  <div style={{ fontSize: 11, color: GOLD }}>{cert.year}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Safety note */}
          <div style={{ background: 'rgba(197,168,122,0.05)', border: `1px solid ${GOLD_BORDER}`, borderLeft: `3px solid ${GOLD}`, padding: '24px 28px' }}>
            <h4 style={{ fontSize: 15, fontWeight: 500, color: '#2C2C2C', marginBottom: 10 }}>专业安全说明</h4>
            <p style={{ fontSize: 13, color: '#777', lineHeight: 2 }}>
              亚整所所有医疗操作均在具有相应执业资质的医师主导下进行，使用经国家药监局批准的医疗器械及药品。
              我们严格遵守医疗操作规范及消毒标准，建立完善的医疗安全管理制度，保障每一位客户的治疗安全。
              如您在治疗过程中有任何疑虑，欢迎随时向我们的专业团队进行咨询。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
