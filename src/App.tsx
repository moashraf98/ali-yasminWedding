import { useEffect, useRef, useState } from 'react';

const ASSET_BASE = import.meta.env.BASE_URL;
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const GREETINGS_STORAGE_KEY = 'ali-yasmin-wedding-greetings';
const image = (name: string) => `${ASSET_BASE}assets/images/${name}`;
const music = (name: string) => `${ASSET_BASE}assets/music/${name}`;

type Greeting = {
  id: number;
  name: string;
  message: string;
};

const quickMessages = [
  'ألف مبروك يا علي ويا ياسمين، ربنا يسعدكم ويهنيكم ❤️',
  'ربنا يبارك لكم ويجمع بينكم في خير، ألف مليون مبروك ❤️',
  'ربنا يسعد قلوبكم ويبارك في حياتكم الجديدة، ألف مبروك يا عرسان 🥰',
  'ألف مبروك يا علي ويا ياسمين، ربنا يجمع بينكم دائمًا على الخير والمحبة ويبعد عنكم كل حزن',
  'أخيرًا يا علي وقعت 😂❤️ ألف مبروك يا عريس!',
  'مبروك يا صاحبي ❤️ ربنا يسعدك ويهنيك ويجعل أيامك كلها فرح.',
  'ألف مبروك يا ياسمين يا عروسة ❤️😂 ربنا يسعدك ويهنيكي ويخلي أيامك كلها ضحك وفرحة… وأهم حاجة خدي بالك من علي بقى، ده بقى مسؤوليتك من النهارده 😂😂 ربنا يتمم لكم على خير وتفضلوا دايمًا مبسوطين مع بعض ❤️🥰',
  'على بيحب المانجا والفسيخ وعصير القصب ياعروسه 😂',
];

function Sprig() {
  return (
    <svg className="cover-sprig" viewBox="0 0 100 60" fill="none" aria-hidden="true">
      <path d="M10 50 Q40 10 90 20" stroke="#c6a15b" strokeWidth="1.4" />
      <g fill="#f7f2e7" stroke="#c6a15b" strokeWidth="1">
        <circle cx="22" cy="38" r="5" /><circle cx="16" cy="35" r="3.2" /><circle cx="26" cy="33" r="3.2" />
        <circle cx="50" cy="21" r="5" /><circle cx="44" cy="19" r="3.2" /><circle cx="54" cy="16" r="3.2" />
        <circle cx="80" cy="19" r="4.2" /><circle cx="75" cy="16" r="2.6" />
      </g>
    </svg>
  );
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
}
function ClockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>;
}
function VenueIcon() {
  return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" aria-hidden="true"><path d="M4 21V9l8-6 8 6v12" /><path d="M9 21v-7h6v7" /></svg>;
}
function PinIcon() {
  return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" aria-hidden="true"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.4" /></svg>;
}
function Cover({ onOpen, opened }: { onOpen: () => void; opened: boolean }) {
  return (
    <div
      className={`cover${opened ? ' opened' : ''}`}
      style={{ backgroundImage: `linear-gradient(180deg, rgba(15,23,18,.6) 0%, rgba(15,23,18,.8) 55%, rgba(15,23,18,.92) 100%), url('${image('MOMO11011.jpg')}')` }}
      data-opened={opened ? 'true' : 'false'}
    >
      <div className="cover-inner">
        <div className="eyebrow">دعوة خاصة</div>
        <Sprig />
        <div className="cover-names display">علي <span className="gold">و</span> ياسمين</div>
        <div className="cover-date">الأربعاء ٢١ أكتوبر ٢٠٢٦</div>
        <button className="open-btn" type="button" onClick={onOpen} data-testid="button-open-invitation">
          افتحوا الدعوة
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </button>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="nav" aria-label="التنقل الرئيسي">
      <div className="nav-mark">علي وياسمين</div>
      <div className="nav-links">
        <a href="#home" data-testid="link-home">الرئيسية</a>
        <a href="#event" data-testid="link-event">الموعد</a>
        <a href="#rsvp" data-testid="link-rsvp">رسالة للعروسين</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="vine-wrap" aria-hidden="true">
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none"><path className="vine-path" d="M0 30 Q150 90 300 40 T600 50 T1000 20" stroke="#c6a15b" strokeWidth="1.2" fill="none" /></svg>
      </div>
      <div className="hero-eyebrow">بكل الحب والسعادة</div>
      <h1 className="hero-names display">علي <span className="gold">و</span> ياسمين</h1>
      <p className="hero-sub">يتشرفان بدعوتكم لمشاركتهما أجمل لحظات حياتهما، ونرجو أن يكون حضوركم جزءًا من فرحتنا</p>
      <div className="hero-meta">
        <span><b>الأربعاء، 21 أكتوبر 2026</b></span><span>·</span><span>الساعة <b>8:00 مساءً</b></span><span>·</span><span>قاعة <b>le palace garden </b>، الزقازيق</span>
      </div>
      <a className="cta" href="#event" data-testid="link-event-details">تفاصيل الليلة</a>
    </section>
  );
}

