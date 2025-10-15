import React, { useState } from "react";
import { uploadPDF } from "../services/api";

export default function UploadForm({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Por favor, selecciona un archivo PDF.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await uploadPDF(file);
      onResult(result);
    } catch (err) {
      setError("❌ Error al subir el archivo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          className="form-control mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Subir PDF"}
        </button>
      </form>

      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}

