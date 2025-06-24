export function parseString(
  view: DataView,
  offset: number,
): { value: string; nextOffset: number } {
  const length = view.getUint8(offset++);
  let str = "";
  for (let i = 0; i < length; i++) {
    str += String.fromCharCode(view.getUint16(offset));
    offset += 2;
  }
  return { value: str, nextOffset: offset };
}

export function writeString(dv: DataView, offset: number, txt: string): number {
  const len = Math.min(txt.length, 255); // 1-byte length
  dv.setUint8(offset++, len);
  for (let i = 0; i < len; i++) {
    dv.setUint16(offset, txt.charCodeAt(i)); // UTF-16 code-unit
    offset += 2;
  }
  return offset;
}
