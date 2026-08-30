"use client";

import { useEffect } from "react";

//* errores serios que destruyen toda la app
export default function GeneralError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error general capturado:", error);
  }, [error]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>¡Vaya, algo no salió como esperábamos!</h2>
        <p style={styles.message}>
          Ocurrió un error inesperado al cargar esta sección. Puedes intentar
          recargarla o volver al inicio.
        </p>

        {/* Opcional: Muestra el mensaje técnico del error si lo necesitas */}
        <p style={styles.technical}>
          <small>Detalle: {error.message || "Error desconocido"}</small>
        </p>

        <div style={styles.buttonGroup}>
          {/* Botón reset: intenta re-renderizar la página sin recargar el navegador */}
          <button onClick={() => reset()} style={styles.primaryButton}>
            Volver a intentar
          </button>

          {/* Botón de escape para ir a la página principal */}
          <button
            onClick={() => (window.location.href = "/")}
            style={styles.secondaryButton}
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

// Estilos básicos en línea para que no dependas de CSS externo
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    fontFamily: "system-ui, sans-serif",
    padding: "1rem",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    maxWidth: "450px",
    width: "100%",
    textAlign: "center" as const,
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "0.95rem",
    color: "#64748b",
    lineHeight: "1.5",
    marginBottom: "1rem",
  },
  technical: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginBottom: "1.5rem",
    wordBreak: "break-word" as const,
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "0.65rem 1.2rem",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  secondaryButton: {
    backgroundColor: "#e2e8f0",
    color: "#334155",
    border: "none",
    padding: "0.65rem 1.2rem",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
  },
};
