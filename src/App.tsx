import {  useState } from "react";

type Result = {
  line: number;
  value: string;
  type: string;
};

const numbers = /\d+,?\d+/g;

const reservadas = /(int|double|float|char|while|for|if)/;
const identificador = /([A-Z][a-z]*)/;

export function App() {
  const [result, setResult] = useState<Result[] | null>(null);

  function onChange(file: string) {
    const lines = file.split("\n");

    if (!lines.length) return;

    const r: Result[] = [];

    lines.forEach((line, index) => {
      if (line.match(reservadas)) {
        if (line.match(reservadas)?.[1]) {
          r.push({
            line: index + 1,
            value: line.match(reservadas)?.[1] || "",
            type: "reservada",
          });
        }
      }

      if (line.match(identificador)) {
        if (line.match(identificador)?.[1]) {
          r.push({
            line: index + 1,
            value: line.match(identificador)?.[1] || "",
            type: "identificador",
          });
        }
      }

      if (line.match(numbers)) {
        if (line.match(numbers)?.[0]) {
          r.push({
            line: index + 1,
            value: line.match(numbers)?.[0] || "",
            type: "number",
          });
        }
      }
    });

    setResult(r);
  }

  console.log(result);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        type="file"
        onChange={(e) => {
          const reader = new FileReader();

          reader.onload = async (e) => {
            const text = e.target?.result;

            if (typeof text === "string") {
              onChange(text);
            }
          };

          if (e.target.files?.[0]) {
            reader.readAsText(e.target.files?.[0]);
          }
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginRight: 16,
            border: "1px solid #eee",
          }}
        >
          <span style={{ width: 56 }}>Linha</span>
          <span style={{ width: 250 }}>Valor</span>
          <span>Tipo</span>
        </div>

        {result?.map((r, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: 8,
              marginRight: 16,
              border: "1px solid #eee",
            }}
          >
            <span style={{ width: 56 }}>{r.line}</span>
            <span style={{ width: 250 }}>{r.value}</span>
            <span>{r.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
