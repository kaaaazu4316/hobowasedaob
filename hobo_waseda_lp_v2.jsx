import { useState, useEffect } from "react";

const C = {
  deep: "#0a1628",
  ocean: "#0d2137",
  wave: "#143a5c",
  gold: "#d4a853",
  goldLight: "#f0d68a",
  cream: "#faf3e0",
  coral: "#e87461",
  teal: "#2ec4b6",
  white: "#fff",
  food: "#e87461",
  ai: "#2ec4b6",
  dialogue: "#b48aed",
};

// ─── Calendar ───
const EVENTS_2026 = [
  // ── 4月 食事島（毎週月曜・木曜 19:00〜）──
  { day: 6, month: 3, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 9, month: 3, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 13, month: 3, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 16, month: 3, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 20, month: 3, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 23, month: 3, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 27, month: 3, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 30, month: 3, island: "food", title: "食事島 19:00〜", time: "19:00" },
  // ── 4月 AI朝活（毎週水曜 8:00〜9:00）──
  { day: 1, month: 3, island: "ai", title: "AI朝活 8:00〜9:00", time: "8:00" },
  { day: 8, month: 3, island: "ai", title: "AI朝活 8:00〜9:00", time: "8:00" },
  { day: 15, month: 3, island: "ai", title: "AI朝活 8:00〜9:00", time: "8:00" },
  { day: 22, month: 3, island: "ai", title: "AI朝活 8:00〜9:00", time: "8:00" },
  { day: 29, month: 3, island: "ai", title: "AI朝活 8:00〜9:00", time: "8:00" },
  // ── 4月 AI島×対話島（特別イベント 16:00〜19:00）──
  { day: 11, month: 3, island: "ai", title: "AI島×対話島 16:00〜19:00", time: "16:00" },
  { day: 11, month: 3, island: "dialogue", title: "AI島×対話島 16:00〜19:00", time: "16:00" },
  { day: 18, month: 3, island: "ai", title: "AI島×対話島 16:00〜19:00", time: "16:00" },
  { day: 18, month: 3, island: "dialogue", title: "AI島×対話島 16:00〜19:00", time: "16:00" },
  // ── 5月 食事島（毎週月曜・木曜 19:00〜）──
  { day: 4, month: 4, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 7, month: 4, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 11, month: 4, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 14, month: 4, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 18, month: 4, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 21, month: 4, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 25, month: 4, island: "food", title: "食事島 19:00〜", time: "19:00" },
  { day: 28, month: 4, island: "food", title: "食事島 19:00〜", time: "19:00" },
  // ── 5月 AI朝活（毎週水曜 8:00〜9:00）──
  { day: 6, month: 4, island: "ai", title: "AI朝活 8:00〜9:00", time: "8:00" },
  { day: 13, month: 4, island: "ai", title: "AI朝活 8:00〜9:00", time: "8:00" },
  { day: 20, month: 4, island: "ai", title: "AI朝活 8:00〜9:00", time: "8:00" },
  { day: 27, month: 4, island: "ai", title: "AI朝活 8:00〜9:00", time: "8:00" },
  // ── 5月 AI島×対話島（特別イベント 16:00〜19:00）──
  { day: 16, month: 4, island: "ai", title: "AI島×対話島 16:00〜19:00", time: "16:00" },
  { day: 16, month: 4, island: "dialogue", title: "AI島×対話島 16:00〜19:00", time: "16:00" },
  { day: 30, month: 4, island: "ai", title: "AI島×対話島 16:00〜19:00", time: "16:00" },
  { day: 30, month: 4, island: "dialogue", title: "AI島×対話島 16:00〜19:00", time: "16:00" },
];

const ISLAND_COLORS = { food: C.food, ai: C.ai, dialogue: C.dialogue };
const ISLAND_LABELS = { food: "食事島", ai: "AI島", dialogue: "対話島" };

