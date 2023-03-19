import type { MaybeRef } from "@vueuse/core";
import type { Options } from "dom-to-image";
import domToImage from "dom-to-image";
import { changeDpiBlob } from "changedpi";

export interface SnapshotOptions extends Options {
  scale?: number;
  dpi?: number;
  type?: string;
}

export async function snapshot(el: MaybeRef<HTMLElement | undefined>, options?: Partial<SnapshotOptions>) {
  const elRef = ref(el);
  const { dpi, type, quality = 1, scale = window.devicePixelRatio } = options || {};
  if (elRef.value) {
    const originBlob = await domToImage.toBlob(elRef.value, options);
    // blob to canvas
    const dataurl = await blob2dataUrl(originBlob);
    const canvas = await dataUrl2canvas(dataurl);
    // scale canvas
    const scaled = scaleCanvas(canvas, scale);
    // canvas to blob
    const blob = await canvas2blob(scaled, type || originBlob.type, quality);
    if (blob) {
      if (isDefined(dpi) && dpi !== 72) {
        const newBlob = changeDpiBlob(blob, dpi);
        return Promise.resolve(newBlob);
      }
      return Promise.resolve(blob);
    }
    return Promise.reject(new Error("No blob to snapshot."));
  } else {
    return Promise.reject(new Error("No element to snapshot."));
  }
}

function scaleCanvas(canvas: HTMLCanvasElement, scale: number) {
  if (scale === 1) { return canvas; }
  const can = document.createElement("canvas");
  const ctx = can.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  can.width = Math.floor(width * scale);
  can.height = Math.floor(height * scale);
  can.style.width = `${width}px`;
  can.style.height = `${height}px`;
  ctx?.scale(scale, scale);
  ctx?.drawImage(canvas, 0, 0);
  return can;
}
