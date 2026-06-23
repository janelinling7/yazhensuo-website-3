import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react';

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

function InputField({ placeholder, type = 'text', required = false }: { placeholder: string; type?: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      style={{
        width: '100%',
        padding: '14px 16px',
        fontSize: 14,
        color: '#333',
        background: 'rgba(255,255,255,0.6)',
        border: `1px solid ${focused ? GOLD : GOLD_BORDER}`,
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

const CONTACT_INFO = [
  { icon: Phone, label: '企业热线（全国）', value: '400-880-8838', sub: '周一至周日 09:00–21:00' },
  { icon: Mail, label: '预约/客服中心', value: 'service@aari-clinic.com', sub: '48小时内回复' },
  { icon: MapPin, label: '总部地址', value: '中国·杭州·钱江新城', sub: '亚整所 AARI 医美集团' },
  { icon: Clock, label: '营业时间', value: '周一至周日 10:00–20:00', sub: '节假日不休，欢迎到店' },
];

export function ContactPage() {
  const formReveal = useScrollReveal();
  const infoReveal = useScrollReveal();
  const policyReveal = useScrollReveal();
  const [selectedTopic, setSelectedTopic] = useState('');
  const topics = ['眼袋项目', '抗衰管理', '皮肤管理', '双眼皮精雕', '植发医学', '腋下管理', '其他项目'];

  return (
    <div style={{ paddingTop: 76, background: '#FDFBF7' }}>
      {/* Hero */}
      <section style={{ background: '#fff', padding: '80px 0 60px', borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Contact Us</div>
          <h1 style={{ fontSize: 44, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4, marginBottom: 20 }}>联系我们</h1>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 28px' }} />
          <p style={{ fontSize: 15, color: '#777', lineHeight: 2, maxWidth: 600, margin: '0 auto' }}>
            无论您有任何疑问或咨询需求，我们的专业顾问团队随时恭候，提供温暖、专业的一对一服务。
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section ref={infoReveal.ref} style={{ padding: '80px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {CONTACT_INFO.map((info, i) => {
              const Icon = info.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: GLASS_BG,
                    border: `1px solid ${GOLD_BORDER}`,
                    backdropFilter: 'blur(12px)',
                    padding: '32px 24px',
                    textAlign: 'center',
                    opacity: infoReveal.visible ? 1 : 0,
                    transform: infoReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 36px rgba(197,168,122,0.1)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = GOLD_BORDER; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: '50%', border: `1px solid ${GOLD_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <Icon size={20} color={GOLD} strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase' }}>{info.label}</div>
                  <div style={{ fontSize: 14, color: '#2C2C2C', fontWeight: 500, marginBottom: 6, lineHeight: 1.5 }}>{info.value}</div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>{info.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section ref={formReveal.ref} style={{ padding: '0 0 100px', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Online Consultation</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>在线咨询</h2>
          </div>
          <div
            style={{
              background: GLASS_BG,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: `1px solid ${GOLD_BORDER}`,
              padding: '56px 56px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.04)',
              opacity: formReveal.visible ? 1 : 0,
              transform: formReveal.visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <form onSubmit={(e) => { e.preventDefault(); alert('感谢您的咨询！专业顾问将在24小时内与您联系，请注意来电。'); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                <InputField placeholder="您的姓名 *" required />
                <InputField placeholder="联系电话 *" type="tel" required />
                <InputField placeholder="电子邮箱" type="email" />
                <InputField placeholder="所在城市" />
              </div>

              {/* Topic Selection */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 12, letterSpacing: 1 }}>关注项目（可多选）</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic === selectedTopic ? '' : topic)}
                      style={{
                        padding: '7px 16px',
                        fontSize: 13,
                        color: selectedTopic === topic ? '#fff' : GOLD,
                        background: selectedTopic === topic ? `linear-gradient(135deg, #D4B896, ${GOLD})` : 'transparent',
                        border: `1px solid ${GOLD_BORDER}`,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.25s',
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <textarea
                  placeholder="请描述您的需求或问题（可选）"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: 14,
                    color: '#333',
                    background: 'rgba(255,255,255,0.6)',
                    border: `1px solid ${GOLD_BORDER}`,
                    resize: 'vertical',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(197,168,122,0.12)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: 15,
                  letterSpacing: 3,
                  color: '#fff',
                  background: `linear-gradient(135deg, #D4B896, ${GOLD})`,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s',
                  boxShadow: '0 6px 20px rgba(197,168,122,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(197,168,122,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(197,168,122,0.3)'; }}
              >
                <MessageSquare size={16} strokeWidth={1.5} />
                提交咨询
              </button>

              <p style={{ fontSize: 12, color: '#bbb', textAlign: 'center', marginTop: 16, letterSpacing: 0.5 }}>
                提交后，您的信息仅用于此次预约咨询，受到严格的隐私政策保护
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section ref={policyReveal.ref} style={{ padding: '80px 0', background: '#fff', borderTop: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Privacy</div>
            <h2 style={{ fontSize: 28, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>隐私政策说明</h2>
          </div>
          <div
            style={{
              background: 'rgba(197,168,122,0.04)',
              border: `1px solid ${GOLD_BORDER}`,
              borderLeft: `3px solid ${GOLD}`,
              padding: '36px 40px',
              opacity: policyReveal.visible ? 1 : 0,
              transform: policyReveal.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {[
              { title: '信息收集', text: '我们仅收集您主动提供的姓名、联系方式及相关咨询信息，用于预约服务与后续沟通。' },
              { title: '信息使用', text: '您的个人信息仅用于预约咨询与服务沟通，不会用于其他商业用途，不会向第三方出售或共享。' },
              { title: '信息保护', text: '我们采用行业标准的数据加密与访问控制措施，保护您的信息安全。内部人员须经授权方可查阅相关信息。' },
              { title: '信息删除', text: '如您希望删除相关个人信息，可通过客服热线或邮箱提出申请，我们将在合规前提下予以处理。' },
              { title: '政策更新', text: '本隐私政策可能因法律法规调整或业务变更而更新。如有重要变化，我们将通过官方渠道提前告知。' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i < 4 ? 20 : 0, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ minWidth: 6, height: 6, borderRadius: '50%', background: GOLD, marginTop: 8, flexShrink: 0, display: 'block' }} />
                <div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{item.title}：</span>
                  <span style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
