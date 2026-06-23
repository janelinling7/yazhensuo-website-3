import { useEffect, useRef, useState } from 'react';
import { Phone, MapPin, Clock, ChevronRight } from 'lucide-react';

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

const CITIES = ['全部城市', '杭州', '上海', '北京', '成都', '广州', '深圳'];

const STORES = [
  { city: '杭州', name: '亚整所 · 杭州旗舰店', address: '浙江省杭州市钱江新城钱塘大道XXX号', tel: '400-880-8838', hours: '周一至周日 10:00–20:00', area: '1200㎡', type: '旗舰店', envImg: 'https://images.unsplash.com/photo-1648775507324-b48dd3791fa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
  { city: '上海', name: '亚整所 · 上海静安店', address: '上海市静安区南京西路XXX号', tel: '400-880-8838', hours: '周一至周日 10:00–20:00', area: '800㎡', type: '精品店', envImg: 'https://images.unsplash.com/photo-1565452171067-f2b1384f958d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
  { city: '北京', name: '亚整所 · 北京朝阳店', address: '北京市朝阳区三里屯XXX号', tel: '400-880-8838', hours: '周一至周日 10:00–20:00', area: '760㎡', type: '精品店', envImg: 'https://images.unsplash.com/photo-1600947871775-082dd97e2d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
  { city: '成都', name: '亚整所 · 成都锦里店', address: '四川省成都市锦江区XXX路XXX号', tel: '400-880-8838', hours: '周一至周日 10:00–20:00', area: '680㎡', type: '精品店', envImg: 'https://images.unsplash.com/photo-1648775507324-b48dd3791fa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
  { city: '广州', name: '亚整所 · 广州天河店', address: '广东省广州市天河区天河路XXX号', tel: '400-880-8838', hours: '周一至周日 10:00–20:00', area: '720㎡', type: '精品店', envImg: 'https://images.unsplash.com/photo-1565452171067-f2b1384f958d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
  { city: '深圳', name: '亚整所 · 深圳南山店', address: '广东省深圳市南山区科技园XXX号', tel: '400-880-8838', hours: '周一至周日 10:00–20:00', area: '650㎡', type: '精品店', envImg: 'https://images.unsplash.com/photo-1600947871775-082dd97e2d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' },
];

export function StoresPage() {
  const [activeCity, setActiveCity] = useState('全部城市');
  const [hoveredStore, setHoveredStore] = useState<number | null>(null);
  const listReveal = useScrollReveal();
  const mapReveal = useScrollReveal();

  const filtered = activeCity === '全部城市' ? STORES : STORES.filter(s => s.city === activeCity);

  return (
    <div style={{ paddingTop: 76, background: '#FDFBF7' }}>
      {/* Hero */}
      <section style={{ background: '#fff', padding: '80px 0 60px', borderBottom: `1px solid ${GOLD_BORDER}` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: GOLD, marginBottom: 12, textTransform: 'uppercase' }}>Nationwide Clinics</div>
          <h1 style={{ fontSize: 44, fontWeight: 300, color: '#2C2C2C', letterSpacing: 4, marginBottom: 20 }}>全国门店</h1>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '0 auto 28px' }} />
          <p style={{ fontSize: 15, color: '#777', lineHeight: 2, maxWidth: 600, margin: '0 auto' }}>
            亚整所在全国主要城市设有直营门店，提供品质一致的医疗美容服务，欢迎预约到访。
          </p>
        </div>
      </section>

      {/* City Filter */}
      <section style={{ background: '#fff', borderBottom: `1px solid ${GOLD_BORDER}`, padding: '0 40px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              style={{
                padding: '18px 24px',
                fontSize: 14,
                letterSpacing: 1,
                color: activeCity === city ? GOLD : '#666',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeCity === city ? GOLD : 'transparent'}`,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.25s',
                whiteSpace: 'nowrap',
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      {/* Map Placeholder */}
      <section ref={mapReveal.ref} style={{ padding: '60px 40px 0', maxWidth: 1400, margin: '0 auto' }}>
        <div
          style={{
            height: 360,
            background: 'linear-gradient(135deg, #f5f0e8 0%, #ede6d8 60%, #e8ddd0 100%)',
            border: `1px solid ${GOLD_BORDER}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            opacity: mapReveal.visible ? 1 : 0,
            transform: mapReveal.visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          {/* Decorative map pattern */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} viewBox="0 0 800 360">
            <path d="M 80 180 Q 200 120 320 160 Q 400 80 520 140 Q 620 100 720 180" fill="none" stroke={GOLD} strokeWidth="1" />
            <path d="M 60 220 Q 180 180 300 200 Q 400 150 500 190 Q 620 160 740 220" fill="none" stroke={GOLD} strokeWidth="1" />
            {[80, 200, 350, 480, 620, 720].map((x, i) => (
              <circle key={i} cx={x} cy={160 + Math.sin(i) * 40} r="6" fill={GOLD} opacity="0.6" />
            ))}
          </svg>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <MapPin size={36} color={GOLD} strokeWidth={1.5} style={{ marginBottom: 12 }} />
            <div style={{ fontSize: 14, color: '#888', letterSpacing: 1 }}>地图加载区域</div>
            <div style={{ fontSize: 12, color: '#bbb', marginTop: 6 }}>点击门店卡片可查看详细地图导航</div>
          </div>
        </div>
      </section>

      {/* Store List */}
      <section ref={listReveal.ref} style={{ padding: '60px 0 100px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ fontSize: 13, color: '#aaa', marginBottom: 32 }}>共 {filtered.length} 家门店</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
            {filtered.map((store, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredStore(i)}
                onMouseLeave={() => setHoveredStore(null)}
                style={{
                  background: GLASS_BG,
                  border: `1px solid ${hoveredStore === i ? GOLD : GOLD_BORDER}`,
                  backdropFilter: 'blur(12px)',
                  overflow: 'hidden',
                  display: 'flex',
                  transition: 'all 0.35s ease',
                  transform: hoveredStore === i ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: hoveredStore === i ? '0 16px 40px rgba(197,168,122,0.12)' : '0 2px 12px rgba(0,0,0,0.03)',
                  opacity: listReveal.visible ? 1 : 0,
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                {/* Image */}
                <div style={{ width: 200, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={store.envImg}
                    alt={store.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hoveredStore === i ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.6s ease' }}
                  />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: GLASS_BG, border: `1px solid ${GOLD_BORDER}`, backdropFilter: 'blur(8px)', padding: '3px 10px', fontSize: 11, color: GOLD }}>
                    {store.type}
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1, padding: '28px 28px' }}>
                  <div style={{ fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 8 }}>{store.city}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 400, color: '#2C2C2C', marginBottom: 16, letterSpacing: 0.5 }}>{store.name}</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <MapPin size={13} color={GOLD} strokeWidth={1.5} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: '#777', lineHeight: 1.5 }}>{store.address}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <Phone size={13} color={GOLD} strokeWidth={1.5} />
                      <span style={{ fontSize: 13, color: '#777' }}>{store.tel}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <Clock size={13} color={GOLD} strokeWidth={1.5} />
                      <span style={{ fontSize: 13, color: '#777' }}>{store.hours}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      style={{
                        flex: 1,
                        padding: '9px 0',
                        fontSize: 12,
                        letterSpacing: 1.5,
                        color: '#fff',
                        background: `linear-gradient(135deg, #D4B896, ${GOLD})`,
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                    >
                      预约到店
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '9px 0',
                        fontSize: 12,
                        letterSpacing: 1.5,
                        color: GOLD,
                        background: 'transparent',
                        border: `1px solid ${GOLD_BORDER}`,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        transition: 'all 0.25s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = GOLD_BORDER; }}
                    >
                      获取地址 <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
