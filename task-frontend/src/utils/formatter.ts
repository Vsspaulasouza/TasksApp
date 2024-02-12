export function capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

export function formatCapitalizeLower(text: string) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function makeColorTransparent(color: string) {
  return color + "26";
}
