"use client";

import { useEffect, useState } from "react";
import { LinearGraph } from "../../components/Graph"; // Varsayalım doğrusal grafik componenti
import Link from "next/link";

export default function Dogrusal() {
  const [selected, setSelected] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [aiReply, setAiReply] = useState("");

  useEffect(() => {
    localStorage.setItem("lastTopic", "/functions/dogrusal");
  }, []);

  const correct = "B";

  useEffect(() => {
    if (selected === correct) {
      localStorage.setItem("passed-dogrusal", "true");
    }
  }, [selected]);

  function askAI() {
    const q = question.trim().toLowerCase();

    if (!q) {
      setAiReply("Bir soru yaz 🙂 Örn: “eğim nedir?”, “y-kesiği”, “grafik”");
      return;
    }

    if (q.includes("eğim")) {
      setAiReply("Doğrusal fonksiyonda eğim, y değişiminin x değişimine oranıdır (∆y/∆x).");
      return;
    }
    if (q.includes("y-kesi")) {
      setAiReply("Doğrunun y-kesi y = ax + b’de b’dir.");
      return;
    }
    if (q.includes("grafik")) {
      setAiReply("Doğrusal fonksiyon grafiği düz bir çizgidir.");
      return;
    }

    setAiReply("“eğim”, “y-kesiği” veya “grafik” gibi bir kelime ile sorabilirsin.");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10 max-w-4xl mx-auto">
      <Link href="/functions" className="text-cyan-400">← Konular</Link>

      <h1 className="text-3xl font-bold mt-4">Doğrusal Fonksiyon</h1>

      {/* ✅ EBA VIDEO BUTONU */}
      <a
        href="https://ders.eba.gov.tr/ders/proxy/VCollabPlayer_v0.0.1064/index.html#/main/curriculumResource?resourceID=09cf4a22b86262828e8253f901da76e3&resourceTypeID=3&loc=0&locID=af08aecd2cf28d5aa1cc1c213428e86c&showCurriculumPath=false"
        target="_blank"
        className="mt-5 inline-block border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-400 hover:text-black transition"
      >
        📺 EBA Konu Videosunu Aç (Doğrusal Fonksiyon)
      </a>

      <p className="mt-6 text-white/80 leading-relaxed">
  f(x) = ax + b (a ≠ 0) biçiminde tanımlanan fonksiyonlara doğrusal fonksiyon denir.
  Burada a ve b reel sayılardır. a katsayısı doğrunun eğimini, b sabiti ise doğrunun
  y eksenini kestiği noktayı belirtir.
</p>

<p className="mt-3 text-white/80 leading-relaxed">
  Doğrusal fonksiyonların grafikleri bir doğru şeklindedir. a &gt; 0 ise doğru artan,
  a &lt; 0 ise doğru azalan olur. b değeri değiştiğinde doğru yukarı veya aşağı
  paralel olarak ötelenir.
</p>

<p className="mt-3 text-white/80 leading-relaxed">
  Örneğin f(x)=2x+3 fonksiyonunda eğim 2, y-kesiği 3’tür. Bu fonksiyonun grafiği
  (0,3) noktasından geçen artan bir doğrudur.
</p>


      <div className="mt-8 flex justify-center">
        <LinearGraph />
      </div>

      <h2 className="text-xl mt-8 font-semibold">Mini Test</h2>

      <p className="mt-2">y = 2x + 3 doğrusunun y-kesiği kaçtır?</p>

      <div className="mt-4 flex flex-col gap-2">
        <button onClick={() => setSelected("A")} className="border p-2 rounded hover:bg-white/10 text-left">
          A) 2
        </button>
        <button onClick={() => setSelected("B")} className="border p-2 rounded hover:bg-white/10 text-left">
          B) 3
        </button>
        <button onClick={() => setSelected("C")} className="border p-2 rounded hover:bg-white/10 text-left">
          C) 5
        </button>
        <button onClick={() => setSelected("D")} className="border p-2 rounded hover:bg-white/10 text-left">
          D) 0
        </button>
      </div>

      {selected && (
        <p className="mt-4 text-cyan-400">
          {selected === correct ? "✅ Doğru!" : "❌ Yanlış, doğru cevap B"}
        </p>
      )}

      <h2 className="text-xl mt-10 font-semibold">🤖 Mini Öğretmen</h2>
      <p className="text-white/60 mt-2">
        Örn: “eğim nedir?”, “y-kesiği”, “grafik”.
      </p>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Sorunu yaz..."
        className="mt-3 w-full bg-black border border-white/20 p-2 rounded outline-none"
      />

      <button onClick={askAI} className="mt-3 border px-4 py-2 rounded hover:bg-white/10">
        Sor
      </button>

      {aiReply && (
        <pre className="mt-4 text-green-400 whitespace-pre-wrap">{aiReply}</pre>
      )}
    </main>
  );
}
