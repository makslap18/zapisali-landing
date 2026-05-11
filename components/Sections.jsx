// Shared landing sections — used by all three variants.
// Each variant passes theme tokens via props so the same section can render
// differently across designs.

// ─── Numbers / counter ─────────────────────────────────────────
function useAnimatedNumber(target, deps = []) {
  const [val, setVal] = React.useState(target);
  React.useEffect(() => {
    let raf, t0;
    const start = val;
    const dur = 420;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(start + (target - start) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, deps);
  return val;
}

// ─── Calculator ────────────────────────────────────────────────
// Row вынесен наружу — иначе на каждом ререндере Calculator создавался
// новый тип компонента, React размонтировал <input>, и драг range-слайдера
// сбрасывался после первого же шага.
function CalcRow({ label, value, min, max, step, onChange, unit, accent, labelColor, valueColor }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: labelColor }}>{label}</span>
        <span style={{ fontSize: 18, fontWeight: 600, color: valueColor, fontVariantNumeric: 'tabular-nums' }}>
          {value.toLocaleString('ru-RU')}{unit}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(+e.target.value)}
        style={{ width: '100%', accentColor: accent, height: 4 }}
      />
    </div>
  );
}

function Calculator({ accent = '#229ED9', theme = 'light' }) {
  const [perDay, setPerDay] = React.useState(10);
  const [lostPct, setLostPct] = React.useState(20);
  const [check, setCheck] = React.useState(3000);
  // Конверсия 30% — бот возвращает в кассу 30% потерянных обращений
  const monthly = Math.round(perDay * (lostPct / 100) * 0.3 * check * 30);
  const animated = useAnimatedNumber(monthly, [monthly]);

  const isDark = theme === 'dark';
  const labelColor = isDark ? '#7a8a9d' : '#6b7280';
  const valueColor = isDark ? '#e6edf5' : '#0f1620';

  return (
    <div className="zp-calc-grid" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32,
      alignItems: 'center',
    }}>
      <div>
        <CalcRow label="Обращений в день" value={perDay} min={5} max={40} step={1} onChange={setPerDay} unit="" accent={accent} labelColor={labelColor} valueColor={valueColor} />
        <CalcRow label="Без ответа" value={lostPct} min={10} max={50} step={1} onChange={setLostPct} unit=" %" accent={accent} labelColor={labelColor} valueColor={valueColor} />
        <CalcRow label="Средний чек" value={check} min={2000} max={15000} step={500} onChange={setCheck} unit=" ₽" accent={accent} labelColor={labelColor} valueColor={valueColor} />
      </div>
      <div className="zp-calc-result" style={{
        padding: '32px 28px',
        borderRadius: 16,
        background: isDark
          ? `linear-gradient(140deg, ${accent}26, ${accent}10)`
          : `linear-gradient(140deg, ${accent}18, ${accent}08)`,
        border: `1px solid ${accent}33`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '.08em', color: labelColor, marginBottom: 10 }}>
          Бот вернёт в кассу
        </div>
        <div className="zp-calc-result-num" style={{ fontSize: 44, fontWeight: 700, color: valueColor, letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
          {animated.toLocaleString('ru-RU')} ₽
        </div>
        <div style={{ fontSize: 13, color: labelColor, marginTop: 6 }}>в месяц, по вашим цифрам</div>
        <div style={{ fontSize: 12, color: labelColor, marginTop: 18, paddingTop: 14, borderTop: `1px solid ${isDark ? '#27384d' : '#e5e7eb'}` }}>
          Тариф «Бизнес», 4 990 ₽/мес
        </div>
      </div>
    </div>
  );
}

// ─── Pricing card ──────────────────────────────────────────────
function PricingCard({ name, price, tagline, features, highlighted, accent, theme = 'light' }) {
  const isDark = theme === 'dark';
  const cardBg = highlighted
    ? (isDark ? '#0a1422' : '#0f1620')
    : (isDark ? '#0e1726' : '#ffffff');
  const cardFg = highlighted ? '#ffffff' : (isDark ? '#e6edf5' : '#0f1620');
  const border = highlighted
    ? `1px solid ${accent}`
    : `1px solid ${isDark ? '#1a2332' : '#e8ecf2'}`;
  const muted = highlighted ? 'rgba(255,255,255,.6)' : (isDark ? '#7a8a9d' : '#6b7280');

  return (
    <div style={{
      background: cardBg, color: cardFg, border,
      borderRadius: 18, padding: 28, position: 'relative',
      boxShadow: highlighted ? `0 24px 48px -16px ${accent}55` : 'none',
      display: 'flex', flexDirection: 'column',
    }}>
      {highlighted && (
        <div style={{
          position: 'absolute', top: -12, left: 28,
          background: accent, color: '#fff',
          fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
          padding: '5px 10px', borderRadius: 6,
        }}>Лучший выбор</div>
      )}
      <div style={{ fontSize: 14, color: muted, marginBottom: 4 }}>{name}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-.02em' }}>{price.toLocaleString('ru-RU')} ₽</span>
        <span style={{ fontSize: 14, color: muted }}>/мес</span>
      </div>
      <div style={{ fontSize: 14, color: muted, marginBottom: 20, minHeight: 40 }}>{tagline}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{ fontSize: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              background: highlighted ? accent : (isDark ? '#1a2332' : '#eef4f9'),
              color: highlighted ? '#fff' : accent, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, marginTop: 1,
            }}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })} style={{
        width: '100%', padding: '13px 16px', borderRadius: 12,
        background: highlighted ? accent : 'transparent',
        color: highlighted ? '#fff' : cardFg,
        border: highlighted ? 'none' : `1px solid ${isDark ? '#27384d' : '#d6dde6'}`,
        fontWeight: 600, fontSize: 14,
        cursor: 'pointer'
      }}>Оставить заявку</button>
    </div>
  );
}

