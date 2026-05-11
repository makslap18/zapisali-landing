// Записали — основной лендинг (одностраничник, продакшн-вёрстка)
// Базируется на варианте A: тёплый минимализм + Telegram-синий.
// Адаптивный, без "Войти" (т.к. одностраничник).

const T = {
  bg: '#FAFAF7',
  surface: '#FFFFFF',
  surfaceAlt: '#F4F1EA',
  ink: '#0E1620',
  inkSoft: '#1F2937',
  muted: '#5A6573',
  mutedDim: '#8A8578',
  line: '#E8E5DD',
  lineSoft: '#EFECE5',
  accent: '#229ED9',
  accentDeep: '#0884B6',
  accentSoft: '#E8F4FA'
};

// Inject responsive CSS once
if (typeof document !== 'undefined' && !document.getElementById('zp-landing-styles')) {
  const s = document.createElement('style');
  s.id = 'zp-landing-styles';
  s.textContent = `
    .zp-container { max-width: 1160px; margin: 0 auto; padding: 0 40px; }
    .zp-section { padding: 90px 0; }
    .zp-section-tight { padding: 60px 0; }

    .zp-h1 { font-size: 72px; line-height: 1.02; letter-spacing: -.035em; font-weight: 600; margin: 0; }
    .zp-h2 { font-size: 48px; line-height: 1.05; letter-spacing: -.025em; font-weight: 600; margin: 0 auto; max-width: 820px; text-align: center; }
    .zp-lead { font-size: 19px; line-height: 1.55; color: ${T.muted}; max-width: 620px; margin: 18px auto 0; text-align: center; }
    .zp-kicker { font-size: 13px; color: ${T.accent}; font-weight: 500; letter-spacing: .04em; text-transform: uppercase; margin-bottom: 14px; text-align: center; }
    .zp-section-head { text-align: center; margin-bottom: 56px; }

    .zp-btn { display: inline-flex; align-items: center; gap: 6px; padding: 14px 22px; border-radius: 12px; font-size: 15px; font-weight: 500; transition: transform .12s, opacity .12s, background .12s; }
    .zp-btn:hover { transform: translateY(-1px); }
    .zp-btn-primary { background: ${T.accent}; color: #fff; }
    .zp-btn-primary:hover { background: ${T.accentDeep}; }
    .zp-btn-secondary { background: transparent; color: ${T.ink}; border: 1px solid ${T.line}; }
    .zp-btn-secondary:hover { background: ${T.surface}; }
    .zp-btn-dark { background: ${T.ink}; color: #fff; padding: 10px 18px; border-radius: 10px; font-size: 14px; }
    .zp-btn-dark:hover { background: #000; }

    .zp-card { background: ${T.surface}; border: 1px solid ${T.line}; border-radius: 16px; }

    .zp-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
    .zp-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

    .zp-link-muted { color: ${T.muted}; transition: color .12s; }
    .zp-link-muted:hover { color: ${T.ink}; }

    @media (max-width: 980px) {
      .zp-container { padding: 0 20px; }
      .zp-section { padding: 56px 0; }
      .zp-h1 { font-size: 40px; line-height: 1.05; }
      .zp-h2 { font-size: 30px; line-height: 1.1; }
      .zp-lead { font-size: 16px; }
      .zp-grid-3 { grid-template-columns: 1fr !important; gap: 32px !important; }
      .zp-grid-2 { grid-template-columns: 1fr !important; gap: 24px !important; }
      .zp-hide-mobile { display: none !important; }
      .zp-calc-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
      .zp-calc-result { padding: 22px 18px !important; }
      .zp-calc-result-num { font-size: 36px !important; }
    }
    @media (min-width: 981px) {
      .zp-show-mobile { display: none !important; }
    }
  `;
  document.head.appendChild(s);
}

function Landing() {
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Demo />
      <CalcSection />
      <Pricing />
      <Channels />
      <WhatChanged />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <MobileMenuStyles />
    </div>);

}

