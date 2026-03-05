import React, { useCallback, useEffect, useRef, useState } from "react";
import { UploadCloud, X, Check, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../utils/LanguageContext";

type ResultShape = {
  label?: string;
  confidence?: number;
  image?: string;
  scan_date?: string;
  id?: number;
  detections?: any[];
  _from?: string;
};

export default function CropScanner() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultShape | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ResultShape[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const confettiRef = useRef<HTMLDivElement | null>(null);

  /**
   * SMART AGRONOMY LOGIC (LOCALIZED)
   */
  const getTreatmentAdvice = (label: string = "") => {
    const lower = label.toLowerCase();

    if (lower.includes("healthy")) {
      return { severity: "none", advice: t('scanner.treatments.healthy') };
    }
    if (lower.match(/(spot|blight|rust|mildew|scab|mold|rot)/)) {
      return { severity: "medium", advice: t('scanner.treatments.fungal') };
    }
    if (lower.match(/(virus|mosaic|curl)/)) {
      return { severity: "critical", advice: t('scanner.treatments.viral') };
    }
    if (lower.includes("bacteri")) {
      return { severity: "high", advice: t('scanner.treatments.bacterial') };
    }
    if (lower.match(/(mite|miner|bug|beetle|worm)/)) {
      return { severity: "medium", advice: t('scanner.treatments.pests') };
    }
    return { severity: "medium", advice: t('scanner.treatments.general') };
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    const farmerId = localStorage.getItem("farmer_id");
    if (farmerId) fetchHistory(farmerId);
  }, []);

  const onFile = useCallback((f: File | null) => {
    setError(null);
    setResult(null);
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  }, []);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    onFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f) onFile(f);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const postImage = async (form: FormData) => {
    const endpoints = ["/classify", "/scan-crop"];
    for (const ep of endpoints) {
      try {
        const url = `http://localhost:5000${ep}`;
        const res = await fetch(url, { method: "POST", body: form });
        if (!res.ok) continue;
        const data = await res.json();
        return { endpoint: ep, data };
      } catch (err) {
        console.warn("Network error to", ep, err);
      }
    }
    throw new Error("All endpoints failed");
  };

  const handleScan = async () => {
    if (!file) {
      setError(t('scanner.errorNoFile') || "Please select or drop an image first.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      form.append("image", file);
      const farmerId = localStorage.getItem("farmer_id");
      if (farmerId) form.append("farmer_id", farmerId);

      const { data } = await postImage(form);

      let normalized: ResultShape = {};

      if (data.label || data.class || data.class_name) {
        normalized = {
          label: data.label ?? data.class_name ?? data.class ?? "Unknown",
          confidence: data.confidence ?? data.score ?? 0.95,
          image: data.image ?? null,
          scan_date: data.scan_date ?? new Date().toISOString(),
          id: data.id ?? data.scan_id,
        };
      }
      else if (data.detections || Array.isArray(data)) {
        normalized = {
          label: "Multiple Issues Detected",
          detections: data.detections ?? data,
          image: data.image ?? null,
          scan_date: data.scan_date ?? new Date().toISOString(),
        };
      }

      setResult(normalized);
      runConfetti();
      if (farmerId) await fetchHistory(farmerId);

    } catch (err) {
      console.error(err);
      setError(t('scanner.errorFailed') || "Analysis failed. Server might be offline.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (farmerId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/my-scans?farmer_id=${encodeURIComponent(farmerId)}`);
      if (res.ok) {
        const rows = await res.json();
        setHistory(rows.map((r: any) => ({
          id: r.id,
          image: r.image_path,
          label: r.disease,
          confidence: r.confidence,
          scan_date: r.scan_date,
        })));
      }
    } catch (e) { console.warn(e); }
  };

  const runConfetti = () => {
    if (!confettiRef.current) return;
    const container = confettiRef.current;
    for (let i = 0; i < 20; i++) {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.left = Math.random() * 80 + "%";
      el.style.top = "-10%";
      el.style.width = el.style.height = `${8 + Math.random() * 12}px`;
      el.style.background = `hsl(${100 + Math.random() * 60}, 60%, ${40 + Math.random() * 20}%)`;
      el.style.borderRadius = "50%";
      container.appendChild(el);
      el.animate([{ transform: "translateY(0)" }, { transform: `translateY(${300 + Math.random() * 200}px)` }], { duration: 1000 + Math.random() * 1000 });
      setTimeout(() => container.removeChild(el), 2000);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-800">{t('scanner.header')}</h1>
          <p className="mt-2 text-green-700">{t('scanner.subtitle')}</p>
        </div>

        <div className="rounded-3xl border-4 border-yellow-300 p-6 shadow-xl bg-white">
          <div
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`relative rounded-2xl p-6 transition-all duration-200 ${dragOver ? "ring-4 ring-green-200" : "ring-0"}`}
            style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.85), rgba(240,255,240,0.85)), url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1600&q=60')", backgroundSize: "cover" }}
          >
            <div className="flex flex-col items-center">
              <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-36 h-36 rounded-full flex items-center justify-center shadow-2xl" style={{ background: "linear-gradient(180deg,#16a34a,#059669)" }}>
                <UploadCloud size={56} className="text-white" />
              </motion.div>
              <div className="mt-6 text-center">
                <p className="text-lg font-medium text-green-900">{t('scanner.dropzone')}</p>
                <div className="mt-4">
                  <label className="inline-flex items-center gap-3 cursor-pointer bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full shadow-lg transition-colors" onClick={() => inputRef.current?.click()}>
                    <span className="font-bold">{t('scanner.uploadBtn')}</span>
                  </label>
                  <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileInputChange} />
                </div>
              </div>

              {preview && (
                <div className="mt-6 w-full flex flex-col md:flex-row items-center gap-4">
                  <div className="rounded-lg overflow-hidden border shadow h-40 w-40">
                    <img src={preview} alt="preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <button onClick={handleScan} disabled={loading} className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-lg shadow hover:scale-105 transition-transform">
                      {loading ? t('scanner.analyzing') : t('scanner.diagnoseBtn')}
                    </button>
                    <button onClick={clearFile} className="ml-3 px-4 py-3 bg-gray-100 border rounded-lg text-gray-700">{t('scanner.cancel')}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {error && <p className="text-red-600 mt-4 text-center font-bold bg-red-50 p-2 rounded">{error}</p>}
        </div>

        {/* RESULTS SECTION */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-2xl bg-white shadow-2xl border-2 border-green-100">
            <div className="flex flex-col md:flex-row gap-6">

              <div className="md:w-1/3 border-r border-gray-100 pr-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    {result.label?.toLowerCase().includes("healthy") ? <Check className="text-green-600" /> : <AlertTriangle className="text-amber-500" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{result.label?.replace(/_/g, " ")}</h2>
                    <p className="text-green-600 font-medium">{t('scanner.confidence')}: {result.confidence ? (result.confidence * 100).toFixed(1) : "95"}%</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Scan ID: {result.id || "New"}</p>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-800 mb-3 border-b pb-2">{t('scanner.treatmentPlan')}</h3>
                {(() => {
                  const treatment = getTreatmentAdvice(result.label);
                  return (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-gray-600 font-medium">{t('scanner.severity')}:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${treatment.severity === "critical" ? "bg-red-100 text-red-700" :
                          treatment.severity === "high" ? "bg-orange-100 text-orange-700" :
                            treatment.severity === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"
                          }`}>
                          {t(`scanner.${treatment.severity}`).toUpperCase()}
                        </span>
                      </div>

                      <div className="grid gap-3">
                        {Array.isArray(treatment.advice) ? treatment.advice.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 bg-green-50/50 p-3 rounded-lg">
                            <ArrowRight className="mt-1 w-4 h-4 text-green-700 shrink-0" />
                            <p className="text-gray-800 font-medium">{item}</p>
                          </div>
                        )) : null}
                      </div>
                    </div>
                  );
                })()}

                <div className="mt-6 flex gap-4">
                  <button onClick={() => { clearFile(); setResult(null); }} className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 shadow">{t('scanner.scanNext')}</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {history.length > 0 && !result && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-green-800 mb-4">{t('scanner.recentScans')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {history.slice(0, 4).map((h, i) => (
                <div key={i} className="bg-white p-3 rounded-xl shadow border flex items-center gap-3">
                  <img src={h.image} className="w-12 h-12 rounded object-cover" alt="" />
                  <div className="overflow-hidden">
                    <p className="truncate font-medium text-sm text-gray-800">{h.label?.replace(/_/g, " ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div ref={confettiRef} className="fixed inset-0 pointer-events-none z-50"></div>
      </div>
    </div>
  );
}