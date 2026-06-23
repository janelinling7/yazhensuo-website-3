import { useEffect, useRef, useState } from 'react';
import { Briefcase, Users, TrendingUp, ChevronDown, ChevronUp, Send } from 'lucide-react';

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

const CATEGORIES = ['全部岗位', '医疗岗位', '运营岗位', '技术岗位', '客服岗位'];

const JOBS = [
  { cat: '医疗岗位', title: '主治医师 - 皮肤激光科', dept: '医疗技术部', loc: '杭州 / 上海', type: '全职', desc: '负责皮肤激光美容项目的临床操作与方案制定，参与医学培训与质量改进工作。', req: ['皮肤科或整形外科执业医师资格', '3年以上激光美容临床经验', '具备良好沟通表达能力'] },
  { cat: '医疗岗位', title: '植发外科医师', dept: '毛发医学部', loc: '杭州', type: '全职', desc: '独立完成FUE植发手术及术前术后评估，与医助团队协作完成高质量手术操作。', req: ['医学本科以上学历，具备执业医师资格', '2年以上植发外科经验', '熟练掌握FUE/FUT技术'] },
  { cat: '运营岗位', title: '品牌市场经理', dept: '品牌传播部', loc: '杭州', type: '全职', desc: '负责品牌整体形象策略制定与执行，协调线上线下营销资源，提升品牌认知度与美誉度。', req: ['市场营销或品牌管理相关专业', '5年以上品牌市场经验', '优秀的文案及视觉审美能力'] },
  { cat: '运营岗位', title: '门店运营督导', dept: '连锁管理部', loc: '全国（驻各城市）', type: '全职', desc: '负责多家门店的运营管理标准执行督导，提升门店整体服务质量与运营效率。', req: ['医疗或零售连锁管理经验', '3年以上团队管理经验', '适应出差的工作节奏'] },
  { cat: '技术岗位', title: '数字化技术开发工程师', dept: '信息技术部', loc: '杭州', type: '全职', desc: '参与门店管理系统及客户服务平台的开发与迭代，推动医美行业数字化转型。', req: ['计算机相关专业本科以上', '熟悉React/Node.js等技术栈', '2年以上商业系统开发经验'] },
  { cat: '客服岗位', title: '美学顾问（咨询师）', dept: '客户服务部', loc: '杭州 / 上海 / 北京', type: '全职', desc: '负责客户一对一美学咨询，了解客户需求后制定初步改善建议，引导专业就医流程。', req: ['形象良好，善于沟通', '医学美容或护理相关背景优先', '具备客户服务意识与同理心'] },
];

const PERKS = [
  { icon: '🏥', title: '专业成长', desc: '系统化的医美专业培训，参与行业学术交流，持续拓展专业视野。' },
  { icon: '💰', title: '有竞争力的薪酬', desc: '具有行业竞争力的薪资结构，绩效激励机制透明合理。' },
  { icon: '🌟', title: '晋升通道', desc: '清晰的职业晋升路径，内部优先提拔，提供管理类与专业类双轨发展。' },
  { icon: '🤝', title: '团队文化', desc: '尊重个体差异，鼓励专业表达，营造温暖协作的工作氛围。' },
  { icon: '🎯', title: '福利保障', desc: '五险一金，带薪年假，节日关怀，员工内部项目优惠体验资格。' },
  { icon: '📚', title: '学习赋能', desc: '年度学习预算，支持参加行业峰会与专业培训，持续投资员工成长。' },
];

