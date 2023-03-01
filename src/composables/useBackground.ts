import { isClient, isDefined } from "@vueuse/core";

export function useBackground(options?: { startOnMount?: boolean }) {
  const { startOnMount = true } = options || {};

  const hsl = ref(0);
  const mod = computed(() => hsl.value % 360);

  const STEP = 1;
  const INTERVAL_FRAME = 5;

  let counter = 0;
  let timer: number | undefined;

  function start() {
    if (isDefined(timer) || !isClient) { return; }
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
  }

  function stop() {
    isDefined(timer) && isClient && cancelAnimationFrame(timer);
    timer = undefined;
  }

  onMounted(() => {
    if (startOnMount) {
      start();
    }
  });

  onUnmounted(() => {
    stop();
  });

  return {
    mod,
    start,
    stop,
  };
}
