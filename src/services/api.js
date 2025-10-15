const API_URL = "http://127.0.0.1:8000/api/v1/upload-pdf";

export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al procesar el archivo PDF");
  }

  return await response.json();
}

