export function Uint8ArrayToString(data: Uint8Array): string {
  let dataString = "";
  for (let i = 0; i < data.length; i++) {
    dataString += String.fromCharCode(data[i]);
  }
  return dataString;
}
