import { useEffect, useState } from 'react';
import { Phone, Tag, MapPin, ArrowUp } from 'lucide-react';

const GOLD = '#C5A87A';
const GOLD_BORDER = 'rgba(197,168,122,0.35)';
const GLASS_BG = 'rgba(255,255,255,0.82)';

const buttons = [
  { icon: Phone, label: '全国热线', sub: '400-880-8838' },
  { icon: Tag, label: '领取优惠', sub: '限时专属优惠' },
  { icon: MapPin, label: '获取地址', sub: '查看门店地址' },
];

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [topHovered, setTopHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const btnStyle = (isHovered: boolean): React.CSSProperties => ({
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: isHovered ? GOLD : GLASS_BG,
    border: `1px solid ${GOLD_BORDER}`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isHovered ? `0 8px 24px rgba(197,168,122,0.35)` : '0 4px 16px rgba(0,0,0,0.06)',
    transform: isHovered ? 'translateX(-4px)' : 'translateX(0)',
    position: 'relative',
  });

  return (
    <>
      {/* Right side buttons */}
      <div style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 990,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        {buttons.map((btn, i) => {
          const Icon = btn.icon;
          const isHov = hovered === i;
          return (
            <div
              key={i}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={btnStyle(isHov)}>
                <Icon size={18} color={isHov ? '#fff' : GOLD} strokeWidth={1.5} />
              </div>
              {/* Tooltip */}
              <div style={{
                position: 'absolute',
                right: 60,
                top: '50%',
                transform: 'translateY(-50%)',
                background: GLASS_BG,
                border: `1px solid ${GOLD_BORDER}`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '8px 14px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                opacity: isHov ? 1 : 0,
                visibility: isHov ? 'visible' : 'hidden',
                transition: 'opacity 0.25s ease, right 0.25s ease',
                pointerEvents: 'none',
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 2 }}>{btn.label}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{btn.sub}</div>
                {/* Arrow */}
                <div style={{
                  position: 'absolute',
                  right: -6,
                  top: '50%',
                  transform: 'translateY(-50%) rotate(45deg)',
                  width: 10,
                  height: 10,
                  background: GLASS_BG,
                  borderTop: `1px solid ${GOLD_BORDER}`,
                  borderRight: `1px solid ${GOLD_BORDER}`,
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Back to top */}
      <div
        style={{
          position: 'fixed',
          right: 20,
          bottom: 40,
          zIndex: 990,
          opacity: showTop ? 1 : 0,
          visibility: showTop ? 'visible' : 'hidden',
          transform: showTop ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.35s ease',
        }}
        onMouseEnter={() => setTopHovered(true)}
        onMouseLeave={() => setTopHovered(false)}
        onClick={scrollToTop}
      >
        <div style={{
          ...btnStyle(topHovered),
          cursor: 'pointer',
        }}>
          <ArrowUp size={18} color={topHovered ? '#fff' : GOLD} strokeWidth={1.5} />
        </div>
      </div>
    </>
  );
}
