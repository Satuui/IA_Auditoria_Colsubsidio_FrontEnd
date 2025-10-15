import React from "react";

const Badge = ({ ok }) =>
  ok ? <span className="badge bg-success">✔️</span>
     : <span className="badge bg-danger">✖️</span>;

const Chip = ({ label = "", ok }) => {
  const cls = ok === true
    ? "badge rounded-pill text-bg-success"
    : ok === false
      ? "badge rounded-pill text-bg-danger"
      : "badge rounded-pill text-bg-secondary";
  return <span className={cls} style={{ marginRight: 6 }}>{label}</span>;
};

export default function ResultsTable({ rows = [], onClear }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="mt-4">
        <div className="alert alert-info">No hay resultados aún. Sube un PDF para empezar.</div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Resultados de análisis ({rows.length})</h5>
        {onClear && (
          <button className="btn btn-sm btn-outline-secondary" onClick={onClear}>
            Limpiar
          </button>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Archivo</th>
              <th>Firma</th>
              <th>Método firma</th>
              <th>Cédula</th>
              <th>Medicamento</th>
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Comparación</th>
              <th>Extraído</th>
              <th>Faltantes</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const res = r.result || {};
              const comp = res.comparacion || {};
              const ext = res.extraido || {};
              const faltantesTxt = Array.isArray(res.faltantes)
                ? res.faltantes.join(", ")
                : (res.faltantes || "");

              return (
                <tr key={`${r.filename}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td style={{ maxWidth: 280, wordBreak: "break-word" }}>
                    <div className="fw-semibold">{r.filename}</div>
                    <div className="text-muted small">{r.path}</div>
                  </td>

                  <td><Badge ok={!!res.firma} /></td>
                  <td>{res.firma_method || "—"}</td>
                  <td><Badge ok={!!res.cedula} /></td>
                  <td><Badge ok={!!res.medicamento} /></td>
                  <td><Badge ok={!!res.fecha} /></td>
                  <td><Badge ok={!!res.cantidad} /></td>

                  <td style={{ minWidth: 220 }}>
                    {"info" in comp && !comp.esperado && (
                      <span className="text-muted small">{comp.info}</span>
                    )}
                    {comp.esperado && (
                      <div className="d-flex flex-wrap mb-1" style={{ gap: 4 }}>
                        <Chip label="Doc" ok={comp.documento_ok} />
                        <Chip label="Fecha" ok={comp.fecha_ok} />
                        <Chip label="Med" ok={comp.medicamento_ok} />
                        <Chip label="Cant" ok={comp.cantidad_ok} />
                      </div>
                    )}
                  </td>

                  <td style={{ minWidth: 240 }}>
                    <div className="small">
                      <div><strong>Doc:</strong> {ext.documento || "—"}</div>
                      <div><strong>Fecha:</strong> {ext.fecha_pedido || "—"}</div>
                      <div><strong>Med:</strong> {ext.medicamento || "—"}</div>
                      <div><strong>Cant:</strong> {ext.cantidad || "—"}</div>
                    </div>
                  </td>

                  <td>{faltantesTxt ? faltantesTxt : <span className="text-success">—</span>}</td>
                  <td style={{ maxWidth: 320, whiteSpace: "pre-wrap" }}>
                    {res.observaciones || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <details className="mt-2">
        <summary className="text-muted">Ver muestras OCR (debug)</summary>
        <pre className="mt-2 bg-light p-3 small">
{rows.map((r, i) => `#${i+1} ${r.filename}\n${(r.result?.debug_text_sample || "").slice(0,400)}\n---\n`).join("")}
        </pre>
      </details>
    </div>
  );
}



