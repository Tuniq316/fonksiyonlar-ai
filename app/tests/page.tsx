"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { addError, ErrorType } from "../lib/errorEngine";

type Question = {
  topic: "mutlak" | "dogrusal" | "sabit";
  q: string;
  options: string[];
  correct: number;
  // Her yanlış seçenek için hata türü (correct index için null yaz)
  errorMap: (ErrorType | null)[];
};

const TESTS = [
  { id: "mutlak", title: "Mutlak Değer", storagePassKey: "passed-mutlak" },
  { id: "dogrusal", title: "Doğrusal Fonksiyon", storagePassKey: "passed-dogrusal" },
  { id: "sabit", title: "Sabit Fonksiyon", storagePassKey: "passed-sabit" },
] as const;

const ALL_QUESTIONS: Question[] = [
  // MUTLAK (10)
  {
    topic: "mutlak",
    q: "|x − 2| = 3 denkleminin çözümleri hangisidir?",
    options: ["x = 5", "x = −1", "x = 5 veya x = −1", "x = 3"],
    correct: 2,
    errorMap: ["EQUATION_ERROR", "EQUATION_ERROR", null, "CONCEPT_ERROR"],
  },
  {
    topic: "mutlak",
    q: "|−4| kaçtır?",
    options: ["−4", "0", "4", "8"],
    correct: 2,
    errorMap: ["CONCEPT_ERROR", "ARITHMETIC_ERROR", null, "ARITHMETIC_ERROR"],
  },
  {
    topic: "mutlak",
    q: "|x| = 7 denkleminin çözüm sayısı kaçtır?",
    options: ["0", "1", "2", "3"],
    correct: 2,
    errorMap: ["CONCEPT_ERROR", "CONCEPT_ERROR", null, "UNKNOWN"],
  },
  {
    topic: "mutlak",
    q: "|x| < 3 eşitsizliğinin çözüm aralığı hangisidir?",
    options: ["x < −3 veya x > 3", "−3 < x < 3", "x ≥ 3", "x ≤ −3"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "CONCEPT_ERROR", "CONCEPT_ERROR"],
  },
  {
    topic: "mutlak",
    q: "|2x-5| grafiğinin tepe noktası x değeri kaçtır?",

    options: ["x = 0", "x = 2", "x = 2.5", "x = 5"],
    correct: 2,
    errorMap: ["GRAPH_ERROR", "EQUATION_ERROR", null, "EQUATION_ERROR"],
  },
  {
    topic: "mutlak",
    q: "|x| grafiği hangi şekildedir?",
    options: ["U", "V", "Yatay doğru", "Dikey doğru"],
    correct: 1,
    errorMap: ["GRAPH_ERROR", null, "GRAPH_ERROR", "GRAPH_ERROR"],
  },
  {
    topic: "mutlak",
    q: "Aşağıdakilerden hangisi her zaman doğrudur?",
    options: ["|x| ≤ 0", "|x| ≥ 0", "|x| = x her zaman", "|x| negatif olabilir"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "CONCEPT_ERROR", "CONCEPT_ERROR"],
  },
  {
    topic: "mutlak",
    q: "|x−1| = 0 ise x kaçtır?",
    options: ["0", "1", "−1", "2"],
    correct: 1,
    errorMap: ["EQUATION_ERROR", null, "EQUATION_ERROR", "EQUATION_ERROR"],
  },
  {
    topic: "mutlak",
    q: "|x| > 2 çözümü hangisidir?",
    options: ["−2 < x < 2", "x ≤ −2 veya x ≥ 2", "x = 2", "x ≥ 0"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "CONCEPT_ERROR", "CONCEPT_ERROR"],
  },
  {
    topic: "mutlak",
    q: "|−(x)| ifadesi neye eşittir?",
    options: ["−|x|", "|x|", "x", "−x"],
    correct: 1,
    errorMap: ["SIGN_ERROR", null, "CONCEPT_ERROR", "CONCEPT_ERROR"],
  },

  // DOĞRUSAL (10)
  {
    topic: "dogrusal",
    q: "y = −3x + 6 doğrusunun y-kesiği kaçtır?",
    options: ["−3", "3", "6", "0"],
    correct: 2,
    errorMap: ["CONCEPT_ERROR", "CONCEPT_ERROR", null, "CONCEPT_ERROR"],
  },
  {
    topic: "dogrusal",
    q: "y = 2x + 1 doğrusunun eğimi kaçtır?",
    options: ["1", "2", "0", "−2"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "CONCEPT_ERROR", "SIGN_ERROR"],
  },
  {
    topic: "dogrusal",
    q: "Eğim negatif ise doğru nasıl gider?",
    options: ["Sağa gidince yükselir", "Sağa gidince alçalır", "Yatay olur", "Dikey olur"],
    correct: 1,
    errorMap: ["GRAPH_ERROR", null, "GRAPH_ERROR", "GRAPH_ERROR"],
  },
  {
    topic: "dogrusal",
    q: "y = 3x doğrusu hangi noktadan geçer?",
    options: ["(0,3)", "(3,0)", "(0,0)", "(1,3)"],
    correct: 2,
    errorMap: ["CONCEPT_ERROR", "CONCEPT_ERROR", null, "ARITHMETIC_ERROR"],
  },
  {
    topic: "dogrusal",
    q: "y = 0.5x + 2 doğrusunun y-kesiği?",
    options: ["0.5", "2", "−2", "1"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "SIGN_ERROR", "CONCEPT_ERROR"],
  },
  {
    topic: "dogrusal",
    q: "Doğrusal fonksiyonun genel formu hangisidir?",
    options: ["y=ax^2+bx+c", "y=ax+b", "y=a/x", "y=a^x"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "CONCEPT_ERROR", "CONCEPT_ERROR"],
  },
  {
    topic: "dogrusal",
    q: "Eğim 0 ise doğru nasıldır?",
    options: ["Yatay", "Dikey", "V şeklinde", "Parabol"],
    correct: 0,
    errorMap: [null, "GRAPH_ERROR", "GRAPH_ERROR", "GRAPH_ERROR"],
  },
  {
    topic: "dogrusal",
    q: "y = x + 4 doğrusunun x=0 için y değeri?",
    options: ["0", "1", "4", "5"],
    correct: 2,
    errorMap: ["ARITHMETIC_ERROR", "ARITHMETIC_ERROR", null, "ARITHMETIC_ERROR"],
  },
  {
    topic: "dogrusal",
    q: "y = −x + 3 doğrusunun eğimi?",
    options: ["3", "−1", "1", "0"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "SIGN_ERROR", "CONCEPT_ERROR"],
  },
  {
    topic: "dogrusal",
    q: "Doğru iki noktadan geçer ifadesi ne demektir?",
    options: ["Tek bir değer alır", "Grafiği doğrusal değil", "Bir doğruyu belirlemek için 2 nokta yeter", "Eğimi yoktur"],
    correct: 2,
    errorMap: ["CONCEPT_ERROR", "CONCEPT_ERROR", null, "CONCEPT_ERROR"],
  },

  // SABİT (10)
  {
    topic: "sabit",
    q: "f(x)=5 fonksiyonunun değer kümesi nedir?",
    options: ["ℝ", "ℤ", "{5}", "{x}"],
    correct: 2,
    errorMap: ["CONCEPT_ERROR", "CONCEPT_ERROR", null, "CONCEPT_ERROR"],
  },
  {
    topic: "sabit",
    q: "Sabit fonksiyon grafiği nasıldır?",
    options: ["Yatay doğru", "Dikey doğru", "V", "Parabol"],
    correct: 0,
    errorMap: [null, "GRAPH_ERROR", "GRAPH_ERROR", "GRAPH_ERROR"],
  },
  {
    topic: "sabit",
    q: "Sabit fonksiyonun eğimi kaçtır?",
    options: ["1", "−1", "0", "2"],
    correct: 2,
    errorMap: ["CONCEPT_ERROR", "CONCEPT_ERROR", null, "CONCEPT_ERROR"],
  },
  {
    topic: "sabit",
    q: "f(x)=0 sabit fonksiyonu x eksenine göre nerededir?",
    options: ["x ekseninin üstünde", "x ekseninin altında", "x ekseninin üzerinde (aynı)", "dikey"],
    correct: 2,
    errorMap: ["GRAPH_ERROR", "GRAPH_ERROR", null, "GRAPH_ERROR"],
  },
  {
    topic: "sabit",
    q: "f(x)=c için tanım kümesi?",
    options: ["Sadece 0", "ℝ", "Sadece pozitifler", "Sadece negatifler"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "CONCEPT_ERROR", "CONCEPT_ERROR"],
  },
  {
    topic: "sabit",
    q: "f(x)=7 için f(100) kaçtır?",
    options: ["100", "7", "0", "−7"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "ARITHMETIC_ERROR", "SIGN_ERROR"],
  },
  {
    topic: "sabit",
    q: "Sabit fonksiyonda çıktı değişir mi?",
    options: ["Evet", "Hayır", "Bazen", "Grafiğe bağlı"],
    correct: 1,
    errorMap: ["CONCEPT_ERROR", null, "CONCEPT_ERROR", "CONCEPT_ERROR"],
  },
  {
    topic: "sabit",
    q: "f(x)=−2 grafiği hangi bölgede?",
    options: ["x ekseninin üstü", "x ekseninin altı", "V", "Dikey"],
    correct: 1,
    errorMap: ["GRAPH_ERROR", null, "GRAPH_ERROR", "GRAPH_ERROR"],
  },
  {
    topic: "sabit",
    q: "Sabit fonksiyonun eğimi 0 ise bu neyi ifade eder?",
    options: ["Yükselir", "Alçalır", "Yataydır", "Dikeydir"],
    correct: 2,
    errorMap: ["GRAPH_ERROR", "GRAPH_ERROR", null, "GRAPH_ERROR"],
  },
  {
    topic: "sabit",
    q: "f(x)=c doğrusu hangi eksene paraleldir?",
    options: ["y eksenine", "x eksenine", "ikisinin ortasına", "hiçbiri"],
    correct: 1,
    errorMap: ["GRAPH_ERROR", null, "GRAPH_ERROR", "GRAPH_ERROR"],
  },
];

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function TestsPage() {
  const [selectedTest, setSelectedTest] = useState<null | (typeof TESTS)[number]>(null);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [time, setTime] = useState(20 * 60);
  const [done, setDone] = useState(false);

  const currentQuestions = useMemo(() => {
    if (!selectedTest) return [];
    const topic = selectedTest.id;
    return ALL_QUESTIONS.filter((q) => q.topic === topic).slice(0, 10);
  }, [selectedTest]);

  useEffect(() => {
    if (!selectedTest || done) return;
    const t = setInterval(() => setTime((x) => x - 1), 1000);
    return () => clearInterval(t);
  }, [selectedTest, done]);

  useEffect(() => {
    if (time <= 0 && selectedTest && !done) {
      setDone(true);
    }
  }, [time, selectedTest, done]);

  function startTest(t: (typeof TESTS)[number]) {
    setSelectedTest(t);
    setIndex(0);
    setScore(0);
    setTime(20 * 60);
    setDone(false);
  }

  function choose(optionIndex: number) {
    if (!selectedTest) return;
    const q = currentQuestions[index];
    const isCorrect = optionIndex === q.correct;

    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      const err = q.errorMap[optionIndex] ?? "UNKNOWN";
      addError(err);
    }

    const next = index + 1;
    if (next >= currentQuestions.length) {
      // bitir
      localStorage.setItem(selectedTest.storagePassKey, "true");
      setDone(true);
    } else {
      setIndex(next);
    }
  }

  if (!selectedTest) {
    return (
      <main className="min-h-screen bg-black text-white p-10 max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-purple-400">← Dashboard</Link>

        <h1 className="text-3xl font-bold mt-6">Konu Testleri</h1>
        <p className="text-white/60 mt-2">Her test: 10 soru • 20 dk • Yanlışlar hata türüne göre analiz edilir</p>

        <div className="space-y-4 mt-8">
          {TESTS.map((t) => (
            <div key={t.id} className="border rounded-xl p-4">
              <h2 className="text-xl">{t.title}</h2>
              <p className="text-white/60">10 soru • 20 dk</p>
              <button
                onClick={() => startTest(t)}
                className="mt-3 border px-4 py-2 rounded hover:bg-white/10"
              >
                Teste Başla
              </button>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (done) {
    const percent = Math.round((score / 10) * 100);
    let level = "Başlangıç";
    if (percent >= 50) level = "Orta";
    if (percent >= 80) level = "İleri";

    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-3xl font-bold">Test Bitti</h1>
        <p className="mt-2 text-white/80">
          {selectedTest.title} • Puan: {score}/10 • Başarı: %{percent} • Seviye: {level}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setSelectedTest(null)}
            className="border px-4 py-2 rounded hover:bg-white/10"
          >
            Testlere Dön
          </button>

          <Link href="/dashboard" className="border px-4 py-2 rounded hover:bg-white/10">
            Dashboard
          </Link>
        </div>

        <p className="mt-6 text-white/60 text-center max-w-xl">
          Not: Yanlış cevaplar “hata türü” olarak kaydedildi. Dashboard’ta analitik panelde görebilirsin.
        </p>
      </main>
    );
  }

  const q = currentQuestions[index];

  return (
    <main className="min-h-screen bg-black text-white p-10 max-w-3xl mx-auto">
      <div className="flex justify-between text-white/70">
        <div>{selectedTest.title} • Soru {index + 1}/10</div>
        <div>Kalan süre: {formatTime(time)}</div>
      </div>

      <h2 className="text-xl mt-6">{q.q}</h2>

      <div className="mt-4 flex flex-col gap-3">
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            className="border p-2 rounded hover:bg-white/10 text-left"
          >
            {String.fromCharCode(65 + i)}) {o}
          </button>
        ))}
      </div>

      <div className="mt-6 text-white/60 flex justify-between">
        <div>Puan: {score}</div>
        <button
          onClick={() => setSelectedTest(null)}
          className="underline hover:text-white"
        >
          Testi bırak
        </button>
      </div>
    </main>
  );
}