function Calendar({ month, year, onIslandClick }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthEvents = EVENTS_2026.filter((e) => e.month === month);
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const monthNames = [
    "1月","2月","3月","4月","5月","6月",
    "7月","8月","9月","10月","11月","12月",
  ];

  return (
    <div style={{ background: "rgba(13,33,55,0.7)", borderRadius: 16, padding: "20px 16px", border: "1px solid rgba(212,168,83,0.2)" }}>
      <h3 style={{ textAlign: "center", color: C.gold, fontSize: 18, fontWeight: 700, marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
        {year}年 {monthNames[month]}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
        {["日","月","火","水","木","金","土"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, color: "rgba(250,243,224,0.4)", padding: "4px 0" }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {days.map((day, i) => {
          const eventsOnDay = day ? monthEvents.filter((e) => e.day === day) : [];
          return (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                background: eventsOnDay.length > 0 ? "rgba(212,168,83,0.08)" : "transparent",
                position: "relative",
                cursor: eventsOnDay.length > 0 ? "pointer" : "default",
              }}
              title={eventsOnDay.map((e) => e.title).join(", ")}
              onClick={() => {
                if (eventsOnDay.length > 0) onIslandClick(eventsOnDay[0].island);
              }}
            >
              <span style={{ fontSize: 13, color: day ? C.cream : "transparent", opacity: day ? 0.7 : 0 }}>
                {day || ""}
              </span>
              {eventsOnDay.length > 0 && (
                <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
                  {eventsOnDay.map((e, j) => (
                    <div
                      key={j}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: ISLAND_COLORS[e.island],
                        boxShadow: `0 0 6px ${ISLAND_COLORS[e.island]}80`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
        {Object.entries(ISLAND_LABELS).map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }} onClick={() => onIslandClick(key)}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: ISLAND_COLORS[key] }} />
            <span style={{ fontSize: 11, color: "rgba(250,243,224,0.6)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Photo gallery placeholder ───
function PhotoGallery() {
  const placeholders = [
    { bg: "linear-gradient(135deg, #e87461, #d4a853)", emoji: "🍳", label: "手作り料理" },
    { bg: "linear-gradient(135deg, #d4a853, #e87461)", emoji: "🥘", label: "みんなで鍋" },
    { bg: "linear-gradient(135deg, #2ec4b6, #d4a853)", emoji: "🎉", label: "集合写真" },
    { bg: "linear-gradient(135deg, #e87461, #b48aed)", emoji: "🍕", label: "ピザパーティ" },
    { bg: "linear-gradient(135deg, #d4a853, #2ec4b6)", emoji: "🍰", label: "デザートタイム" },
    { bg: "linear-gradient(135deg, #b48aed, #e87461)", emoji: "🥂", label: "乾杯！" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
      {placeholders.map((p, i) => (
        <div
          key={i}
          style={{
            aspectRatio: "1",
            borderRadius: 12,
            background: p.bg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.85,
            transition: "all 0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          <span style={{ fontSize: 32 }}>{p.emoji}</span>
          <span style={{ fontSize: 11, color: C.deep, fontWeight: 700, marginTop: 4 }}>{p.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Event tile ───
function EventTile({ emoji, title, date, desc, color, columns = 1 }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "rgba(13,33,55,0.8)",
        border: `1px solid ${hov ? color : "rgba(212,168,83,0.2)"}`,
        borderRadius: 14,
        padding: columns === 2 ? "20px 16px" : "24px 20px",
        transition: "all 0.3s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 12px 30px rgba(0,0,0,0.3), 0 0 20px ${color}15` : "0 4px 12px rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 28 }}>{emoji}</span>
        <div>
          <h4 style={{ color: C.cream, fontSize: columns === 2 ? 14 : 16, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{title}</h4>
          {date && <p style={{ color, fontSize: 11, margin: "2px 0 0", fontWeight: 600 }}>{date}</p>}
        </div>
      </div>
      <p style={{ color: "rgba(250,243,224,0.65)", fontSize: columns === 2 ? 12 : 13, lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ─── Island detail pages ───
function FoodIslandPage({ onBack }) {
  return (
    <div>
      <PageHeader emoji="🍽️" title="食事島" subtitle="Food Island" color={C.food} onBack={onBack} />
      <div className="sc">
        <div style={{ marginBottom: 40 }}>
          <SectionLabel text="食事島ってこんな島" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "🏠 ご飯を囲みながらゆるく繋がる「最初の島」",
              "🤝 初対面でもOK。テーマ縛りなし、自然な会話を楽しもう",
              "👨‍🍳 OBの手料理やみんなで作る料理会も開催",
              "💰 参加費無料（食材費のみ割り勘）",
              "📅 毎週月曜・木曜 19:00〜 早稲田エリアで開催",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 18, lineHeight: "1.6" }}>{item.slice(0, 2)}</span>
                <p style={{ color: C.cream, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item.slice(3)}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <SectionLabel text="これまでの食事島の様子" />
          <p style={{ color: "rgba(250,243,224,0.5)", fontSize: 13, marginBottom: 16, textAlign: "center" }}>
            ※ 実際の写真に差し替え可能です
          </p>
          <PhotoGallery />
        </div>

        <div style={{ marginBottom: 40 }}>
          <SectionLabel text="開催予定" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {EVENTS_2026.filter((e) => e.island === "food").map((e, i) => (
              <EventTile
                key={i}
                emoji="🍽️"
                title={e.title}
                date={`${e.month + 1}月${e.day}日`}
                desc="早稲田エリアで開催。初参加大歓迎！"
                color={C.food}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AIIslandPage({ onBack }) {
  const regularEvents = [
    { emoji: "☀️", title: "AI朝活", date: "毎週水曜 8:00〜9:00", desc: "朝ごはん食べながらAIで遊ぶ1時間。ChatGPTしか使ってない？Claude、Perplexity、Gemini…AI四天王の使い分けを体感しよう。" },
  ];
  const specialEvents = [
    { emoji: "🔥", title: "AI島×対話島「AI時代に必要な人間のスキルとは？」", date: "4/11（土）16:00〜19:00", desc: "AIが何でもやってくれる時代に、人間が磨くべきスキルは何か？ハンズオン＋ディスカッションの3時間。" },
    { emoji: "🔥", title: "AI島×対話島「ChatGPTしか使ってないの？」", date: "4/18（土）16:00〜19:00", desc: "AI四天王を実際に触り比べて、使い分けを体感。その後「AIとどう生きる？」を語り合う。" },
    { emoji: "🔥", title: "AI島×対話島「就活をAIでハックする」", date: "5/16（土）16:00〜19:00", desc: "ES作成・自己分析・面接練習をAIで実践。その後「AI使えば就活楽勝？」を本音で議論。" },
    { emoji: "🔥", title: "AI島×対話島「AIでレポートの質を爆上げする」", date: "5/30（土）16:00〜19:00", desc: "Perplexityでリサーチ→Claudeで構成→ChatGPTで仕上げ。AIレポート術を体験して語り合う。" },
  ];

  return (
    <div>
      <PageHeader emoji="🤖" title="AI島" subtitle="AI Island" color={C.ai} onBack={onBack} />
      <div className="sc">
        <div style={{ marginBottom: 40 }}>
          <SectionLabel text="AI島ってこんな島" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "🤖 「ChatGPTしか使ってないの？もったいない！」がスタート地点",
              "🛠️ 知る・触る・考えるの3本柱。ハンズオンも議論もやる",
              "☀️ 毎週水曜の朝活でAIに触れる習慣をつくる",
              "👥 一人だと続かないAI学習も、仲間と一緒なら楽しい",
              "📅 AI朝活：毎週水曜 8:00〜9:00 ／ 特別イベント：月2回",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 18, lineHeight: "1.6" }}>{item.slice(0, 2)}</span>
                <p style={{ color: C.cream, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item.slice(3)}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <SectionLabel text="🌅 AI朝活（毎週開催）" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {regularEvents.map((e, i) => (
              <EventTile key={i} {...e} color={C.ai} />
            ))}
          </div>
        </div>

        <div>
          <SectionLabel text="🔥 AI島×対話島 特別イベント" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {specialEvents.map((e, i) => (
              <EventTile key={i} {...e} color={C.goldLight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DialogueIslandPage({ onBack }) {
  const events = [
    { emoji: "🌟", title: "夢を語る会", date: "4月", desc: "「10年後の自分に手紙を書くなら？」夢や目標を本音で語り合う。" },
    { emoji: "📚", title: "好きな本で対話", date: "4月", desc: "お気に入りの一冊を持ち寄って、その本がなぜ刺さったのかを語る。" },
    { emoji: "💰", title: "お金と幸せは比例するか", date: "5月予定", desc: "経済・キャリア・人生設計…リアルなお金の話を深掘り。" },
    { emoji: "💼", title: "就活リアルトーク", date: "5月予定", desc: "OBの就活体験を聞きながら、自分のキャリアを考える対話会。" },
    { emoji: "🎬", title: "好きなアニメ・漫画で対話", date: "6月予定", desc: "推し作品を語り合いながら、そこに映る自分の価値観を発見する。" },
    { emoji: "🔥", title: "働くってなんだ？", date: "6月予定", desc: "社会人OBと一緒に「仕事」「やりがい」「生き方」を問い直す。" },
    { emoji: "🌍", title: "旅の体験を語る", date: "7月予定", desc: "旅で得た気づき、カルチャーショック、人生を変えた出会いを共有。" },
    { emoji: "🎓", title: "大学生活で一番の失敗", date: "7月予定", desc: "失敗こそ最高の対話テーマ。笑って語れる失敗から学びを引き出す。" },
  ];

  return (
    <div>
      <PageHeader emoji="💬" title="対話島" subtitle="Dialogue Island" color={C.dialogue} onBack={onBack} />
      <div className="sc">
        <div style={{ marginBottom: 40 }}>
          <SectionLabel text="対話島ってこんな島" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "💬 テーマを決めて少人数（6〜10名）で深く語り合う場",
              "🧭 OBは「教える側」ではなく「一緒に対話する仲間」",
              "🪞 対話後に「今日の磁気（気づき）」を全員で共有",
              "🌱 表面的な会話では得られない自己発見がある",
              "📅 AI島×対話島：4/11, 4/18, 5/16, 5/30（土）16:00〜19:00",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 18, lineHeight: "1.6" }}>{item.slice(0, 2)}</span>
                <p style={{ color: C.cream, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item.slice(3)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel text="対話企画ラインナップ" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {events.map((e, i) => (
              <EventTile key={i} {...e} color={C.dialogue} columns={2} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared components ───
function PageHeader({ emoji, title, subtitle, color, onBack }) {
  return (
    <div style={{ padding: "60px 24px 32px", textAlign: "center", position: "relative" }}>
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "rgba(250,243,224,0.1)",
          border: "1px solid rgba(250,243,224,0.2)",
          borderRadius: 40,
          padding: "8px 18px",
          color: C.cream,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "'Noto Sans JP', sans-serif",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(250,243,224,0.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(250,243,224,0.1)"; }}
      >
        ← 戻る
      </button>
      <div style={{ fontSize: 56, marginBottom: 8 }}>{emoji}</div>
      <h1 style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 32, fontWeight: 900, color: C.cream, margin: "0 0 4px" }}>{title}</h1>
      <p style={{ fontSize: 13, color, letterSpacing: 3, fontWeight: 500, fontFamily: "'Playfair Display', serif" }}>{subtitle}</p>
      <div style={{ width: 60, height: 2, background: color, margin: "16px auto 0", borderRadius: 1 }} />
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <h3 style={{ color: C.gold, fontSize: 16, fontWeight: 700, marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid rgba(212,168,83,0.2)" }}>
      {text}
    </h3>
  );
}

// ─── Island card (top page) ───
function IslandCardTop({ emoji, title, subtitle, features, color, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "rgba(13,33,55,0.85)",
        border: `1px solid ${hov ? color : "rgba(212,168,83,0.25)"}`,
        borderRadius: 16,
        padding: "28px 20px",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: hov ? "translateY(-6px) scale(1.02)" : "none",
        boxShadow: hov ? `0 16px 40px rgba(0,0,0,0.35), 0 0 20px ${color}20` : "0 4px 16px rgba(0,0,0,0.25)",
        flex: "1 1 260px",
        maxWidth: 340,
        minWidth: 240,
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 10 }}>{emoji}</div>
      <h3 style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 20, fontWeight: 800, color: C.cream, margin: "0 0 4px" }}>{title}</h3>
      <p style={{ color, fontSize: 12, fontWeight: 600, margin: "0 0 14px", letterSpacing: 1 }}>{subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {features.map((f, i) => (
          <p key={i} style={{ color: "rgba(250,243,224,0.65)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
            {f}
          </p>
        ))}
      </div>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, color, fontSize: 13, fontWeight: 600 }}>
        詳しく見る →
      </div>
    </div>
  );
}

// ─── Star field ───
function StarField() {
  const stars = Array.from({ length: 35 }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 50,
    size: Math.random() * 2 + 1, delay: Math.random() * 3, dur: Math.random() * 2 + 2,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
          width: s.size, height: s.size, borderRadius: "50%", background: C.goldLight,
          animation: `twinkle ${s.dur}s ${s.delay}s infinite ease-in-out`,
        }} />
      ))}
    </div>
  );
}

// ─── Wave BG ───
function WaveBG() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg viewBox="0 0 1440 320" style={{ position: "absolute", bottom: 0, width: "100%", opacity: 0.12 }}>
        <path fill={C.gold}>
          <animate attributeName="d" dur="8s" repeatCount="indefinite" values="
            M0,224L60,213C120,203,240,181,360,187C480,192,600,224,720,229C840,235,960,213,1080,187C1200,160,1320,128,1380,112L1440,96L1440,320L0,320Z;
            M0,192L60,203C120,213,240,235,360,229C480,224,600,192,720,181C840,171,960,181,1080,197C1200,213,1320,235,1380,246L1440,256L1440,320L0,320Z;
            M0,224L60,213C120,203,240,181,360,187C480,192,600,224,720,229C840,235,960,213,1080,187C1200,160,1320,128,1380,112L1440,96L1440,320L0,320Z" />
        </path>
      </svg>
    </div>
  );
}

// ─── Expandable Block ───
function ExpandableBlock({ emoji, label, title, preview, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "rgba(13,33,55,0.7)", border: "1px solid rgba(212,168,83,0.2)",
      borderRadius: 16, overflow: "hidden", transition: "all 0.3s",
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "24px 20px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 14,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.05)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        <span style={{ fontSize: 32, lineHeight: 1 }}>{emoji}</span>
        <div style={{ flex: 1 }}>
          <p style={{ color: C.gold, fontSize: 11, letterSpacing: 3, fontWeight: 600, marginBottom: 4 }}>{label}</p>
          <h3 style={{ color: C.cream, fontSize: 18, fontWeight: 800, margin: "0 0 6px", fontFamily: "'Noto Sans JP', sans-serif" }}>{title}</h3>
          <p style={{ color: "rgba(250,243,224,0.6)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{preview}</p>
        </div>
        <span style={{
          color: C.gold, fontSize: 18, transition: "transform 0.3s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)", marginTop: 4,
        }}>▼</span>
      </div>
      {open && (
        <div style={{
          padding: "0 20px 24px", borderTop: "1px solid rgba(212,168,83,0.1)",
          animation: "fadeUp 0.4s both ease-out",
        }}>
          <div style={{ paddingTop: 20 }}>{children}</div>
        </div>
      )}
    </div>
  );
}

// ─── Story Section ───
function StorySection() {
  return (
    <section style={{ padding: "20px 24px 0" }}>
      <div className="sc">
        <ExpandableBlock
          emoji="🧭"
          label="OUR STORY"
          title="私たちのストーリー"
          preview="ONE PIECEの「航海」と「クルー」の世界観で、人生の大航海へ。"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <StoryParagraph
              title="大海原への旅立ち"
              text="人生は、どこまでも続く大海原。偉大なる航路（グランドライン）の先には、まだ見ぬ島（＝新しい体験や価値観に触れる場所や機会）が無数に広がっています。私たちは、そんな大航海に自分の「ログポース（心のコンパス）」を持って旅立ちます。"
            />
            <StoryParagraph
              title="島での冒険"
              text="ログポースは、今の自分が本当に「行ってみたい」と思う島を指し示します。その島には、同じように心惹かれた仲間たちが集まります。島に上陸したら、さまざまな体験や出会いを通じて「磁気（学びや気づき）」を蓄えます。磁気がたまることで、次の島への道が示され、また新たな冒険が始まります。"
            />
            <StoryParagraph
              title="クルーと共に"
              text="この航海は、一人ではありません。共に航海するクルー（仲間）と、時に笑い、時に涙し、時に語り合いながら、お互いの価値観をアップデートし、深い絆を育んでいきます。"
            />
            <StoryParagraph
              title="「よっ友」ではなく「ほっ友」"
              text="ただの&quot;よっ友&quot;はいらない。ホッと心から信頼できる&quot;ほっ友&quot;、心を熱く(ホット)する&quot;ホッ友&quot;と出会い対話をする居場所です。テーマごとの&quot;島&quot;があります。どの島に行くかは自由。心のログポースが指し示す方向に進んでください。"
            />
            <StoryParagraph
              title="シャボンティ諸島へ"
              text="それぞれの島で仲間と対話し、学び合い、「人生の航海図」を少しずつ描いていきます。最終的には、シャボンティ諸島のように全員が「同じ島」に集結し、航海を振り返り、また新たな冒険へと旅立ちます。"
            />
            <div style={{
              background: `linear-gradient(135deg, rgba(212,168,83,0.15), rgba(232,116,97,0.1))`,
              borderRadius: 12, padding: "20px", textAlign: "center", marginTop: 4,
            }}>
              <p style={{ color: C.cream, fontSize: 16, fontWeight: 700, lineHeight: 1.8, margin: 0 }}>
                一度しかない貴重な大学生活、<br />
                どの船に乗るか。誰と船を漕ぐか。どこに向かうか。
              </p>
              <p style={{ color: C.gold, fontSize: 14, marginTop: 8, fontWeight: 600 }}>
                「ラフテルという人生の目的を探す航海」<br />
                「ひとつなぎの大秘宝という自分だけの個性の宝を発見する航海」
              </p>
              <p style={{ color: C.coral, fontSize: 18, fontWeight: 900, marginTop: 12 }}>
                一緒に船に乗ろう！行こう！！！
              </p>
            </div>
          </div>
        </ExpandableBlock>
      </div>
    </section>
  );
}

function StoryParagraph({ title, text }) {
  return (
    <div>
      <h4 style={{ color: C.gold, fontSize: 14, fontWeight: 700, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
        {title}
      </h4>
      <p style={{ color: "rgba(250,243,224,0.7)", fontSize: 14, lineHeight: 1.9, margin: 0, paddingLeft: 14 }}>{text}</p>
    </div>
  );
}

// ─── MVV Section ───
function MVVSection() {
  return (
    <section style={{ padding: "12px 24px 0" }}>
      <div className="sc">
        <ExpandableBlock
          emoji="⚓"
          label="MISSION / VISION / VALUE"
          title="私たちの使命と価値観"
          preview="共に成長し、自分だけの人生の宝物を見つける航海。"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <MVVItem
              tag="MISSION"
              color={C.coral}
              text="学生たちが人生の航海を通じて、仲間と共に成長し、自分の価値観をアップデートしながら、豊かな人生の宝物を見つけること"
            />
            <MVVItem
              tag="VISION"
              color={C.teal}
              text="彷徨う学生たちが、仲間と共に航海することで、自分らしい人生の方向性を見つけ、社会に貢献できる人材として成長する未来"
            />
            <div>
              <span style={{
                display: "inline-block", background: C.dialogue, color: C.deep,
                fontSize: 11, fontWeight: 800, padding: "3px 12px", borderRadius: 20, marginBottom: 12, letterSpacing: 1,
              }}>VALUE</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                {[
                  { icon: "⚔️", ja: "冒険心", en: "Adventure" },
                  { icon: "🤝", ja: "仲間意識", en: "Crew Spirit" },
                  { icon: "🔥", ja: "深い対話と学び", en: "Deep Dialogue" },
                  { icon: "🪞", ja: "自己内省と発見", en: "Self-Reflection" },
                ].map((v) => (
                  <div key={v.en} style={{
                    background: "rgba(250,243,224,0.05)", borderRadius: 10, padding: "14px 12px",
                    textAlign: "center", border: "1px solid rgba(212,168,83,0.1)",
                  }}>
                    <span style={{ fontSize: 24 }}>{v.icon}</span>
                    <p style={{ color: C.cream, fontSize: 13, fontWeight: 700, margin: "6px 0 2px" }}>{v.ja}</p>
                    <p style={{ color: "rgba(250,243,224,0.4)", fontSize: 10, margin: 0, letterSpacing: 1 }}>{v.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ExpandableBlock>
      </div>
    </section>
  );
}

function MVVItem({ tag, color, text }) {
  return (
    <div>
      <span style={{
        display: "inline-block", background: color, color: C.deep,
        fontSize: 11, fontWeight: 800, padding: "3px 12px", borderRadius: 20, marginBottom: 8, letterSpacing: 1,
      }}>{tag}</span>
      <p style={{ color: "rgba(250,243,224,0.75)", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{text}</p>
    </div>
  );
}

// ─── Community Section ───
function CommunitySection() {
  return (
    <section style={{ padding: "12px 24px 0" }}>
      <div className="sc">
        <ExpandableBlock
          emoji="🏴‍☠️"
          label="ABOUT US"
          title="コミュニティについて"
          preview="早稲田OBの有志と現役生で設立。対話と繋がりを大切にするコミュニティ。"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h4 style={{ color: C.gold, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>設立の想い</h4>
              <p style={{ color: "rgba(250,243,224,0.75)", fontSize: 14, lineHeight: 1.9, margin: 0 }}>
                「学生時代に、ただの&quot;よっ友&quot;ではなく、心から信頼できる&quot;ほっ友&quot;を作ってほしい」
                そんな想いからこのコミュニティは生まれました。ほぼ早稲田のOBの有志の人と現役早稲田生たちで設立しました。
              </p>
            </div>
            <div>
              <h4 style={{ color: C.gold, fontSize: 14, fontWeight: 700, marginBottom: 10 }}>運営方針</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "🤝 参加者同士の対話を大切にします",
                  "🔄 一方的な講義ではなく、双方向の学びを重視します",
                  "🌱 価値観のアップデートを応援します",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ fontSize: 16, lineHeight: "1.6" }}>{item.slice(0, 2)}</span>
                    <p style={{ color: "rgba(250,243,224,0.7)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item.slice(3)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: C.gold, fontSize: 14, fontWeight: 700, marginBottom: 10 }}>こんな人におすすめ</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "💎 ただの知り合いではなく、心から信頼できる仲間がほしい人",
                  "🌍 新しい価値観や世界に触れてみたい人",
                  "🗺️ 自分の人生の「航海図」を描きたい人",
                  "💬 対話を通じて成長したい人",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ fontSize: 16, lineHeight: "1.6" }}>{item.slice(0, 2)}</span>
                    <p style={{ color: "rgba(250,243,224,0.7)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item.slice(3)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ExpandableBlock>
      </div>
    </section>
  );
}

// ─── Main App ───
export default function App() {
  const [page, setPage] = useState("home");
  const [calMonth, setCalMonth] = useState(3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const goHome = () => setPage("home");

  if (page === "food") return <Shell><FoodIslandPage onBack={goHome} /></Shell>;
  if (page === "ai") return <Shell><AIIslandPage onBack={goHome} /></Shell>;
  if (page === "dialogue") return <Shell><DialogueIslandPage onBack={goHome} /></Shell>;

  return (
    <Shell>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 24px" }}>
        <StarField />
        <WaveBG />
        <div style={{ position: "relative", zIndex: 2, animation: "fadeUp 1s both ease-out" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: C.gold, letterSpacing: 6, marginBottom: 14 }}>
            ほぼ早稲田OB会
          </p>
          <h1 style={{
            fontFamily: "'Noto Sans JP', sans-serif", fontSize: "clamp(30px, 8vw, 56px)", fontWeight: 900, lineHeight: 1.3, marginBottom: 12,
            background: `linear-gradient(135deg, ${C.cream}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            よっ友より<br />ほっ友を。
          </h1>
          <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, margin: "16px auto" }} />
          <p style={{ fontSize: "clamp(14px, 3vw, 17px)", color: "rgba(250,243,224,0.7)", maxWidth: 440, margin: "0 auto", lineHeight: 1.9, fontWeight: 300 }}>
            人生という大海原を、<br />心から信頼できる仲間と航海しよう。<br />早稲田OB × 現役生の対話コミュニティ。
          </p>
        </div>
      </section>

      {/* Story / MVV / Community blocks */}
      <StorySection />
      <MVVSection />
      <CommunitySection />

      {/* Islands */}
      <section style={{ padding: "40px 24px 60px" }}>
        <div className="sc">
          <p style={{ color: C.gold, fontSize: 12, letterSpacing: 4, textAlign: "center", marginBottom: 8, fontWeight: 500 }}>ISLANDS</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 5vw, 34px)", textAlign: "center", marginBottom: 12, color: C.cream }}>
            3つの島を巡ろう
          </h2>
          <p style={{ textAlign: "center", color: "rgba(250,243,224,0.5)", fontSize: 13, marginBottom: 36 }}>
            タップして各島の詳細へ
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <IslandCardTop
              emoji="🍽️" title="食事島" subtitle="FOOD ISLAND"
              features={["🏠 ゆるく繋がる「最初の島」", "📅 毎週月曜・木曜 19:00〜", "💰 参加費無料（食材割り勘のみ）"]}
              color={C.food} onClick={() => setPage("food")}
            />
            <IslandCardTop
              emoji="🤖" title="AI島" subtitle="AI ISLAND"
              features={["☀️ AI朝活：毎週水曜 8:00〜9:00", "🔥 AI×対話：月2回の特別イベント", "🛠️ 知る・触る・考えるの3本柱"]}
              color={C.ai} onClick={() => setPage("ai")}
            />
            <IslandCardTop
              emoji="💬" title="対話島" subtitle="DIALOGUE ISLAND"
              features={["🔥 テーマ別で少人数の深い対話", "📅 AI島×対話島：4/11, 4/18, 5/16, 5/30 16:00〜", "🧭 OBも一緒に語る側として参加"]}
              color={C.dialogue} onClick={() => setPage("dialogue")}
            />
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section style={{ padding: "40px 24px 60px" }}>
        <div className="sc">
          <p style={{ color: C.gold, fontSize: 12, letterSpacing: 4, textAlign: "center", marginBottom: 8, fontWeight: 500 }}>SCHEDULE</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 4vw, 30px)", textAlign: "center", marginBottom: 24, color: C.cream }}>
            航海カレンダー
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
            {[3, 4].map((m) => (
              <button
                key={m}
                onClick={() => setCalMonth(m)}
                style={{
                  background: calMonth === m ? C.gold : "rgba(250,243,224,0.1)",
                  color: calMonth === m ? C.deep : C.cream,
                  border: "none", borderRadius: 20, padding: "8px 20px",
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Noto Sans JP', sans-serif", transition: "all 0.2s",
                }}
              >
                {m + 1}月
              </button>
            ))}
          </div>
          <Calendar month={calMonth} year={2026} onIslandClick={(island) => setPage(island)} />
        </div>
      </section>

      {/* Join */}
      <section style={{ padding: "40px 24px 60px" }}>
        <div className="sc">
          <div style={{ background: "rgba(13,33,55,0.6)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: 20, padding: "40px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏴‍☠️</div>
            <h2 style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 900, marginBottom: 12, color: C.cream }}>
              一緒に船に乗ろう。
            </h2>
            <p style={{ color: "rgba(250,243,224,0.6)", fontSize: 14, marginBottom: 24, lineHeight: 1.8 }}>
              一度しかない大学生活。<br />誰と船を漕ぐか、どこに向かうか。
            </p>
            <p style={{ color: C.cream, fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
              参加はLINEで連絡ください 🚢
            </p>
            <p style={{ color: "rgba(250,243,224,0.4)", fontSize: 12 }}>参加費無料</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(212,168,83,0.12)", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ color: C.gold, fontSize: 13, fontWeight: 700 }}>ほぼ早稲田OB会</p>
        <p style={{ color: "rgba(250,243,224,0.3)", fontSize: 11 }}>〜よっ友よりほっ友を。〜</p>
        <p style={{ color: "rgba(250,243,224,0.15)", fontSize: 10, marginTop: 12 }}>© 2026 ほぼ早稲田OB会</p>
      </footer>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div style={{
      background: `linear-gradient(180deg, ${C.deep} 0%, ${C.ocean} 30%, ${C.wave} 70%, ${C.deep} 100%)`,
      minHeight: "100vh", fontFamily: "'Noto Sans JP', sans-serif", color: C.cream, overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap');
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .sc { max-width: 720px; margin: 0 auto; }
      `}</style>
      {children}
    </div>
  );
}
