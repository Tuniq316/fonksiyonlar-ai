import Link from "next/link";

const modules = [
  {
    title: "Mutlak Değer",
    href: "/functions/mutlak",
    level: "Kolay",
    time: "15 dk",
    gains: ["Tanım", "Grafik", "Denklem"],
    desc: "Mutlak değerin temel kavramlarını ve grafik yorumlamayı öğren.",
  },
  {
    title: "Doğrusal Fonksiyon",
    href: "/functions/dogrusal",
    level: "Orta",
    time: "20 dk",
    gains: ["y=ax+b", "Eğim", "Y-kesiği"],
    desc: "Doğru grafikleri ve doğrusal fonksiyon yapısını keşfet.",
  },
  {
    title: "Sabit Fonksiyon",
    href: "/functions/sabit",
    level: "Kolay",
    time: "10 dk",
    gains: ["Sabit değer", "Grafik", "Yorum"],
    desc: "Sabit fonksiyonların grafiklerini ve özelliklerini öğren.",
  },
];

export default function FunctionsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-10 py-8">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Konular</h1>
        <Link href="/dashboard" className="text-cyan-400">← Dashboard</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        {modules.map((m, i) => (
          <div key={i} className="border border-white/10 rounded-xl p-5 hover:border-cyan-400 transition">

            <div className="text-cyan-400 text-sm">Modül {i + 1}</div>
            <h2 className="text-xl font-semibold mt-1">{m.title}</h2>

            <p className="text-white/60 mt-2 text-sm">{m.desc}</p>

            <div className="flex gap-4 text-xs mt-3 text-white/70">
              <span>⏱ {m.time}</span>
              <span>📊 {m.level}</span>
            </div>

            <div className="mt-3 text-sm">
              <div className="text-white/60">Bu modülde:</div>
              <ul className="list-disc pl-4 mt-1 text-white/80">
                {m.gains.map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            </div>

            <Link
              href={m.href}
              className="block text-center mt-4 border rounded-lg py-2 hover:bg-white/10"
            >
              Başla →
            </Link>

          </div>
        ))}

      </div>

      {/* ALT PANEL */}

      <div className="mt-12 border border-white/10 rounded-xl p-6">

        <h2 className="text-xl mb-2">🎯 Bugünkü Öğrenme Hedefi</h2>

        <ul className="list-disc pl-5 text-white/70">
        <li>Mutlak değer grafiğini tekrar et</li>
        <li>Doğrusal fonksiyon eğimini öğren</li>
        <li>Mini test çöz</li>
        </ul>

      </div>

    </main>
  );
}