function EventDetails() {
  const details = [
    { title: 'التاريخ', text: 'الأربعاء، 21 أكتوبر 2026', icon: <CalendarIcon /> },
    { title: 'الوقت', text: 'الساعة 8:00 مساءً', icon: <ClockIcon /> },
    { title: 'المكان', text: 'le palace garden ', icon: <VenueIcon /> },
    { title: 'العنوان', text: 'نزله كوبرى مستشفى الصدر اتجاه الأحرار، الزقازيق ، محافظة الشرقية', icon: <PinIcon /> },
  ];
  return (
    <section id="event">
      <div className="section-eyebrow">تفاصيل الليلة</div>
      <h2 className="section-title">موعدنا معكم</h2>
      <div className="detail-grid">
        {details.map((detail) => <div className="detail-card" key={detail.title} data-testid={`card-detail-${detail.title}`}>{detail.icon}<h3>{detail.title}</h3><p>{detail.text}</p></div>)}
      </div>
      <a className="map-link" href="https://maps.app.goo.gl/1SSzonxmQSWA1Hew5?g_st=ic" target="_blank" rel="noopener" data-testid="link-google-maps">عرض الموقع على خرائط جوجل ↗</a>
    </section>
  );
}

function Countdown() {
  const [time, setTime] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });
  useEffect(() => {
    const target = new Date('2026-10-21T20:00:00').getTime();
    const update = () => {
      let diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24)); diff -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(diff / (1000 * 60 * 60)); diff -= hours * 1000 * 60 * 60;
      const mins = Math.floor(diff / (1000 * 60)); diff -= mins * 1000 * 60;
      const secs = Math.floor(diff / 1000);
      setTime({ days: String(days).padStart(2, '0'), hours: String(hours).padStart(2, '0'), mins: String(mins).padStart(2, '0'), secs: String(secs).padStart(2, '0') });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section id="countdown" className="countdown">
      <div className="section-eyebrow">موعدنا يقترب</div>
      <h2 className="section-title">باقي على فرحتنا</h2>
      <div className="count-row" data-testid="countdown-row">
        <div className="count-unit"><div className="count-num" data-testid="count-days">{time.days}</div><div className="count-label">يوم</div></div>
        <div className="count-unit"><div className="count-num" data-testid="count-hours">{time.hours}</div><div className="count-label">ساعة</div></div>
        <div className="count-unit"><div className="count-num" data-testid="count-minutes">{time.mins}</div><div className="count-label">دقيقة</div></div>
        <div className="count-unit"><div className="count-num" data-testid="count-seconds">{time.secs}</div><div className="count-label">ثانية</div></div>
      </div>
    </section>
  );
}

