// Interactive demo chat — uses window.claude.complete to chat with a fake
// "Записали" administrator bot. Bot is configured to be the digital admin
// for an autoservice / barbershop / clinic. Falls back to scripted replies
// if window.claude is missing.
//
// Props:
//   theme — 'light' | 'dark' | 'editorial'  (visual variant)
//   accent — accent CSS color
//   bg — chat background

const SYSTEM_PROMPT = `Ты — "Записали", цифровой администратор сервисного бизнеса (автосервис "Ваш Автосервис"). Твоя задача — быстро ответить клиенту, разобрать типовой вопрос, при необходимости уточнить детали и довести до записи на приём. Если запрос сложный — честно скажи, что передашь мастеру.

Услуги и цены:
— Замена масла: от 1 200 ₽ (с фильтром — 1 800 ₽)
— Диагностика: от 1 500 ₽
— Шиномонтаж: от 2 000 ₽
— ТО по регламенту: от 4 500 ₽
— Развал-схождение: от 2 500 ₽

Ближайшее свободное время: завтра в 10:00, 12:30, 15:00.
Адрес: ул. Шоссейная, 14. Часы: 9:00–20:00 без выходных.

Стиль: коротко, по-человечески, без эмодзи. 1–3 предложения. Если клиент готов записаться — подтверди время и скажи, что напомнишь за 2 часа.`;

function DemoChat({ theme = 'light', accent = '#229ED9', bg, height = 460 }) {
  const [messages, setMessages] = React.useState([
    { role: 'bot', text: 'Здравствуйте! Я цифровой администратор автосервиса. Помогу с ценами и записью. Чем могу помочь?' },
  ]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    const next = [...messages, { role: 'user', text }];
    setMessages(next);
    setBusy(true);

    try {
      if (window.claude && window.claude.complete) {
        const history = next.map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));
        const reply = await window.claude.complete({
          messages: [
            { role: 'user', content: SYSTEM_PROMPT + '\n\n— Начало диалога —' },
            { role: 'assistant', content: 'Понял. Веду диалог как администратор.' },
            ...history,
          ],
        });
        setMessages(m => [...m, { role: 'bot', text: (reply || '').trim() || 'Минутку, уточню у мастера.' }]);
      } else {
        await new Promise(r => setTimeout(r, 700));
        setMessages(m => [...m, { role: 'bot', text: scriptedReply(text) }]);
      }
    } catch (e) {
      setMessages(m => [...m, { role: 'bot', text: 'Минутку, уточню у мастера и вернусь.' }]);
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Theme tokens
  const isDark = theme === 'dark';
  const isEd = theme === 'editorial';
  const surface = bg || (isDark ? '#0f1620' : isEd ? '#ffffff' : '#ffffff');
  const userBg = accent;
  const botBg = isDark ? '#1a2332' : isEd ? '#f3f1ec' : '#f1f5f9';
  const botFg = isDark ? '#e6edf5' : '#0f1620';
  const userFg = '#ffffff';
  const inputBg = isDark ? '#1a2332' : '#ffffff';
  const inputBorder = isDark ? '#27384d' : '#e5e7eb';
  const headerBorder = isDark ? '#1a2332' : '#eef0f3';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: surface,
      borderRadius: 16,
      overflow: 'hidden',
      height,
      boxShadow: isDark ? '0 30px 60px -20px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06)' : '0 24px 48px -16px rgba(15,30,60,.18), 0 0 0 1px rgba(15,30,60,.06)',
      fontFamily: 'inherit',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: `1px solid ${headerBorder}`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent}, ${shade(accent, -20)})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '-.01em',
        }}>З</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: isDark ? '#e6edf5' : '#0f1620' }}>Записали</div>
          <div style={{ fontSize: 12, color: isDark ? '#7a8a9d' : '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            онлайн
          </div>
        </div>
        <div style={{ fontSize: 11, color: isDark ? '#7a8a9d' : '#9ca3af', fontVariantNumeric: 'tabular-nums' }}>демо</div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', padding: '18px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '78%',
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.role === 'user' ? userBg : botBg,
              color: m.role === 'user' ? userFg : botFg,
              fontSize: 14, lineHeight: 1.45,
              whiteSpace: 'pre-wrap',
            }}>{m.text}</div>
          </div>
        ))}
        {busy && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '12px 14px',
              borderRadius: '16px 16px 16px 4px',
              background: botBg, display: 'flex', gap: 4, alignItems: 'center',
            }}>
              <Dot delay={0} color={isDark ? '#7a8a9d' : '#9ca3af'} />
              <Dot delay={0.2} color={isDark ? '#7a8a9d' : '#9ca3af'} />
              <Dot delay={0.4} color={isDark ? '#7a8a9d' : '#9ca3af'} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: 12, borderTop: `1px solid ${headerBorder}`,
        display: 'flex', gap: 8,
      }}>
        <input
          type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
          placeholder="Спросите про цены или запишитесь..."
          style={{
            flex: 1, padding: '12px 14px', fontSize: 14,
            background: inputBg, color: isDark ? '#e6edf5' : '#0f1620',
            border: `1px solid ${inputBorder}`, borderRadius: 12,
            outline: 'none', fontFamily: 'inherit',
          }}
        />
        <button onClick={send} disabled={busy || !input.trim()} style={{
          padding: '0 18px', borderRadius: 12,
          background: accent, color: '#fff', fontWeight: 600, fontSize: 14,
          opacity: busy || !input.trim() ? 0.5 : 1,
          transition: 'opacity .15s',
        }}>↑</button>
      </div>
    </div>
  );
}

function Dot({ delay, color }) {
  return (
    <span style={{
      width: 6, height: 6, borderRadius: '50%', background: color,
      display: 'inline-block', animation: `zpDot 1.2s ${delay}s infinite ease-in-out`,
    }}></span>
  );
}

function shade(hex, pct) {
  // simple hex shifter
  const m = hex.replace('#', '');
  const n = parseInt(m, 16);
  let r = (n >> 16) & 0xff, g = (n >> 8) & 0xff, b = n & 0xff;
  const f = pct / 100;
  r = Math.max(0, Math.min(255, Math.round(r + (f < 0 ? r : 255 - r) * f)));
  g = Math.max(0, Math.min(255, Math.round(g + (f < 0 ? g : 255 - g) * f)));
  b = Math.max(0, Math.min(255, Math.round(b + (f < 0 ? b : 255 - b) * f)));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function scriptedReply(text) {
  const t = text.toLowerCase();
  if (/масл/.test(t)) return 'Замена масла — от 1 200 ₽, с фильтром 1 800 ₽. Хотите записаться? Завтра свободно в 10:00.';
  if (/диагност/.test(t)) return 'Диагностика — от 1 500 ₽, занимает около часа. Ближайшее время — завтра в 12:30.';
  if (/цен|стои|сколько/.test(t)) return 'Скажите, какая услуга интересует — назову точную цену. Или запишу на бесплатную диагностику.';
  if (/запиш|запис|можно/.test(t)) return 'Запишу. На завтра свободно 10:00, 12:30 и 15:00. Какое время удобно?';
  if (/привет|здра/.test(t)) return 'Здравствуйте! Чем помочь — узнать цену или записаться?';
  return 'Уточню у мастера и вернусь с ответом. А пока — могу записать на диагностику завтра в 10:00, удобно?';
}

Object.assign(window, { DemoChat });
