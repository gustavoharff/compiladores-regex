import { getFile } from "./utils/get-file";

const file = getFile();

type Result = {
  line: number;
  value: string;
  type: string
}

const result: Result[] = []

const lines = file.split("\n");

const regex = /(int|double|float|char)\ ([A-Z][a-z]*)/ 

lines.forEach((line, index) => {
  if (line.match(regex)) {
    if (line.match(regex)?.[2]) {
      result.push({
        line: index + 1,
        value: line.match(regex)?.[2] || '',
        type: 'identificador'
      })
    }

    if (line.match(regex)?.[1]) {
      result.push({
        line: index + 1,
        value: line.match(regex)?.[1] || '',
        type: 'reservada'
      })
    }
  }
});

console.log(result)