// ─── Nav ───────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(250,250,247,.88)' : 'rgba(250,250,247,.6)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: `1px solid ${scrolled ? T.line : 'transparent'}`,
      transition: 'background .15s, border-color .15s'
    }}>
      <div className="zp-container" style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '14px 40px' }}>
        <a href="#top" onClick={scrollTo('top')} style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 600, fontSize: 17, letterSpacing: '-.02em' }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: T.accent, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700
          }}>З</div>
          Записали
        </a>
        <nav className="zp-hide-mobile" style={{ display: 'flex', gap: 28, fontSize: 14, marginLeft: 20 }}>
          <a className="zp-link-muted" href="#features" onClick={scrollTo('features')}>Возможности</a>
          <a className="zp-link-muted" href="#demo" onClick={scrollTo('demo')}>Демо</a>
          <a className="zp-link-muted" href="#pricing" onClick={scrollTo('pricing')}>Тарифы</a>
          <a className="zp-link-muted" href="#faq" onClick={scrollTo('faq')}>FAQ</a>
        </nav>
        <div style={{ flex: 1 }} />
        <a href="#start" onClick={scrollTo('start')} className="zp-btn zp-btn-dark zp-hide-mobile">
          Подключить →
        </a>
        <button className="zp-show-mobile" onClick={() => setOpen((o) => !o)} aria-label="Меню" style={{
          width: 40, height: 40, borderRadius: 10, border: `1px solid ${T.line}`, background: T.surface,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ display: 'block', width: 18, height: 2, background: T.ink, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, top: -6, width: 18, height: 2, background: T.ink }} />
            <span style={{ position: 'absolute', left: 0, top: 6, width: 18, height: 2, background: T.ink }} />
          </span>
        </button>
      </div>
      {open &&
      <div className="zp-show-mobile" style={{
        padding: '8px 24px 20px', borderTop: `1px solid ${T.line}`, background: T.bg,
        display: 'flex', flexDirection: 'column', gap: 4
      }}>
          {[['features', 'Возможности'], ['demo', 'Демо'], ['pricing', 'Тарифы'], ['faq', 'FAQ']].map(([id, t]) =>
        <a key={id} href={`#${id}`} onClick={scrollTo(id)} style={{ padding: '12px 0', fontSize: 16, borderBottom: `1px solid ${T.line}` }}>{t}</a>
        )}
          <a href="#start" onClick={scrollTo('start')} className="zp-btn zp-btn-primary" style={{ marginTop: 12, justifyContent: 'center' }}>Подключить →</a>
        </div>
      }
    </header>);

}

// ─── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" className="zp-section" style={{ paddingTop: 70, paddingBottom: 70 }}>
      <div className="zp-container">
        <div className="zp-grid-2" style={{ gridTemplateColumns: '1.15fr .85fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              background: T.accentSoft, color: T.accentDeep,
              fontSize: 13, fontWeight: 500, marginBottom: 24
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, display: 'inline-block' }} />
              Чат-помощник для автосервиса
            </div>

            <h1 className="zp-h1" style={{ marginBottom: 22 }}>
              Заявки не теряются,<br />пока вы заняты.
            </h1>

            <p className="zp-lead" style={{ marginBottom: 32 }}>
              Бот-помощник отвечает клиенту в чате за 30 секунд по вашему прайсу, не выдумывает, доводит до записи. Telegram, сайт, Авито, 24/7.
            </p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
              <a href="#start" onClick={(e) => {e.preventDefault();document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' });}} className="zp-btn zp-btn-primary">Подключить за 1 день →</a>
              <a href="#demo" onClick={(e) => {e.preventDefault();document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });}} className="zp-btn zp-btn-secondary">Посмотреть демо</a>
            </div>

            <div style={{ display: 'flex', gap: 28, paddingTop: 22, borderTop: `1px solid ${T.line}`, flexWrap: 'wrap' }}>
              <Stat n="~30 сек" l="скорость ответа" />
              <Stat n="24/7" l="без выходных" />
              <Stat n="152-ФЗ" l="следуем закону" />
            </div>
          </div>

          <div className="zp-hide-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMock />
          </div>
        </div>
      </div>
    </section>);

}

