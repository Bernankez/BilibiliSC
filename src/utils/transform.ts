export function blob2dataUrl(blob: Blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise<string>((resolve) => {
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
  });
}

export function dataUrl2canvas(dataUrl: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  return new Promise<HTMLCanvasElement>((resolve) => {
    img.onload = (e) => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      resolve(canvas);
    };
    img.src = dataUrl;
  });
}

export function canvas2blob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, type, quality);
  });
}
