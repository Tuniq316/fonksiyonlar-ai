"use client";

import { useEffect, useState } from "react";
import { AbsoluteGraph } from "../../components/Graph";
import Link from "next/link";

export default function Mutlak() {
  const [selected, setSelected] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [aiReply, setAiReply] = useState("");

  useEffect(() => {
    localStorage.setItem("lastTopic", "/functions/mutlak");
  }, []);

  const correct = "C";

  useEffect(() => {
    if (selected === correct) {
      localStorage.setItem("passed-mutlak", "true");
    }
  }, [selected]);

  function askAI() {
    const q = question.trim().toLowerCase();

    if (!q) {
      setAiReply("Bir soru yaz 🙂 Örn: “|2x-5| grafiği”, “eşitsizlik”, “değer kümesi”, “çözüm”");
      return;
    }

    const m = q.match(/\|\s*([+-]?\d*)\s*x\s*([+-]\s*\d+)?\s*\|/);
    if (m) {
      const aStr = m[1];
      const bStr = (m[2] || "").replace(/\s+/g, "");

      const a = aStr === "" || aStr === "+" ? 1 : aStr === "-" ? -1 : Number(aStr);
      const b = bStr === "" ? 0 : Number(bStr);

      if (!Number.isNaN(a) && !Number.isNaN(b) && a !== 0) {
        const x0 = -b / a;
        const x1 = x0 - 2;
        const x2 = x0 + 2;

        const y1 = Math.abs(a * x1 + b);
        const y2 = Math.abs(a * x2 + b);

        setAiReply(
          `|${a}x${b >= 0 ? "+" + b : b}| grafiği V şeklindedir.\n` +
            `Tepe noktası: (${x0}, 0)\n` +
            `Örnek noktalar: (${x1}, ${y1}), (${x2}, ${y2})`
        );
        return;
      }
    }

    if (q.includes("tanım")) {
      setAiReply("Mutlak değer bir sayının 0’a olan uzaklığıdır. Sonuç ≥0’dır.");
      return;
    }

    if (q.includes("grafik")) {
      setAiReply("Grafik V şeklindedir ve y eksenine göre simetriktir.");
      return;
    }

    if (q.includes("denklem")) {
      setAiReply("|A|=a ⇒ A=a veya A=−a");
      return;
    }

    if (q.includes("eşitsizlik")) {
      setAiReply("|x|<a ⇒ −a<x<a");
      return;
    }

    setAiReply("‘|2x-5| grafiği’ veya ‘eşitsizlik’ diye sorabilirsin.");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10 max-w-4xl mx-auto">

      <Link href="/functions" className="text-cyan-400">
        ← Konular
      </Link>

      <h1 className="text-3xl font-bold mt-4">Mutlak Değer</h1>

      {/* ✅ EBA VIDEO BUTONU */}
      <a
        href="https://ders.eba.gov.tr/ders/proxy/VCollabPlayer_v0.0.1064/index.html#/main/curriculumResource?resourceID=92e37db9b86b049461e10bf294433c91&resourceTypeID=3&loc=0&locID=af08aecd2cf28d5aa1cc1c213428e86c&showCurriculumPath=false"
        target="_blank"
        className="mt-5 inline-block border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-400 hover:text-black transition"
      >
        📺 EBA Konu Videosunu Aç
      </a>

      <p className="mt-6 text-white/80">
        Bir gerçek sayının mutlak değeri, o sayının sayı doğrusu üzerindeki sıfıra olan uzaklığıdır.
        Mutlak değer her zaman sıfır veya pozitif bir sayıdır.
      </p>

      <div className="mt-4">
        |x| = x (x ≥ 0)
        <br />
        |x| = −x (x &lt; 0)
      </div>

      <div className="mt-8 flex justify-center">
        <AbsoluteGraph />
      </div>

      <h2 className="text-xl mt-8 font-semibold">Mini Test</h2>
      <p className="mt-2">|x − 2| = 3 denkleminin çözümleri hangisidir?</p>

      <div className="mt-4 flex flex-col gap-2">
        <button onClick={() => setSelected("A")} className="border p-2 rounded hover:bg-white/10 text-left">
          A) x = 5
        </button>
        <button onClick={() => setSelected("B")} className="border p-2 rounded hover:bg-white/10 text-left">
          B) x = −1
        </button>
        <button onClick={() => setSelected("C")} className="border p-2 rounded hover:bg-white/10 text-left">
          C) x = 5 veya x = −1
        </button>
        <button onClick={() => setSelected("D")} className="border p-2 rounded hover:bg-white/10 text-left">
          D) x = 3
        </button>
      </div>

      {selected && (
        <p className="mt-4 text-cyan-400">
          {selected === correct ? "✅ Doğru!" : "❌ Yanlış, doğru cevap C"}
        </p>
      )}

      <h2 className="text-xl mt-10 font-semibold">🤖 Mini Öğretmen</h2>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Sorunu yaz..."
        className="mt-3 w-full bg-black border border-white/20 p-2 rounded outline-none"
      />

      <button onClick={askAI} className="mt-3 border px-4 py-2 rounded hover:bg-white/10">
        Sor
      </button>

      {aiReply && <pre className="mt-4 text-green-400 whitespace-pre-wrap">{aiReply}</pre>}

    </main>
  );
}