function RSVP({ showToast }: { showToast: (message: string) => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [savedGreetings, setSavedGreetings] = useState<Greeting[]>([]);
  const [greetingsLoading, setGreetingsLoading] = useState(true);
  const [greetingsError, setGreetingsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadGreetings = async () => {
      setGreetingsLoading(true);
      setGreetingsError(false);
      try {
        if (API_BASE) {
          const response = await fetch(`${API_BASE}/api/greetings`);
          if (!response.ok) throw new Error('Unable to load greetings');
          const remoteGreetings = await response.json() as Greeting[];
          if (!cancelled) setSavedGreetings(remoteGreetings);
          return;
        }
        const stored = window.localStorage.getItem(GREETINGS_STORAGE_KEY);
        if (!cancelled) setSavedGreetings(stored ? JSON.parse(stored) as Greeting[] : []);
      } catch {
        if (!cancelled) {
          setGreetingsError(Boolean(API_BASE));
          const stored = window.localStorage.getItem(GREETINGS_STORAGE_KEY);
          setSavedGreetings(stored ? JSON.parse(stored) as Greeting[] : []);
        }
      } finally {
        if (!cancelled) setGreetingsLoading(false);
      }
    };
    void loadGreetings();
    return () => { cancelled = true; };
  }, []);

  const saveGreeting = async () => {
    const trimmedName = name.trim();
    const msg = message.trim();
    if (!trimmedName) { showToast('اكتبوا اسمكم الأول 🌿'); return; }
    if (!msg) { showToast('اكتبوا رسالتكم الأول 🌿'); return; }
    if (trimmedName.length > 100) { showToast('الاسم طويل جدًا، اكتبوا 100 حرف أو أقل'); return; }
    if (msg.length > 1000) { showToast('الرسالة طويلة جدًا، اكتبوا 1000 حرف أو أقل'); return; }

    setIsSaving(true);
    try {
      let greeting: Greeting;
      if (API_BASE) {
        const response = await fetch(`${API_BASE}/api/greetings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: trimmedName, message: msg }),
        });
        if (!response.ok) throw new Error('Unable to save greeting');
        greeting = await response.json() as Greeting;
      } else {
        greeting = { id: Date.now(), name: trimmedName, message: msg };
        const nextGreetings = [greeting, ...savedGreetings];
        window.localStorage.setItem(GREETINGS_STORAGE_KEY, JSON.stringify(nextGreetings));
      }
      setSavedGreetings((current) => [greeting, ...current]);
      setName('');
      setMessage('');
      setSelectedMessage('');
      showToast('تم حفظ رسالتكم الجميلة ✨');
    } catch {
      showToast('تعذر حفظ الرسالة الآن، حاولوا مرة أخرى');
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <section id="rsvp">
      <div className="section-eyebrow">كلمات من القلب</div>
      <h2 className="section-title">شاركونا كلماتكم الجميلة</h2>
      <div className="rsvp-box">
        <p className="rsvp-lead">اتركوا لنا رسالة جميلة لتبقى محفوظة هنا مع رسائل الأحباب.</p>
        <div className="field"><label htmlFor="rsvpName">الاسم</label><input id="rsvpName" type="text" maxLength={100} placeholder="اسمك" value={name} onChange={(event) => setName(event.target.value)} data-testid="input-rsvp-name" /></div>
        <div className="field">
          <label htmlFor="rsvpMsg">رسالة للعروسين</label>
          <div className="quick-msgs" id="quickMsgs">
            {quickMessages.map((item, index) => <button key={item} type="button" className={`quick-msg-chip${selectedMessage === item ? ' selected' : ''}`} onClick={() => { setSelectedMessage(item); setMessage(item); }} data-testid={`button-message-chip-${index}`}>{item}</button>)}
          </div>
          <textarea id="rsvpMsg" maxLength={1000} placeholder="اكتبوا رسالتكم هنا، أو اختاروا من الرسائل الجاهزة فوق..." value={message} onChange={(event) => { setMessage(event.target.value); setSelectedMessage(''); }} data-testid="input-rsvp-message" />
        </div>
        <button className="save-btn" type="button" onClick={() => void saveGreeting()} disabled={isSaving} data-testid="button-save-greeting">
          {isSaving ? 'جارٍ الحفظ...' : 'حفظ الرسالة'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
        </button>
        {greetingsLoading && <div className="saved-messages-status" data-testid="status-greetings-loading">جارٍ تحميل رسائل الأحباب...</div>}
        {greetingsError && <div className="saved-messages-status error" data-testid="status-greetings-error">تعذر تحميل الرسائل الآن.</div>}
        {!greetingsLoading && !greetingsError && savedGreetings.length > 0 && (
          <div className="saved-messages" aria-live="polite">
            <div className="saved-messages-heading" data-testid="heading-saved-messages">رسائل الأحباب</div>
            <div className="saved-messages-list">
              {savedGreetings.map((greeting) => (
                <article className="saved-message" key={greeting.id}>
                  <div className="saved-message-name">{greeting.name}</div>
                  <p>{greeting.message}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer({ showToast }: { showToast: (message: string) => void }) {
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); showToast('تم نسخ رابط الدعوة ✨'); }
    catch { showToast('انسخ الرابط من شريط العنوان'); }
  };
  return (
    <footer id="share">
      <div className="footer-names display">علي و ياسمين</div>
      <div className="footer-meta">الخميس، 21 أكتوبر 2026 · الساعة 8:00 مساءً ·le palace garden، الزقازيق</div>
      <div className="footer-actions">
        <a className="foot-link" href="https://maps.app.goo.gl/1SSzonxmQSWA1Hew5?g_st=ic" target="_blank" rel="noopener" data-testid="link-footer-location">عرض الموقع</a>
        <a className="foot-link" href="#rsvp" data-testid="link-footer-message">إرسال رسالة</a>
        <button className="foot-link" type="button" onClick={copyLink} data-testid="button-copy-link">نسخ رابط الدعوة</button>
      </div>
      <div className="foot-credit">صُنعت بكل الحب لفرحة علي وياسمين · 21 · 10 · 2026</div>
    </footer>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [toast, setToast] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef(0);
  const toastTimer = useRef<number | undefined>(undefined);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2200);
  };

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % 2), 4000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    const start = () => {
      if (audio.paused) audio.play().then(() => setPaused(false)).catch(() => undefined);
      document.removeEventListener('touchstart', start);
      document.removeEventListener('click', start);
    };
    document.addEventListener('touchstart', start, { passive: true });
    document.addEventListener('click', start);
    return () => { document.removeEventListener('touchstart', start); document.removeEventListener('click', start); };
  }, []);

  const openInvitation = () => {
    setOpened(true);
    const audio = audioRef.current;
    audio?.play().then(() => setPaused(false)).catch(() => undefined);
  };
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().then(() => setPaused(false)).catch(() => showToast('لسه محدّدش ملف الأغنية'));
    else { audio.pause(); setPaused(true); }
  };
  const songs = [
  'song.mp3',
  'ashan_bhbk.mp3',
  'ElHobGany.mp3'
];

const handleEnded = () => {
  const audio = audioRef.current;
  if (!audio) return;

  trackRef.current = (trackRef.current + 1) % songs.length;

  audio.src = music(songs[trackRef.current]);
  audio.play().catch(() => undefined);
};

  return (
    <main className="invitation" dir="rtl">
      <div className="bg-slideshow" aria-hidden="true">
        <div className={`bg-slide${slide === 0 ? ' active' : ''}`} style={{ backgroundImage: `url('${image('MOMO1233.jpg')}')` }} />
        <div className={`bg-slide${slide === 1 ? ' active' : ''}`} style={{ backgroundImage: `url('${image('MOMO11011.jpg')}')` }} />
      </div>
      <div className="bg-overlay" />
      <Cover opened={opened} onOpen={openInvitation} />
      <Navigation />
      <Hero />
      <EventDetails />
      <Countdown />
      <RSVP showToast={showToast} />
      <Footer showToast={showToast} />
      <div className={`toast${toast ? ' show' : ''}`} role="status" data-testid="status-toast">{toast}</div>
      <audio ref={audioRef} src={music('ElHobGany.mp3')} preload="auto" onEnded={handleEnded} />
      <button className={`music-toggle${paused ? ' paused' : ''}`} type="button" onClick={toggleMusic} aria-label="تشغيل/إيقاف الموسيقى" data-testid="button-music-toggle">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line className="bar" x1="7" y1="16" x2="7" y2="8" /><line className="bar" x1="12" y1="18" x2="12" y2="5" /><line className="bar" x1="17" y1="16" x2="17" y2="10" /></svg>
      </button>
    </main>
  );
}

export default App;