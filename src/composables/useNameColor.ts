import type { MaybeRef } from "@vueuse/core";
import { CaptainTypes } from "@/types";

export function useNameColor(captainType: MaybeRef<CaptainTypes>) {
  const captainTypeRef = ref(captainType);
  return computed(() => getNameColor(captainTypeRef.value));
}

function getNameColor(captainType: CaptainTypes) {
  switch (captainType) {
    case CaptainTypes.captain:
    case CaptainTypes.captainThousand:
      return "#00D1F1";
    case CaptainTypes.governor:
    case CaptainTypes.governorThousand:
      return "#FF7C28";
    case CaptainTypes.viceroy:
    case CaptainTypes.viceroyThousand:
      return "#E17AFF";
    default:
      return "";
  }
}
