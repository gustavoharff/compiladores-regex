import { getFile } from "./utils/get-file";

const file = getFile();

type Result = {
  line: number;
  value: string;
  type: string
}

const result: Result[] = []

const lines = file.split("\n");

const numbers = /\d+,?\d+/g

const reservadas = /(int|double|float|char|while|for|if)/
const identificador = /([A-Z][a-z]*)/

lines.forEach((line, index) => {
  if (line.match(reservadas)) {
    if (line.match(reservadas)?.[1]) {
      result.push({
        line: index + 1,
        value: line.match(reservadas)?.[1] || '',
        type: 'reservada'
      })
    }
  }

  if (line.match(identificador)) {
    if (line.match(identificador)?.[1]) {
      result.push({
        line: index + 1,
        value: line.match(identificador)?.[1] || '',
        type: 'identificador'
      })
    }
  }

  if (line.match(numbers)) {
    console.log(line.match(numbers))
    if (line.match(numbers)?.[0]) {
      result.push({
        line: index + 1,
        value: line.match(numbers)?.[0] || '',
        type: 'number'
      })
    }
  }
});

console.log(result)