"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ERROR_LABEL,
  loadStats,
  topError,
  suggestionFromTop,
  type ErrorStats,
  type ErrorType,
} from "../lib/errorEngine";

function prettyTopic(path: string) {
  if (path.includes("/functions/mutlak")) return "Mutlak Değer";
  if (path.includes("/functions/dogrusal")) return "Doğrusal Fonksiyon";
  if (path.includes("/functions/sabit")) return "Sabit Fonksiyon";
  return "Henüz başlanmadı";
}

export default function Dashboard() {
  const [theme, setTheme] = useState("#050505");
  const [lastTopic, setLastTopic] = useState<string>("Henüz başlanmadı");
  const [passed, setPassed] = useState(0);
  const [stats, setStats] = useState<ErrorStats | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);

    const last = localStorage.getItem("lastTopic") || "Henüz başlanmadı";
    setLastTopic(last);

    const m = localStorage.getItem("passed-mutlak") === "true";
    const d = localStorage.getItem("passed-dogrusal") === "true";
    const s = localStorage.getItem("passed-sabit") === "true";
    setPassed([m, d, s].filter(Boolean).length);

    setStats(loadStats("errorStats"));
  }, []);

  useEffect(() => {
    document.body.style.background = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const percent = Math.round((passed / 3) * 100);

  const top: ErrorType = useMemo(() => (stats ? topError(stats) : "UNKNOWN"), [stats]);

  const totalErrors = useMemo(() => {
    if (!stats) return 0;
    return Object.values(stats).reduce((a, b) => a + (b ?? 0), 0);
  }, [stats]);

  const suggestion = useMemo(() => suggestionFromTop(top), [top]);

  return (
    <main style={{ background: theme }} className="min-h-screen text-white flex flex-col items-center gap-6 p-10 relative">

      {/* KÜÇÜK TEMA SEÇİCİ */}
      <div className="fixed top-4 right-4 border border-white/20 rounded-lg px-3 py-2 bg-black/40 backdrop-blur">
        <div className="text-xs mb-1 text-white/60">🎨 Tema</div>
        <div className="flex gap-2">
          <button onClick={() => setTheme("#050505")} className="w-4 h-4 rounded-full bg-black border"></button>
          <button onClick={() => setTheme("#0f172a")} className="w-4 h-4 rounded-full bg-slate-900 border"></button>
          <button onClick={() => setTheme("#1f2933")} className="w-4 h-4 rounded-full bg-gray-800 border"></button>
          <button onClick={() => setTheme("#0c4a6e")} className="w-4 h-4 rounded-full bg-sky-900 border"></button>
          <button onClick={() => setTheme("#14532d")} className="w-4 h-4 rounded-full bg-green-900 border"></button>
        </div>
      </div>

      <h1 className="text-4xl font-bold">Fonksiyonlar Akademisi</h1>

      <p className="text-cyan-400 text-center">
        Hata Türü Analizine Dayalı Adaptif Öğrenme Sistemi
      </p>

      <div className="flex gap-4 mt-2 flex-wrap justify-center">
        <Link href="/functions" className="border px-4 py-2 rounded hover:bg-white/10">Konular</Link>
        <Link href="/tests" className="border px-4 py-2 rounded hover:bg-white/10">Testler</Link>

        {lastTopic !== "Henüz başlanmadı" && (
          <Link href={lastTopic} className="border px-4 py-2 rounded text-green-400 hover:bg-white/10">
            Devam Et
          </Link>
        )}
      </div>

      {/* İLERLEME */}
      <div className="w-full max-w-xl mt-6">
        <div className="flex justify-between text-white/70 text-sm">
          <span>İlerleme</span>
          <span>%{percent}</span>
        </div>

        <div className="w-full bg-white/20 rounded h-3 mt-2">
          <div className="bg-green-400 h-3 rounded" style={{ width: `${percent}%` }} />
        </div>

        <p className="mt-3 text-white/60">
          Son girilen konu: <span className="text-white">{prettyTopic(lastTopic)}</span>
        </p>
      </div>

      {/* HATA ANALİTİĞİ */}
      <div className="w-full max-w-xl mt-6 border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold">📊 Hata Analitiği</h2>

        {stats && totalErrors > 0 ? (
          <>
            <p className="text-white/70 mt-2">
              Toplam hata: <span className="text-white">{totalErrors}</span>
            </p>

            <div className="mt-4 space-y-2">
              {(Object.keys(stats) as ErrorType[]).map((k) => {
                const v = stats[k] ?? 0;
                if (v <= 0) return null;
                const bar = Math.round((v / totalErrors) * 100);

                return (
                  <div key={k}>
                    <div className="flex justify-between text-sm text-white/70">
                      <span>{ERROR_LABEL[k]}</span>
                      <span>{v}</span>
                    </div>

                    <div className="w-full bg-white/10 rounded h-2 mt-1">
                      <div className="bg-cyan-400 h-2 rounded" style={{ width: `${bar}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5">
              <div className="text-sm text-white/70">Öncelikli geliştirme alanı</div>
              <div className="text-lg font-semibold mt-1">{ERROR_LABEL[top]}</div>
              <p className="text-white/70 mt-2">{suggestion}</p>
            </div>
          </>
        ) : (
          <p className="text-white/70 mt-3">Henüz hata verisi yok.</p>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("errorStats");
            location.reload();
          }}
          className="mt-6 underline text-white/60 hover:text-white"
        >
          Hata verisini sıfırla
        </button>
      </div>
    </main>
  );
}
