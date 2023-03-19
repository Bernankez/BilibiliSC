export function download(blob: Blob, options?: { filename?: string; suffix?: string }) {
  const { filename = "BilibiliSC", suffix = ".png" } = options || {};
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}${suffix}`;
  a.click();
  URL.revokeObjectURL(url);
}