function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 600, color: T.ink, letterSpacing: '-.02em' }}>{n}</div>
      <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{l}</div>
    </div>);

}

function PhoneMock() {
  return (
    <div style={{
      width: 300, height: 600, maxWidth: '100%',
      background: '#0E1620',
      borderRadius: 42,
      padding: 10,
      boxShadow: '0 30px 60px -20px rgba(0,40,80,.25), 0 0 0 1px rgba(0,0,0,.06)',
      position: 'relative'
    }}>
      <div style={{
        width: '100%', height: '100%', background: '#fff', borderRadius: 33, overflow: 'hidden',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ height: 36, display: 'flex', justifyContent: 'space-between', padding: '12px 22px 0', fontSize: 11, fontWeight: 600 }}>
          <span>9:41</span>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ width: 16, height: 9, border: '1px solid #0E1620', borderRadius: 2, position: 'relative' }}>
              <span style={{ position: 'absolute', inset: 1, background: '#0E1620', borderRadius: 1, width: '70%' }}></span>
            </span>
          </span>
        </div>
        <div style={{
          padding: '8px 16px 12px', borderBottom: '1px solid #eef0f3',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <button style={{ color: T.accent, fontSize: 22 }}>‹</button>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: `linear-gradient(135deg, ${T.accent}, ${T.accentDeep})`,
            color: '#fff', fontSize: 13, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>З</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Записали · автосервис</div>
            <div style={{ fontSize: 11, color: T.accent }}>в сети</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: 14, background: '#F4F7FA', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
          { who: 'user', t: 'Здравствуйте, сколько стоит замена масла?' },
          { who: 'bot', t: 'Добрый день! Замена масла от 1 200 ₽ (с фильтром 1 800 ₽). Хотите записаться? Ближайшее свободное время завтра в 10:00.' },
          { who: 'user', t: 'Да, запишите на завтра' },
          { who: 'bot', t: 'Записали вас на завтра в 10:00. Напомню за 2 часа до визита. До встречи!' },
          { who: 'user', t: 'Спасибо!' }].
          map((m, i) =>
          <div key={i} style={{ display: 'flex', justifyContent: m.who === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
              maxWidth: '85%', padding: '7px 11px', fontSize: 12, lineHeight: 1.35,
              borderRadius: 12,
              background: m.who === 'user' ? T.accent : '#fff',
              color: m.who === 'user' ? '#fff' : T.ink,
              boxShadow: m.who === 'bot' ? '0 1px 2px rgba(0,0,0,.06)' : 'none'
            }}>{m.t}</div>
            </div>
          )}
        </div>
      </div>
    </div>);

}

// ─── Channels ─────────────────────────────────────────────────
function Channels() {
  return (
    <section className="zp-section-tight">
      <div className="zp-container">
        <div style={{ fontSize: 13, color: T.muted, textAlign: 'center', marginBottom: 24, letterSpacing: '.05em', textTransform: 'uppercase' }}>
          Работает там, где пишут ваши клиенты
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
          {['Telegram', 'WhatsApp', 'Виджет на сайте', 'Авито'].map((n, i) =>
          <div key={i} style={{ fontSize: 19, fontWeight: 500, color: T.muted, opacity: .75, letterSpacing: '-.01em' }}>{n}</div>
          )}
        </div>
      </div>
    </section>);

}

