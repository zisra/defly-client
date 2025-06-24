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
