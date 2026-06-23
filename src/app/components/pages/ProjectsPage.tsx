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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

type Project = {
  name: string;
  desc: string;
  target: string;
  highlight: string;
};

type Category = {
  id: string;
  label: string;
  en: string;
  gradient: string;
  projects: Project[];
};

const CATEGORIES: Category[] = [
  {
    id: 'eye-bag',
    label: '眼袋',
    en: 'Eye Bag',
    gradient: 'linear-gradient(135deg, #f8f4f0, #ede6dc)',
    projects: [
      { name: '微创眼袋祛除术', desc: '通过微创切口精准处理下睑脂肪疝，改善眼袋突出与眼周疲态，创伤小、恢复周期相对较短。', target: '下睑脂肪疝出、眼袋较明显者', highlight: '微创切口，精准操作，自然效果' },
      { name: '激光眼袋紧致术', desc: '利用激光能量刺激皮肤胶原新生，改善轻度眼袋与细纹，为不愿手术者提供非侵入性选择。', target: '轻中度眼袋、眼周肤质松弛者', highlight: '无需手术，无明显创伤' },
      { name: '眼袋术后修复', desc: '针对此前眼袋手术效果不理想者，提供个性化修复评估与调整方案，由经验丰富医师操作。', target: '眼袋手术后效果不满意者', highlight: '专业评估，精细修复' },
    ],
  },
  {
    id: 'anti-aging',
    label: '抗衰',
    en: 'Anti-Aging',
    gradient: 'linear-gradient(135deg, #f0f4f4, #dce8e8)',
    projects: [
      { name: '时光逆流注射术', desc: '结合玻尿酸、肉毒素等注射方案，针对面部静态纹、动态纹及容量流失进行综合调整。', target: '面部出现皱纹或轮廓松弛者', highlight: '即时效果，自然提升' },
      { name: '射频紧肤与超声炮联合治疗', desc: '双重能量协同作用于皮肤深层，提升面部紧致度，改善皮肤质地，效果循序渐进。', target: '面部松弛下垂、皮肤弹力下降者', highlight: '无创治疗，逐步改善' },
      { name: '颈部抗衰套餐', desc: '专注颈部纹路与皮肤松弛改善，结合光电与注射疗法，延缓颈部老化进程。', target: '颈部皮肤松弛、颈纹明显者', highlight: '颈部专属方案，全面管理' },
    ],
  },
  {
    id: 'skin',
    label: '淡斑',
    en: 'Skin Care',
    gradient: 'linear-gradient(135deg, #f4f4f0, #e4e8dc)',
    projects: [
      { name: '皮秒激光祛斑', desc: '超短脉冲皮秒激光精准作用于色素颗粒，减少色斑面积，皮肤创伤较传统激光显著减少。', target: '色斑、晒斑、黄褐斑等人群', highlight: '皮秒技术，高效祛斑' },
      { name: '超皮秒联合中胚层疗法', desc: '皮秒激光与中胚层疗法协同，在淡化色素同时补充皮肤营养，综合改善肤色与质地。', target: '肤色不均、色斑伴皮肤暗沉者', highlight: '复合疗法，多维改善' },
      { name: '激光术后修复管理', desc: '专业的激光术后护理方案，加速屏障修复，降低色素反弹风险，巩固治疗效果。', target: '激光治疗后需系统护理者', highlight: '科学护理，保障效果' },
    ],
  },
  {
    id: 'eyelid',
    label: '双眼皮',
    en: 'Eyelid',
    gradient: 'linear-gradient(135deg, #f0f0f8, #e0dcec)',
    projects: [
      { name: '埋线双眼皮', desc: '采用细线进行缝合固定，形成双眼皮褶皱，创伤微小，适合想要体验双眼皮效果者。', target: '眼皮较薄、单眼皮或浅双者', highlight: '微创可逆，恢复快' },
      { name: '切开双眼皮', desc: '通过切开方式去除多余脂肪与皮肤，形成清晰持久的双眼皮，适合眼皮较厚者。', target: '眼皮厚实、臃肿或有多层皮者', highlight: '效果持久，精雕轮廓' },
      { name: '双眼皮修复', desc: '针对既往手术效果不理想、宽窄不对称或形态不自然者，提供专业评估后的修复手术。', target: '双眼皮手术效果不满意者', highlight: '精细修复，恢复自然' },
      { name: '内眼角开大', desc: '通过手术方式扩大内眦部位，使眼睛看起来更宽阔有神，常与双眼皮手术联合进行。', target: '内眼角过窄、眼形偏小者', highlight: '拓宽眼形，提升气质' },
    ],
  },
  {
    id: 'hair',
    label: '植发',
    en: 'Hair',
    gradient: 'linear-gradient(135deg, #f4f0f8, #e4dce8)',
    projects: [
      { name: 'FUE无痕植发', desc: '采用微型打孔器逐个提取毛囊单位，供区无线性瘢痕，是目前主流的微创植发方式。', target: '发际线后移、顶部稀疏者', highlight: '无线性疤痕，自然效果' },
      { name: 'ARTAS机器人植发', desc: '智能机器人辅助提取毛囊，精准度高、操作一致性强，降低人工提取的损耗率。', target: '有植发需求且对精度要求高者', highlight: '智能精准，降低毛囊损耗' },
      { name: '非手术生发治疗', desc: '通过低能量激光、注射营养液等非手术方式刺激毛囊活性，适合早期脱发或术后巩固。', target: '早期脱发或手术效果巩固需求者', highlight: '非侵入性，温和调理' },
    ],
  },
  {
    id: 'armpit',
    label: '腋下',
    en: 'Axilla',
    gradient: 'linear-gradient(135deg, #f8f0f4, #ece0e8)',
    projects: [
      { name: '微创腋臭根治术', desc: '通过微创吸刮方式处理顶泌汗腺，根治腋臭症状，创口微小，恢复相对较快。', target: '腋臭困扰明显、影响生活质量者', highlight: '微创手术，症状改善明显' },
      { name: '微波腋臭治疗', desc: '利用微波能量精准破坏汗腺，无需手术切口，操作时间短，适合轻中度腋臭患者。', target: '轻中度腋臭、不愿手术者', highlight: '无切口，治疗便捷' },
      { name: '腋下脱毛', desc: '采用激光脱毛技术永久性减少腋下毛发，色素吸收精准，多次治疗后效果显著。', target: '腋毛旺盛、有脱毛需求者', highlight: '精准脱毛，效果持久' },
      { name: '腋下美白嫩肤', desc: '针对腋下色素沉着、皮肤暗沉问题，结合激光与护理方案，改善肤色与肤质。', target: '腋下色素沉着、皮肤暗沉者', highlight: '综合美肤，改善肤色' },
    ],
  },
  {
    id: 'other',
    label: '其他项目',
    en: 'Others',
    gradient: 'linear-gradient(135deg, #f4f4f4, #e8e8e8)',
    projects: [
      { name: '面部轮廓', desc: '通过专业方案调整面部骨骼或软组织轮廓，改善咬肌宽大、轮廓不流畅等问题。', target: '对面部轮廓有改善需求者', highlight: '轮廓重塑，提升精致感' },
      { name: '吸脂塑形', desc: '通过吸脂方式去除局部多余脂肪，改善身体轮廓，常用于腰腹、大腿等部位。', target: '局部脂肪堆积、饮食运动效果有限者', highlight: '精准塑形，改善轮廓' },
      { name: '私密', desc: '提供女性私密健康相关的专业医疗美容项目，以医疗安全为前提，改善相关功能性问题。', target: '有私密项目需求的成熟女性', highlight: '专业私密，安全保障' },
      { name: '疤痕修复', desc: '针对手术疤痕、烫伤疤痕、痤疮凹陷等，提供综合修复方案，改善疤痕外观。', target: '各类疤痕困扰者', highlight: '综合修复，改善外观' },
      { name: '牙齿贴面', desc: '利用薄型瓷贴面改善牙齿色泽、形态与排列，提升微笑美观度，保留更多天然牙体。', target: '牙齿色泽不佳或形态问题者', highlight: '微创修复，美化笑容' },
      { name: '眉部提升', desc: '通过注射或手术方式提升眉位，改善眉眼间距，使上眼皮看起来更舒展轻盈。', target: '眉毛位置偏低、上眼皮下垂者', highlight: '提升眉位，开朗眼神' },
    ],
  },
];