// ─── What Changed ─────────────────────────────────────────────
function WhatChanged() {
  const stats = [
  { n: '78 %', t: 'клиентов выбирают того, кто ответил первым', src: 'Verse.ai, исследование на 2 500 продаж' },
  { n: '5–10 мин', t: 'столько клиент ждёт ответ на Авито, потом пишет следующему сервису', src: 'TenChat, обзор поведения онлайн площадок' },
  { n: '+40 %', t: 'рост обращений в авто-сегменте на Авито только за 2024 год', src: 'Forbes Russia' }];

  return (
    <section className="zp-section">
      <div className="zp-container">
        <div className="zp-section-head">
          <div className="zp-kicker">Что изменилось</div>
          <h2 className="zp-h2">Раньше клиенты звонили. Сейчас пишут.</h2>
        </div>
        <div className="zp-grid-3">
          {stats.map((s, i) =>
          <div key={i} className="zp-card" style={{ padding: 28 }}>
              <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-.02em', color: T.accent, marginBottom: 12, fontVariantNumeric: 'tabular-nums' }}>{s.n}</div>
              <div style={{ fontSize: 16, color: T.ink, lineHeight: 1.45, marginBottom: 14 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.5 }}>{s.src}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── Problem ───────────────────────────────────────────────────
function Problem() {
  const items = [
  { k: '01', t: 'Сообщения копятся', d: 'Клиент пишет вечером или в выходной, ответить некому. К утру он уже у конкурента.' },
  { k: '02', t: 'Одни и те же вопросы', d: '«Сколько стоит?», «Когда есть время?». Десятки одинаковых вопросов в день.' },
  { k: '03', t: 'Записи теряются', d: 'Блокноты, переписки, «я вам потом напишу». Клиент не пришёл, и вы не помните, что записывали.' }];

  return (
    <section className="zp-section">
      <div className="zp-container">
        <div className="zp-section-head">
          <div className="zp-kicker">Знакомо?</div>
          <h2 className="zp-h2">Клиенты пишут, а ответить некогда</h2>
        </div>
        <div className="zp-grid-3">
          {items.map((it, i) =>
          <div key={i} className="zp-card" style={{ padding: 28 }}>
              <div style={{ fontSize: 13, color: T.accent, fontFamily: 'ui-monospace, monospace', marginBottom: 18 }}>{it.k}</div>
              <div style={{ fontSize: 21, fontWeight: 600, marginBottom: 10, letterSpacing: '-.015em' }}>{it.t}</div>
              <div style={{ fontSize: 15, color: T.muted, lineHeight: 1.55 }}>{it.d}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── Features ─────────────────────────────────────────────────
function Features() {
  const items = [
  { i: '◷', t: 'Записывает на приём', d: 'Проверяет свободные слоты по вашему расписанию, бронирует, отправляет подтверждение. Голосовые в Telegram тоже понимает.' },
  { i: '↳', t: 'Передаёт сложное вам', d: 'Если вопрос за рамками вашего прайса, диалог приходит в Telegram с историей чата.' },
  { i: '◐', t: 'Напоминает о визите', d: 'Авто-напоминания за 24 часа и за 2 часа. Меньше «не пришёл», больше денег в кассе.' },
  { i: '✓', t: 'Не выдумывает', d: 'Помощник отвечает строго по вашему прайсу, услугам и расписанию. Не сочиняет цены, не обещает несуществующее.' }];

  return (
    <section id="features" style={{ background: T.surface, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
      <div className="zp-section">
        <div className="zp-container">
          <div className="zp-section-head">
            <div className="zp-kicker">Решение</div>
            <h2 className="zp-h2" style={{ fontFamily: "Inter" }}>Помощник, который держит вашу первую линию</h2>
            <p className="zp-lead">Отвечает по вашим данным, доводит до записи, передаёт сложное вам.</p>
          </div>
          <div style={{ border: `1px solid ${T.line}`, borderRadius: 16, overflow: 'hidden' }}>
            <FeatureGrid items={items} />
          </div>
        </div>
      </div>
    </section>);

}

function FeatureGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }} className="zp-feature-grid">
      <style>{`
        @media (max-width: 600px) {
          .zp-feature-grid { grid-template-columns: 1fr !important; }
          .zp-feature-grid > * { border-right: none !important; }
        }
      `}</style>
      {items.map((it, i) =>
      <div key={i} style={{
        padding: 32,
        borderRight: i % 2 !== 1 ? `1px solid ${T.line}` : 'none',
        borderBottom: i < (items.length - 2) ? `1px solid ${T.line}` : 'none',
        background: T.surface
      }}>
          <div style={{
          width: 38, height: 38, borderRadius: 10, background: T.accentSoft, color: T.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontFamily: 'ui-monospace, monospace', marginBottom: 18
        }}>{it.i}</div>
          <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 8, letterSpacing: '-.015em', lineHeight: 1.25 }}>{it.t}</div>
          <div style={{ fontSize: 14.5, color: T.muted, lineHeight: 1.55 }}>{it.d}</div>
        </div>
      )}
    </div>);

}

// ─── How It Works ─────────────────────────────────────────────
function HowItWorks() {
  const steps = [
  { n: '1', t: 'Оставляете заявку', d: 'Рассказываете про автосервис: прайс, расписание, адрес. Можно скинуть файлами.' },
  { n: '2', t: 'Я настраиваю', d: 'Загружаю данные в систему, настраиваю под ваш бизнес, подключаю каналы. Обычно за 1 день.' },
  { n: '3', t: 'Бот работает', d: 'Клиенты пишут, бот отвечает и записывает. Вы получаете уведомления.' }];

  return (
    <section className="zp-section">
      <div className="zp-container">
        <div className="zp-section-head">
          <div className="zp-kicker">Как это работает</div>
          <h2 className="zp-h2">Три шага, и бот в работе</h2>
          <p className="zp-lead">Настройка под ключ, бесплатно на любом тарифе.</p>
        </div>
        <div className="zp-grid-3" style={{ position: 'relative' }}>
          <div className="zp-hide-mobile" style={{ position: 'absolute', top: 24, left: '8%', right: '8%', height: 1, background: T.line }} />
          {steps.map((s, i) =>
          <div key={i} style={{ position: 'relative' }}>
              <div style={{
              width: 48, height: 48, borderRadius: '50%', background: T.surface, border: `1px solid ${T.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 600, color: T.ink, marginBottom: 22, position: 'relative', zIndex: 1
            }}>{s.n}</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, letterSpacing: '-.015em' }}>{s.t}</div>
              <div style={{ fontSize: 15, color: T.muted, lineHeight: 1.55, maxWidth: 320 }}>{s.d}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── Demo ──────────────────────────────────────────────────────
function Demo() {
  const iframeRef = React.useRef(null);
  const [copied, setCopied] = React.useState('');

  const examples = [
    'Сколько стоит развал-схождение?',
    'Запишите меня на завтра в 18:00 на замену масла',
    'Есть ли в наличии бампер на Kia Rio 3 красного цвета?'
  ];

  const handleClick = (text) => {
    // 1. postMessage в iframe — виджет должен ловить asw-prefill
    try {
      iframeRef.current?.contentWindow?.postMessage({ type: 'asw-prefill', text }, '*');
    } catch (_) {}
    // 2. Fallback: копируем в clipboard, на случай если виджет ещё не поддерживает postMessage
    try {
      navigator.clipboard?.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(''), 2000);
    } catch (_) {}
  };

  return (
    <section id="demo" style={{ background: T.surface, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
      <div className="zp-section">
        <div className="zp-container">
          <div className="zp-section-head">
            <div className="zp-kicker">Попробуйте сейчас</div>
            <h2 className="zp-h2">Так виджет выглядит на сайте</h2>
            <p className="zp-lead">Демо для тестового автосервиса. Кликните по подсказке или напишите своё. Бот отвечает по-настоящему.</p>
          </div>
          <div className="zp-grid-2" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>
            <div className="zp-hide-mobile"><FakeSitePreview /></div>
            <div>
              <div style={{ marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 13, color: T.muted, marginBottom: 2 }}>Спросите бота, как клиент:</div>
                {examples.map((ex, i) =>
                <button key={i} onClick={() => handleClick(ex)} style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: `1px solid ${T.line}`,
                  background: copied === ex ? T.accentSoft : T.bg,
                  color: T.ink,
                  fontSize: 14,
                  lineHeight: 1.4,
                  transition: 'background .12s, transform .08s',
                  cursor: 'pointer'
                }}>
                    <span style={{ color: T.accent, marginRight: 6 }}>→</span>
                    {ex}
                    {copied === ex &&
                  <span style={{ marginLeft: 8, fontSize: 12, color: T.accent }}>скопировано</span>}
                  </button>
                )}
              </div>
              <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 48px -16px rgba(15,30,60,.18), 0 0 0 1px rgba(15,30,60,.06)', background: '#fff', height: 520 }}>
                <iframe
                  ref={iframeRef}
                  src="https://n8n57362.hostkey.in/webhook/8c582cff-dac2-4375-86e4-75f762cebf6c/wgt-frame/bot1"
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  allow="microphone"
                  title="Демо чат-бот"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function FakeSitePreview() {
  return (
    <div style={{
      background: T.bg, borderRadius: 18, border: `1px solid ${T.line}`,
      overflow: 'hidden', minHeight: 480
    }}>
      <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: T.muted, fontFamily: 'ui-monospace, monospace' }}>vash-autoservice.ru</div>
      </div>
      <div style={{ padding: 36 }}>
        <div style={{ fontSize: 13, color: T.muted, marginBottom: 8, letterSpacing: '.04em' }}>АВТОСЕРВИС · МОСКВА</div>
        <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-.02em', marginBottom: 14, lineHeight: 1.1 }}>Ваш Автосервис</div>
        <div style={{ fontSize: 15, color: T.muted, marginBottom: 26, maxWidth: 380 }}>Профессиональный ремонт и обслуживание. Запись через помощника справа.</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 460 }}>
          {[['Замена масла', 'от 1 200 ₽'], ['Диагностика', 'от 1 500 ₽'], ['Шиномонтаж', 'от 2 000 ₽'], ['ТО по регламенту', 'от 4 500 ₽']].map(([n, p], i) =>
          <div key={i} style={{ padding: 16, background: T.surface, borderRadius: 12, border: `1px solid ${T.line}` }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{n}</div>
              <div style={{ fontSize: 13, color: T.muted }}>{p}</div>
            </div>
          )}
        </div>
      </div>
    </div>);

}

// ─── Calculator ───────────────────────────────────────────────
function CalcSection() {
  return (
    <section className="zp-section">
      <div className="zp-container">
        <div className="zp-section-head">
          <div className="zp-kicker">Калькулятор</div>
          <h2 className="zp-h2">Сколько приносит быстрый ответ</h2>
          <p className="zp-lead">Подставьте свои цифры, посчитаем дополнительную выручку.</p>
        </div>
        <div className="zp-card" style={{ padding: 36, borderRadius: 18 }}>
          <Calculator accent={T.accent} theme="light" />
        </div>
      </div>
    </section>);

}

// ─── Pricing ──────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="pricing" style={{ background: T.surface, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
      <div className="zp-section">
        <div className="zp-container">
          <div className="zp-section-head">
            <div className="zp-kicker">Тарифы</div>
            <h2 className="zp-h2">Два тарифа. Без сюрпризов.</h2>
            <p className="zp-lead">Запись на приём, эскалация владельцу и напоминания работают на обоих тарифах.</p>
          </div>

          <div className="zp-grid-2" style={{ gap: 20, maxWidth: 820, margin: '0 auto' }}>
            <PricingCard accent={T.accent} theme="light"
            name="Старт" price={2990} tagline="Telegram и виджет на сайте"
            features={[
              'Чат-помощник в Telegram',
              'Виджет на ваш сайт (одна строка кода)',
              'Отвечает по вашему прайсу и расписанию',
              'Записывает клиента на приём',
              'Напоминания за 24 часа и за 2 часа',
              'Голосовые сообщения в Telegram',
              'Передаёт сложное вам в Telegram',
              'До 300 диалогов в месяц']} />
            <PricingCard accent={T.accent} theme="light" highlighted
            name="Бизнес" price={4990} tagline="Плюс Авито и WhatsApp"
            features={[
              'Всё из «Старт»',
              'Канал Авито (нужна ваша подписка Avito Pro)',
              'Канал WhatsApp (через ваш WA Business аккаунт)',
              'До 1 000 диалогов в месяц']} />
          </div>
        </div>
      </div>
    </section>);

}

// ─── FAQ ──────────────────────────────────────────────────────
function FAQSection() {
  const items = [
  { q: 'А если бот ответит неправильно?', a: 'Помощник отвечает только тем, что вы загрузили: прайс, услуги, расписание. Не выдумывает. Если вопрос за рамками ваших данных, он не пытается выкрутиться, а сразу передаёт диалог вам в Telegram с историей чата.' },
  { q: 'WhatsApp и Telegram замедляют, зачем там оставаться и платить?', a: 'Аудитория в TG и WhatsApp осталась, особенно платёжеспособный сегмент: те, кто привык платить за сервис и не хочет переходить на другие мессенджеры. Параллельно растёт Авито: за 2024–2025 рост обращений в авто-сегменте на 40 %+ (Forbes). Помощник работает во всех трёх каналах одновременно: где клиент пишет, там и отвечаем.' },
  { q: 'Это безопасно? А персональные данные клиентов?', a: 'Соответствует 152-ФЗ. Имена, телефоны и email клиентов не передаются в нейросеть, используются алиасы. Согласия на обработку фиксируются в журнале аудита.' },
  { q: 'Подходит только автосервисам?', a: 'Да, сейчас работаем только с автосервисами. Детейлинг и автосалоны это другой продукт, рассматриваем отдельно.' },
  { q: 'Сколько занимает подключение?', a: 'Один рабочий день. Вы присылаете прайс и расписание, я загружаю в систему, тестируем вместе, подключаем каналы.' }];

  return (
    <section id="faq" className="zp-section">
      <div className="zp-container" style={{ maxWidth: 920 }}>
        <div className="zp-section-head">
          <div className="zp-kicker">FAQ</div>
          <h2 className="zp-h2">Часто спрашивают</h2>
          <p className="zp-lead">Не нашли ответ? Напишите в Telegram, отвечаю лично.</p>
        </div>
        <div>
          <FAQ items={items} accent={T.accent} theme="light" />
        </div>
      </div>
    </section>);

}

// ─── Final CTA ─────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="start" style={{ background: T.ink, color: '#fff' }}>
      <div className="zp-section">
        <div className="zp-container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 13, color: T.accent, fontWeight: 500, marginBottom: 14, letterSpacing: '.04em', textTransform: 'uppercase' }}>Готовы?</div>
            <h2 style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.05, margin: '0 auto 18px' }}>
              Записали?<br />Записали.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,.7)', maxWidth: 480, lineHeight: 1.55, margin: '0 auto 22px' }}>
              Сейчас собираю первых 3-5 пилотных автосервисов. Для них всё ниже.
            </p>
            <div style={{ display: 'flex', gap: 18, fontSize: 14, color: 'rgba(255,255,255,.6)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span>✓ 2 месяца бесплатно</span>
              <span>✓ −20 % навсегда</span>
              <span>✓ Настройка за мой счёт</span>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 18, padding: 28, color: T.ink, maxWidth: 480, margin: '0 auto' }}>
            <LeadForm accent={T.accent} theme="light" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0 16px', color: T.muted, fontSize: 13 }}>
              <div style={{ flex: 1, height: 1, background: T.line }} /> или <div style={{ flex: 1, height: 1, background: T.line }} />
            </div>
            <a href="https://t.me/maksicrypto?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C%20%D0%B1%D0%BE%D1%82%D0%B0"
              target="_blank" rel="noopener"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, borderRadius: 12, border: `1px solid ${T.line}`, color: T.ink, fontWeight: 600, fontSize: 15 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#229ED9"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>);

}

// ─── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: T.ink, color: 'rgba(255,255,255,.5)', padding: '32px 0', borderTop: '1px solid rgba(255,255,255,.06)', fontSize: 13 }}>
      <div className="zp-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span>© 2026 Записали · Чат-помощник для автосервиса</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="https://t.me/maksicrypto" target="_blank" rel="noopener" className="zp-link-muted">Telegram</a>
          <a href="https://t.me/maksicrypto" target="_blank" rel="noopener" className="zp-link-muted">Контакты</a>
        </div>
      </div>
    </footer>);

}

function MobileMenuStyles() {return null;}

Object.assign(window, { Landing });