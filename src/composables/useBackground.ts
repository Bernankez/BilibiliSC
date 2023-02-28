export function useBackground() {
  const hsl = ref(0);
  const getHsl = (offset: number) => {
    return (hsl.value % 360) + offset;
  };
  const hslList = computed(() =>
    [28, 189, 355, 340, 22, 242, 343].map(offset => getHsl(offset)),
  );
  const STEP = 1;
  const INTERVAL_FRAME = 5;
  let counter = 0;
  let timer: number;
  onMounted(() => {
    timer = requestAnimationFrame(function loop() {
      counter++;
      if (counter % INTERVAL_FRAME !== 0) {
        timer = requestAnimationFrame(loop);
        return;
      }
      counter = 0;
      if (hsl.value >= 360) {
        hsl.value = 0;
      }
      hsl.value += STEP;
      timer = requestAnimationFrame(loop);
    });
  });

  onUnmounted(() => {
    cancelAnimationFrame(timer);
  });

  return {
    hslList,
  };
}