function ProjectCard({ proj, delay, visible }: { proj: Project; delay: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: GLASS_BG,
        border: `1px solid ${hovered ? GOLD : GOLD_BORDER}`,
        backdropFilter: 'blur(12px)',
        padding: '28px 24px',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(197,168,122,0.14)' : '0 2px 12px rgba(0,0,0,0.03)',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}s`,
      }}
    >
      <h4 style={{ fontSize: 16, fontWeight: 400, color: '#2C2C2C', marginBottom: 10, letterSpacing: 0.5 }}>{proj.name}</h4>
      <p style={{ fontSize: 13, color: '#777', lineHeight: 1.85, marginBottom: 16 }}>{proj.desc}</p>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: GOLD, letterSpacing: 1, marginBottom: 4 }}>适合人群</div>
        <div style={{ fontSize: 12, color: '#888' }}>{proj.target}</div>
      </div>
      <div style={{ background: 'rgba(197,168,122,0.08)', border: `1px solid ${GOLD_BORDER}`, padding: '8px 12px', marginBottom: 20, fontSize: 12, color: GOLD, letterSpacing: 0.5 }}>
        ✦ {proj.highlight}
      </div>
      <button
        style={{
          width: '100%',
          padding: '10px',
          fontSize: 13,
          letterSpacing: 2,
          color: hovered ? '#fff' : GOLD,
          background: hovered ? `linear-gradient(135deg, #D4B896, ${GOLD})` : 'transparent',
          border: `1px solid ${hovered ? 'transparent' : GOLD_BORDER}`,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.3s ease',
        }}
      >
        立即预约
      </button>
    </div>
  );
}