export function RecruitPage() {
  const [activeFilter, setActiveFilter] = useState('全部岗位');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const cultureReveal = useScrollReveal();
  const jobsReveal = useScrollReveal();
  const perksReveal = useScrollReveal();

  const filtered = activeFilter === '全部岗位' ? JOBS : JOBS.filter(j => j.cat === activeFilter);

  return (
    <div style={{ paddingTop: 76, background: '#FDFBF7' }}>
      {/* Hero */}
      <section style={{ background: '#fff', padding: '80px 0 60px', borderBottom: `1px solid ${GOLD_BORDER}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'linear-gradient(135deg, #f5f0e8 0%, #ede6d8 100%)', opacity: 0.6 }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', position: 'relative' }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Join Our Team</div>
            <h1 style={{ fontSize: 44, fontWeight: 300, color: '#2C2C2C', letterSpacing: 3, lineHeight: 1.3, marginBottom: 24 }}>与亚整所一起<br />定义高端医美标准</h1>
            <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 28 }} />
            <p style={{ fontSize: 15, color: '#666', lineHeight: 2, maxWidth: 520 }}>
              我们正在寻找与亚整所价值观相契合的专业人才。无论您在医疗、运营、技术还是服务领域，
              亚整所都为您提供与行业共同进步的舞台与资源。
            </p>
          </div>
        </div>
      </section>

      {/* Talent Philosophy */}
      <section ref={cultureReveal.ref} style={{ padding: '100px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Philosophy</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>人才理念</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { icon: Users, title: '以人为本', desc: '我们相信优秀的人才是亚整所最核心的资产。尊重每一位员工的专业价值与成长需求，是我们对人才的承诺。' },
              { icon: TrendingUp, title: '共同成长', desc: '亚整所的发展与每一位员工的成长紧密相连。我们投资于人才培养，让个人成长与品牌发展相互促进。' },
              { icon: Briefcase, title: '专业精进', desc: '我们崇尚专业精神，鼓励员工在各自领域持续精进。专业能力的提升是对客户最有力的承诺。' },
            ].map((val, i) => {
              const Icon = val.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: GLASS_BG,
                    border: `1px solid ${GOLD_BORDER}`,
                    backdropFilter: 'blur(12px)',
                    padding: '44px 32px',
                    textAlign: 'center',
                    opacity: cultureReveal.visible ? 1 : 0,
                    transform: cultureReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = GOLD; el.style.transform = 'translateY(-8px)'; el.style.boxShadow = '0 16px 40px rgba(197,168,122,0.1)'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = GOLD_BORDER; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: '50%', border: `1px solid ${GOLD_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Icon size={24} color={GOLD} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 400, color: '#2C2C2C', marginBottom: 16, letterSpacing: 1 }}>{val.title}</h3>
                  <p style={{ fontSize: 13, color: '#777', lineHeight: 1.9 }}>{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section ref={jobsReveal.ref} style={{ padding: '80px 0', background: '#fff', borderTop: `1px solid ${GOLD_BORDER}`, borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Open Positions</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>招聘岗位</h2>
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '9px 20px',
                  fontSize: 13,
                  letterSpacing: 1,
                  color: activeFilter === cat ? '#fff' : GOLD,
                  background: activeFilter === cat ? `linear-gradient(135deg, #D4B896, ${GOLD})` : 'transparent',
                  border: `1px solid ${GOLD_BORDER}`,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.25s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Job List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((job, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${expandedJob === i ? GOLD : GOLD_BORDER}`,
                  background: GLASS_BG,
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
                  opacity: jobsReveal.visible ? 1 : 0,
                  transform: jobsReveal.visible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 0.07}s`,
                }}
              >
                {/* Header */}
                <div
                  style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                  onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1 }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 400, color: '#2C2C2C', marginBottom: 4 }}>{job.title}</h3>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <span style={{ fontSize: 12, color: '#888' }}>{job.dept}</span>
                        <span style={{ fontSize: 12, color: '#bbb' }}>·</span>
                        <span style={{ fontSize: 12, color: '#888' }}>{job.loc}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', marginRight: 24 }}>
                      <span style={{ fontSize: 11, color: GOLD, border: `1px solid ${GOLD_BORDER}`, padding: '2px 10px' }}>{job.cat}</span>
                      <span style={{ fontSize: 11, color: '#888', border: `1px solid rgba(0,0,0,0.08)`, padding: '2px 10px' }}>{job.type}</span>
                    </div>
                  </div>
                  <div style={{ color: GOLD }}>
                    {expandedJob === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Expanded */}
                {expandedJob === i && (
                  <div style={{ padding: '0 28px 28px', borderTop: `1px solid ${GOLD_BORDER}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, paddingTop: 24 }}>
                      <div>
                        <div style={{ fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 10 }}>岗位职责</div>
                        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.9 }}>{job.desc}</p>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: GOLD, letterSpacing: 1, marginBottom: 10 }}>任职要求</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {job.req.map((r) => (
                            <li key={r} style={{ fontSize: 14, color: '#666', lineHeight: 2, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                              <span style={{ color: GOLD, marginTop: 2, flexShrink: 0 }}>·</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                      <button
                        style={{
                          padding: '11px 32px',
                          fontSize: 13,
                          letterSpacing: 2,
                          color: '#fff',
                          background: `linear-gradient(135deg, #D4B896, ${GOLD})`,
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          transition: 'all 0.25s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(197,168,122,0.35)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        onClick={() => alert(`感谢您对【${job.title}】岗位的关注！请将简历发送至 hr@aari-clinic.com`)}
                      >
                        <Send size={14} />
                        立即投递
                      </button>
                      <div style={{ fontSize: 13, color: '#aaa', display: 'flex', alignItems: 'center' }}>
                        投递邮箱：hr@aari-clinic.com
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section ref={perksReveal.ref} style={{ padding: '100px 0', background: '#FDFBF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Benefits</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4 }}>员工成长与福利</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PERKS.map((perk, i) => (
              <div
                key={i}
                style={{
                  background: GLASS_BG,
                  border: `1px solid ${GOLD_BORDER}`,
                  backdropFilter: 'blur(12px)',
                  padding: '32px 28px',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                  opacity: perksReveal.visible ? 1 : 0,
                  transform: perksReveal.visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = GOLD; el.style.transform = 'translateY(-5px)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = GOLD_BORDER; el.style.transform = 'translateY(0)'; }}
              >
                <span style={{ fontSize: 28, flexShrink: 0 }}>{perk.icon}</span>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 400, color: '#2C2C2C', marginBottom: 8 }}>{perk.title}</h4>
                  <p style={{ fontSize: 13, color: '#777', lineHeight: 1.8 }}>{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 72 }}>
            <p style={{ fontSize: 16, color: '#666', marginBottom: 24, letterSpacing: 0.5 }}>期待与您在亚整所相遇</p>
            <a
              href="mailto:hr@aari-clinic.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '15px 44px',
                fontSize: 14,
                letterSpacing: 2,
                color: '#fff',
                background: `linear-gradient(135deg, #D4B896, ${GOLD})`,
                textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 6px 20px rgba(197,168,122,0.3)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 28px rgba(197,168,122,0.4)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(197,168,122,0.3)'; }}
            >
              <Send size={16} strokeWidth={1.5} />
              投递简历至 hr@aari-clinic.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
