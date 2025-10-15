import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultsTable from "./components/ResultsTable";

// Reemplaza tu función toCSV por esta:
function toCSV(rows) {
  // Esquema idéntico al Excel
  const header = [
    "timestamp",
    "archivo",
    "ruta",
    "cedula",
    "fecha",
    "medicamento",
    "cantidad",
    "firma",
    "metodo_firma",
    "doc_extraido",
    "fecha_extraida",
    "medicamento_extraido",
    "cantidad_extraida",
    "doc_ok",
    "fecha_ok",
    "med_ok",
    "cant_ok",
    "doc_esperado",
    "fecha_esperada",
    "medicamento_esperado",
    "cantidad_esperada",
    "faltantes",
    "observaciones",
  ];

  const csvEscape = (v) => {
    const s = (v ?? "").toString();
    // Encierra en comillas si contiene coma, comillas o salto de línea
    if (/[",\n]/.test(s)) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const siNo = (v) => (v === true ? "SI" : v === false ? "NO" : "");

  const lines = [header.join(",")];

  for (const r of rows) {
    const res = r?.result ?? {};
    const ext = res?.extraido ?? {};
    const comp = res?.comparacion ?? {};
    const esp = comp?.esperado ?? {};

    // Nota: el backend no envía timestamp; ponemos el local al exportar
    const row = [
      new Date().toISOString().replace("T", " ").slice(0, 19),      // timestamp
      r?.filename ?? "",                                            // archivo
      r?.path ?? "",                                                // ruta
      res?.cedula ? "✅" : "❌",                                     // cedula
      res?.fecha ? "✅" : "❌",                                      // fecha
      res?.medicamento ? "✅" : "❌",                                // medicamento
      res?.cantidad ? "✅" : "❌",                                   // cantidad
      res?.firma ? "✅" : "❌",                                      // firma
      res?.firma_method ?? "",                                      // metodo_firma
      ext?.documento ?? "",                                         // doc_extraido
      ext?.fecha_pedido ?? "",                                      // fecha_extraida
      ext?.medicamento ?? "",                                       // medicamento_extraido
      ext?.cantidad ?? "",                                          // cantidad_extraida
      siNo(comp?.documento_ok),                                     // doc_ok
      siNo(comp?.fecha_ok),                                         // fecha_ok
      siNo(comp?.medicamento_ok),                                   // med_ok
      siNo(comp?.cantidad_ok),                                      // cant_ok
      esp?.documento ?? "",                                         // doc_esperado
      esp?.fecha_pedido ?? "",                                      // fecha_esperada
      esp?.medicamento ?? "",                                       // medicamento_esperado
      esp?.cantidad ?? "",                                          // cantidad_esperada
      Array.isArray(res?.faltantes) ? res.faltantes.join("; ") : (res?.faltantes ?? ""), // faltantes
      (res?.observaciones ?? "").replace(/\s+/g, " ").slice(0, 500) // observaciones
    ];

    lines.push(row.map(csvEscape).join(","));
  }

  return lines.join("\n");
}


export default function App() {
  const [results, setResults] = useState([]);

  // --- Upsert por filename: si ya existe, reemplaza; si no, inserta al inicio
  const handleNewResult = (incoming) => {
    if (!incoming || !incoming.filename) return;
    setResults((prev) => {
      const idx = prev.findIndex((r) => r.filename === incoming.filename);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = incoming; // reemplaza el existente
        return copy;
      }
      return [incoming, ...prev]; // agrega nuevo al inicio
    });
  };

  const handleClear = () => setResults([]);

  const handleExport = () => {
    if (!results.length) return alert("No hay resultados para exportar.");
    const csv = toCSV(results);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resultados_auditoria.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3 text-center">🧾 IA Auditoría Colsubsidio</h1>

      <div className="row">
        <div className="col-md-5">
          <UploadForm onResult={handleNewResult} />
          <div className="mt-3">
            <button className="btn btn-outline-primary me-2" onClick={handleExport}>
              Exportar resultados (CSV)
            </button>
            <button className="btn btn-outline-danger" onClick={handleClear}>
              Limpiar resultados
            </button>
          </div>
        </div>

        <div className="col-md-7">
          <ResultsTable rows={results} onClear={handleClear} />
        </div>
      </div>
    </div>
  );
}