export function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('eye-bag');
  const reveal = useScrollReveal();

  const activeCategory = CATEGORIES.find(c => c.id === activeTab)!;

  return (
    <div style={{ paddingTop: 76, background: '#FDFBF7' }}>
      {/* Hero */}
      <section style={{ background: '#fff', padding: '80px 0 60px', borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Core Programs</div>
          <h1 style={{ fontSize: 44, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4, marginBottom: 20 }}>核心项目</h1>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 28px' }} />
          <p style={{ fontSize: 15, color: '#777', lineHeight: 2, maxWidth: 680, margin: '0 auto' }}>
            亚整所精选七大核心项目分类，每项服务均由专业医师团队制定个性化方案，以科学为依据，以安全为前提。
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{ background: '#fff', borderBottom: `1px solid ${GOLD_BORDER}`, position: 'sticky', top: 76, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: '18px 24px',
                  fontSize: 14,
                  letterSpacing: 1,
                  color: activeTab === cat.id ? GOLD : '#666',
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${activeTab === cat.id ? GOLD : 'transparent'}`,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { if (activeTab !== cat.id) e.currentTarget.style.color = GOLD; }}
                onMouseLeave={(e) => { if (activeTab !== cat.id) e.currentTarget.style.color = '#666'; }}
              >
                {cat.label}
                <span style={{ fontSize: 10, color: 'inherit', marginLeft: 6, opacity: 0.6 }}>{cat.en}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={reveal.ref} style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          {/* Category Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 48 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 300, color: '#2C2C2C', letterSpacing: 3 }}>{activeCategory.label}</h2>
              <div style={{ fontSize: 12, color: GOLD, letterSpacing: 3, textTransform: 'uppercase', marginTop: 4 }}>{activeCategory.en}</div>
            </div>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${GOLD_BORDER}, transparent)` }} />
            <div style={{ fontSize: 13, color: '#aaa' }}>{activeCategory.projects.length} 个项目</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {activeCategory.projects.map((proj, i) => (
              <ProjectCard key={proj.name} proj={proj} delay={i * 0.1} visible={reveal.visible} />
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 48, padding: '20px 28px', background: 'rgba(197,168,122,0.04)', border: `1px solid ${GOLD_BORDER}`, borderLeft: `3px solid ${GOLD}` }}>
            <p style={{ fontSize: 12, color: '#aaa', lineHeight: 1.9 }}>
              * 以上项目介绍仅供参考，具体治疗方案需由专业医师面诊评估后制定。医疗效果因个体差异而有所不同，不作任何形式的绝对化保证。
              亚整所所有项目均在持证医师主导下规范操作，请放心咨询。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
