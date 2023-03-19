/// <reference types="vite/client" />

declare module "changedpi" {
  const changeDpiBlob: (blob: Blob, dpi: number) => Promise<Blob>
  const changeDpiDataUrl: (dataUrl: string, dpi: number) => Promise<string>
}
