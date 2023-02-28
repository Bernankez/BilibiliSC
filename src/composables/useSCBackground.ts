import type { MaybeRef } from "@vueuse/core";

export function useSCBackground(battery: MaybeRef<string>) {
  const batteryRef = ref(battery);
  return computed(() => getSCBackground(batteryRef.value));
}

function getSCBackground(battery: string) {
  const batteryNum = parseInt(battery);
  if (batteryNum > 10000) {
    return ["#AB1A32", "#FFD8D8"];
  } else if (batteryNum > 5000) {
    return ["#E54D4D", "#FFE7E4"];
  } else if (batteryNum > 1000) {
    return ["#E09443", "#FFEAD2"];
  } else if (batteryNum > 500) {
    return ["#E2B52B", "#FFF1C5"];
  } else if (batteryNum > 300) {
    return ["#427D9E", "#DBFFFD"];
  } else {
    return ["#2A60B2", "#EDF5FF"];
  }
}
