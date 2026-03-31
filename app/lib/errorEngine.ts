export type ErrorType =
  | "SIGN_ERROR"        // işaret / negatif-pozitif
  | "CONCEPT_ERROR"     // kavram yanılgısı
  | "GRAPH_ERROR"       // grafik okuma/yorum
  | "EQUATION_ERROR"    // denkleme geçiş/kurma
  | "ARITHMETIC_ERROR"  // basit işlem
  | "UNKNOWN";

export type ErrorStats = Record<ErrorType, number>;

export const ERROR_LABEL: Record<ErrorType, string> = {
  SIGN_ERROR: "İşaret Hatası",
  CONCEPT_ERROR: "Kavram Hatası",
  GRAPH_ERROR: "Grafik Okuma Hatası",
  EQUATION_ERROR: "Denklem Kurma Hatası",
  ARITHMETIC_ERROR: "İşlem Hatası",
  UNKNOWN: "Bilinmeyen",
};

export function emptyStats(): ErrorStats {
  return {
    SIGN_ERROR: 0,
    CONCEPT_ERROR: 0,
    GRAPH_ERROR: 0,
    EQUATION_ERROR: 0,
    ARITHMETIC_ERROR: 0,
    UNKNOWN: 0,
  };
}

export function loadStats(key = "errorStats"): ErrorStats {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return emptyStats();
    const obj = JSON.parse(raw) as Partial<ErrorStats>;
    return { ...emptyStats(), ...obj };
  } catch {
    return emptyStats();
  }
}

export function saveStats(stats: ErrorStats, key = "errorStats") {
  localStorage.setItem(key, JSON.stringify(stats));
}

export function addError(errorType: ErrorType, key = "errorStats") {
  const stats = loadStats(key);
  stats[errorType] = (stats[errorType] ?? 0) + 1;
  saveStats(stats, key);
}

export function topError(stats: ErrorStats): ErrorType {
  let best: ErrorType = "UNKNOWN";
  let bestVal = -1;
  (Object.keys(stats) as ErrorType[]).forEach((k) => {
    const v = stats[k] ?? 0;
    if (v > bestVal) {
      bestVal = v;
      best = k;
    }
  });
  return best;
}

export function suggestionFromTop(top: ErrorType): string {
  switch (top) {
    case "SIGN_ERROR":
      return "En çok İşaret Hatası var. Negatif–pozitif ve parantez/işaret kurallarına odaklan.";
    case "CONCEPT_ERROR":
      return "En çok Kavram Hatası var. Tanım + örnek + karşı örnekle konuyu pekiştir.";
    case "GRAPH_ERROR":
      return "En çok Grafik Okuma Hatası var. Eksen, kesişim, eğim ve tepe noktası üzerinden tekrar yap.";
    case "EQUATION_ERROR":
      return "En çok Denklem Kurma Hatası var. Sözel → cebirsel dönüşüm ve parçalı tanım alıştırması yap.";
    case "ARITHMETIC_ERROR":
      return "En çok İşlem Hatası var. Adım adım işlem kontrolü ve basit alıştırma yap.";
    default:
      return "Hata profili henüz net değil. Birkaç test daha çözerek veri topla.";
  }
}
