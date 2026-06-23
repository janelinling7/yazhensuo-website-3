import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

const GOLD = '#C5A87A';
const GOLD_BORDER = 'rgba(197,168,122,0.32)';
const GLASS_BG = 'rgba(255,255,255,0.82)';

const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    label: 'AARI · Elegance',
    title: '亚整所 AARI\n东方审美与专业医美的高端融合',
    subtitle: '克制美学理念，为您提供长期的状态管理与专属关怀',
    btn: '探索项目',
    btnPage: 'projects',
  },
  {
    bg: 'https://images.unsplash.com/photo-1728727217834-b190862837a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    label: 'Anti-Aging · Precision',
    title: '以克制美学\n重塑成熟肌肤与轮廓管理',
    subtitle: '结合国际化审美与科学技术，专注专业医疗美容服务',
    btn: '立即咨询',
    btnPage: 'contact',
  },
  {
    bg: 'https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    label: 'Professional · Trusted',
    title: '专业医疗美容服务\n为长期年轻状态提供支持',
    subtitle: '专业医师团队，规范医疗流程，安全可信赖',
    btn: '了解品牌',
    btnPage: 'about',
  },
];

const PROJECTS = [
  {
    id: 'eye',
    name: '眼袋年轻化',
    en: 'Eye Rejuvenation',
    desc: '专注眼周年轻化管理，改善眼部疲态，重塑眼周平整度与紧致感，恢复自然精神气质。',
    tags: ['微创手术', '激光修复', '眼周紧致'],
    img: 'https://images.unsplash.com/photo-1779099980003-f73ac45b6743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    gradient: 'linear-gradient(135deg, #f8f4f0 0%, #ede6dc 100%)',
  },
  {
    id: 'anti',
    name: '抗衰管理',
    en: 'Anti-Aging Care',
    desc: '结合光电科技与注射疗法，为成熟肌肤提供多维度的面部轮廓与皮肤质地综合管理。',
    tags: ['光电射频', '注射疗法', '面部提升'],
    img: 'https://images.unsplash.com/photo-1739980737820-b6bb1a9b8456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    gradient: 'linear-gradient(135deg, #f0f4f4 0%, #dce8e8 100%)',
  },
  {
    id: 'hair',
    name: '植发医学',
    en: 'Hair Restoration',
    desc: '专业毛发医学方案，提供精致毛囊健康管理，帮助改善发际线与头发密度问题。',
    tags: ['FUE无痕', 'ARTAS机器人', '毛囊管理'],
    img: 'https://images.unsplash.com/photo-1767953802241-0c4876b84c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    gradient: 'linear-gradient(135deg, #f4f0f8 0%, #e4dce8 100%)',
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [slide, setSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const heroReveal = useScrollReveal();
  const projectsReveal = useScrollReveal();
  const bookingReveal = useScrollReveal();
  const statsReveal = useScrollReveal();

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => setSlide((s) => (s + 1) % SLIDES.length);

  return (
    <div style={{ paddingTop: 76, background: '#FDFBF7' }}>

      {/* Hero Banner */}
      <section style={{ position: 'relative', height: 'calc(100vh - 76px)', overflow: 'hidden', minHeight: 560 }}>
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              zIndex: i === slide ? 1 : 0,
            }}
          >
            <img
              src={s.bg}
              alt={s.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(253,251,247,0.92) 0%, rgba(253,251,247,0.6) 50%, rgba(253,251,247,0.1) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 8% 0 10%' }}>
              <div style={{
                maxWidth: 680,
                transform: i === slide ? 'translateY(0)' : 'translateY(20px)',
                opacity: i === slide ? 1 : 0,
                transition: 'transform 0.8s ease 0.3s, opacity 0.8s ease 0.3s',
              }}>
                <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 20, textTransform: 'uppercase', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                  {s.label}
                </div>
                <h1 style={{ fontSize: 'clamp(28px, 4vw, 54px)', fontWeight: 300, lineHeight: 1.35, color: '#1a1a1a', marginBottom: 24, letterSpacing: 2, whiteSpace: 'pre-line' }}>
                  {s.title}
                </h1>
                <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 24 }} />
                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.9, marginBottom: 36, letterSpacing: 0.5, maxWidth: 480 }}>{s.subtitle}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => onNavigate(s.btnPage)}
                    style={{
                      padding: '13px 36px',
                      fontSize: 13,
                      letterSpacing: 2,
                      color: '#fff',
                      background: `linear-gradient(135deg, #D4B896, ${GOLD})`,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s',
                      boxShadow: '0 6px 20px rgba(197,168,122,0.35)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(197,168,122,0.45)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(197,168,122,0.35)'; }}
                  >
                    {s.btn}
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    style={{
                      padding: '13px 36px',
                      fontSize: 13,
                      letterSpacing: 2,
                      color: '#555',
                      background: 'rgba(255,255,255,0.7)',
                      border: `1px solid ${GOLD_BORDER}`,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.color = '#555'; }}
                  >
                    在线咨询
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button onClick={prevSlide} style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 44, height: 44, borderRadius: '50%', background: GLASS_BG, border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(8px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = GLASS_BG; }}
        ><ArrowLeft size={16} color="#555" /></button>
        <button onClick={nextSlide} style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 44, height: 44, borderRadius: '50%', background: GLASS_BG, border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(8px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = GLASS_BG; }}
        ><ArrowRight size={16} color="#555" /></button>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: 12 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: i === slide ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === slide ? GOLD : 'rgba(0,0,0,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                boxShadow: i === slide ? `0 0 10px rgba(197,168,122,0.5)` : 'none',
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <div ref={statsReveal.ref} style={{ background: '#fff', borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            { num: '15+', label: '年品牌积累' },
            { num: '30+', label: '全国门店' },
            { num: '100K+', label: '服务案例' },
            { num: '98%', label: '满意度评价' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: '0 20px',
                borderRight: i < 3 ? `1px solid ${GOLD_BORDER}` : 'none',
                opacity: statsReveal.visible ? 1 : 0,
                transform: statsReveal.visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: GOLD, fontWeight: 400, letterSpacing: 1 }}>{stat.num}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4, letterSpacing: 1 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Projects */}
      <section ref={projectsReveal.ref} style={{ padding: '100px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
            <div style={{
              opacity: projectsReveal.visible ? 1 : 0,
              transform: projectsReveal.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Core Programs</div>
              <h2 style={{ fontSize: 36, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>核心项目</h2>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: GOLD, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: 1, fontFamily: 'inherit', paddingBottom: 2, borderBottom: `1px solid ${GOLD_BORDER}`, transition: 'all 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.gap = '10px'; }}
              onMouseLeave={(e) => { e.currentTarget.style.gap = '6px'; }}
            >
              查看全部 <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {PROJECTS.map((proj, i) => (
              <div
                key={proj.id}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: GLASS_BG,
                  border: `1px solid ${hoveredCard === i ? GOLD : GOLD_BORDER}`,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  transform: hoveredCard === i ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: hoveredCard === i ? '0 20px 48px rgba(197,168,122,0.18)' : '0 4px 20px rgba(0,0,0,0.04)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  cursor: 'pointer',
                  opacity: projectsReveal.visible ? 1 : 0,
                  transitionDelay: `${i * 0.12}s`,
                }}
                onClick={() => onNavigate('projects')}
              >
                {/* Image */}
                <div style={{ height: 280, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={proj.img}
                    alt={proj.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      transform: hoveredCard === i ? 'scale(1.07)' : 'scale(1)',
                      transition: 'transform 0.7s ease',
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(253,251,247,0.7) 100%)' }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, background: GLASS_BG, border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(8px)', padding: '4px 12px', fontSize: 11, color: GOLD, letterSpacing: 1.5, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                    {proj.en}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '32px 28px' }}>
                  <h3 style={{ fontSize: 20, fontWeight: 400, color: '#2C2C2C', marginBottom: 12, letterSpacing: 1 }}>{proj.name}</h3>
                  <p style={{ fontSize: 13, color: '#777', lineHeight: 1.9, marginBottom: 20 }}>{proj.desc}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                    {proj.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: 11, color: GOLD, border: `1px solid ${GOLD_BORDER}`, padding: '3px 10px', letterSpacing: 0.5 }}>{tag}</span>
                    ))}
                  </div>
                  <button
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: 13,
                      letterSpacing: 2,
                      color: hoveredCard === i ? '#fff' : GOLD,
                      background: hoveredCard === i ? `linear-gradient(135deg, #D4B896, ${GOLD})` : 'transparent',
                      border: `1px solid ${GOLD_BORDER}`,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.35s ease',
                    }}
                  >
                    立即抢购
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy Strip */}
      <section style={{ background: '#fff', padding: '80px 0', borderTop: `1px solid ${GOLD_BORDER}`, borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 16, textTransform: 'uppercase' }}>Brand Philosophy</div>
          <h2 style={{ fontSize: 28, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4, marginBottom: 20 }}>以克制美学，为每个面孔定制专属方案</h2>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 28px' }} />
          <p style={{ fontSize: 15, color: '#777', lineHeight: 2, letterSpacing: 0.5 }}>
            亚整所坚信每张面孔都有其独特的美学价值。我们摒弃标准化流程，通过专业医师团队与国际技术，以科学为基础、以审美为引导，提供长期、可持续的年轻化管理方案。
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section ref={bookingReveal.ref} id="booking" style={{ padding: '100px 0', background: 'linear-gradient(135deg, #fdfbf7 0%, #f5f0e8 100%)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Consultation</div>
            <h2 style={{ fontSize: 36, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4, marginBottom: 16 }}>与其向往，不如即刻改变</h2>
            <p style={{ fontSize: 14, color: '#888', letterSpacing: 1 }}>预约专属咨询，专业顾问为您量身规划改善方案</p>
          </div>

          <div style={{
            maxWidth: 800,
            margin: '0 auto',
            background: GLASS_BG,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${GOLD_BORDER}`,
            borderRadius: 2,
            padding: '60px 56px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
            opacity: bookingReveal.visible ? 1 : 0,
            transform: bookingReveal.visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <form onSubmit={(e) => { e.preventDefault(); alert('信息已提交，专业顾问将尽快与您联系。感谢您对亚整所的信任。'); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                {[
                  { placeholder: '您的姓名 *', type: 'text' },
                  { placeholder: '联系电话 *', type: 'tel' },
                  { placeholder: '关注项目', type: 'text' },
                  { placeholder: '所在城市', type: 'text' },
                ].map((field, i) => (
                  <InputField key={i} {...field} />
                ))}
              </div>
              <div style={{ marginBottom: 32 }}>
                <textarea
                  placeholder="备注说明（可选）"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: 14,
                    color: '#333',
                    background: 'rgba(255,255,255,0.6)',
                    border: `1px solid ${GOLD_BORDER}`,
                    borderRadius: 1,
                    resize: 'vertical',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(197,168,122,0.12)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '15px',
                    fontSize: 14,
                    letterSpacing: 3,
                    color: '#fff',
                    background: `linear-gradient(135deg, #D4B896, ${GOLD})`,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 16px rgba(197,168,122,0.3)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(197,168,122,0.4)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(197,168,122,0.3)'; }}
                >
                  立即开启焕颜计划
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  style={{
                    flex: 1,
                    padding: '15px',
                    fontSize: 14,
                    letterSpacing: 2,
                    color: GOLD,
                    background: 'transparent',
                    border: `1px solid ${GOLD_BORDER}`,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(197,168,122,0.08)'; e.currentTarget.style.borderColor = GOLD; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = GOLD_BORDER; }}
                >
                  在线咨询客服
                </button>
              </div>
              <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', marginTop: 20, letterSpacing: 0.5 }}>
                您的个人信息仅用于预约咨询与服务沟通，依照隐私政策受到严格保护
              </p>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}

function InputField({ placeholder, type }: { placeholder: string; type: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '14px 16px',
        fontSize: 14,
        color: '#333',
        background: 'rgba(255,255,255,0.6)',
        border: `1px solid ${focused ? GOLD : GOLD_BORDER}`,
        borderRadius: 1,
        outline: 'none',
        fontFamily: 'inherit',
        boxShadow: focused ? '0 0 0 3px rgba(197,168,122,0.12)' : 'none',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
