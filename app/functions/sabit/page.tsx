"use client";

import { useEffect, useState } from "react";
import { ConstantGraph } from "../../components/Graph";
import Link from "next/link";

export default function Sabit() {

  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("lastTopic", "/functions/sabit");
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10 max-w-4xl mx-auto">

      <Link href="/functions" className="text-cyan-400">← Konular</Link>

      <h1 className="text-3xl font-bold mt-4">Sabit Fonksiyon</h1>

      <p className="mt-6 text-white/80">
        f(x) = c biçimindeki fonksiyonlara sabit fonksiyon denir.
        Her x değeri için sonuç aynıdır. Grafiği x eksenine paralel yatay bir doğrudur.
      </p>

      <div className="mt-8 flex justify-center">
        <ConstantGraph />
      </div>

      <h2 className="text-xl mt-8 font-semibold">Örnekler</h2>

      <ul className="list-disc pl-6 mt-3 text-white/80">
        <li>f(x) = 4</li>
        <li>f(x) = −2</li>
        <li>Eğimi sıfırdır.</li>
      </ul>

      <h2 className="text-xl mt-8 font-semibold">Mini Test</h2>

      <p className="mt-2">f(x)=5 fonksiyonunun değer kümesi nedir?</p>

      <div className="mt-4 flex flex-col gap-2">

        <button onClick={() => setAnswer("A")} className="border p-2 rounded hover:bg-white/10">
          A) ℝ
        </button>

        <button onClick={() => setAnswer("B")} className="border p-2 rounded hover:bg-white/10">
          B) ℤ
        </button>

        <button onClick={() => setAnswer("C")} className="border p-2 rounded hover:bg-white/10">
          C) {"{5}"}
        </button>

        <button onClick={() => setAnswer("D")} className="border p-2 rounded hover:bg-white/10">
          D) {"{x}"}
        </button>

      </div>

      {answer && (
        <p className="mt-4 text-cyan-400">
          {answer === "C" ? "✅ Doğru!" : "❌ Yanlış, doğru cevap C"}
        </p>
      )}

    </main>
  );
}
