import fs from 'fs'

export function getFile() {
  const file = fs.readFileSync('./src/input.txt', 'utf-8')
  
  return file
}