// ─── FAQ accordion ─────────────────────────────────────────────
function FAQ({ items, theme = 'light', accent = '#229ED9' }) {
  const [open, setOpen] = React.useState(0);
  const isDark = theme === 'dark';
  const border = isDark ? '#1a2332' : '#e8ecf2';
  const muted = isDark ? '#7a8a9d' : '#6b7280';
  const fg = isDark ? '#e6edf5' : '#0f1620';

  return (
    <div style={{ borderTop: `1px solid ${border}` }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: `1px solid ${border}` }}>
            <button onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: '100%', padding: '20px 0', textAlign: 'left',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                color: fg, fontSize: 17, fontWeight: 500,
              }}>
              <span>{it.q}</span>
              <span style={{
                width: 26, height: 26, borderRadius: '50%',
                background: isOpen ? accent : (isDark ? '#1a2332' : '#f1f5f9'),
                color: isOpen ? '#fff' : muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform .25s, background .15s',
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                fontSize: 16, flexShrink: 0,
              }}>+</span>
            </button>
            {isOpen && (
              <div style={{ paddingBottom: 22, fontSize: 15, color: muted, lineHeight: 1.6, maxWidth: '85%' }}>
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Lead form ────────────────────────────────────────────────
function LeadForm({ accent = '#229ED9', theme = 'light' }) {
  const [sent, setSent] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [biz, setBiz] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState('');
  const isDark = theme === 'dark';
  const inputBg = isDark ? '#0e1726' : '#ffffff';
  const border = isDark ? '#27384d' : '#d6dde6';
  const fg = isDark ? '#e6edf5' : '#0f1620';
  const muted = isDark ? '#7a8a9d' : '#6b7280';

  const inputStyle = {
    width: '100%', padding: '14px 16px', fontSize: 15,
    background: inputBg, color: fg,
    border: `1px solid ${border}`, borderRadius: 12,
    outline: 'none', fontFamily: 'inherit',
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{
          width: 56, height: 56, margin: '0 auto 16px',
          borderRadius: '50%', background: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 24,
        }}>✓</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: fg, marginBottom: 6 }}>Заявка отправлена</div>
        <div style={{ fontSize: 15, color: muted }}>Свяжусь как только увижу.</div>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true); setErr('');
    try {
      // Без Content-Type, чтобы не триггерить CORS preflight (n8n
      // на OPTIONS не отвечает CORS-заголовками). Body остаётся JSON-строкой —
      // n8n умеет её распарсить из raw body.
      await fetch('https://n8n57362.hostkey.in/webhook/4ohPRBwYploC2Ugm/webhook/lead-form', {
        method: 'POST',
        body: JSON.stringify({ name, phone, biz }),
      });
      setSent(true);
    } catch (_) {
      setErr('Ошибка отправки. Напишите нам в Telegram.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input style={inputStyle} placeholder="Как вас зовут" value={name} onChange={e => setName(e.target.value)} required />
      <input style={inputStyle} placeholder="Телефон или Telegram" value={phone} onChange={e => setPhone(e.target.value)} required />
      <input style={inputStyle} placeholder="Название автосервиса (необязательно)" value={biz} onChange={e => setBiz(e.target.value)} />
      <button type="submit" disabled={busy} style={{
        padding: '14px', borderRadius: 12,
        background: accent, color: '#fff', fontWeight: 600, fontSize: 15,
        marginTop: 4, opacity: busy ? 0.6 : 1,
        cursor: busy ? 'default' : 'pointer'
      }}>{busy ? 'Отправка...' : 'Оставить заявку'}</button>
      {err && <div style={{ fontSize: 13, color: '#dc2626', textAlign: 'center' }}>{err}</div>}
      <div style={{ fontSize: 12, color: muted, textAlign: 'center', marginTop: 4 }}>
        2 месяца бесплатно для первых пилотов · без привязки карты
      </div>
    </form>
  );
}

Object.assign(window, { Calculator, PricingCard, FAQ, LeadForm, useAnimatedNumber });
